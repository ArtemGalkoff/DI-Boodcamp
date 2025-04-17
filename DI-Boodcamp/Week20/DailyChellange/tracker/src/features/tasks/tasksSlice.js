import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      return state.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

// 👇 ВАЖНО: экспортируем actions отдельно
export const { addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;