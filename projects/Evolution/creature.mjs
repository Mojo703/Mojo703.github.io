import { Network } from "./network.mjs";
import { Camera } from "./camera.mjs";
import { Namer } from "./namer.mjs";

export class Creature {
    x;
    y;
    angle;
    color;
    heartrate;
    satiety;
    eyeList;
    brainNetwork;
    speciesName;
    generationName;

    constructor(
        x,
        y,
        angle,
        color,
        heartrate,
        satiety,
        eyeList,
        brainNetwork,
        speciesName,
        generationName,
        parentRef) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
        this.heartrate = heartrate;
        this.satiety = satiety;
        this.eyeList = eyeList;
        this.brainNetwork = brainNetwork;
        this.speciesName = speciesName;
        this.generationName = generationName;
        this.parentRef = parentRef;
    }

    copy() {
        const x = this.x;
        const y = this.y;
        const angle = this.angle;
        const color = this.color;
        const heartrate = this.heartrate;
        const satiety = this.satiety;
        const eyeList = this.eyeList.map(eye => eye.copy());
        const brainNetwork = this.brainNetwork.copy();
        const speciesName = this.speciesName;
        const generationName = this.generationName;
        const parentRef = this.parentRef;

        return new Creature(x,
            y,
            angle,
            color,
            heartrate,
            satiety,
            eyeList,
            brainNetwork,
            speciesName,
            generationName,
            parentRef);
    }

    static speedLinearMax = 0.03;
    static speedAngularMax = 0.04;
    move(linear, angular, board) {
        this.x += Creature.speedLinearMax * linear * Math.cos(this.angle) * this.heartrate;
        this.y += Creature.speedLinearMax * linear * Math.sin(this.angle) * this.heartrate;
        this.angle += Creature.speedAngularMax * angular * this.heartrate;

        // Limit to boundaries
        this.x = Math.max(Math.min(this.x, board.size.x), 0);
        this.y = Math.max(Math.min(this.y, board.size.y), 0);
    }

    brainOutputs;
    brainInputsMem = [];
    brainSave = 0;
    static brainInputsMemSize = 100;
    runBrain(viewObjects) {
        // Get the inputs
        const inputs = [];

        this.eyeList.forEach(eye => {
            const values = eye.getValues(this.x, this.y, this.angle, viewObjects);
            inputs.push(values.left);
            inputs.push(values.right);
        });

        // Get internal inputs
        inputs.push(0); // Hunger
        inputs.push((Math.sin(Math.PI * 2 * this.heartTime) + 1) * 0.5); // Heartbeat

        if (this.brainSave <= 0) {
            // Save the inputs to memory
            for (let index = 0; index < inputs.length; index++) {
                if (!this.brainInputsMem[index]) {
                    this.brainInputsMem[index] = new Array();
                }
                this.brainInputsMem[index].push(inputs[index]);
                if (this.brainInputsMem[index].length > Creature.brainInputsMemSize) {
                    this.brainInputsMem[index].shift();
                }
            }
        }

        this.brainSave = (this.brainSave + 1) % 3;

        // Get the outputs
        this.brainOutputs = this.brainNetwork.compute(inputs);
    }

    createMutations() {
        var result = [];

        // Color
        result.push(() => this.color += Math.random() * 0.2 - 0.1);
        // Eyes
        this.eyeList.forEach(eye => result.push(...eye.createMutations()));
        // Brain
        result.push(...this.brainNetwork.createMutations());

        return result;
    }

    mutate() {
        const avaliableMutations = this.createMutations();

        // Small mutations: { eye properties, brain axon values, brain neuron bias, body color }
        const chanceSmall = 0.5; // 50% chance for each of the options seperately

        avaliableMutations.forEach(mutation => {
            if (Math.random() <= chanceSmall) {
                mutation(); // Apply the mutation
            }
        });

        // Large mutations: { eye count, brain neuron count }
        const chanceLarge = 0.01; // 1% chance
    }

    createOffspring() {
        const children = [];

        const childCount = 1;
        const childSatiety = 0.5;
        for (let i = 0; i < childCount; i++) {
            const child = this.copy();

            child.mutate();

            // Change the generation name
            child.generationName = Namer.namer.getName();

            child.satiety = childSatiety;

            // Change the parent
            child.parentRef = this;

            children.push(child);
        }

        this.satiety -= childCount * childSatiety;

        return children;
    }

    brainLinearMovement() {
        return Math.min(Math.max(this.brainOutputs[0] - this.brainOutputs[1], 0), 1); // Clamp [0, 1]
    }

    brainAngularMovement() {
        return Math.min(Math.max(this.brainOutputs[2] - this.brainOutputs[3], -1), 1); // Clamp [-1, 1]
    }

    brainHeartTarget() {
        return (this.brainOutputs[4] - this.brainOutputs[5]) / 2 + 0.5;
    }

    tryEat(eatObject) {
        // Check eaten
        if (eatObject.isEaten) {
            return;
        }

        const radius = 0.5;
        // Check bounding box
        const dx = eatObject.x - this.x;
        const dy = eatObject.y - this.y;
        if (dx < -radius || dx > radius || dy < -radius || dy > radius) {
            return;
        }

        // Check radius
        const percentRangeSquared = (dx * dx + dy * dy) / (radius * radius);
        if (percentRangeSquared > 1) {
            return;
        }

        // Eat the object
        this.satiety = this.satiety + eatObject.eat(); // Clamp (-inf, 1]
    }

    die() {
        this.isDead = true;
    }

    heartTime = 0;
    runBody(board, eatObjects) {
        // Move the creature based on brain outputs
        const linear = this.brainLinearMovement();
        const angular = this.brainAngularMovement();
        const heartTarget = this.brainHeartTarget();

        // Change the heartrate based on brain outputs
        const percent = 0.005;
        this.heartrate = Math.max(Math.min(this.heartrate * (1 - percent) + heartTarget * percent, 1), 0);
        this.heartTime += this.heartrate * 0.02 + 0.001;
        this.heartTime = this.heartTime % 1;

        // Reduce satiety based on heartrate
        this.satiety -= (this.heartrate + 0.4) * 0.0001;

        this.move(linear, angular, board);

        // Handle eating
        eatObjects.forEach(eatObject => {
            this.tryEat(eatObject);
        });

        // Handle dying
        if (this.satiety <= 0) {
            this.die();
        }

        // Handle offspring
        if (this.satiety > 1) {
            const offspring = this.createOffspring();

            offspring.forEach(creature => {
                board.addCreature(creature);
            });
        }
    }

    draw(ctx, camera) {
        const focus = camera.getFocus(this);

        if (focus == Camera.Focus.NONE) {
            return;
        }

        const tileSize = camera.getTileSize();
        ctx.save();
        ctx.translate(this.x * tileSize, this.y * tileSize);
        ctx.rotate(this.angle);

        this.drawBody(ctx, tileSize, focus);

        ctx.restore();
    }

    drawBody(ctx, tileSize, focus) {
        const innerColor = "hsl(" + this.color * 360 + ",75%,75%)";
        const outerColor = "hsl(" + this.color * 360 + ",75%,20%)";

        // Draw the body
        ctx.lineWidth = Math.round(tileSize / 30);
        ctx.fillStyle = innerColor;
        ctx.strokeStyle = outerColor;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, tileSize / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw eyes
        ctx.strokeStyle = outerColor;
        this.eyeList.drawAll(ctx, tileSize, focus);
    }

    static newRandom(x, y) {
        const angle = Math.random() * Math.PI * 2;
        const color = Math.random();
        const heartrate = 0.1;
        const satiety = 1;
        const eyeList = new Eye.List();
        const eyeCount = Math.round(Math.random() * 3);
        for (let j = 0; j < eyeCount; j++) {
            eyeList.add(Eye.newRandom());
        }
        const brainInputCount = 2 + eyeCount * 2; // [ Hunger,  Heartbeat, eye1left, eye1right, eye2left ... ]
        const brainOutputCount = 6; // [ goForward, goBackward, turnLeft, turnRight, increaseHeartrate, decreaseHeartrate ]
        const brainNetwork = Network.newRandom([
            brainInputCount,
            Math.max(brainInputCount + 1, brainOutputCount + 1),
            brainOutputCount,
        ]);

        const speciesName = Namer.namer.getName();
        const generationName = Namer.namer.getName();

        return new Creature(
            x,
            y,
            angle,
            color,
            heartrate,
            satiety,
            eyeList,
            brainNetwork,
            speciesName,
            generationName
        );
    }

    static List = class extends Array {
        drawAll(context, camera) {
            this.forEach((creature) => creature.draw(context, camera));
        }
    };
}

