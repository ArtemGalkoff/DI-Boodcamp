import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/tasksSlice';
import categoriesReducer from './features/categories/categoriesSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
  },
});