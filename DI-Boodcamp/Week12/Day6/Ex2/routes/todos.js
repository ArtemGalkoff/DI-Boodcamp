const express = require('express');
const router = express.Router();

// Пример базы данных (массив)
let todos = [];

// Получить все задачи
router.get('/', (req, res) => {
    res.json(todos); // Возвращаем все задачи в формате JSON
});

// Добавить новую задачу
router.post('/', (req, res) => {
    const { task } = req.body; // Получаем данные о задаче из тела запроса
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo); // Добавляем новую задачу в массив
    res.status(201).json(newTodo); // Возвращаем созданную задачу
});

// Обновить задачу по ID
router.put('/:id', (req, res) => {
    const { id } = req.params; // Получаем ID задачи из параметра пути
    const { task } = req.body; // Получаем обновленное описание задачи

    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    const todo = todos.find(t => t.id === parseInt(id)); // Находим задачу по ID
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    todo.task = task; // Обновляем описание задачи
    res.json(todo); // Возвращаем обновленную задачу
});

// Удалить задачу по ID
router.delete('/:id', (req, res) => {
    const { id } = req.params; // Получаем ID задачи из параметра пути
    const index = todos.findIndex(t => t.id === parseInt(id)); // Находим индекс задачи

    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    const deletedTodo = todos.splice(index, 1); // Удаляем задачу из массива
    res.json(deletedTodo); // Возвращаем удаленную задачу
});

module.exports = router;