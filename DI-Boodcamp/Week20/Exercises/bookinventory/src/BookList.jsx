import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceBooks,
} from './selectors';

const BookList = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');

  let selector;
  switch (selectedGenre) {
    case 'Horror':
      selector = selectHorrorBooks;
      break;
    case 'Fantasy':
      selector = selectFantasyBooks;
      break;
    case 'Science':
      selector = selectScienceBooks;
      break;
    case 'All':
    default:
      selector = selectBooks;
      break;
  }

  const books = useSelector(selector);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Book Inventory</h2>

      <div className="mb-3">
        <label htmlFor="genre-select" className="form-label">Choose genre:</label>
        <select
          id="genre-select"
          className="form-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Horror">Horror</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science">Science</option>
        </select>
      </div>

      <ul className="list-group">
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{book.title}</strong> — {book.author}
              </div>
              <span className="badge bg-secondary">{book.genre}</span>
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No books found for this genre.</li>
        )}
      </ul>
    </div>
  );
};

export default BookList;