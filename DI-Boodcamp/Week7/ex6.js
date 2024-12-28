/* //Ex6
div = document.getElementById("navBar");
div.setAttribute('id', 'socialNetworkNavigation');

newLi = document.createElement('li')

let textNode = document.createTextNode("Logout");

newLi.appendChild(textNode);


let ul = document.querySelector("#navBar ul");

ul.appendChild(newLi);


let firstLi = ul.firstElementChild;
let lastLi = ul.lastElementChild;

console.log("First <li>: " + firstLi.textContent); 
console.log("Last <li>: " + lastLi.textContent);   */


const allBooks = [
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        image: "#", 
        alreadyRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "#", 
        alreadyRead: false
    }
];


const listBooksSection = document.querySelector('.listBooks');

allBooks.forEach(book => {
    const bookDiv = document.createElement('div');

    if (book.alreadyRead) {
        bookDiv.style.color = 'red';
    }

    bookDiv.innerHTML = `
        <h3>${book.title} written by ${book.author}</h3>
        <img src="${book.image}" alt="${book.title}" width="100px">
    `;


    listBooksSection.appendChild(bookDiv);
});