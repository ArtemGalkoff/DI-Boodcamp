import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const VAPID_PUBLIC_KEY = 'BBHcAJ4ppCksSopUh_osOXQ_nAUW4uklMaIoZY_a1koPZ1UszEz7olv3aZwMwNkEY4Vncg6ZtfwqjStZHPu1z6Q';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribeUserToPush(): Promise<PushSubscription> {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers not supported by this browser');
  }
  const registration = await navigator.serviceWorker.register('/service-worker.js');

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
  return subscription;
}

export const registerPushSubscription = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>(
  'push/registerPushSubscription',
  async (userId, thunkAPI) => {
    try {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          return thunkAPI.rejectWithValue('Permission for push notifications not received');
        }
      } else if (Notification.permission === 'denied') {
        return thunkAPI.rejectWithValue('Push notifications blocked by user');
      }

      const subscription = await subscribeUserToPush();

      const response = await fetch('https://lovestalker.onrender.com/api/push/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, subscription }),
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Sendind to server error');
      }
    } catch {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

interface PushState {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

const initialState: PushState = {
  status: 'idle',
  error: null,
};

const pushSlice = createSlice({
  name: 'push',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerPushSubscription.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerPushSubscription.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(registerPushSubscription.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error';
      });
  },
});

export default pushSlice.reducer;