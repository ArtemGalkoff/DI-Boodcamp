let interval;  
let animate = document.getElementById("animate");  
let container = document.getElementById("container"); 
let position = 0;  

function myMove() {
    
    clearInterval(interval);

    interval = setInterval(function() {

        position++;

        animate.style.left = position + "px";

        if (position >= container.offsetWidth - animate.offsetWidth) {
            clearInterval(interval);  
            console.log("Animation stopped");
        }
    }, 1);  
}