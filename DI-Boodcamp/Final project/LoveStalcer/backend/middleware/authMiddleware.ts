import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: number; email: string; username: string; gender: string };
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;  // <-- ПРАВИЛЬНО: обязательно "return", но не возвращаем объект!
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    req.user = decoded as { id: number; email: string; username: string; gender: string };
    next(); // <-- идём дальше, если всё ОК
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;  // <-- ПРАВИЛЬНО: обязательно "return", но не возвращаем объект!
  }
};