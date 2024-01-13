import { Vector } from "./vector.mjs";

export class Camera {
    position;
    velocity = new Vector(0, 0);
    acceleration = new Vector(0, 0);

    board;

    constructor(x, y, board) {
        this.position = new Vector(x, y);
        this.board = board;
    }

    mass = 400;
    friction = 0.3;
    pan(direction, deltaTime) {
        // Break locks
        if (direction.x != 0 || direction.y != 0) {
            this.breakLock();
        }

        // Check close to zero
        if (this.velocity.squareMagnitude() <= 0.0001) {
            this.velocity.set(0, 0);
        }
        if (this.acceleration.squareMagnitude() <= 0.0001) {
            this.acceleration.set(0, 0);
        }

        const map = function (val, in_min, in_max, out_min, out_max) {
            return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        }
        // Velocity Verlet second order integration (https://jdickinsongames.wordpress.com/2015/01/22/numerical-integration-in-games-development-2/)
        const newVelocity = this.velocity.copy().add(this.acceleration.copy().multiply(deltaTime / 2));
        const speed = map(this.tileSize, Camera.zoomMin, Camera.zoomMax, 2, 0.5);
        const force = new Vector(0, 0).add(direction).multiply(speed).add(newVelocity.copy().multiply(-this.friction * this.mass));
        this.position.add(newVelocity.copy().multiply(deltaTime));
        this.acceleration = force.divide(this.mass);
        this.velocity = newVelocity.add(this.acceleration.copy().multiply(deltaTime / 2));
    }

    static zoomMax = 200;
    static zoomMin = 14;
    static zoomRate = 0.1;
    zoom(direction) {
        this.tileSize = Math.max(Math.min(this.tileSize * (1 + Camera.zoomRate * direction), Camera.zoomMax), Camera.zoomMin);
    }

    mousePosition = new Vector(0, 0);
    static selectDistanceMax = 0.5;
    select(selecting, mouseScreenPosition, selectableList) {
        this.mousePosition = this.screenToWorldPos(mouseScreenPosition);
        if (!selecting) {
            return;
        }

        // Sort the selectables by distance
        const nearestList = selectableList.map(entity => {
            return { entity, distance2: new Vector(entity.x, entity.y).subtract(this.mousePosition).squareMagnitude() };
        }).sort((a, b) => a.distance2 - b.distance2);

        // Find the best match
        for (let i = 0; i < nearestList.length; i++) {
            const entity = nearestList[i].entity;
            const distance2 = nearestList[i].distance2;

            if (this.lockObject == entity) {
                continue;
            }

            if (distance2 > Camera.selectDistanceMax * Camera.selectDistanceMax) {
                break;
            }

            this.formLock(entity);
            return entity;
        }

        return undefined;
    }

    lockObject;
    formLock(lockObject) {
        this.lockObject = lockObject;
    }

    breakLock() {
        if (!this.lockObject) {
            return;
        }

        this.position.set(this.lockObject.x, this.lockObject.y);
        this.lockObject = undefined;
    }

    tileSize = 100;
    getTileSize() {
        return this.tileSize;
    }

    isInsideViewBounds(x, y, margin = 3) {
        // Check Left and above
        const tileSize = this.getTileSize();
        const halfw = this.canvas.width / tileSize / 2;
        const halfh = this.canvas.height / tileSize / 2;
        const l = this.position.x - halfw;
        const a = this.position.y - halfh;
        if (x < l - margin || y < a - margin) {
            return false;
        }

        // Check Right and Below
        const r = this.position.x + halfw;
        const b = this.position.y + halfh;
        if (x > r + margin || y > b + margin) {
            return false;
        }

        return true;
    }

    static Focus = { NONE: 'none', VISIBLE: 'visible', DETIAL: 'detail' }

    getFocus(creature) {
        // Check lock
        if (creature == this.lockObject) {
            return Camera.Focus.DETIAL;
        }
        // Check out of view bounds
        if (!this.isInsideViewBounds(creature.x, creature.y)) {
            return Camera.Focus.NONE;
        }
        return Camera.Focus.VISIBLE;
    }

    mouseOffset = new Vector(0, 0);
    canvasSize = new Vector(0, 0);
    generateCanvas(parent) {
        this.canvas = document.createElement('canvas');//document.getElementById('board');
        this.context = this.canvas.getContext('2d');

        const cameraContainer = document.createElement('div');
        cameraContainer.classList.add('camera');

        const canvasResize = new ResizeObserver(entries => {
            for (let entry of entries) {
                // Update the canvas size
                this.canvasSize.set(entry.contentRect.width, entry.contentRect.height);
                this.canvas.width = this.canvasSize.x;
                this.canvas.height = this.canvasSize.y;
            }
        });
        canvasResize.observe(cameraContainer);

        cameraContainer.appendChild(this.canvas);
        parent.appendChild(cameraContainer);
    }

    draw() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Handle lock
        if (this.lockObject) {
            this.position.x = this.lockObject.x;
            this.position.y = this.lockObject.y;
        }

        // Handle translation
        this.context.save();
        const tileSize = this.getTileSize();
        this.context.translate(-this.position.x * tileSize + this.canvas.width / 2, -this.position.y * tileSize + this.canvas.height / 2);

        // Draw the board
        this.board.draw(this.context, this);

        // Draw the mouse
        if (this.mousePosition != undefined && this.mousePosition.y != undefined) {
            this.context.beginPath();
            this.context.arc(this.mousePosition.x * tileSize, this.mousePosition.y * tileSize, tileSize / 2, 0, Math.PI * 2);
            this.context.stroke();
        }

        // Draw the selected border
        if (this.lockObject) {
            const x = this.lockObject.x * tileSize;
            const y = this.lockObject.y * tileSize;
            const r = tileSize * 0.4;
            this.context.strokeRect(x - r, y - r, r * 2, r * 2);
        }

        this.context.restore();
    }

    screenToWorldPos(screenPosition, tileSize = this.getTileSize()) {
        return screenPosition.copy().divide(this.canvasSize).add(-0.5, -0.5).multiply(this.canvasSize).divide(tileSize).add(this.position).clamp(Vector.zero, this.board.size);
    }
}