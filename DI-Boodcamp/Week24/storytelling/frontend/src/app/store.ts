import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import storyReducer from '../features/storySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    story: storyReducer,
  },
});


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;  

export default store;