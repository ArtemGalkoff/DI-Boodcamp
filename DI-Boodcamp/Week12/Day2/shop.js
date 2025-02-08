const products = require('./products');


function find(productName) {
  for (const element of products) {
    if (element.name === productName) {
      return element;  
    }
  }
  return null;  
}


const result = find("Laptop");
console.log(result);  

const result1 = find("Sneakers");
console.log(result1);  

const result2 = find("Coffee");
console.log(result2); 