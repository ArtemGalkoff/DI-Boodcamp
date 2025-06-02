import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: number;               // было string
  senderId: number;         // было string
  senderName: string;
  content: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

// Получение сообщений
export const fetchMessages = createAsyncThunk<
  Message[],
  number,
  { rejectValue: string }
>('chat/fetchMessages', async (userId, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:5000/api/chat/messages/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return thunkAPI.rejectWithValue(data.message || 'Failed to fetch messages');
    }

    const data: Message[] = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Network error');
  }
});

// Отправка сообщения
export const sendMessage = createAsyncThunk<
  Message,
  { receiverId: number; content: string },
  { rejectValue: string }
>('chat/sendMessage', async ({ receiverId, content }, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:5000/api/chat/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ receiverId, content }),
    });

    if (!response.ok) {
      const data = await response.json();
      return thunkAPI.rejectWithValue(data.message || 'Failed to send message');
    }

    const data: Message = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Network error');
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChat(state) {
      state.messages = [];
      state.error = null;
      state.loading = false;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch messages';
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send message';
      });
  },
});

export const { clearChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;