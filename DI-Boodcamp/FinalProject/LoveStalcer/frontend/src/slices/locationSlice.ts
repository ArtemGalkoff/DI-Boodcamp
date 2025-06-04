import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

async function getCityFromCoords(latitude: number, longitude: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || null;
  } catch (error) {
    return null;
  }
}

export const sendLocation = createAsyncThunk<
  { latitude: number; longitude: number; city: string | null },
  void,
  { rejectValue: string }
>(
  'location/sendLocation',
  async (_, thunkAPI) => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = position.coords;

      const city = await getCityFromCoords(latitude, longitude);

      const token = localStorage.getItem('token');
      await axios.post(
        'https://lovestalker.onrender.com/api/location',
        { latitude, longitude },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return { latitude, longitude, city };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to send location');
    }
  }
);

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  city: null,
  status: 'idle',
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendLocation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.city = action.payload.city;
      })
      .addCase(sendLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default locationSlice.reducer;