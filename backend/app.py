from flask import Flask, request, jsonify
from flask_cors import CORS
from card_deck import CardDeck
import numpy as np
import pandas as pd

app = Flask(__name__)
deck = CardDeck()
CORS(app)

# Dummy database for storing user information
users = []

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Dummy login logic (replace with actual authentication logic)
    for user in users:
        if user['username'] == username and user['password'] == password:
            return jsonify({'message': 'Login successful', 'user': user}), 200

    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    # Check if passwords match
    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400

    # Dummy registration logic (replace with actual registration logic)
    for user in users:
        if user['username'] == username:
            return jsonify({'message': 'Username already exists'}), 400

    # Create new user
    new_user = {'username': username, 'email': email, 'password': password}
    users.append(new_user)

    return jsonify({'message': 'Registration successful', 'user': new_user}), 201

@app.route('/draw', methods=['POST'])
def draw():
    deck.reset_deck()
    num_draws = int(request.json['num_draws'])

    if num_draws <= 0:
        return jsonify({"error": "Please enter a positive integer greater than 0."}), 400
    if num_draws > 52:
        return jsonify({"error": "You can only draw up to 52 cards from the deck."}), 400

    drawn_cards_info = []

    for _ in range(num_draws):
        drawn_card = deck.draw_card()

        if drawn_card is not None:
            card_name = f"{drawn_card[0]} of {drawn_card[1]}"
            unique_probability = deck.calculate_unique_probability(card_name)
            dependent_probability = deck.calculate_dependent_probability(card_name)
            color_probability = deck.calculate_color_probability(card_name)
            suit_probability = deck.calculate_suit_probability(card_name)

            drawn_cards_info.append({
                'drawn_card': card_name,
                'unique_probability': unique_probability,
                'dependent_probability': dependent_probability,
                'color_probability': color_probability,
                'suit_probability': suit_probability
            })

            deck.update_deck(drawn_card)
        else:
            print("Error: No card was drawn.")

    return jsonify({"drawn_cards_info": drawn_cards_info}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
