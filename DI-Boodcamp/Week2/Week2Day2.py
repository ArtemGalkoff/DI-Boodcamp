#Exercise 1 : What are you learning ?
'''def display_message():
    print('We are study Python')
display_message()
'''
#Exercise 2: What’s your favorite book ?
'''def favorite_book(little):
    print('My favorite book ' + little)

favorite_book('Animal farm: a fairy story')
'''
# Exercise 3: Some Geography
'''def describe_city(city, country):
    print(city + ' is in ' + country)
describe_city('Pert', 'Australia')
'''

#Exercise 4 : Random
'''import random
def func(number):
    random_number = random.randint(1, 100)
    if number == random_number:
        print( 'These are the same numbers')
    else:
        print('These are not the same numbers:')
        print(number)
        print(random_number)
func(1)
'''
# Exercise 5 : Let’s create some personalized shirts!
'''
def make_shirt(size, text):
    print('The size of the shirt is ' + size + ' the text is ' + text)
make_shirt('XL', '"I love Ruby"')
'''
'''
shirt = lambda: print('The size of the shirt is L, the text is "I love Python"')
shirt()
'''
'''
def make_shirt(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

make_shirt(size="M", text="Let's go Haskell")
'''
#Exercise 6 : Magicians …
'''
magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']
def show_magicians(magicians):
    for wizard in magicians:
        print(wizard)
show_magicians(magician_names)


magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']

def make_great(magicians):
    for wizard in magicians:
        print('Great ' + wizard)
'''
# 7 : Temperature Advice.
'''import random
def get_random_temp():
    return random.randint(-10, 40)

def called_main():
    temp = get_random_temp()
    if temp < 0:
        print(f"The temperature right now: {temp}°C, take a scarf")
    elif 0 <= temp < 16:
        print(f"The temperature right now: {temp}°C, how fresh")
    elif 16 <= temp < 23:
        print(f"The temperature right now: {temp}°C, enjoy the weather!")
    elif 23 <= temp <30:
        print(f"The temperature right now: {temp}°C, take SPF")
    elif 30 <= temp <= 40:
        print(f"The temperature right now: {temp}°C, stay home and drink water!")

called_main()
'''
'''
import random
def get_random_temp(season):
    if season == 'winter':
        return print('temp below zero')
    elif season == 'spring':
        return print('temp between 0 and 10')
    elif season == 'summer':
        return print('temp between 20 and 30')
    elif season == 'autumn':
        return print('temp between 10 and 20')
get_random_temp('spring')
'''

# Exercise 8 : Star Wars Quiz
data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]

def quiz(questions):
    score = 0

    for question in questions:
        print(question["question"])

        user_answer = input("Your answer is: ").strip().lower()

        if user_answer == question["answer"].lower():
            print("Correct answer!")
            score += 1
        else:
            print(f"Wrong answer. True answer: {question['answer']}")

        print()

    print(f"Your score is {score}/{len(questions)}")
    if score < 3:
        print()
        print('Would you like make quiz one time?')


quiz(data)















