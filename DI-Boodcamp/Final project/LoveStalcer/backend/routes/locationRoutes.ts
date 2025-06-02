import express from 'express';
import { setLocation } from '../controllers/locationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/location', authMiddleware, (req, res, next) => {
  setLocation(req, res).catch(next); 
});

export default router;