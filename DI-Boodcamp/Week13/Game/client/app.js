const startGameBtn = document.getElementById('startGameBtn');
const usernameInput = document.getElementById('username');
const gameArea = document.getElementById('gameArea');
const boardDiv = document.getElementById('board');
let currentUser = '';
let gameId = '';
let currentPlayer = '';

fetch('http://localhost:5000/game/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ player1: currentUser, player2: opponent })
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  if (data.error) {
    alert(data.error);
  } else {
    gameId = data.gameId;
    currentPlayer = data.player1;
    localStorage.setItem('gameId', gameId);
    localStorage.setItem('currentUser', currentUser);
    alert('Game started!');
    renderBoard(data.board);
    document.getElementById('login').style.display = 'none';
    gameArea.style.display = 'block';
  }
})
.catch(err => {
  console.error('Error:', err);
  alert('An error occurred while starting the game.');
});

// Проверяем, если игра уже запущена
if (localStorage.getItem('gameId')) {
  gameId = localStorage.getItem('gameId');
  currentUser = localStorage.getItem('currentUser');
  alert('You are already in a game!');
  // запросите информацию о текущей игре
  fetch(`/game/${gameId}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        currentPlayer = data.currentPlayer;
        renderBoard(data.board);
        gameArea.style.display = 'block';
      }
    })
    .catch(err => console.error('Error:', err));
}

// Авторизация игрока и старт игры
startGameBtn.addEventListener('click', () => {
  currentUser = usernameInput.value.trim();
  if (currentUser === '') {
    alert('Player name is required');
    return;
  }

  const opponent = prompt('Enter opponent username:');
  if (opponent && opponent !== currentUser) {
    fetch('/game/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player1: currentUser, player2: opponent })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        gameId = data.gameId;
        currentPlayer = data.player1;
        localStorage.setItem('gameId', gameId);
        localStorage.setItem('currentUser', currentUser);
        alert('Game started!');
        renderBoard(data.board);
        document.getElementById('login').style.display = 'none';
        gameArea.style.display = 'block';
      }
    })
    .catch(err => console.error('Error:', err));
  } else {
    alert('Invalid opponent.');
  }
});

// Рендерим игровое поле
function renderBoard(board) {
  boardDiv.innerHTML = '';
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      if (cell === 1) {
        cellDiv.classList.add('player1'); // База игрока 1
      } else if (cell === 2) {
        cellDiv.classList.add('player2'); // База игрока 2
      }

      // Обработчик клика по клетке
      cellDiv.addEventListener('click', () => makeMove(x, y));
      boardDiv.appendChild(cellDiv);
    });
  });
}

// Функция для выполнения хода
function makeMove(x, y) {
  if (currentPlayer !== currentUser) {
    alert("It's not your turn.");
    return;
  }

  fetch(`/game/${gameId}/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: currentUser, x, y })
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      renderBoard(data.board);
      if (data.winner) {
        alert(`${data.winner} wins!`);
      }
    }
  })
  .catch(err => console.error('Error:', err));
}