import random

wordslist = ['correction', 'childish', 'beach', 'python', 'assertive', 'interference', 'complete', 'share', 'credit card', 'rush', 'south']
word = list(random.choice(wordslist))
play_word = list('*' * len(word))
print(word)
сhance = 6

hangman = [
    '''
     -----
     |   |
         |
         |
         |
         |
    ========
    ''',
    '''
     -----
     |   |
     O   |
         |
         |
         |
    ========
    ''',
    '''
     -----
     |   |
     O   |
     |   |
         |
         |
    ========
    ''',
    '''
     -----
     |   |
     O   |
    /|   |
         |
         |
    ========
    ''',
    '''
     -----
     |   |
     O   |
    /|\  |
         |
         |
    ========
    ''',
    '''
     -----
     |   |
     O   |
    /|\  |
    /    |
         |
    ========
    ''',
    '''
     -----
     |   |
     O   |
    /|\  |
    / \  |
         |
    ========
    '''
]
for words in play_word:
    print(play_word)
    letter = str(input('Enter the letter: '))
    if letter in word:
        index = word.index(letter) #enumrate()
        play_word[index] = letter
    else:
        print(hangman[1])
        chance -= 1

if chance == 0:
   print(f"You are looser the word was: {word}")

   
print()
print('Congratulations')

print(hangman)