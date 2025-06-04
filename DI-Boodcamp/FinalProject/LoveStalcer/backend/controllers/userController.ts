import { Request, Response, NextFunction} from 'express';
import { createUser, findUserByEmail, findUserById, updateUser, deleteUser, getAllUsers } from '../services/userManager';
import { updateUserPhotos } from '../services/userManager';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import pool from '../config/db';


export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { username, email, password, gender } = req.body;

  try {
    const user = await createUser(username, email, password, gender);
    if (user) {
      return res.status(201).json(user);
    } else {
      return res.status(400).json({ message: 'User did not save.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userIdFromParams = req.params.id;
    const userIdFromToken = req.user?.id;

    const id = userIdFromParams ?? userIdFromToken;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: 'User ID is invalid or missing' });
      return;
    }

    const user = await findUserById(Number(id));

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const findUserByEmailController = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

export const findUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await findUserById(Number(id));
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};


export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    res.status(400).json({ message: 'Uncorrect user ID' });
    return;
  }

  const updates: Partial<{ username: string; email: string; gender: string; age: number; bio: string }> = {};

  const { username, email, gender, age, bio } = req.body;

  if (typeof username === 'string' && username.trim() !== '') {
    updates.username = username.trim();
  }
  if (typeof email === 'string' && email.trim() !== '') {
    updates.email = email.trim();
  }
  if (typeof gender === 'string' && gender.trim() !== '') {
    updates.gender = gender.trim();
  }
  if (typeof age !== 'undefined' && !isNaN(Number(age))) {
    updates.age = Number(age);
  }
  if (typeof bio === 'string' && bio.trim() !== '') {
    updates.bio = bio.trim();
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: 'No data provided for update' });
    return;
  }

  try {
    const success = await updateUser(userId, updates);

    if (!success) {
      res.status(404).json({ message: 'User not found or update failed.' });
      return;
    }

    const userRes = await pool.query('SELECT id, username, email, gender, age, bio, photo1, photo2, photo3, photo4, photo5 FROM users WHERE id = $1', [userId]);

    if (userRes.rowCount === 0) {
      res.status(404).json({ message: 'User not found after update' });
      return;
    }

    const updatedUser = userRes.rows[0];

    res.status(200).json({ message: 'З', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await deleteUser(Number(id));
    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};


export const getAllUsersController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

function isLocalFile(filePath: string): boolean {
  return !filePath.startsWith('http://') && !filePath.startsWith('https://');
}

export const uploadUserPhotosController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No photos were uploaded' });
    }

    const uploadResults = await Promise.all(
      files.map(file =>
        cloudinary.uploader.upload(file.path, {
          folder: 'lovestalker_users',
          transformation: [
            { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
          ],
        })
      )
    );

    await Promise.all(
      files
        .filter(file => isLocalFile(file.path))
        .map(file => fs.unlink(file.path))
    );

    const photoUrls = uploadResults.map(result => result.secure_url);

    const success = await updateUserPhotos(userId, photoUrls);

    if (!success) {
      return res.status(500).json({ message: 'Failed to save photo URLs to the database.' });
    }

    res.status(200).json({
      message: 'Photos uploaded successfully.',
      photos: photoUrls,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error during photo upload' });
    }
  }
};
