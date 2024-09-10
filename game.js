const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundMusic = document.getElementById('backgroundMusic');
const startButton = document.getElementById('startButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startGame() {
    // Hide the start button
    startButton.style.display = 'none';

    // Start the background music
    backgroundMusic.play().catch(error => {
        console.error('Music playback failed:', error);
    });

    // Start the game loop
    gameLoop();
}

startButton.addEventListener('click', startGame);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 200, 200);

    requestAnimationFrame(gameLoop);
}
