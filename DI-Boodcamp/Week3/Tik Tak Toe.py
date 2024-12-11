board = list(range(1, 10))

def display_board(board):
    print("-" * 13)
    for i in range(3):
        print("|", board[0 + i * 3], "|", board[1 + i * 3], "|", board[2 + i * 3], "|")
        print("-" * 13)


def take_input(pick):
    valid = False
    while not valid:
        player_answer = input("Where put " + pick + "? ")
        try:
            player_answer = int(player_answer)
        except ValueError:
            print("Incorrect input?")
            continue
        if 1 <= player_answer <= 9:
            if str(board[player_answer - 1]) not in "XO":
                board[player_answer - 1] = pick
                valid = True
            else:
                print("it's busy")
        else:
            print("Input number from 1 till 9.")


def check_win(board):
    win_combo = ((0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6))
    for each in win_combo:
        if board[each[0]] == board[each[1]] == board[each[2]]:
            return board[each[0]]
    return False


def main(board):
    counter = 0
    win = False
    while not win:
        display_board(board)
        if counter % 2 == 0:
            take_input("X")
        else:
            take_input("O")
        counter += 1

        tmp = check_win(board)
        if tmp:
            print(tmp, "Win!")
            win = True
            break
        if counter == 9:
            print("Draw!")
            break
    display_board(board)


main(board)

input(" Enter for exit!")