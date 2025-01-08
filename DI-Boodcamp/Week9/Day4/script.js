/* //Ex1
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
 
colors.forEach((element, index) => {console.log(`${index + 1}# choice is ${element}`);
});

colors.some(element => element === 'Violet') ? console.log("Yeah") : console.log("No...");
 */

/* //Ex2 
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];


function getOrdinalSuffix(index) {
    const lastDigit = (index + 1) % 10;  
    return ordinal[(lastDigit >= 1 && lastDigit <= 3) ? lastDigit : 0];
  }
 
  colors.forEach((element, index) => {
    const suffix = getOrdinalSuffix(index);
    console.log(`${index + 1}${suffix} choice is ${element}`);
  });
 */
  //Ex4
  const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];


    const newArr = users.map(item => `Hello ${item.firstName}`);
    console.log(newArr);
    
    const filteredNumbers = users.filter(i => i.role.startsWith('Full Stack'));

    const fullStackResidentsLastNames = users.filter(user => user.role === 'Full Stack Resident').map(user => user.lastName); 
    console.log(fullStackResidentsLastNames);

    //Ex5
    const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

    const grut = epic.reduce((accumulator, currentValue) => accumulator + ' ' + currentValue);
    console.log(grut);

    //Ex6

    const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
        {name: "Liam", course: "Computer Science", isPassed: false}, 
        {name: "Jenner", course: "Information Technology", isPassed: true}, 
        {name: "Marco", course: "Robotics", isPassed: true}, 
        {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
        {name: "Jamie", course: "Big Data", isPassed: false}];

    const brainy = students.filter(student => student.isPassed === true);
    brainy.forEach(element => {
        console.log(`Good job ${element.name}, you passed the course in ${element.course}!`);
      });
