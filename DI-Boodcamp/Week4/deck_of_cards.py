import itertools
import random
import time

class Card:

    suits = ['♠', '♥', '♣', '♦']
    values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

class Deck:

    def __init__(self):
        self.deck = [Card(suit, value) for suit in Card.suits for value in Card.values]

    def shuffle(self):
        if len(self.deck) == 52:
            random.shuffle(self.deck)

    def deal(self):
        if len(self.deck) > 0:
            random_card = self.deck.pop() 
            print(f"card: {random_card.value}{random_card.suit}")
        else:
            print("Deck is empty!")

    def deal_all(self):
        while len(self.deck) > 0:
            self.deal()
            time.sleep(1)

deck = Deck()
deck.shuffle()
deck.deal_all()


