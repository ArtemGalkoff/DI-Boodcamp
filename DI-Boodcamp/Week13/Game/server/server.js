const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static('client'));

let games = {}; // Место для хранения игр

// Старт игры
app.post('/game/start', (req, res) => {
  const { player1, player2 } = req.body;
  if (!player1 || !player2) {
    return res.status(400).json({ error: 'Both players are required' });
  }

  const gameId = Math.random().toString(36).substring(7);
  const board = createBoard();
  
  // Устанавливаем базы игроков
  board[0][0] = 1; // База игрока 1 в верхнем левом углу
  board[9][9] = 2; // База игрока 2 в нижнем правом углу
  
  games[gameId] = {
    player1,
    player2,
    board,
    currentPlayer: player1,
    winner: null
  };
  
  res.json({ gameId, message: 'Game started', board });
});

// Проверка на победу
function checkWinner(board, player) {
  const baseX = player === 'player1' ? 0 : 9;
  const baseY = player === 'player1' ? 0 : 9;
  return board[baseY][baseX] === (player === 'player1' ? 2 : 1);
}

// Выполнение хода
app.post('/game/:gameId/move', (req, res) => {
  const { gameId } = req.params;
  const { player, x, y } = req.body;
  const game = games[gameId];

  if (!game) {
    return res.status(400).json({ error: 'Game not found' });
  }

  if (game.currentPlayer !== player) {
    return res.status(400).json({ error: 'It is not your turn' });
  }

  // Проверяем, можно ли сделать ход (например, клетка должна быть пустой и не за пределами поля)
  if (x < 0 || x > 9 || y < 0 || y > 9 || game.board[y][x] !== 0) {
    return res.status(400).json({ error: 'Invalid move' });
  }

  // Выполняем ход, обновляем клетку
  game.board[y][x] = player === game.player1 ? 1 : 2;

  // Переключаем игрока (на следующий ход)
  game.currentPlayer = game.currentPlayer === game.player1 ? game.player2 : game.player1;

  // Проверка на победу (если игрок достигает базы)
  if (checkWinner(game.board, player)) {
    game.winner = player;
    return res.json({ message: `${player} wins!`, winner: player, board: game.board });
  }

  res.json({ message: 'Move accepted', board: game.board });
});

// Функция создания начального поля
function createBoard() {
  const board = Array(10).fill().map(() => Array(10).fill(0)); // 10x10 поле, все клетки пустые
  return board;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});