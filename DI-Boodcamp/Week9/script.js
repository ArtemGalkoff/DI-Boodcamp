/* //Ex 1
// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}
The variable a was initialized, after passing the condition it becomes equal to 3 and the text with a = 3 is displayed

//#2 
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}
global a will become = 5 inside of func and will be output in comsole
funcThree();  //  a  = 0
funcTwo();    // a = 5
funcThree() // a = 5

//3
function funcFour() {
    window.a = "hello";
}


function funcFive() {
    alert(`inside the funcFive function ${a}`);
}
// inside the funcFive function hello
//the second function sees the variable from the first despite the functional type of the variable declaration because of the word global

//4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}


// #4.1 - run in the console:
funcSix()
variable inside function masks global variable

//5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

inside the block scope 5 will be displayed, after exiting to the global scope it will be 2


a global const variable cannot be reassigned in the same scope, but it can be reassigned in block and function scopes
 */
/* 
//EX 2
const winBattle = () => true;
let experiencePoints;
winBattle() ? experiencePoints = 10 : experiencePoints = 1;
console.log(experiencePoints);

//Ex 3 */

const isString = (string) => typeof string === "string";
console.log(isString(5)); 

//Ex 4
const sum = (a, b) => a + b;
console.log(sum(3, 5));  // 8

//Ex5

function current (kg) {
    return kg * 1000;
}

const current = function (kg) {
    return kg * 1000;
}

const current = (kg) => kg * 1000;
console.log(current(48));


//Ex6

(function (children, partner, location, job) {
    let div = document.createElement('div');  
    div.textContent = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;  
    document.body.appendChild(div);  
})(2, "Kristina", "Pert", "developer");