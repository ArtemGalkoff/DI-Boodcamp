let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

const displayGroceries = () => {
    groceries.fruits.forEach(fruit => {
        console.log(fruit); 
    });
}
displayGroceries();


function cloneGroceries () {
    let user = client;
    client = 'Betty';
    let shopping = groceries;
    shopping.totalPrice = '25$';
    shopping.other.paid = 'false'
}

cloneGroceries();
