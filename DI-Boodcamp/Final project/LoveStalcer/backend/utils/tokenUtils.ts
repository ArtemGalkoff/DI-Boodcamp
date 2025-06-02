import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// Время жизни токенов
const ACCESS_TOKEN_EXPIRES_IN = '15m';   // Access Token живет 15 минут
const REFRESH_TOKEN_EXPIRES_IN = '7d';   // Refresh Token живет 7 дней

interface UserPayload {
  id: number;
  username: string;
  email: string;
}

export const generateAccessToken = (user: UserPayload): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const generateRefreshToken = (user: UserPayload): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
};
