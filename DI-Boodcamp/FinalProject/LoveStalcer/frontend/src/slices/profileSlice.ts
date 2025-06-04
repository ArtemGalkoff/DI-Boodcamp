import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: number;
  email: string;
  username: string;
  gender: string;
  age: number;
  bio: string;
  photos?: string[]; 
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>('profile/fetchProfile', async (_, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:5000/users/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return thunkAPI.rejectWithValue(data.message || 'Failed to fetch profile');
    }

    const data = await response.json();
    return data.user ?? data;
  } catch {
    return thunkAPI.rejectWithValue('Network error');
  }
});

export const updateProfile = createAsyncThunk<
  UserProfile,
  {
    id: number;
    fields: Partial<UserProfile>;
  },
  { rejectValue: string }
>(
  'profile/updateProfile',
  async ({ id, fields }, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/users/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data.message || 'Failed to update profile');
      }

      const data = await response.json();
      return data.user; 
    } catch {
      return thunkAPI.rejectWithValue('Network error');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update profile';
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;