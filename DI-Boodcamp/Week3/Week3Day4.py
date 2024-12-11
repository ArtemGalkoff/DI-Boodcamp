'''class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        print(f'{self.amount} {self.currency}s')

    def __int__(self):
        return self.amount

    def __repr__(self):
        return f"{self.amount} {self.currency}"

    def __add__(self, other):
        if {self.currency} != other.currency:
            raise ValueError("Cannot add different currencies")

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        elif isinstance(other, int):
            self.amount += other
        else:
            raise TypeError("Unsupported addition type")
        return self


c1 = Currency('dollar', 5)
c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)
c4 = Currency('shekel', 10)

print(c1.__str__())
print(c1.__int__())
print(repr(c1))
print(c1.__add__(c3))
'''
'''
#Exercise 3: String module
import random
import string

random_string = ''.join(random.choices(string.ascii_letters, k=5))

print(random_string)
'''
'''
#Ex 4 Current Date
import datetime

clock = datetime.datetime.now()

print("Actually time is:", clock)
'''
'''
#Exercise 5 : Amount of time left until January 1st
import datetime
def time_until_NY():
    now = datetime.datetime.now()

    next_year = now.year + 1
    new_year = datetime.datetime(next_year, 1, 1)

    time_left = new_year - now

    days_left = time_left.days
    hours_left, remainder = divmod(time_left.seconds, 3600)
    minutes_left, seconds_left = divmod(remainder, 60)

    print(f"The 1 of January is in {days_left} days, {hours_left} hours, {minutes_left} minutes, {seconds_left} seconds.")

time_until_NY()
'''
'''
#Exercise 6 : Birthday and minutes

import datetime

def minutes_of_life(birthday_str):
    format_of_date = "%Y-%m-%d"
    birth_date = datetime.datetime.strptime(birthday_str, format_of_date)

    current_date = datetime.datetime.now()
    time_difference = current_date - birth_date
    minutes_lived = time_difference.total_seconds() / 60

    print(f"You are have been living for {int(minutes_lived)} minutes.")

birthday_str = input('Input you birthday: ')
minutes_of_life(birthday_str)
'''
# Ex 7  Faker Module
from faker import Faker

fake = Faker()

users = []
def plus_user():

    new_user = {'name': fake.name(), 'address': fake.address(), 'language_code': fake.country()}
    users.append(new_user)

plus_user()
plus_user()
plus_user()
plus_user()

print(users)
































































