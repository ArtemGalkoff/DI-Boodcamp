import express from 'express';
import { blockUser, unblockUser } from '../controllers/blockController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/block', authMiddleware, async (req, res, next) => {
  try {
    await blockUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/unblock', authMiddleware, async (req, res, next) => {
  try {
    await unblockUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;