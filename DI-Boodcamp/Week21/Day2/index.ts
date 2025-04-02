// ex 1
const smallTalk: string = 'Hello world';

const greeting = (): string => smallTalk;

console.log(greeting());


//ex 2

let age: number = 32;  
let mame: string = 'Artem';  

console.log(age, mame);

// ex3

let id: string | number;  

id = 42;  
console.log(id);  

id = "Hello";  
console.log(id)

//ex4
function checkNumber(n: number): string {
    if (n > 0) {
        return `${n} is positive`;
    } else if (n < 0) {
        return `${n} is negative`;
    } else {
        return `${n} is zero`;
    }
}

//ex5
function getDetails(name: string, age: number): [string, number, string] {
    const greeting = `Hello, ${name}, you are ${age} years old.`;
    return [name, age, greeting];
}

const details = getDetails("Alice", 25);
console.log(details);

//ex6
type Person = {
    name: string;
    age: number;
};

function createPerson(obj: Person) {
    return obj
}

const Vanya = {
    name: 'Vanya',
    age: 91
}
console.log(createPerson(Vanya));

//ex7
const inputElement = document.getElementById('nameInput') as HTMLInputElement; 

if (inputElement) {
 
    inputElement.value = "John Doe";  

    // Test: Log the value to console
    console.log(inputElement.value); 
}

const buttonElement = document.getElementById('setButton') as HTMLButtonElement;
if (buttonElement) {
    buttonElement.addEventListener('click', () => {
       
        inputElement.value = "Alice Smith";  
        console.log(inputElement.value);  
    });
}

//ex9
function greet(name: string): string; 
function greet(): string; 

function greet(name?: string): string {
    if (name) {
        return `Hello, ${name}!`;
    } else {
        return 'Hello, stranger!';
    }
}

console.log(greet('Alice'));
console.log(greet()); 