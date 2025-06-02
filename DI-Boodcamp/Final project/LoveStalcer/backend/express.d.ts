import { User } from '../models/User'; // Импортируй свой интерфейс, если он у тебя в моделях

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        username: string;
      };
    }
  }
}

declare module 'web-push';