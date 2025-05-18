const express = require('express');
const router = express.Router();

let todos = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const newTodo = { id: nextId++, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  todo.task = task;
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;