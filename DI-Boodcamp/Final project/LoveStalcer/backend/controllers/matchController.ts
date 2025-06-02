import { Request, Response } from 'express';
import * as matchManager from '../services/matchManager';
import { sendPushToUser } from './pushController';  // Импорт пуш-функции

export const likeUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { likedUserId } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!likedUserId) {
      res.status(400).json({ message: 'Liked User ID is required.' });
      return;
    }

    const result = await matchManager.addLike(userId, likedUserId);

    if (result.status === 'matched') {
      await sendPushToUser(likedUserId, {
        title: "New match!",
        body: `User ${userId} like you!`,
        url: `http://localhost:5173/matches`
      });
      await sendPushToUser(userId, {
        title: "New match!",
        body: `You and ${likedUserId} have match!`,
        url: `http://localhost:5173/matches`
      });

      res.status(201).json({ message: "It's a match!", match: result.match });
    } else if (result.status === 'already_matched') {
      res.status(200).json({ message: 'Already matched.' });
    } else {
      res.status(200).json({ message: 'User liked successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const matches = await matchManager.getUserMatches(userId);
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};