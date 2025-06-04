import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface Profile {
  id: number;
  username: string;
  gender: string; 
  age?: number;
  bio?: string;
  photo1?: string;
}

interface Filters {
  gender: string; 
  minAge: number | null;
  maxAge: number | null;
}

interface ProfilesFeedState {
  allProfiles: Profile[]; 
  filteredProfiles: Profile[]; 
  filters: Filters;
  loading: boolean;
  error: string | null;
}

const initialState: ProfilesFeedState = {
  allProfiles: [],
  filteredProfiles: [],
  filters: {
    gender: '',
    minAge: null,
    maxAge: null,
  },
  loading: false,
  error: null,
};

export const fetchProfilesFeed = createAsyncThunk<
  Profile[],
  void,
  { rejectValue: string }
>('profilesFeed/fetch', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('No auth token found');
    }

    const res = await axios.get<Profile[]>('https://lovestalker.onrender.com/api/feed', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.message || err.message || 'Failed to load profiles';
    return thunkAPI.rejectWithValue(message);
  }
});

const filterProfiles = (profiles: Profile[], filters: Filters) => {
  return profiles.filter(profile => {
    const genderMatch = !filters.gender || profile.gender === filters.gender;
    const ageMatch =
      (filters.minAge === null || (profile.age !== undefined && profile.age >= filters.minAge)) &&
      (filters.maxAge === null || (profile.age !== undefined && profile.age <= filters.maxAge));
    return genderMatch && ageMatch;
  });
};

const profilesFeedSlice = createSlice({
  name: 'profilesFeed',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
      state.filteredProfiles = filterProfiles(state.allProfiles, state.filters);
    },
    clearFilters(state) {
      state.filters = { gender: '', minAge: null, maxAge: null };
      state.filteredProfiles = [...state.allProfiles];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfilesFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfilesFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.allProfiles = action.payload;
        state.filteredProfiles = action.payload;
      })
      .addCase(fetchProfilesFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load profiles';
      });
  },
});

export const { setFilters, clearFilters } = profilesFeedSlice.actions;
export const selectProfilesFeed = (state: RootState) => state.profilesFeed;

export default profilesFeedSlice.reducer;