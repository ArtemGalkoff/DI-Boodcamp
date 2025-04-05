//ex 1

class Employee {
  public name: string;
  private salary: number;
  public position: string;
  protected department: string

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department
  }

  public getEmployeeInfo(): string {
    return (`Name is ${this.name} on position ${this.position}.`);
  }
}

const employee = new Employee("Ilon Mask", 2500, "junior Software Developer", "Engineering");

employee.getEmployeeInfo(); 

//ex2

class Product {

  readonly id: number;
  public name: string;
  public price: number

  constructor(id: number,  name: string, price: number) {

    this.id = id;
    this.name = name;
    this.price = price
  }

  public getProductInfo(): string {
    return (`Name is  ${this.name} with price ${this.price}.`);
  }
}

const product = new Product(1, "Laptop", 1200);

console.log(product.getProductInfo()); 

product.id = 2;

//ex 3
class Animal {
 
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public makeSound(): string {
    return "Some generic animal sound";
  }
}

class Dog extends Animal {
  public makeSound(): string {
    return "bark"; 
  }
}

const myDog = new Dog("Buddy");

console.log(myDog.makeSound());

//ex 4
class Calculator {
  public static add(a: number, b: number): number {
    return a + b;
  }

  public static subtract(a: number, b: number): number {
    return a - b;
  }
}

console.log(Calculator.add(5, 3));        
console.log(Calculator.subtract(5, 3)); 

//ex5
interface User {
  readonly id: number;
  name: string;
  email: string;
}
interface PremiumUser extends User {
  membershipLevel?: string; 
}

function printUserDetails(user: PremiumUser): void {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  if (user.membershipLevel) {
    console.log(`Membership Level: ${user.membershipLevel}`);
  } else {
    console.log("Membership Level: Not specified");
  }
}


const user1: PremiumUser = {
  id: 1,
  name: "Alice",
  email: "vinny@pyh.com",
  membershipLevel: "Gold"
};

const user2: PremiumUser = {
  id: 2,
  name: "Coby",
  email: "Brayant@example.com"
};