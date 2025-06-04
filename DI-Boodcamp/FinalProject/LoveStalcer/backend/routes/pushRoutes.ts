import express, { Request, Response } from 'express';
import { registerPush, removePush } from '../controllers/pushController';

const router = express.Router();

router.post('/register', registerPush);

router.post('/remove', removePush);


export default router;
























