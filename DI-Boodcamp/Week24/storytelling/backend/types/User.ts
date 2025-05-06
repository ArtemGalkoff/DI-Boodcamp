export interface User {
    id: number;
    username: string;
    email: string;
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