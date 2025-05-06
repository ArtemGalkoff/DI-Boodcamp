export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
  }
  
  export interface RegisterInput {
    username: string;
    email: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    refreshToken: string;
  }