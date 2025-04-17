import { createSlice } from '@reduxjs/toolkit';

const initialState = [];


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: { 
    addCategory: (state, action) => {
      state.push(action.payload); 
    },
    editCategory: (state, action) => {
      return state.map(task => 
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },

    deleteCategory: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },

  }
});

export default categoriesSlice.reducer;

