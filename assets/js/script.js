const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = +896;
const CANVAS_HEIGHT = canvas.height = 419;
let gameSpeed = 1.5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'assets/images/layer-1.jpg';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'assets/images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'assets/images/layer-3.png';

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 4096;
        this.height = 400;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;

    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.5);
const layer2=  new Layer(backgroundLayer2, 1);
const layer3 = new Layer(backgroundLayer3, 1.4);

const gameObjects = [layer1, layer2, layer3];


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};
animate();