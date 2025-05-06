
import { AuthState } from './User';
import { Story } from './Story';

export interface RootState {
  auth: AuthState;
  stories: Story[];
}