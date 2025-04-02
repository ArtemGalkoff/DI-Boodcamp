import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [
        { id: 1, title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
        { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
        { id: 3, title: 'Dune', author: 'Frank Herbert', genre: 'Science' },
        { id: 4, title: '1984', author: 'George Orwell', genre: 'Horror' },
        { id: 5, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Horror' },
        { id: 6, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Science' },
        { id: 7, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Science' },
        { id: 8, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Science' },
        { id: 9, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Fantasy' },
        { id: 10, title: 'Moby-Dick', author: 'Herman Melville', genre: 'Fantasy' },
        { id: 11, title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Horror' },
        { id: 12, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
        { id: 13, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Fantasy' }
      ],
      selectedGenre: null,
  };

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      addBook: (state, action) => {
        state.books.push(action.payload);
      },
    }
  });

  export default booksSlice.reducer;
  export const { addBook } = booksSlice.actions;