class Eye {
    color; // Color the eye is tuned for
    clarity; // Range of colors the eye can see.
    range; // Field of view
    angle; // Angle the eye is viewing relative to the creature
    distance; // 

    constructor(color, clarity, angle, distance, range) {
        this.color = Math.min(Math.max(color, 0), 1); // Clamp [0, 1]
        this.clarity = Math.min(Math.max(clarity, 0), 1); // Clamp [0, 1]
        this.angle = Math.min(Math.max(angle, 0), 1); // Clamp [0, 1]
        this.distance = Math.min(Math.max(distance, 0), 1); // Clamp [0, 1]
        this.range = Math.min(Math.max(range, 0), 1); // Clamp [0, 1]
    }

    copy() {
        const color = this.color;
        const clarity = this.clarity;
        const angle = this.angle;
        const distance = this.distance;
        const range = this.range;

        return new Eye(color, clarity, angle, distance, range);
    }

    createMutations() {
        var result = [];

        // Color
        result.push(() => this.color += Math.random() * 0.2 - 0.1);
        // Clarity
        result.push(() => this.clarity += Math.random() * 0.2 - 0.1);
        // Angle
        result.push(() => this.angle += Math.random() * 0.1 - 0.05);
        // Distance
        result.push(() => this.distance += Math.random() * 0.2 - 0.1);
        // Range
        result.push(() => this.range += Math.random() * 0.2 - 0.1);

        return result;
    }

