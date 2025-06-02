import { Request, Response } from 'express';
import { findUserById, clearPhotoColumn } from '../services/userManager';
import { v2 as cloudinary } from 'cloudinary';

export const deletePhotoController = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const publicId = req.params.publicId;

  if (!req.user || req.user.id !== userId) {
    return res.status(403).json({ message: 'Нет доступа' });
  }

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    // Найти, в какой колонке находится это фото
    const column = (['photo1', 'photo2', 'photo3', 'photo4', 'photo5'] as const).find(
      col => user[col] && user[col].includes(publicId)
    );

    if (!column) {
      return res.status(404).json({ message: 'Фото не найдено у пользователя' });
    }

    // Удалить с Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Очистить фото в БД
    await clearPhotoColumn(userId, column);

    res.json({ message: 'Фото удалено' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления фото' });
  }
};