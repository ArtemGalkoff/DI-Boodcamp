import { Request, Response } from 'express';
import * as matchManager from '../services/matchManager';
import { sendPushToUser } from './pushController';  
import { findUserById } from '../services/userManager'

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
      const user = await findUserById(userId);
      const likedUser = await findUserById(likedUserId);

      if (!user || !likedUser) {
        res.status(500).json({ message: 'User data missing for match notification.' });
        return;
      }

      await sendPushToUser(likedUserId, {
        title: "New match!",
        body: `${user.username} liked you!`,
        url: `https://lovestalkerfrontend.onrender.com/matches`
      });

      await sendPushToUser(userId, {
        title: "New match!",
        body: `You and ${likedUser.username} have a match!`,
        url: `https://lovestalkerfrontend.onrender.com/matches`
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