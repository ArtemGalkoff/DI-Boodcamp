import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createStoryController, getStories, updateStoryController, deleteStoryController } from '../controllers/storyController';

const router = Router();

router.get('/stories', authenticateToken, getStories);
router.post('/stories', authenticateToken, createStoryController);
router.patch('/stories/:id', authenticateToken, updateStoryController);
router.delete('/stories/:id', authenticateToken, deleteStoryController);

export default router;