import sys
import unittest
from unittest.mock import patch, MagicMock, mock_open
from flask import json
sys.path.append('..')
from app import app

class TestFlaskAndMongoDB(unittest.TestCase):
    def setUp(self):
        # Set up Flask app for testing
        app.testing = True
        self.client = app.test_client()

        # Patch MongoDB client to avoid real database interaction
        self.patcher = patch('db.mongodb.MongoClient')
        self.MockClient = self.patcher.start()

        # Set up mock database and collection
        self.mock_db = MagicMock()
        self.MockClient.return_value.__getitem__.return_value = self.mock_db
        self.mock_collection = self.mock_db.game_sessions

    def tearDown(self):
        self.patcher.stop()

    def test_home_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    @patch('app.store_game_result')
    def test_save_game(self, mock_store_game_result):
        test_data = {
            'player1Name': 'Alice', 'player2Name': 'Bob',
            'player1Score': 10, 'player2Score': 8,
            'winningScore': 10, 'winner': 'Alice'
        }
        response = self.client.post('/api/games/save', data=json.dumps(test_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        mock_store_game_result.assert_called_once_with('Alice', 'Bob', 10, 8, 10, 'Alice')

        # Make sure to check that dump_data_to_file is also called if it's supposed to happen here.

    @patch('builtins.open', new_callable=mock_open, read_data='{"test": "data"}')
    @patch('db.mongodb.json.load')
    def test_read_data_from_file(self, mock_json_load, mock_file):
        mock_json_load.return_value = {'test': 'data'}
        from db.mongodb import read_data_from_file
        result = read_data_from_file('dummy_path')
        self.assertEqual(result, {'test': 'data'})

    @patch('builtins.open', new_callable=mock_open)
    @patch('db.mongodb.json.dump')
    def test_write_data_to_file(self, mock_json_dump, mock_file):
        from db.mongodb import write_data_to_file
        write_data_to_file({'test': 'data'}, 'dummy_path')
        mock_json_dump.assert_called_once()


if __name__ == '__main__':
    unittest.main()
