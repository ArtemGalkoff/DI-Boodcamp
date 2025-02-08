const express = require('express');

const app = express();

const books = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedYear: 1960
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      publishedYear: 1949
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedYear: 1813
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925
    }
  ];

  app.get('/api/books', (req, res) => {
    res.json(books);
  })

  app.listen(5000, () => {
    console.log('Server running at http://localhost:3000');
  });