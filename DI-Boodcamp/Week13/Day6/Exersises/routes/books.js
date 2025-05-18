const express = require('express');
const router = express.Router();

let books = [];
let nextId = 1;

// GET /books — получить все книги
router.get('/', (req, res) => {
  res.json(books);
});

// POST /books — добавить книгу
router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id — обновить книгу по ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  book.title = title;
  book.author = author;
  res.json(book);
});

// DELETE /books/:id — удалить книгу по ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;