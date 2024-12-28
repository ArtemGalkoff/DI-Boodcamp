/* //Ex1

function sum () {
    let result = 0
    for (let i=0; i <= 500; i++) {
        if (i % 23 === 0) {
        result +=i;
    }
  }
    return result
} 

console.log(sum());
 */

/* //Ex2 
const stock = { 
  "banana": 6, 
  "apple": 0,
  "pear": 12,
  "orange": 32,
  "blueberry":1
}  

const prices = {    
  "banana": 4, 
  "apple": 2, 
  "pear": 1,
  "orange": 1.5,
  "blueberry":10
} 

let shoppingList = ['banana', 'orange', 'apple'];

function myBill () {
  let bill = 0;
  for (const i of shoppingList) {
    if (i in stock) {
      if (stock[i] > 0) { 
        bill += prices[i];  
        stock[i] -= 1;  
      } else {
        console.log(`${i} is out of stock.`);
      }
    } else {
      console.log(`${i} not in stock.`);
    }
  }
  return bill; 
}

console.log(myBill()); */
/* 
//Ex 3
function changeEnough(itemPrice, amountOfChange) {
  const exchange = [0.25, 0.10, 0.05, 0.01];

  let pocket = 0;
  for (let i = 0; i < amountOfChange.length; i++) {
      pocket += amountOfChange[i] * exchange[i];
  }
  
 
  if (itemPrice <= pocket) {
      return true;  
  } else {
      return false; 
  }
}


console.log(changeEnough(4.25, [25, 20, 5, 0]));   */

/* //eX 4  
function hotelCost() {
  let oneNightCost = 140; 
  let numberOfNights;
  
  while (true) {
    let userInput = prompt('How many nights would you like?');
    
    numberOfNights = Number(userInput);
  
    if (!isNaN(numberOfNights) && numberOfNights > 0) {
      break; 
    } else {
      console.log("Please enter a valid number of nights.");
    }
  }
  
  return numberOfNights * oneNightCost;
}

function planeRideCost() {
  let destination;
  
  while (true) {
    destination = prompt("What destination would you like?");
  
    if (typeof destination === "string" && destination.trim() !== "") {
      destination = destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();
      
      if (destination === "London") {
        return 183;
      } else if (destination === "Paris") {
        return 220;
      } else {
        return 300; 
      }
    } else {
      console.log("Please enter a valid destination.");
    }
  }
}

function rentalCarCost() {
  let dayOfRent;
  const pricePerDay = 40;

  while (true) {
    dayOfRent = prompt("How many days would you like to rent the car for?");
  
    dayOfRent = Number(dayOfRent);  
    
    if (!isNaN(dayOfRent) && dayOfRent > 0) {
      let totalPrice = dayOfRent * pricePerDay;

      if (dayOfRent > 10) {
        totalPrice *= 0.95;
      }

      return totalPrice; 
    } else {
      console.log("Please enter a valid number.");
    }
  }
}

function totalVacationCost() {

  let hotelCostAmount = hotelCost();
  let planeCost = planeRideCost();
  let rentalCarCostAmount = rentalCarCost();
  
  let totalCost = hotelCostAmount + planeCost + rentalCarCostAmount;
  
  console.log(`Total cost of your vacation is $${totalCost}, hotel cost is $${hotelCostAmount}, plane cost is $${planeCost}, rental car cost is $${rentalCarCostAmount}`);
}

totalVacationCost(); */

//Exercise 5 : Users
div = document.getElementById("container");
console.log(div); 

let pit = document.querySelector('ul').firstElementChild.textContent = 'Richard';

let deLete = document.querySelector('ul');
let deLete1 = document.querySelector('ul').lastElementChild;
deLete.removeChild(deLete1);
//document.querySelector('ul').removeChild(document.querySelector('ul').lastElementChild);

let lists = document.getElementsByClassName("list");

   
    for (let i = 0; i < lists.length; i++) {
       
        let firstLi = lists[i].firstElementChild;

        firstLi.textContent = 'Artem';  
    }

    let ulElements = document.getElementsByTagName("ul");
        for (let i = 0; i < ulElements.length; i++) {
    ulElements[i].classList.add("student_list");
}

let firstUl3 = document.querySelector("ul");
firstUl.classList.add("university", "attendance");

let div = document.querySelector("div");
div.style.backgroundColor = "lightblue";
div.style.padding = "20px";


let firstUl = document.querySelector("ul"); 
let lastLi = firstUl.lastElementChild; // 
if (lastLi.textContent.trim() === "Dan") {
    lastLi.style.display = "none"; // 
}

let secondLi = firstUl.children[1]; 
if (secondLi.textContent.trim() === "Richard") {
    secondLi.style.border = "2px solid black"; 
}

document.body.style.fontSize = "18px";