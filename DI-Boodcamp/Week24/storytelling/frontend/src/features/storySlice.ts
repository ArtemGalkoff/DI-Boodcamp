import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../helpers/api';

interface Story {
  id: number;
  title: string;
  content: string;
}

interface StoryState {
  stories: Story[];
  loading: boolean;
  error: string | null;
}

const initialState: StoryState = {
  stories: [],
  loading: false,
  error: null,
};

// Асинхронное действие для получения всех историй
export const fetchStories = createAsyncThunk('story/fetchStories', async () => {
  const response = await api.get('/stories');
  return response.data; // возвращаем данные из ответа
});

// Создание asyncThunk для добавления новой истории
export const createStory = createAsyncThunk(
  'story/createStory',
  async ({ title, content }: { title: string; content: string }) => {
    const response = await api.post('/stories', { title, content });
    return response.data; // возвращаем добавленную историю
  }
);

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка fetchStories
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stories';
      })

      // Обработка createStory
      .addCase(createStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.push(action.payload); // Добавляем новую историю в список
      })
      .addCase(createStory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default storySlice.reducer;