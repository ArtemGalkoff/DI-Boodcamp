const express = require('express');
const app = express();

const books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
    { id: 2, title: '1984', author: 'George Orwell', publishedYear: 1949 },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: 1813 },
    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 }
];

app.get('/api/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);

    const book = books.find(b => b.id === bookId);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

app.use(express.json());

app.post('/api/books', (req, res) => {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newBook = {
        id: books.length + 1,  
        title,
        author,
        publishedYear
    };

    books.push(newBook);

    res.status(201).json(newBook);
});