/* // EX 1
// I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)

//Ex2
function displayStudentInfo({ first, last }) {
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({ first: 'Elie', last: 'Schoppik' }));

//Ex3
const users = { user1: 18273, user2: 92833, user3: 90315 };

for (let [key, value] of Object.entries(users)) {
    console.log(`${key}: ${value * 2}`);
  }

//Ex4
class Dog {
    constructor(name) {
      this.name = name;
    }
  };

class Labrador extends Dog {
    constructor(name, size) {
      super(name);
      this.size = size;
    }
  };

//Ex 5
[2] === [2] 
{} === {}
//everything will be false because the objects contain a reference and are considered different objects in memory  */

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Mammal extends Animal {
    constructor(name, type, color, sound) {
        super(name, type, color); 
        this.sound = sound; 
    }

    makeSound() {
        return `It is ${this.name}, he is a ${this.type}, his color is ${this.color} and it makes ${this.sound}`;
    }
}

const cow = new Mammal('Milka', 'cow', 'grey', 'myyy');
console.log(cow.makeSound()); 
