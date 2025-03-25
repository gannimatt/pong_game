# Pong Game

This is a classic Pong game implemented in JavaScript using HTML5 canvas. Two players can control their paddles to hit the ball back and forth. The first player to reach the winning score wins the game.

## Features

- **Two-Player Game:** Control paddles using the keyboard (`W` and `S` for Player 1, Arrow Up and Arrow Down for Player 2).
- **Scoring System:** Tracks each player's score, displaying it at the top of the game screen.
- **Dynamic Speed:** The ball increases in speed with each paddle hit, making the game more challenging over time.
- **Win Condition:** Game checks for a winner once a player reaches the set winning score.

## Setup

To run this game, you'll need to have a local server environment that can serve HTML, CSS, and JavaScript files. Here's how you can set it up and run it:

### Prerequisites

- [Node.js](https://nodejs.org/en/) (if you want to run this on a simple Node.js server)
- NPM (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourgithubusername/ponggame.git
   cd ponggame
2. Open the game:
   You can run a local server, for example with Python:
   bash
   Copy code
   # If you have Python 3.x installed
    python -m http.server
   Alternatively, open the index.html file directly in your browser if it supports local file access.

   ## How to Play

- **Start the game**: Click the 'Start Game' button on the initial screen.
- **Gameplay**: Use 'W' and 'S' keys for Player 1 to move the paddle up and down, respectively. Player 2 uses the Up and Down Arrow keys.
- **Winning the game**: The first player to reach the set score wins.

## Development

This game was developed using plain HTML5, CSS, and JavaScript without any external libraries. The game logic focuses on handling keyboard events for player movement and collision detection for the ball with paddles and walls.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or create issues for bugs and feature suggestions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


### Notes for Customization:

- **Repository URL:**https://github.com/gannimatt/pong_game
