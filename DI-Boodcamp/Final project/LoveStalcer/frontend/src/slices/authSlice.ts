import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  username: string;
  gender: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationSuccess: false,
};

export const loginUser = createAsyncThunk<
  { accessToken: string; user: User },  // изменено здесь
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || 'Failed to login');
    }

    if (!data.accessToken || data.accessToken === 'undefined') {  // проверка на accessToken
      return thunkAPI.rejectWithValue('Invalid token received');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Network error');
  }
});

export const registerUser = createAsyncThunk<
  { accessToken: string; user: User },  // аналогично
  { username: string; email: string; password: string; gender: string },
  { rejectValue: string }
>('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      return thunkAPI.rejectWithValue(data.message || 'Failed to register');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Network error');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.registrationSuccess = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    resetRegistrationSuccess(state) {
      state.registrationSuccess = false;
    },
    restoreSession(state, action: PayloadAction<{ token: string; user: User }>) {

      if (!action.payload.token || action.payload.token === 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return;
      }

      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.accessToken; // Используем accessToken
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;

        if (action.payload.accessToken && action.payload.accessToken !== 'undefined') {
          localStorage.setItem('token', action.payload.accessToken);
        }
        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.registrationSuccess = false;
      });
  },
});

export const { logout, resetRegistrationSuccess, restoreSession } = authSlice.actions;

export default authSlice.reducer;