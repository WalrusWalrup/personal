const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Example: Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 200, 200);

    requestAnimationFrame(gameLoop);
}

gameLoop();
