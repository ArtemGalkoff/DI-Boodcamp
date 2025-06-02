import { Request, Response } from 'express';
import * as userService from '../services/profilesFeedsManager';

export const getUnlikedProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Забираем фильтры из query-параметров
    const gender = req.query.gender as string | undefined;
    const minAge = req.query.minAge ? parseInt(req.query.minAge as string, 10) : undefined;
    const maxAge = req.query.maxAge ? parseInt(req.query.maxAge as string, 10) : undefined;

    const users = await userService.getUnlikedUsers(userId, gender, minAge, maxAge);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};