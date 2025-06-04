import { Request, Response } from 'express';
import { findUserById, clearPhotoColumn } from '../services/userManager';
import { v2 as cloudinary } from 'cloudinary';

export const deletePhotoController = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const publicId = req.params.publicId;

  if (!req.user || req.user.id !== userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const column = (['photo1', 'photo2', 'photo3', 'photo4', 'photo5'] as const).find(
      col => user[col] && user[col].includes(publicId)
    );

    if (!column) {
      return res.status(404).json({ message: 'Photo not found for this user' });
    }

    await cloudinary.uploader.destroy(publicId);
    await clearPhotoColumn(userId, column);

    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting photo' });
  }
};