'''#Ex 1 Cats
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Создаем новый класс для сиамской кошки
class Siam(Cat):
    def sing(self, sounds):
        return f'{sounds}'

bengal_cat = Bengal('Nika', 4)
chartreux_cat = Chartreux('Pisch', 3)
siam_cat = Siam('Narrou', 5)

all_cats = Pets([bengal_cat, chartreux_cat, siam_cat])

sara_pets = Pets(all_cats)

sara_pets.animals.walk()
'''
from enum import member
from traceback import print_tb

# Exercise 2 : Dogs
'''
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return print(f'{self.name} is barking')

    def run_speed(self):
        speed = self.weight / self.age * 10
        return speed

    def fight(self, other_dog):
        self_power = (self.weight / self.age * 10) * self.weight
        other_power = (other_dog.weight / other_dog.age * 10) * other_dog.weight
        if self_power > other_power:
            return f'{self.name} wins in the fight'
        elif self_power < other_power:
            return f'{other_dog.name} wins in the fight'
        else:
            return "It's a draw!"


dog1 = Dog('Asan', 5, 20)
dog2 = Dog('Roni', 6, 30)
dog3 = Dog('Rikki', 4, 25)

result = dog1.fight(dog2)
print(result)

result = dog2.fight(dog3)
print(result)

result = dog1.fight(dog3)
print(result)
'''
#Exercise 4 : Family
class Family:
    members = []
    last_name = ''

    def __init__(self, name, age, gender, last_name = 'Lanister'):
        self.name = name
        self.age = age
        self.gender = gender
        self.last_name = last_name

        Family.members.append({"name": self.name, "age": self.age, "gender": self.gender, "last_name": self.last_name})

    def born(self, **kwargs):
        print(f'Congratulations you have + {self.name}')

    def is_18(self):
        if self.age > 18:
            return True
        else:
            return False

    def family_presentation(self):
        for member in members:
            member["last_name"] = last_name
        print({self.last_name})

tirion = Family('Tirion', 40, 'male')
serseya = Family('Serseya', 31, 'femail')
jofry = Family('Jofry', 10, 'male')

print(Family.last_name)

class TheIncredibles(Family):
    def __init__(self, name, age, gender, last_name, power, incredible_name,):
        super().__init__(name, age, gender, last_name)
        self.power = power
        self.incredible_name = incredible_name

    def use_power(self):
        print(self.power)
        try:
            if self.age < 18:
                return True
        except ValueError:
            print('The age is less then 18')

    def incredible_presentation(self):
        print('*Here is our powerful family *')
        print(f"Family last name: {self.last_name}")
        print(Family.members)

bilbo = TheIncredibles('Bilbo', 1, 'male', 'Lanister', 'peace','peaceman')
print(bilbo.born())
print(Family.members)
print(bilbo.incredible_presentation())





