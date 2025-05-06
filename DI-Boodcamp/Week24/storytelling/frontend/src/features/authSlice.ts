import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../helpers/api';

// Типизация пользователя
interface User {
  id: number;
  username: string;
  email: string;
}

// Типизация состояния
interface AuthState {
  token: string | null;
  user: User | null;  // Пользователь теперь типизирован
}

// Изначальное состояние
const initialState: AuthState = {
  token: null,
  user: null,
};

// Типизация параметров для loginUser и registerUser
interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

// Асинхронный экшен для входа
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }: LoginPayload) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;  // Ответ ожидается с данными, в том числе токеном и пользователем
});

// Асинхронный экшен для регистрации
export const registerUser = createAsyncThunk('auth/register', async ({ username, email, password }: RegisterPayload) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;  // Ответ ожидается с данными, в том числе токеном и пользователем
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        // Типизированное изменение состояния
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // Типизированное изменение состояния
        state.token = action.payload.token;
        state.user = action.payload.user;
      });
  },
});

export default authSlice.reducer;