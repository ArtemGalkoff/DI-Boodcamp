import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Match {
  id: number;
  username: string;
  gender: string;
  photo1: string | null;
}

interface MatchesState {
  matches: Match[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  loading: false,
  error: null,
};

export const fetchMatches = createAsyncThunk<
  Match[],
  void,
  { rejectValue: string }
>('matches/fetchMatches', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('https://lovestalker.onrender.com/api/match/matches', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return thunkAPI.rejectWithValue(data.message || 'Failed to fetch matches');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Network error');
  }
});

export const likeUser = createAsyncThunk<
  { match?: any }, 
  number,
  { rejectValue: string }
>('matches/likeUser', async (likedUserId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://lovestalker.onrender.com/api/match/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ likedUserId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || 'Failed to like user');
    }

    return data; 
  } catch (error) {
    return thunkAPI.rejectWithValue('Network error');
  }
});

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action: PayloadAction<Match[]>) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch matches';
      })
      .addCase(likeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(likeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to like user';
      });
  },
});

export default matchesSlice.reducer;