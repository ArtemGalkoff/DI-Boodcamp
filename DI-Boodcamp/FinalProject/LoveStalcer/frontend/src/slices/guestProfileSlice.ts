import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface GuestProfileData {
  id: number;
  username: string;
  bio: string;
  age: number;
  photos: string[]; 
}

interface GuestProfileState {
  profile: GuestProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuestProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchGuestProfile = createAsyncThunk<
  GuestProfileData,
  number,
  { rejectValue: string }
>(
  'guestProfile/fetchGuestProfile',
  async (userId, thunkAPI) => {
    try {
      const res = await fetch(`https://lovestalker.onrender.com/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        return thunkAPI.rejectWithValue(
          `Loading profile error: ${res.status} ${errorText}`
        );
      }

      const data: GuestProfileData = await res.json();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Error');
    }
  }
);

const guestProfileSlice = createSlice({
  name: 'guestProfile',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profile = null;
      })
      .addCase(fetchGuestProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchGuestProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Loading photo error';
      });
  },
});

export default guestProfileSlice.reducer;