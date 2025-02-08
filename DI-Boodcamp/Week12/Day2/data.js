const people = [
    { name: "John Doe", age: 30, location: "New York" },
    { name: "Jane Smith", age: 25, location: "London" },
    { name: "Carlos Perez", age: 35, location: "Madrid" },
    { name: "Emily Johnson", age: 28, location: "Sydney" },
    { name: "Aiko Tanaka", age: 22, location: "Tokyo" }
  ];

  export default people;


  export function averAge() {
  
    const totalAge = people.map(person => person.age).reduce((acc, num) => acc + num, 0);
    return totalAge / people.length;
  }