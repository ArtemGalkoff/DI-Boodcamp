import React from 'react';

const BookItem = ({ book, onDelete }) => {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  );
};

export default BookItem;