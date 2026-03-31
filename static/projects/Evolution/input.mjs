import { Vector } from "./vector.mjs";

export class KeyListener {
    keyCallbacks = {};
    constructor() {
        document.addEventListener('keydown', event => {
            const key = event.key.toLocaleLowerCase();

            // Make sure key callbacks exist
            if (!this.keyCallbacks[key]) {
                return;
            }

            // Run the callbacks
            this.keyCallbacks[key].forEach(callback => {
                callback(true);
            });
        });
        document.addEventListener('keyup', event => {
            const key = event.key.toLocaleLowerCase();
            // Make sure key callbacks exist
            if (!this.keyCallbacks[key]) {
                return;
            }

            // Run the callbacks
            this.keyCallbacks[key].forEach(callback => {
                callback(false);
            });
        });
    }

    addKeyCallback(key, callback = (isPressed) => { }) {
        if (!this.keyCallbacks[key]) {
            this.keyCallbacks[key] = new Set();
        }

        this.keyCallbacks[key].add(callback);
    }
}

export class MouseListener {
    wheelCallbacks = new Set();
    buttonCallbacks = {};
    mousePosition = new Vector(undefined, undefined);

    constructor(mouseTarget) {
        mouseTarget.addEventListener('wheel', event => {
            this.wheelCallbacks.forEach(callback => {
                callback(event.deltaX, event.deltaY);
            });
        });

        mouseTarget.addEventListener('mousedown', event => {
            // Make sure button callbacks exist
            if (!this.buttonCallbacks[event.button]) {
                return;
            }

            // Run the callbacks
            this.buttonCallbacks[event.button].forEach(callback => {
                callback(true);
            });
        });

        mouseTarget.addEventListener('mouseup', event => {
            // Make sure button callbacks exist
            if (!this.buttonCallbacks[event.button]) {
                return;
            }

            // Run the callbacks
            this.buttonCallbacks[event.button].forEach(callback => {
                callback(false);
            });
        });

        mouseTarget.addEventListener('mousemove', event => {
            this.mousePosition.set(event.clientX, event.clientY);
        });

        mouseTarget.addEventListener('mouseout', event => {
            this.mousePosition.set(undefined, undefined);
        });
    }

    addWheelCallback(callback = (x, y) => { }) {
        this.wheelCallbacks.add(callback);
    }

    addButtonCallback(button, callback = (isPressed) => { }) {
        if (!this.buttonCallbacks[button]) {
            this.buttonCallbacks[button] = new Set();
        }

        this.buttonCallbacks[button].add(callback);
    }
}