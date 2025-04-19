import { createSelector } from 'reselect';

export const selectBooks = (state) => state.books.books;

export const selectHorrorBooks = createSelector(
[selectBooks],
(books) => books.filter(book => book.genre === 'Horror')
);

export const selectFantasyBooks = createSelector(
[selectBooks],
(books) => books.filter(book => book.genre === 'Fantasy')
);   

export const selectScienceBooks = createSelector(
[selectBooks],
(books) => books.filter(book => book.genre === 'Science')
); 


