class Neuron {
    value;
    bias;
    axons;

    constructor(value, bias, axons) {
        this.value = value;
        this.bias = Math.min(Math.max(bias, -3), 3); // Clamp [-3, 3]
        this.axons = axons;
    }

    copy() {
        const value = this.value;
        const bias = this.bias;
        const axons = this.axons.map(axon => axon.copy());

        return new Neuron(value, bias, axons);
    }

    createMutations() {
        var result = [];

        // Bias
        result.push(() => this.bias += Math.random() * 0.2 - 0.1);
        // Axons
        this.axons.forEach(axon => result.push(...axon.createMutations()));

        return result;
    }

    addRandomAxon() {
        this.axons.push(Axon.newRandom());
    }

    static newRandom(axonCount) {
        const value = 0;
        const bias = Math.pow(Math.random() * 2 - 1, 3);
        const axons = Array.from(new Array(axonCount), () => Axon.newRandom());
        return new Neuron(value, bias, axons);
    }

    set(value) {
        this.value = value + this.bias;
    }

    activate(input) {
        const value = input + this.bias;
        this.value = Math.max(0.1 * value, value); // Leaky ReLU: activation function
    }

    getValue(axonIndex) {
        if (!this.value) {
            console.log(this);
        }
        return this.value * this.axons[axonIndex].value;
    }

    getColor() {
        const val = this.value;
        if (val >= 0) {
            return `rgb(0, ${val * 256}, 0)`;
        }
        return `rgb(${-val * 256}, 0, 0)`;
    }
}

class Axon {
    value;

    constructor(value) {
        this.value = Math.min(Math.max(value, -5), 5); // Clamp [-5, 5]
    }

    copy() {
        const value = this.value;

        return new Axon(value);
    }

    createMutations() {
        var result = [];

        // Value
        result.push(() => this.value += Math.random() * 0.4 - 0.2);

        return result;
    }

    getColor() {
        const val = Math.tanh(this.value);
        if (val > 0) {
            return `rgb(0, ${val * 256}, 0)`;
        }
        return `rgb(${-val * 256}, 0, 0)`;
    }

    static newRandom() {
        const value = Math.pow(Math.random() * 2 - 1, 3) * 4;
        return new Axon(value);
    }
}

export class Network {
    neurons;

    width;
    height;
    constructor(neurons) {
        this.neurons = neurons;

        this.width = this.neurons.length;
        for (let l = 0; l < this.neurons.length; l++) {
            this.height = Math.max(this.height || 0, this.neurons[l].length);
        }
    }

    copy() {
        const neurons = this.neurons.map(neuronLayer => neuronLayer.map(neuron => neuron.copy()));

        return new Network(neurons);
    }

    createMutations() {
        var result = [];

        // Neurons
        const neurons = this.neurons.map(neuronLayer => neuronLayer.map(neuron => result.push(...neuron.createMutations())));

        // // Mutation: Add a hidden layer neuron
        // for (let i = 1; i < this.neurons.length - 1; i ++) {
        //     result.push(() => {
        //         this.addRandomNeuron(i);
        //     });
        // }

        return result;
    }

    addRandomNeuron(layerIndex) {
        if (layerIndex > 0) {
            // Add axons from the previous layer's neurons
            this.neurons[layerIndex - 1].forEach(neuron => neuron.addRandomAxon())
        }

        // Add the neuron
        var nextAxonCount = 0;
        if (layerIndex + 1 < this.neurons.length) {
            nextAxonCount = this.neurons[layerIndex + 1];
        }
        this.neurons[layerIndex].push(Neuron.newRandom(nextAxonCount))
    }

    static newRandom(layerSizes) {
        // Generate the neurons, as well as their axons and biases
        const neurons = new Array(layerSizes.length);
        for (let l = 0; l < layerSizes.length; l++) {
            neurons[l] = new Array(layerSizes[l]);
            for (let n = 0; n < layerSizes[l]; n++) {
                neurons[l][n] = Neuron.newRandom(layerSizes[l + 1] || 0);
            }
        }

        return new Network(neurons);
    }

    compute(inputs) {
        // Handle the input layer
        for (let n = 0; n < this.neurons[0].length; n++) {
            this.neurons[0][n].set(inputs[n]);
        }

        // Handle activation
        for (let l = 1; l < this.neurons.length; l++) {
            for (let n = 0; n < this.neurons[l].length; n++) {
                var value = 0;
                // Calculate the sum
                for (let m = 0; m < this.neurons[l - 1].length; m++) {
                    value += this.neurons[l - 1][m].getValue(n);
                }
                this.neurons[l][n].activate(value);
            }
        }

        // Handle the output
        const output = this.neurons[this.neurons.length - 1].map(neuron => clamp(neuron.value, 0, 1));
        return output;
    }

    draw(ctx, size) {
        ctx.save();
        const seperation = size * 2;
        const neuronSize = size;
        const width = (this.width - 1) * seperation;
        const height = (this.height - 1) * neuronSize;
        ctx.translate(-width / 2, -height / 2);
        ctx.lineWidth = 2;
        // Draw the axons
        for (let l = 0; l < this.neurons.length; l++) {
            for (let n = 0; n < this.neurons[l].length; n++) {
                for (let m = 0; m < this.neurons[l][n].axons.length; m++) {
                    const sx = l * seperation;
                    const sy = n * neuronSize;
                    const ex = (l + 1) * seperation;
                    const ey = m * neuronSize;
                    ctx.strokeStyle = this.neurons[l][n].axons[m].getColor();
                    ctx.beginPath();
                    ctx.moveTo(sx, sy);
                    ctx.lineTo(ex, ey);
                    ctx.stroke();
                }
            }
        }
        // Draw the neurons
        ctx.strokeStyle = 'black';
        for (let l = 0; l < this.neurons.length; l++) {
            for (let n = 0; n < this.neurons[l].length; n++) {
                const x = l * seperation;
                const y = n * neuronSize;
                ctx.fillStyle = this.neurons[l][n].getColor();
                ctx.beginPath();
                ctx.arc(x, y, neuronSize / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.font = `${neuronSize * 0.8}px monospace`;
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'white'
        for (let n = 0; n < this.neurons[0].length; n++) {
            const y = (n + 0.2) * neuronSize;
            ctx.strokeText(`${n}`, 0, y);
            ctx.fillText(`${n}`, 0, y);
        }

        ctx.restore();
    }
}

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

// const net = Network.BuildRandom([3, 4, 3, 2]);
// console.log(net);
// console.log(net.compute([0.9, 0.1, -0.7]));

// net.draw(document.getElementById('board').getContext('2d'));