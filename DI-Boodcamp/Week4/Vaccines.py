class Human:
    def __init__(self,id_number, name, age, priority, blood_type):
        self.id_number = id_number
        self.name = name
        self.age = age
        self.priority = priority # bool
        self.blood_type = blood_type # ['A', 'B', 'AB', 'O']
        self.family = []

    def add_family_member(self, person):
        if isinstance(person, Human):
            if person not in self.family:
                self.family.append(person)
            if self not in person.family:
                person.family.append(self)
        else:
            print(f"{person} is not a valid person")

class Queue:
    def __init__(self):
        self.humans = []

    def add_person(self, person):
        if isinstance(person, Human):
            if person.age > 60 or person.priority:
                self.humans.insert(0, person)
            else:
                self.humans.append(person)
        else:
            print("It is not human")

    def find_in_queue(self, person):
        if isinstance(person, Human):
            try:
                return self.humans.index(person)
            except ValueError:
                return print('This person is not in Queue')

    def swap(self, person1, person2):
        if person1 in self.humans and person2 in self.humans:
            if person1 == person2:
                print("Cannot swap the same person.")
                return
            index1 = self.humans.index(person1)
            index2 = self.humans.index(person2)
            self.humans[index1], self.humans[index2] = self.humans[index2], self.humans[index1]
        else:
            print("One or both persons are not in the queue.")

    def get_next(self):
        if len(self.humans) > 0:
            first = self.humans[0]
            self.humans.pop(0)
            print(f"{first.name} was deleted from queue")
            return first
        else:
            print("Queue is empty")
            return None

    def get_next_blood_type(self, blood_type):
        if len(self.humans) > 0:
            for i in self.humans:
                if i.blood_type == blood_type:
                    self.humans.remove(i)
                    return i
            print('Person with this blood type is absent in the queue')
        else:
            print("Queue is empty")
            return None

    def sort_by_age(self):
        self.humans.sort(key=lambda person: (not person.priority, person.age <= 60))

    def rearrange_queue(self):
        if len(self.humans) < 2:
            return

        new_queue = [self.humans[0]]

        for person in self.humans[1:]:
            for i in range(len(new_queue)):
                if person not in new_queue[i].family:
                    new_queue.insert(i + 1, person)  # Insert after position i
                    break
            else:
                new_queue.append(person)

        self.humans = new_queue

