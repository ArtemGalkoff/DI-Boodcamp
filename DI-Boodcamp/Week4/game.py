import random
score = {'Win': 0, 'Lose': 0, 'Draw': 0}

class Game:

    @staticmethod
    def get_user_item():
        user_item = input(str('Chose rock(R), paper(P),scissors(S): ')).upper()
            #exeption
        return user_item

    @staticmethod
    def get_computer_item():
        computer_item = random.choice(('R', 'P','S'))
        print(f'Computer choose {computer_item}')
        return computer_item

    @staticmethod
    def get_game_result(user_item, computer_item):
        winning_combinations = {
            "R": "S",
            "S": "P",
            "P": "R"
        }

        losing_combinations = {
            "S": "R",
            "P": "S",
            "R": "P"
        }

        print(f"Before result - Score: {score}")

        if computer_item == user_item:
            score['Draw'] += 1
            return 'Draw'

        if winning_combinations.get(user_item) == computer_item:
            score['Win'] += 1
            return 'Player wins'

        if losing_combinations.get(user_item) == computer_item:
            score['Lose'] += 1
            return 'Computer wins'

    @staticmethod
    def print_score():
        print(f"Score: Wins: {score['Win']}, Losses: {score['Lose']}, Draws: {score['Draw']}")


