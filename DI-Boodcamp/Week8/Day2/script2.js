//Ex2
const log = console.log

form = document.querySelector('form');
log(form);

const inputIds = ['fname', 'lname', 'submit'];
 
        inputIds.forEach(id => {
            console.log(document.getElementById(id));
        });

const input1 = document.querySelectorAll('[name="firstname"]');
log(input1);

const input2 = document.querySelectorAll('[name="lastname"]');
log(input2);

const input3 = document.querySelectorAll('[type="submit"]');
log(input3);


form.addEventListener('submit', function(event) {
    event.preventDefault();  

    getValue1 = input1[0].value
    getValue2 = input2[0].value

    if (getValue1 === '' || getValue2 === '') {
        alert('input smth.');
        return; 
    }

    const ul = document.querySelector('.usersAnswer');  
    const liFirstName = document.createElement('li');
    liFirstName.textContent = getValue1;  // 
    ul.appendChild(liFirstName);  // 

    const liLastName = document.createElement('li');
    liLastName.textContent = getValue2;  // 
    ul.appendChild(liLastName);  
});