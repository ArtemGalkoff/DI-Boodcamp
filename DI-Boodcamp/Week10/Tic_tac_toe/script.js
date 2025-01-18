let gameBoard = ['', '', '', '', '', '', '', '', ''];  
let currentPlayer = '';  
let computerPlayer = ''; 
let gameActive = true;    
let difficulty = 'easy'; 

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Выбор X или O
document.getElementById('x').addEventListener('click', () => {
    currentPlayer = 'X';
    computerPlayer = 'O';
    document.getElementById('start').style.display = 'none';
    document.getElementById('difficulty').style.display = 'block';
});

document.getElementById('o').addEventListener('click', () => {
    currentPlayer = 'O';
    computerPlayer = 'X';
    document.getElementById('start').style.display = 'none';
    document.getElementById('difficulty').style.display = 'block';
});

// Выбор уровня сложности
document.getElementById('easy').addEventListener('click', () => {
    difficulty = 'easy';
    document.getElementById('difficulty').style.display = 'none';
    startGame();
});

document.getElementById('hard').addEventListener('click', () => {
    difficulty = 'hard';
    document.getElementById('difficulty').style.display = 'none';
    startGame();
});

// Начало игры
function startGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('restart').style.display = 'none';
    updateBoard();
    if (computerPlayer === 'X') {
        computerMove();
    }
}

// Обновление доски
function updateBoard() {
    gameBoard.forEach((cell, index) => {
        document.getElementById(`${index + 1}`).textContent = cell;
    });
}

// Проверка победы
function checkWinner() {
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
            document.getElementById('restart').style.display = 'block';
            return;
        }
    }

    if (!gameBoard.includes('')) {
        alert('Tie game!');
        gameActive = false;
        document.getElementById('restart').style.display = 'block';
    }
}

// Ход компьютера
function computerMove() {
    let move;
    if (difficulty === 'easy') {
        move = easyMove();
    } else {
        move = hardMove();
    }

    gameBoard[move] = computerPlayer;
    updateBoard();
    checkWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Легкий ход (случайный)
function easyMove() {
    let availableMoves = gameBoard.map((value, index) => value === '' ? index : null).filter(val => val !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Сложный ход (блокирование)
function hardMove() {
    let move = findBestMove(computerPlayer);
    if (move !== -1) return move;

    move = findBestMove(currentPlayer);
    if (move !== -1) return move;

    return easyMove();
}

// Поиск лучшего хода для игрока
function findBestMove(player) {
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === '') return c;
        if (gameBoard[b] === player && gameBoard[c] === player && gameBoard[a] === '') return a;
        if (gameBoard[a] === player && gameBoard[c] === player && gameBoard[b] === '') return b;
    }
    return -1;
}

// Обработка кликов на поле
document.querySelectorAll('.field').forEach((field, index) => {
    field.addEventListener('click', () => {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            updateBoard();
            checkWinner();
            if (gameActive) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (currentPlayer === computerPlayer) {
                    computerMove();
                }
            }
        }
    });
});

// Перезапуск игры
document.getElementById('restartButton').addEventListener('click', startGame);