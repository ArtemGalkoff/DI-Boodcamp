import React, { useState } from 'react';
import { Book } from './book'; 
import List from './list';

const BookApp = () => {
  
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ]);


  const [newTitle, setNewTitle] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');

  
  const addBook = () => {
    if (!newTitle || !newAuthor) {
      alert('Please provide both title and author.');
      return;
    }

    const newBook: Book = {
      id: books.length + 1, 
      title: newTitle,
      author: newAuthor,
    };

    setBooks([...books, newBook]); 
    setNewTitle(''); 
    setNewAuthor(''); 
  };

  const renderBook = (book: Book): React.ReactNode => (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );

  return (
    <div>
      <h1>Book List</h1>
 
      <div>
        <input
          type="text"
          placeholder="Enter book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)} 
        />
        <input
          type="text"
          placeholder="Enter author name"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)} 
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <List items={books} renderItem={renderBook} />
    </div>
  );
};

export default BookApp;