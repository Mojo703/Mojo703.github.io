export class Vector {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    add(x, y) {
        if (arguments.length === 1) {
            this.x += x.x;
            this.y += x.y;
        } else if (arguments.length === 2) {
            this.x += x;
            this.y += y;
        }
        return this;
    }

    subtract(x, y) {
        if (arguments.length === 1) {
            this.x -= x.x;
            this.y -= x.y;
        } else if (arguments.length === 2) {
            this.x -= x;
            this.y -= y;
        }
        return this;
    }

    multiply(v) {
        if (typeof v === 'number') {
            this.x *= v;
            this.y *= v;
        } else {
            this.x *= v.x;
            this.y *= v.y;
        }
        return this;
    }

    divide(v) {
        if (typeof v === 'number') {
            this.x /= v;
            this.y /= v;
        } else {
            this.x /= v.x;
            this.y /= v.y;
        }
        return this;
    }

    squareMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

    clamp(minV, maxV) {
        this.x = Math.max(Math.min(this.x, maxV.x), minV.x);
        this.y = Math.max(Math.min(this.y, maxV.y), minV.y);

        return this;
    }

    static zero = new Vector(0, 0);
}