
# Exercise 1 : Favorite Numbers
'''my_fav_numbers = {8, 16, 48}

my_fav_numbers.add(32)
my_fav_numbers.add(91)
# my_fav_numbers.update(32, 91)
my_fav_numbers.remove(91)
print(my_fav_numbers)

friend_fav_numbers = {3, 13, 66}

our_fav_numbers = my_fav_numbers | friend_fav_numbers
print(our_fav_numbers)

# Exercise 2: Tuple
#Tuples are unchangeable, meaning that you cannot change, add, or remove items once the tuple is created

# Exercise 3: List
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
#basket.remove("Banana")
basket.pop(0)
basket.pop(2)
basket.append('Kiwi')
basket.insert(0, 'Apples')
print(basket.count('Apples'))
basket.clear()
print(basket)
'''

#Exercise 4: Floats
'''my_list = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]  #1st way

my_list1 = [1.5, 2, 2.5, 3]                 #2nd way
my_list = my_list1 + my_list2

my_tuple = (1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5)  #3d way
my_list = list(my_tuple)
print(my_list)'''

#Exercise 5: For Loop
'''for i in range(1, 20):
    print(i)
'''
'''for n in range(0, 20, 2): #1st way
    print(n, end=" ")
'''
'''for i in range(1, 20):       #2nd way
    if i % 2 == 0:
        print(i)
'''

'''for i in range(0, 21)[::2]:     #3d way
    print(i)
'''
'''numbers = range(1, 21)
even_numbers = filter(lambda x: x % 2 == 0, numbers)    #4d way
for number in even_numbers:
    print(number)
'''
'''my_name = "artem"
while True:
    username = input("What is your name? ")

    if username == my_name:
        print("Good name, artem")
        break
    else:
        print("That's not my name, try again.")
'''
'''#Exercise 7: Favorite fruits
fruits = list(str(input('Input your favorite fruits with a single space: ')))
lovefruit = input('input a name of any fruit: ')
if lovefruit in fruits:
    print('You chose one of your favorite fruits! Enjoy')
else:
    print('You chose a new fruit. I hope you enjoy')
'''
'''
#Exercise 8: Who ordered a pizza ?
toppings = []
base_price = 10
topping_price = 2.5

while True:
    topping = input("Enter a pizza topping (or pass 'quit' to stop): ")

    if topping.lower() == 'quit':
        break

    toppings.append(topping)

    print(f"Adding {topping} to your pizza.")

total_price = base_price + len(toppings) * topping_price

print("\nYour pizza will have the following toppings:")
for topping in toppings:
    print(f"- {topping}")

print(f"\nTotal price: ${total_price:.2f}")
'''

#Exercise 9: Cinemax
'''
total_cost = 0
tickets = []

while True:
    age = input("Enter the family member's age: ")

    if age == 'done':
        break
    else:
        age = int(age)

    if age > 12:
        total_cost += 15
        tickets.append(15)
    elif 3 < age <= 12:
        total_cost += 10
        tickets.append(10)
    else:
        total_cost += 0
        tickets.append(0)
print(tickets, total_cost)

teenagers = ["Yarri", "Ivan", "Camal", "Naruto", "Anvar"]
allowed_teenagers = []

for teen in teenagers:

    age = int(input(f"Enter {teen}'s age: "))
    if age > 16:
        allowed_teenagers.append(teen)

print("The final list of teenagers allowed to watch the movie:")
print(allowed_teenagers)
'''
#Exercise 10 : Sandwich Orders
'''
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while 'Pastrami sandwich' in sandwich_orders:
        sandwich_orders.remove('Pastrami sandwich')

finished_sandwiches = []
for sandwich in sandwich_orders:
    print(sandwich)
    finished_sandwiches.append(sandwich)
    sandwich_orders.remove(sandwich)

print(f"I made your {sandwich}")
'''
