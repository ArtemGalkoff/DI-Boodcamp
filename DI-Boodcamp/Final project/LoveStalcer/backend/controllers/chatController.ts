import { Request, Response } from 'express';
import * as messageManager from '../services/messageManager';
import * as blockService from '../services/blockService';
import { deleteDialogBetweenUsers } from '../services/messageManager';
import { sendPushToUser } from './pushController';

export const getMessagesBetweenUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User is not authorized' });
      return;
    }

    const currentUserId = req.user.id;
    const otherUserId = Number(req.params.userId);

    if (!otherUserId) {
      res.status(400).json({ message: 'Recipient User ID not specified' });
      return;
    }

    const messages = await messageManager.getMessagesBetweenUsers(currentUserId, otherUserId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not auth' });
      return;
    }

    const senderId = req.user.id;
    const receiverId = parseInt(req.params.userId, 10); 
    const { content } = req.body;

    if (!receiverId || !content) {
      res.status(400).json({ message: 'Recipient and message content are required' });
      return;
    }

    const isBlocked = await blockService.isUserBlocked(senderId, receiverId);
    if (isBlocked) {
      res.status(403).json({ message: 'User is blocked and cannot be messaged.' });
      return;
    }

    const newMessage = await messageManager.saveMessage({
      senderId,
      receiverId,
      content,
      timestamp: new Date(),
    });

    await sendPushToUser(receiverId, {
      title: 'New message',
      body: `User ${req.user.username || senderId} sent you message`,
      url: `http://localhost:5173/chat/${senderId}`, 
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDialogs = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not auth' });
      return;
    }

    const userId = req.user.id;
    const dialogs = await messageManager.getDialogsForUser(userId);

    res.json(dialogs);
  } catch (error) {
    res.status(500).json({ message: 'Getting dialog server error' });
  }
};

export const deleteDialog = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const partnerId = parseInt(req.params.partnerId);

  if (!userId || isNaN(partnerId)) {
    res.status(400).json({ message: 'Invalid user or partner ID' });
    return;
  }

  try {
    await deleteDialogBetweenUsers(userId, partnerId);
    res.status(200).json({ message: 'Dialog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};