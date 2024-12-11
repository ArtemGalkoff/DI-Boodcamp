'''#ex1 Cats
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("Basya", 16)
cat2 = Cat("Motya", 11)
cat3 = Cat("Musya", 6)

cats = [cat1, cat2, cat3]

def find_oldest_cat(cats):
    oldest_cat = cats[0]
    for cat in cats:
        if cat.age > oldest_cat.age:
            oldest_cat = cat
    return oldest_cat

oldest_cat = find_oldest_cat(cats)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")
'''
from tkinter.font import names

'''
#EX 2 Dogs
class Dog:
      def __init__(self, name, height):
        self.name = name
        self.height = height

      def bark(self):
        print(f'{self.name} goes woof!')

      def jump(self):
        print(f'{self.name} jumps {self.height*2} cm high!.')

davids_dog = Dog('Rex', 50)
davids_dog.bark()
davids_dog.jump()

print(f"Dog's name: {davids_dog.name}")
print(f"Dog's height: {davids_dog.height} cm")

sarah_dog = Dog('Teacup', 20)
print(f'The name is {sarah_dog.name}')
print(f'The height is {sarah_dog.height}')
sarah_dog.bark()
sarah_dog.jump()

if sarah_dog.height > davids_dog.height:
    print({sarah_dog.name})
else:
    print({davids_dog.name})
'''

#Exercise 3 : Who’s the song producer?
'''
class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_song(self):
        for line in self.lyrics:
            print(line)

stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])

stairway.sing_song()
'''

#Exercise 4 : Afternoon at the Zoo
'''
class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
        else:
            print(f'{new_animal} is already in the list.')

    def get_animals(self):
        for animal in self.animals:
            print(animal)

    def self_animal(self,animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
        else:
            print(f'There is no {animal_sold} in the list.')

    def sort_animals(self):
        self.animals.sort()
        grouped_animals = {}

        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in grouped_animals:
                grouped_animals[first_letter] = []
            grouped_animals[first_letter].append(animal)

        self.grouped_animals = grouped_animals
        print("Animals have been sorted and grouped.")

    def get_groups(self):

        if hasattr(self, 'grouped_animals') and self.grouped_animals:
            print("Animals grouped by their first letter:")
            for letter, animals in self.grouped_animals.items():
                print(f"{letter}: {', '.join(animals)}")
        else:
            print("No groups. Please sort the animals at first.")

ramat_gan_safari = Zoo("Ramat Gan Safari")
ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Piton")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.add_animal("Caguar")
ramat_gan_safari.add_animal("Bear")


ramat_gan_safari.get_animals()

ramat_gan_safari.self_animal("Caguar")

ramat_gan_safari.get_animals()

ramat_gan_safari.sort_animals()
ramat_gan_safari.get_groups()
'''




