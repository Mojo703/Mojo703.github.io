import { Vector } from "./vector.mjs";

export class Board {
    size;
    bushList;
    creatureList;

    constructor(width, height, bushList, creatureList) {
        this.size = new Vector(width, height);
        this.bushList = bushList;
        this.creatureList = creatureList;
    }

    draw(ctx, camera) {
        // Draw the border
        const tileSize = camera.getTileSize();
        ctx.save();
        ctx.lineWidth = Math.round(tileSize / 20);
        ctx.strokeStyle = '#63afff';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.size.x * tileSize, 0);
        ctx.lineTo(this.size.x * tileSize, this.size.y * tileSize);
        ctx.lineTo(0, this.size.y * tileSize);
        ctx.closePath();
        ctx.stroke();
        // Draw all of the bushes
        this.bushList.drawAll(ctx, camera);

        // Draw all of the creatures
        this.creatureList.drawAll(ctx, camera);
        ctx.restore();
    }

    run(deltaTime) {
        // Run the creature brains
        const viewObjects = new Set([...this.bushList, ...this.creatureList]);
        this.creatureList.forEach(creature => {
            viewObjects.delete(creature); // This is a jank solution
            creature.runBrain(viewObjects);
            viewObjects.add(creature);
        });

        // Run the creature bodies
        const eatObjects = new Set(this.bushList);
        this.creatureList.forEach(creature => {
            creature.runBody(this, eatObjects);
        });

        // Remove dead creatures from the list
        this.creatureList.reduceRight(function (acc, creature, index, object) {
            if (creature.isDead) {
                object.splice(index, 1);
            }
        }, []);

        // Grow bushes
        const chance = 0.05; // 5 percent chance each frame
        if (Math.random() < chance) {
            const index = Math.floor(this.bushList.length * Math.random())
            this.bushList[index].grow();
        }
        // Note: a bush will successfully grow more often, when there are more eaten bushes.
    }

    getCreature(index) {
        return this.creatureList[index];
    }

    addCreature(creature) {
        this.creatureList.push(creature);
    }
}

export class Bush {
    x;
    y;
    color;
    isEaten;

    constructor(x, y, color, isEaten) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isEaten = isEaten;
    }

    isVisible() {
        return !this.isEaten;
    }

    draw(ctx, camera) {
        // Check bounds
        if (!camera.isInsideViewBounds(this.x, this.y)) {
            return;
        }

        const tileSize = camera.getTileSize();

        ctx.beginPath();
        let innerColor = 'hsl(' + this.color * 360 + ', 100%, 45%)';
        let outerColor = 'hsl(' + this.color * 360 + ', 100%, 5%)';
        let radius = tileSize * 0.5;
        if (this.isEaten) {
            innerColor = 'hsl(' + this.color * 360 + ', 30%, 85%)';
            outerColor = 'hsl(' + this.color * 360 + ', 30%, 45%)';
            radius = tileSize * 0.45;
        }
        ctx.fillStyle = innerColor;
        ctx.strokeStyle = outerColor;
        ctx.lineWidth = Math.round(tileSize / 30);
        ctx.arc(this.x * tileSize, this.y * tileSize, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    static List = class extends Array {
        drawAll(context, camera) {
            this.forEach(bush => bush.draw(context, camera));
        }
    }

    eat() {
        var value = 0;
        if (!this.isEaten) {
            value = 0.2;
        }
        this.isEaten = true;

        return value;
    }

    grow() {
        this.isEaten = false;
    }
}