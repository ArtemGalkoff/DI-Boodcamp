import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedGenre } from './booksSlice';  

const BookFilter = () => {
  const dispatch = useDispatch();

  const handleGenreChange = (event) => {
    dispatch(setSelectedGenre(event.target.value));
  };

  return (
    <div>
      <select onChange={handleGenreChange}>
        <option value="">All Genres</option>
        <option value="Horror">Horror</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science">Science</option>
      </select>
    </div>
  );
};

export default BookFilter;