import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwtHelpers';
import { User } from '../types/User';

export interface AuthenticatedRequest extends Request {
  user?: User; 
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;  
  }

  const decoded = verifyToken(token);

  if (!decoded) {

    res.status(403).json({ message: 'Invalid or expired token' });
    return;  
  }

  req.user = decoded;

  next();
};