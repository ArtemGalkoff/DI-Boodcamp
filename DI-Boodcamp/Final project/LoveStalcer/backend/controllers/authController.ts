import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { createUser } from '../services/userManager'; 
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';
import { User } from "../models/User";
import { findUserByEmail, findUserById } from '../services/userManager'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, gender } = req.body;

  if (!username || !email || !password || !gender) {
    res.status(400).json({ message: 'All fields are required.' });
    return; 
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser(username, email, passwordHash, gender);

    if (!user) {
      res.status(500).json({ message: 'Failed to create user.' });
      return; 
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refresh_token', refreshToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(201).json({ accessToken });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => { 
  let { email, password } = req.body;

  email = email?.trim();
  password = password?.trim();

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return; 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return; 
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refresh_token', refreshToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        gender: user.gender,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => { 
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token is required.' });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

    const userId = decoded.userId || decoded.id; 

    if (!userId) {
      res.status(401).json({ message: 'Invalid token payload: userId missing.' });
      return;
    }

    const user = await findUserById(userId);
    if (!user) {
      res.status(401).json({ message: 'User not found.' });
      return;
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: 'Failed to refresh token. Please try again later.' });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'User logged out successfully.' });
};