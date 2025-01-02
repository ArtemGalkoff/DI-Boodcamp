
const colorButtons = document.querySelectorAll('.color');
let selectedColor = 'red';  

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedColor = button.style.backgroundColor;
    });
});

// Функция для создания сетки
function createGrid(rows, cols) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; 

    for (let i = 0; i < rows * cols; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        gridContainer.appendChild(square);

      
        square.addEventListener('click', () => {
            square.style.backgroundColor = selectedColor;
        });

        square.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) {  
                square.style.backgroundColor = selectedColor;
            }
        });
    }
}


createGrid(20, 20);


document.getElementById('clearButton').addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    });
});