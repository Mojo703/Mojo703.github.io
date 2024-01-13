import { createNoise2D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";
import { KeyListener, MouseListener } from "./input.mjs";
import { Creature } from "./creature.mjs";
import { Board, Bush } from "./board.mjs";
import { Camera } from "./camera.mjs";
import { Vector } from "./vector.mjs";

const noise2D = createNoise2D();
const colorNoise2D = createNoise2D();

class Game {
    width;
    height;
    bushChance;
    creatureChance;

    camera;
    board;
    keyListener;
    mouseListener;
    constructor(width, height, bushChance, creatureChance) {
        this.width = width;
        this.height = height;
        this.bushChance = bushChance;
        this.creatureChance = creatureChance;

        const bushList = this.generateBushList();
        const creatureList = this.generateCreatureList();

        console.log(creatureList);

        // Create the board and the camera
        this.board = new Board(width, height, bushList, creatureList);
        this.camera = new Camera(0, 0, this.board);
    }

    panKeys = [false, false, false, false];
    zoomKeys = [false, false];
    selectingButton = false;
    moveKeys = [false, false, false, false];
    initInput() {
        // Create the pan commands
        this.keyListener.addKeyCallback('w', (isPressed) => { this.panKeys[0] = isPressed; });
        this.keyListener.addKeyCallback('a', (isPressed) => { this.panKeys[1] = isPressed; });
        this.keyListener.addKeyCallback('s', (isPressed) => { this.panKeys[2] = isPressed; });
        this.keyListener.addKeyCallback('d', (isPressed) => { this.panKeys[3] = isPressed; });

        // Create the zoom commands
        this.keyListener.addKeyCallback('=', (isPressed) => { this.zoomKeys[0] = this.zoomKeys[0] || isPressed; });
        this.keyListener.addKeyCallback('-', (isPressed) => { this.zoomKeys[1] = this.zoomKeys[1] || isPressed; });
        this.mouseListener.addWheelCallback((x, y) => {
            this.zoomKeys[0] = this.zoomKeys[0] || y < 0;
            this.zoomKeys[1] = this.zoomKeys[1] || y > 0;
        });

        // Create the select command
        this.mouseListener.addButtonCallback(0, (isPressed) => {
            this.selectingButton = this.selectingButton || isPressed;
        });

        // Create the game exit command
        this.keyListener.addKeyCallback('escape', (isPressed) => {
            console.log('exit!');
            if (isPressed) {
                this.isLooping = false;
                this.isRendering = false;
            }
        });

        // TEMP: Create the creature movement commands
        this.keyListener.addKeyCallback('arrowup', (isPressed) => { this.moveKeys[0] = isPressed; });
        this.keyListener.addKeyCallback('arrowleft', (isPressed) => { this.moveKeys[1] = isPressed; });
        this.keyListener.addKeyCallback('arrowdown', (isPressed) => { this.moveKeys[2] = isPressed; });
        this.keyListener.addKeyCallback('arrowright', (isPressed) => { this.moveKeys[3] = isPressed; });

        // TEMP: Creature info
        this.keyListener.addKeyCallback('i', (isPressed) => {
            if (isPressed) {
                console.log(this.camera.lockObject);
                console.log(this);
            }
        });
    }

    getPan() {
        return new Vector(this.panKeys[3] - this.panKeys[1], this.panKeys[2] - this.panKeys[0]);
    }

    getZoom() {
        const value = Math.max(Math.min(this.zoomKeys[0] - this.zoomKeys[1], 1), -1);
        this.zoomKeys[0] = false;
        this.zoomKeys[1] = false;
        return value;
    }

    getSelecting() {
        var value = this.selectingButton;
        this.selectingButton = false;
        return value;
    }

    getMove() {
        return { linear: this.moveKeys[0] - this.moveKeys[2], angular: this.moveKeys[3] - this.moveKeys[1] };
    }

    generateBushList() {
        const bushCount = this.width * this.height * this.bushChance; // 5 percent chance of a bush in each tile
        const bushOptions = [];
        const noiseScale = 0.025;
        const colorNoiseScale = 0.03;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const n = noise2D(x * noiseScale, y * noiseScale) + Math.random() * 6;
                const color = (colorNoise2D(x * colorNoiseScale, y * colorNoiseScale) + 1) / 2;
                var ox = x + (Math.random() * 2 - 1) * 0.3;
                var oy = y + (Math.random() * 2 - 1) * 0.3;
                ox = Math.max(Math.min(ox, this.width), 0);
                oy = Math.max(Math.min(oy, this.height), 0);
                bushOptions.push({ bush: new Bush(ox, oy, color), val: n });
            }
        }
        return new Bush.List(...bushOptions.sort((a, b) => b.val - a.val).slice(0, bushCount).map((option) => option.bush));
    }

    generateCreatureList() {
        const creatureList = new Creature.List();
        const creatureCount = this.width * this.height * this.creatureChance; // 6 percent chance of a creature in each tile
        for (let i = 0; i < creatureCount; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;

            creatureList.push(Creature.newRandom(x, y));
        }

        return creatureList;
    }

    isRendering = true;
    interfaceRender = 0;
    render() { // Happens whenever the browser wants to
        this.camera.draw();

        if (this.interfaceRender == 0) {
            this.interface.render();
        }
        this.interfaceRender = (this.interfaceRender + 1) % 4; // Render the interface every fourth frame

        if (this.isRendering) {
            requestAnimationFrame(() => {
                this.render();
            });
        }
    }

    loopTime = 1000 / 120; // ms per frame
    previousTime;
    isLooping = true;
    loop() { // Happens at a specific rate
        if (!this.isLooping) {
            clearInterval(this.loopInterval);
        }
        const deltaTime = this.loopTime;

        // Give the camera the pan input commands
        this.camera.pan(this.getPan(), deltaTime);

        // Give the camera the zoom input commands
        this.camera.zoom(this.getZoom());

        // Give the camera the selecting input command
        const entity = this.camera.select(this.getSelecting(), this.mouseListener.mousePosition, this.board.creatureList);

        // Update the interface
        if (entity) {
            const followCallback = () => {
                this.camera.formLock(entity);
            }
            this.interface.generateSpecific(entity, followCallback);
        }

        // TEMP: Control the creature
        if (this.camera.lockObject) {
            const movement = this.getMove();
            this.camera.lockObject.move(movement.linear, movement.angular, this.board);
        }

        // Run the board
        this.board.run(deltaTime);

        // Handle all creatures dying
        if (this.board.creatureList.length <= 0) {
            this.reload();
        }
    }

    reload() {
        location.reload(true);
    }

    loopInterval;
    start(parentElement) {
        const body = document.createElement('div');
        body.classList.add('game');

        // Generate the camera
        this.camera.generateCanvas(body);

        // Generate the interface
        this.generateInderface(body);

        parentElement.appendChild(body);

        // Start the input systems
        this.keyListener = new KeyListener();
        this.mouseListener = new MouseListener(body);

        this.initInput();

        // Start the rendering system
        requestAnimationFrame(() => {
            this.render();
        });

        // Start the logic system
        this.loopInterval = setInterval(() => {
            this.loop();
        }, this.loopTime);
    }

    interface;
    generateInderface(parent) {
        this.interface = new Game.Interface(parent);
    }

    static Interface = class {
        body;
        specific;

        constructor(parent) {
            // Generate html
            this.body = document.createElement('div');
            this.body.classList.add('interface');

            parent.appendChild(this.body);
        }

        isSpecificOpen() {
            return this.specific != undefined;
        }

        closeSpecific() {
            this.specific.remove();
            this.specific = undefined;
            this.specificCreature = undefined;
        }

        specificCreature;
        networkCanvas;
        statsCanvas;
        inputTags;
        generateSpecific(creature, followCallback) {
            // Delete any previous specific
            if (this.specific) {
                this.closeSpecific();
            }

            this.specificCreature = creature;

            // Generate side panel
            this.specific = document.createElement('div');
            const title = document.createElement('h2');
            const generations = document.createElement('div');
            const info = document.createElement('div');
            const creatureCanvas = document.createElement('canvas');
            const closeButton = document.createElement('button');
            const followButton = document.createElement('button');
            this.networkCanvas = document.createElement('canvas');
            this.statsCanvas = document.createElement('canvas');
            this.textStats = document.createElement('div');

            this.specific.classList.add('specific');
            generations.classList.add('generations');
            info.classList.add('info');
            title.classList.add('title');
            creatureCanvas.classList.add('creature');
            this.networkCanvas.classList.add('network');
            this.statsCanvas.classList.add('stats');
            closeButton.classList.add('close');
            followButton.classList.add('follow');

            // Generate the generations info
            this.generateGenerations(generations);

            // Stop click propagation
            this.specific.addEventListener('mousedown', event => {
                event.stopPropagation();
            });

            // Add the text
            closeButton.innerText = '✖';
            title.innerText = creature.speciesName[0].toUpperCase() + this.specificCreature.speciesName.slice(1) + ' ' + this.specificCreature.generationName;

            // Add button event listeners
            closeButton.addEventListener('click', () => {
                this.closeSpecific();
            });
            followButton.addEventListener('click', followCallback);

            // Create the input tags
            this.inputTags = [];
            const count = this.specificCreature.brainInputsMem.length;
            for (let i = 0; i < count; i ++) {
                const tag = document.createElement('div');
                tag.classList.add('tag');
                tag.innerText = `${i}`;
                this.inputTags.push(tag);
            }

            // Draw the creature
            const width = 650;
            const height = 300;
            creatureCanvas.width = width;
            creatureCanvas.height = height;
            const ctx = creatureCanvas.getContext('2d');
            ctx.translate(width / 2, height / 2);
            ctx.rotate(this.specificCreature.angle);
            this.specificCreature.drawBody(ctx, height * 0.6, Camera.Focus.DETIAL);

            // Draw everything else
            this.render();

            // Create the structure
            info.appendChild(this.networkCanvas);
            info.appendChild(this.statsCanvas);
            this.inputTags.forEach(inputTag => {
                info.appendChild(inputTag);
            });
            info.appendChild(this.textStats);
            
            this.specific.appendChild(followButton);
            this.specific.appendChild(closeButton);
            this.specific.appendChild(creatureCanvas);
            this.specific.appendChild(title);
            this.specific.appendChild(generations);
            this.specific.appendChild(info);
            this.body.appendChild(this.specific);
        }

        generateGenerations(parent) {
            const divArea = document.createElement('div');
            let parentCreature = this.specificCreature.parentRef;
            const names = [];

            while (parentCreature) {
                // Generate the text name
                names.push(parentCreature.generationName);
                parentCreature = parentCreature.parentRef;
            }

            if (names.length <= 0) {
                divArea.innerText = 'Progenitor. No previous generations.';
            } else {
                divArea.innerText = `Prev. Generations: ${names.join(', ')}`;
            }

            parent.appendChild(divArea);
        }

        render() {
            if (!this.networkCanvas || !this.specificCreature) {
                return;
            }

            // Draw the network
            this.networkCanvas.width = 650;
            this.networkCanvas.height = 400;
            const nctx = this.networkCanvas.getContext('2d');
            nctx.translate(this.networkCanvas.width / 2, this.networkCanvas.height / 2);
            this.specificCreature.brainNetwork.draw(nctx, 40);

            // Draw the stats
            const width = 650;
            const height = 400;
            this.statsCanvas.width = width;
            this.statsCanvas.height = height;
            const sctx = this.statsCanvas.getContext('2d');
            sctx.lineWidth = 3;

            const statCount = this.specificCreature.brainInputsMem.length;
            for (let i = 0; i < statCount; i ++) {
                const memCount = this.specificCreature.brainInputsMem[i].length;

                sctx.beginPath();
                sctx.moveTo(0, (1 - this.specificCreature.brainInputsMem[i][0]) * height);
                for (let j = 1; j < memCount; j ++) {
                    sctx.lineTo(j * width / Creature.brainInputsMemSize, (1 - this.specificCreature.brainInputsMem[i][j]) * height);
                }
                sctx.stroke();

                // Update the tag positions
                const recentVal = Math.max(Math.min(1 - this.specificCreature.brainInputsMem[i][memCount - 1], 1), 0);
                this.inputTags[i].style['left'] = `${this.statsCanvas.offsetLeft + this.statsCanvas.offsetWidth - this.inputTags[i].clientWidth}px`;
                this.inputTags[i].style['top'] = `${this.statsCanvas.offsetTop + this.statsCanvas.offsetHeight * recentVal - this.inputTags[i].clientHeight / 2}px`;
            }

            // Update the text stats
            const satiety = Math.round(this.specificCreature.satiety * 100) / 100;
            const heartrate = Math.round(this.specificCreature.heartrate * 100) / 100;
            this.textStats.innerText = `satiety: ${satiety}, heartrate: ${heartrate}`;
        }
    }
}

const width = 64;
const height = 64;
const bushChance = 0.05; // 5%
const creatureChance = 0.06; // 6%
const game = new Game(width, height, bushChance, creatureChance);

game.start(document.body);

window['game'] = game; // Allow access to the game variable from the console window