from flask import Blueprint, request, jsonify
from card_deck import CardDeck

draw = Blueprint('draw', __name__)

@draw.route('/draw', methods=['POST'])
def draw():
    deck = CardDeck()
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
