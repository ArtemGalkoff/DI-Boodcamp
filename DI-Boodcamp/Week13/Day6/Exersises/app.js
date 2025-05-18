const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON и формы
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Импортируем роутеры
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const booksRouter = require('./routes/books');

// Монтируем роутеры
app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});