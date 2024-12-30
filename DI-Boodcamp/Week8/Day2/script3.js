//Ex3
let allBoldItems; 

function getBoldItems() {
    allBoldItems = document.querySelectorAll('p strong');
    console.log(allBoldItems);
}

function highlight() {
    for (let i = 0; i < allBoldItems.length; i++) {
        allBoldItems[i].style.backgroundColor = 'blue'; 
    }
}

function returnItemsToDefault() {
    for (let i = 0; i < allBoldItems.length; i++) {
        allBoldItems[i].style.backgroundColor = ''; 
    }
}

getBoldItems();

highlight();

returnItemsToDefault();

for (let i = 0; i < allBoldItems.length; i++) {
    allBoldItems[i].addEventListener('mouseover', function() {
        highlight(); 
    });

    allBoldItems[i].addEventListener('mouseout', function() {
        returnItemsToDefault();  
    });
}
