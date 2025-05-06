import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/userModel'; // Импорт модели для работы с пользователями
import { generateAccessToken, generateRefreshToken } from '../helpers/jwtHelpers'; // Импорт JWT для создания токенов

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10); // Хешируем пароль

    const user = await createUser(username, email, passwordHash); // Передаём 3 аргумента

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);  // Находим пользователя
    if (!user || user.password !== password) {  // Если пользователь не найден или неверный пароль
      res.status(400).json({ message: 'Invalid credentials' }); // Отправляем ответ
      return;  // Завершаем выполнение функции
    }

    const accessToken = generateAccessToken(user);  // Генерируем токен доступа
    const refreshToken = generateRefreshToken(user);  // Генерируем refresh токен

    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });  // Сохраняем refresh токен в cookie

    res.status(200).json({ accessToken });  // Отправляем успешный ответ с accessToken
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });  // Ошибка на сервере
  }
};