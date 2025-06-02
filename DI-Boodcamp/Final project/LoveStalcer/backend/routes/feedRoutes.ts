import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getUnlikedProfiles } from '../controllers/profilesFeedsController';

const router = express.Router();

router.get('/', authMiddleware, getUnlikedProfiles);

export default router;