from flask import Flask, request, jsonify, render_template
import atexit
from db.mongodb import store_game_result, dump_data_to_file

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Serve HTML from templates directory

@app.route('/api/games/save', methods=['POST'])
def save_game():
    data = request.json
    store_game_result(data['player1Name'], data['player2Name'], data['player1Score'],
                      data['player2Score'], data['winningScore'], data['winner'])
    return jsonify({'status': 'success'}), 201
    dump_data_to_file()

if __name__ == '__main__':
    app.run(debug=True)
