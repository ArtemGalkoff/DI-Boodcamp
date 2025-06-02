import express from 'express';
import {
  getMessagesBetweenUsers,
  sendMessage,
  getDialogs,
  deleteDialog
} from '../controllers/chatController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/messages/:userId', authMiddleware, getMessagesBetweenUsers);
router.post('/messages/:userId', authMiddleware, sendMessage);

// ⬇️ Новый маршрут для списка диалогов
router.get('/dialogs', authMiddleware, getDialogs);
router.delete('/dialogs/:partnerId', authMiddleware, deleteDialog);

export default router;