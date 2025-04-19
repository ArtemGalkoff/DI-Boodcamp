import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        genre: 'Horror',
      },
      {
        id: 2,
        title: 'Murder on the Orient Express',
        author: 'Agatha Christie',
        genre: 'Science',
      },
      {
        id: 3,
        title: 'The Master and Margarita',
        author: 'Mikhail Bulgakov',
        genre: 'Fantasy',
      },
      {
        id: 4,
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
      },
      {
        id: 5,
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        genre: 'Science',
      },
    ],
    loading: false,
  };

  const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
          state.books.push(action.payload); 
        },
        deleteBook: (state, action) => {
          state.books = state.books.filter(book => book.id !== action.payload); 
        },
      }
      })

      export default bookSlice.reducer;