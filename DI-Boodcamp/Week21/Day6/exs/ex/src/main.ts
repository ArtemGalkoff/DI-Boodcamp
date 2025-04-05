//ex1
type Person {
  name: string,
  age: number
};

type Adress {
  street: string,
  city: string
};

type PersonWithAddress = Person & Adress;

const personWithAddress: PersonWithAddress = {
  name: "John Doe",
  age: 30,
  street: "123 Main St",
  city: "New York"
};

console.log(personWithAddress);

//ex2
function describeValue(value: number | string): string {
  if (typeof value === 'number') {
    return "This is a number";
  } else if (typeof value === 'string') {
    return "This is a string";
  } else {
    return "Unknown type";
  }
}

//ex3
let someValue: any = 42;  

let stringValue: string = someValue as string; 

console.log(stringValue);  

let length = stringValue.length; 
console.log(`Length of the string is: ${length}`);

//ex4
function getFirstElement(arr: (number | string)[]): string {
  return arr[0] as string;
}

const numbers: (number | string)[] = [42, 88, 100];
console.log(getFirstElement(numbers)); 



//ex5
function logLength<T extends { length: number }>(value: T): void {
  console.log(value.length);  
}

//ex6
type Person = {
  name: string;
  age: number;
};

type Job = {
  position: string;
  department: string;
};

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
  switch (true) {
    case 'name' in employee:
      return `Hi, my name is ${employee.name}`;
    case 'age' in employee:
      return `Hi, I am ${employee.age} years old`;
    case 'position' in employee:
      return `Hi, I work as a ${employee.position}`;
    case 'department' in employee:
      return `Hi, I work in the ${employee.department} department`;
    default:
      return "Unknown property";
  }
}

const employee: Employee = {
  name: "John",
  age: 30,
  position: "Software Developer",
  department: "Engineering"
};

console.log(describeEmployee(employee));

//ex7
function formatInput<T extends { toString(): string }>(input: T): string {
  return input.toString();
}

const num = 123;
console.log(formatInput(num));  

// Объект
const date = new Date();
console.log(formatInput(date)); 

// Массив
const arr = [1, 2, 3];
console.log(formatInput(arr));