let canvas = document.getElementById('pongCanvas');
let ctx = canvas.getContext('2d');
let gameMenu = document.getElementById('gameMenu');
let scoreDisplay = document.getElementById('score');

let paddleWidth = 10, paddleHeight = 80;
let upArrowPressed = false, downArrowPressed = false, wPressed = false, sPressed = false;
let player1Score = 0, player2Score = 0;
let winningScore = 15;  // Default winning score
let player1Name = '', player2Name = '';
let gameRunning = false;  // Track whether the game is running

// Paddle constructor
function Paddle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.move = function(keyPress) {
        const step = 10;
        if (keyPress === 'up' && this.y > 0) this.y -= step;
        if (keyPress === 'down' && (this.y + this.height) < canvas.height) this.y += step;
    };
}

// Ball constructor
function Ball(x, y, radius, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.initialSpeed = speed;
    this.speed = speed;
    this.velocityX = speed;
    this.velocityY = speed / 2;
    this.color = color;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.update = function(paddles) {
        if (!gameRunning) return;  // Prevent updates if the game is not running

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Collision with top or bottom of canvas
        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
            this.velocityY = -this.velocityY;
        }

        // Determine player and direction
        let player = (this.x < canvas.width / 2) ? paddles[0] : paddles[1];
        let direction = (this.x < canvas.width / 2) ? 1 : -1;

        // Check for paddle collision
        if (collisionDetect(player, this)) {
            let collidePoint = this.y - (player.y + player.height / 2);
            collidePoint /= player.height / 2;
            let angleRad = (Math.PI / 4) * collidePoint;

            this.velocityX = direction * Math.cos(angleRad) * this.speed;
            this.velocityY = Math.sin(angleRad) * this.speed;
            this.speed *= 1.05; // Increase speed by 5%
        }

        // Check for scoring
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            if (this.x - this.radius <= 0) {
                player2Score++;
            } else {
                player1Score++;
            }
            this.reset();
            checkForWinner();  // Check for a winner after resetting the ball
        }
    };

    this.reset = function() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speed = this.initialSpeed; // Reset speed to initial speed
        this.velocityX = this.initialSpeed * (Math.random() > 0.5 ? 1 : -1);
        this.velocityY = (Math.random() > 0.5 ? 1 : -1) * this.initialSpeed / 2;
    };
}

// Helper function for collision detection
function collisionDetect(paddle, ball) {
    return ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width &&
           ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height;
}

// Initialize paddles and ball
let paddles = [
    new Paddle(20, (canvas.height / 2) - (paddleHeight / 2), paddleWidth, paddleHeight, 'blue'),
    new Paddle(canvas.width - 30, (canvas.height / 2) - (paddleHeight / 2), paddleWidth, paddleHeight, 'red')
];
let ball = new Ball(canvas.width / 2, canvas.height / 2, 7, 4.5, 'white'); // Moderate initial speed


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

function startGame() {
    // Fetch player names and winning score from input fields
    player1Name = document.getElementById('player1Name').value || 'Player 1';
    player2Name = document.getElementById('player2Name').value || 'Player 2';
    winningScore = parseInt(document.getElementById('winningScore').value, 10) || 15;

    // Hide the game menu and show the canvas
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('pongCanvas').style.display = 'block';

    // Reset scores
    player1Score = 0;
    player2Score = 0;
    gameRunning = true;  // Start the game

    // Possibly reset other game states and start the animation loop
    ball.reset();
    updateScore();
    requestAnimationFrame(gameLoop);
}

function updateScore() {
    scoreDisplay.textContent = `${player1Name}: ${player1Score} vs ${player2Score} : ${player2Name}`;
}

function checkForWinner() {
    if (player1Score >= winningScore) {
        alert(`${player1Name} wins!`);
        gameRunning = false;
        resetGame();
    } else if (player2Score >= winningScore) {
        alert(`${player2Name} wins!`);
        gameRunning = false;
        resetGame();
    }
}

function resetGame() {
    gameRunning = false;  // Stop the game loop
    document.getElementById('gameMenu').style.display = 'block';
    document.getElementById('pongCanvas').style.display = 'none';
    scoreDisplay.textContent = '';
}

function gameLoop() {
    if (!gameRunning) return;  // Stop the loop if the game is not running

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddles.forEach(paddle => paddle.draw());
    ball.draw();
    ball.update(paddles);
    if (wPressed) paddles[0].move('up');
    if (sPressed) paddles[0].move('down');
    if (upArrowPressed) paddles[1].move('up');
    if (downArrowPressed) paddles[1].move('down');
    updateScore();
    requestAnimationFrame(gameLoop);
}
