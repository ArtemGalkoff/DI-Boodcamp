import math
class Circle:
    p = 3.14

    def __init__(self, radius):
        self.radius = radius

    def square(self):
        return self.p * self.radius ** 2

    def peremeter(self):
        return 2 * self.p * self.radius

    def diameter(self):
        return 2 * self.radius

    def __str__(self):
        return f"Circle radius is: {self.radius} and P value is: {self.p}"

    def __repr__(self):
        return f"Circle(radius={self.radius})"

    def __add__(self, other):
        total_area = self.square() + other.square()
        new_radius = math.sqrt(total_area / self.p) 
        new_circle = Circle(new_radius)
        print(f"New circle radius: {new_circle.radius:.2f}")
        return new_circle

    def __eq__(self, other):
        if isinstance(other, Circle):
            return self.radius == other.radius
        return False

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.radius < other.radius
        return False


c1 = Circle(5)
c2 = Circle(8)
c3 = Circle(3)
c4 = Circle(6)
'''
print(c1.square())
print(c1.__repr__())
print(c1.__str__())
print(c1.__add__(c2))
print(c1.__eq__(c2))
'''
circles = [c1, c2, c3, c4]
sorted_circles = sorted(circles)
print(sorted_circles)