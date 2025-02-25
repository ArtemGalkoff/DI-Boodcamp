const express = require('express');
const app = express();
const todosRouter = require('./routes/todos');

// Миддлвар для парсинга JSON из тела запроса
app.use(express.json());

// Подключаем маршруты для работы с задачами
app.use('/todos', todosRouter);  // Все запросы, начинающиеся с /todos, будут обрабатываться через todosRouter

// Запуск сервера
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});