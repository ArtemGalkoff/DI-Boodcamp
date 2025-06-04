import { Request, Response } from 'express';
import * as blockService from '../services/blockService';

export const blockUser = async (req: Request, res: Response) => {
  try {
    const blockerId = req.user?.id;
    const { blockedId } = req.body;

    if (!blockerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!blockedId) {
      return res.status(400).json({ message: 'Blocked user ID is required.' });
    }

    await blockService.blockUser(blockerId, blockedId);
    res.status(201).json({ message: 'User blocked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  try {
    const blockerId = req.user?.id;
    const { blockedId } = req.body;

    if (!blockerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await blockService.unblockUser(blockerId, blockedId);
    res.status(200).json({ message: 'User unblocked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};