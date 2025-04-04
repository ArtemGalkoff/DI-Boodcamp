import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;