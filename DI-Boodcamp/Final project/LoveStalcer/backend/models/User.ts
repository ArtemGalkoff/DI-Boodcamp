export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  gender: string;
  created_at: Date;
  updated_at: Date;
  age?: number;
  bio?: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  photo5?: string;
  photos?: string[]; 
}