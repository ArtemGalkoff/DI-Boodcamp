import { configureStore } from '@reduxjs/toolkit';
import authReducer, { restoreSession } from './slices/authSlice';
import matchesReducer from './slices/matchesSlice';
import profileReducer from './slices/profileSlice';
import chatReducer from './slices/chatSlice';
import profilesFeedReducer from './slices/profilesFeedSlice';
import guestProfileReducer from './slices/guestProfileSlice';
import locationReducer from './slices/locationSlice';
import pushReducer from './slices/pushSlice';

const store = configureStore({
  reducer: {
    push: pushReducer,
    auth: authReducer,
    matches: matchesReducer,
    profile: profileReducer,
    chat: chatReducer,
    profilesFeed: profilesFeedReducer,
    guestProfile: guestProfileReducer,
    location: locationReducer,
  },
});

// ✅ Восстановление сессии
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
  try {
    store.dispatch(restoreSession({ token, user: JSON.parse(user) }));
  } catch (err) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;