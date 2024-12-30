    setTimeout(function sayHelloWorld() {
        alert("Hello World");
    }, 2000);


    function sayHelloWorld() {
        let div = document.querySelector('#container');
        let newParagraph = document.createElement('p');
        newParagraph.textContent = "Hello World";
        div.appendChild(newParagraph);;
    }
 

    let untergval = setInterval(sayHelloWorld, 2000)
    let clear = document.querySelector('#clear')

    clear.addEventListener('click', function() {
        clearInterval(untergval); 
        console.log("Interval stopped");
    });
    
    setTimeout(function() {
        clearInterval(untergval); 
        console.log("Interval stopped after 10 seconds");
    }, 10000);

  