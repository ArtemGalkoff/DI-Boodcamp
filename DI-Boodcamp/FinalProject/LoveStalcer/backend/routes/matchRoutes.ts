import express from 'express';
import { likeUser, getMatches } from '../controllers/matchController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/like', authMiddleware, likeUser);
router.get('/matches', authMiddleware, getMatches);


export default router;