    getColorPart(color) {
        const diff = color - this.color;
        return Math.exp((-3 / this.clarity) * diff * diff); // https://www.desmos.com/calculator/qdnnx5lk9f

        // Different options: https://www.desmos.com/calculator/mxi6zjdtop
    }

    values = { left: 0, right: 0 };
    getValues(x, y, a, viewObjects) {
        this.values.left = this.getSideValue(x, y, a, viewObjects, true);
        this.values.right = this.getSideValue(x, y, a, viewObjects, false);

        return this.values;
    }

    getSideValue(x, y, a, viewObjects, isLeft) {
        const distance = this.getDistance();
        const angle = a + this.getAngle() * (isLeft ? 1 : -1);
        const tx = x + Math.cos(angle) * distance;
        const ty = y + Math.sin(angle) * distance;
        const tr = this.getRange();
        var value = 0;
        viewObjects.forEach((viewObject) => {
            // Check visibility
            if (viewObject.isVisible && !viewObject.isVisible()) {
                return;
            }

            // Check bounding box
            if (viewObject.x < tx - tr || viewObject.x > tx + tr || viewObject.y < ty - tr || viewObject.y > ty + tr) {
                return;
            }

            // Check radius
            const dx = viewObject.x - tx;
            const dy = viewObject.y - ty;
            const percentRangeSquared = (dx * dx + dy * dy) / (tr * tr);
            if (percentRangeSquared > 1) {
                return;
            }

            // Get the value
            const rangeComp = 1 - percentRangeSquared;
            const colorComp = Math.max(1 - this.clarity * 4 * (this.color - viewObject.color) * (this.color - viewObject.color), 0);

            value += rangeComp * colorComp;
        });
        return value;
    }

    getColor() {
        return `hsl(${this.color * 360}, 100%, ${95 - this.clarity * this.clarity * 45}%)`;
    }

    getSize() {
        return 0.05 + 0.05 * (this.distance + this.range);
    }

    getAngle() {
        const deadzone = 0.1;
        return 2 * Math.PI * (this.angle * (1 - deadzone) + deadzone);
    }

    getDistance() {
        return 0.5 + this.distance;
    }

    getRange() {
        return 0.5 + this.range * 0.5;
    }

    static newRandom() {
        const angle = Math.pow(Math.random(), 4);
        return new Eye(
            Math.random(),
            Math.random(),
            angle,
            Math.random(),
            Math.random()
        );
    }

    draw(ctx, tileSize, focus) {
        const angle = this.getAngle();
        const distance = this.getDistance();
        const x = Math.cos(angle) * tileSize * 0.3;
        const y = Math.sin(angle) * tileSize * 0.3;
        ctx.fillStyle = this.getColor();
        const size = tileSize * this.getSize();

        // Fill
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x, -y, size, 0, Math.PI * 2);
        ctx.fill();

        // Stroke
        // Draw right
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke(); // NOTE: this is from the creature
        // Draw left
        ctx.beginPath();
        ctx.arc(x, -y, size, 0, Math.PI * 2);
        ctx.stroke(); // NOTE: this is from the creature

        if (focus == Camera.Focus.DETIAL) {
            // Draw the target circle
            ctx.save();
            const tx = Math.cos(angle) * tileSize * distance;
            const ty = Math.sin(angle) * tileSize * distance;
            const tr = tileSize * this.getRange();
            ctx.lineWidth = Math.round(tileSize / 90) * (1 + this.values.left * 4);
            ctx.beginPath();
            ctx.arc(tx, ty, tr, 0, Math.PI * 2);
            ctx.stroke();
            ctx.lineWidth = Math.round(tileSize / 90) * (1 + this.values.right * 4);
            ctx.beginPath();
            ctx.arc(tx, -ty, tr, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }

    static List = class extends Array {
        drawAll(ctx, tileSize, focus) {
            for (let i = 0; i < this.length; i++) {
                this[i].draw(ctx, tileSize, focus);
            }
        }

        add(eye) {
            this.push(eye);
            this.sort((a, b) => b.getSize() - a.getSize());
        }
    };
}
