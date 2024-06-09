const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const gameMenu = document.getElementById('gameMenu');
const scoreDisplay = document.getElementById('score');

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 80; // Reduced height of the paddles
let upArrowPressed = false;
let downArrowPressed = false;
let wPressed = false;
let sPressed = false;

let player1Score = 0;
let player2Score = 0;
let player1Name = '';
let player2Name = '';

function Paddle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
}

let player1 = new Paddle(20, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, 'blue');
let player2 = new Paddle(canvas.width - 30, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, 'red');

// Function to update the score display
function updateScore() {
    scoreDisplay.textContent = `${player1Name}: ${player1Score} vs ${player2Score} :${player2Name}`;
}


document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp': upArrowPressed = true; break;
        case 'ArrowDown': downArrowPressed = true; break;
        case 'w': wPressed = true; break;
        case 's': sPressed = true; break;
    }
});

document.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowUp': upArrowPressed = false; break;
        case 'ArrowDown': downArrowPressed = false; break;
        case 'w': wPressed = false; break;
        case 's': sPressed = false; break;
    }
});

function movePaddles() {
    if (wPressed && player1.y > 0) player1.y -= 10;
    if (sPressed && player1.y < canvas.height - player1.height) player1.y += 10;
    if (upArrowPressed && player2.y > 0) player2.y -= 10;
    if (downArrowPressed && player2.y < canvas.height - player2.height) player2.y += 10;
}

function drawPaddle(paddle) {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePaddles();
    drawPaddle(player1);
    drawPaddle(player2);
    requestAnimationFrame(gameLoop);
}

function startGame() {
    player1Name = document.getElementById('player1Name').value || 'Player 1';
    player2Name = document.getElementById('player2Name').value || 'Player 2';
    gameMenu.style.display = 'none';
    canvas.style.display = 'block';
    updateScore();
    gameLoop();
}
