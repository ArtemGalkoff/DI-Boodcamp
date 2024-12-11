#Ex1 Print the following output in one line of code:
for _ in range(5): print("Hello, world! ",end="")

#Ex2 Write code that calculates the result of: (99^3)*8 (meaning 99 to the power of 3, times 8).
print((99 ** 3) * 8) # 1
print(pow(99, 3) * 8) # 2

#Ex4 Your computer brand
computer_brand = 'Parsytec'
print(f'I have a {computer_brand} computer')

#Ex 5 Your information
name = 'Artem'
age = "31"
shoe_size = "42"
info = "My mother named me " +  name + " and didn't know that in age " + age + " my shoe size would be " + shoe_size
print(info)

#Ex 6 A & B
if (a:=5) > (b:=2):
    print('Hello, World')

#Exercise 7 : Odd or Even

number = int(input('Input number: '))
print('odd' if number % 2 == 0 else 'even')

#Exercise 8 : What’s your name ?
my_name = "Artem"
user_name = input("Enter your name: ")
if my_name == user_name:
    print("Let's take out a loan in my name?")
else:
    print("What a boring name...")

#Ex9 Tall enough to ride a roller coaster Instructions
height = int(input('What is your height: '))
if height > 145:
    print('You are tall enough to ride')
elif height <= 145:
    print("You need to grow some more to ride")