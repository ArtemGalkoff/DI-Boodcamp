import random
from Week3Day2 import Dog


class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        dog_names = [dog.name for dog in args]
        all_dogs = ", ".join(dog_names)
        print(f"{self.name} and {all_dogs} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained tricks.")

dog4 = PetDog('Vaffi',10, 30)
dog5 = PetDog('Biba', 16, 10)

dog4.train()
dog4.do_a_trick()

dog4.play(dog5)