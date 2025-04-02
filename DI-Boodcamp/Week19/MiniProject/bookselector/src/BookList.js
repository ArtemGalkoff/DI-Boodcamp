import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooksByGenre } from './selectors';
import BookItem from './BookItem';

const BookList = () => {
  const books = useSelector(selectBooksByGenre);  // Получаем отфильтрованные книги
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // Добавь логику удаления книги
    console.log('Delete book with id:', id);
  };

  return (
    <div>
      {books.length > 0 ? (
        books.map((book) => (
          <BookItem key={book.id} book={book} onDelete={handleDelete} />
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;