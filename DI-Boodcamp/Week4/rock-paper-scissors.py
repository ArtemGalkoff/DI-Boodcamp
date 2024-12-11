import game


def get_user_menu_choice():
    print("\nMenu:")
    print("1. Do you want play new game?")
    print("2. Show score and exit")
    choice = input("Chose variant: ")
    return int(choice)

def print_results():
    print('Good game, your score is:')
    game.Game.print_score()



def main():
    while True:
        x = get_user_menu_choice()
        if x == 1:
            y = game.Game.get_user_item()
            z = game.Game.get_computer_item()
            result = game.Game.get_game_result(y, z)
            print(result)
        elif x == 2:
            print_results()
            break
        else:
            print('Invalid option')



if __name__ == "__main__":
    main()