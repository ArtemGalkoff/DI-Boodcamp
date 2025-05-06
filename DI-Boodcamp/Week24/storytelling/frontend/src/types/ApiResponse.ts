import { Story, Contributor } from './Story';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface FetchStoriesResponse {
  stories: Story[];
}

export interface FetchStoryResponse {
  story: Story;
  contributors: Contributor[];
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}