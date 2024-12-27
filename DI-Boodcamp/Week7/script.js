/* //Exercise 1 : List of people
const people = ["Greg", "Mary", "Devon", "James"];
people.shift();
console.log(people);

people.splice(1, 2, 'Jason');
people.push('Artem');
console.log(people.indexOf('Mary'));

let part = people.slice(1, 2);
console.log(part);

console.log(people.indexOf('Foo'));

let last = people[people.length - 1];
console.log(last);

people.forEach(function(i, index) {
    console.log(i); 
});

for (let i = 0; i < people.length; i++) {
    console.log(people[i])};

for (let i = 0; i < people.length; i++) {
    console.log(people[i])};

    for (let i = 0; i < people.length; i++) {
        console.log(people[i]);  
        if (people[i] === "Devon") {
            break;  
        }
    } */

/* //Ex 2
let colors = ['black', 'green', 'indigo', 'blue', 'pink'];

for (let i = 0; i < colors.length; i++) {
    console.log(`My favorite color is ${colors[i]}`);    
    }
 */

//Ex 3
/* let x = prompt('Input number');
x = Number(x);
while (x < 10) {
    if (!isNaN(x)) {
        console.log('nice number');
    } else {
        console.log('it is not number');
        break;  
    }
    x = prompt('Input number');
    x = Number(x); 
} */

/* //Ex4 screw Dan
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

console.log(Object.keys(building.numberOfAptByFloor).length);
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);
console.log(building.nameOfTenants[1], building.numberOfRoomsAndRent.dan[0])

if ((building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1]) > building.numberOfRoomsAndRent.dan[1]) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log(building.numberOfRoomsAndRent.dan[1]); */

/* //Ex5 Familie
let familie = {
    father: 'Andy',
    mother: 'Bill',
    dother: 'Kristina'
}

for (let key in familie) {
    console.log(key + ": " + familie[key]);
} */

/* //Ex6 Rudolf
const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
  }

let sentence = '';

for (let key in details) {
  sentence += key + ' ' + details[key] + ' ';
}

sentence = sentence.trim();

console.log(sentence);  */

/* //Ex7 Secret Group
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
let abc = '';

for (let i = 0; i < names.length; i++) {
  abc += names[i][0];  
}

console.log(abc); */