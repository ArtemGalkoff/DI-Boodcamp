const log = console.log

Ex1
h1 = document.querySelector('h1')
log(h1)

lastArticle = document.querySelector('article').lastElementChild;
lastArticle.remove();

h2 = document.querySelector('h2')
h2.addEventListener('click', function (event) {
    h2.style.backgroundColor = 'red';
});

h3 = document.getElementsByTagName('h3')[0];
h3.addEventListener('click', function (event) {
    h3.style.display = 'none';
});

allP = document.querySelectorAll('p')
const button = document.createElement('button');
button.textContent = 'Make fat';
button.addEventListener('click', function() {
    for (i = 0; i < allP.length; i++) {
    allP[i].style.fontWeight = 'bold';}
});
document.body.appendChild(button);

h1.addEventListener ('mouseenter', function (event) {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = randomSize + 'px';
})


