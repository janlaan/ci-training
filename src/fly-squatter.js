class Fly {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.timer = 0;
    }
    
    hitTest(x, y) {
        return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
    }
}

function nextFrame(canvas, fly) {
    fly.timer = Math.max(fly.timer - 1, 0);

    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    context.beginPath();
    context.arc(centerX, centerY, 40, 0, 2 * Math.PI, false);
    context.fillStyle = "#F0F3F8";
    context.fillStyle = fly.timer > 0 ? "#DFC101" : "#687483";
    
    context.arc(centerX, centerY, 40, 0, 2 * Math.PI, false);

    context.fill();
    
    window.requestAnimationFrame(() => nextFrame(canvas, fly));
}

function handleClick(canvas, fly, event) {
    const bounds = canvas.getBoundingClientRect();
    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;
    
    if (fly.hitTest(mouseX, mouseY)) {
        fly.timer = 40;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fly = new Fly(canvas.width / 2 - 100, 0.3 * canvas.height);
    
    nextFrame(canvas, fly);
    canvas.addEventListener("click", event => handleClick(canvas, fly, event));
});
