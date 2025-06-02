import express from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);     // Регистрация нового пользователя
router.post('/login', loginUser);           // Вход пользователя
router.post('/refresh', refreshToken);      // Обновление токена
router.post('/logout', logoutUser);         // Выход из системы

export default router;