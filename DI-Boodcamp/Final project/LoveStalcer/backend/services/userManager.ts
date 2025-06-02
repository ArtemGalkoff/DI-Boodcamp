import pool from '../config/db';
import { User } from '../models/User';

/**
 * ✅ Создание нового пользователя в базе данных
 */
export const createUser = async (
  username: string,
  email: string,
  password: string,
  gender: string
): Promise<User | null> => {
  const query = `
    INSERT INTO users (username, email, password, gender)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, password, gender, created_at
  `;
  const values = [username, email, password, gender];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    if (error instanceof Error) {
    } else {
    }
    return null;
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = `
    SELECT id, username, email, password, gender, age, bio, created_at, updated_at
    FROM users
    WHERE email = $1
  `;
  try {
    const { rows } = await pool.query(query, [email]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    return null;
  }
};

/**
 * 🔍 Найти пользователя по ID
 */
export const findUserById = async (id: number): Promise<User | null> => {
  const query = `
    SELECT id, username, email, gender, age, bio, created_at, updated_at,
           photo1, photo2, photo3, photo4, photo5
    FROM users
    WHERE id = $1
  `;
  try {
    const { rows } = await pool.query(query, [id]);
    if (!rows.length) return null;

    const user = rows[0];

    const photos = [user.photo1, user.photo2, user.photo3, user.photo4, user.photo5].filter(Boolean);

    return {
      ...user,
      photos,
    };
  } catch (error) {
    return null;
  }
};

/**
 * ✏️ Обновить данные пользователя
 */
export const updateUser = async (
  userId: number,
  updates: Partial<User>
): Promise<boolean> => {
  try {
    // Получаем текущие фото пользователя
    const res = await pool.query(
      'SELECT photo1, photo2, photo3, photo4, photo5 FROM users WHERE id = $1',
      [userId]
    );

    if (res.rowCount === 0) return false;

    const user = res.rows[0];

    const fields: string[] = [];
    const values: any[] = [userId]; // $1 — userId
    let index = 2;

    // Добавляем поля, если они есть в updates
    if (updates.username !== undefined) {
      fields.push(`username = $${index++}`);
      values.push(updates.username);
    }
    if (updates.email !== undefined) {
      fields.push(`email = $${index++}`);
      values.push(updates.email);
    }
    if (updates.gender !== undefined) {
      fields.push(`gender = $${index++}`);
      values.push(updates.gender);
    }
    if (updates.age !== undefined) {
      fields.push(`age = $${index++}`);
      values.push(updates.age);
    }
    if (updates.bio !== undefined) {
      fields.push(`bio = $${index++}`);
      values.push(updates.bio);
    }

    // Добавляем старые фото
    fields.push(`photo1 = $${index++}`); values.push(user.photo1);
    fields.push(`photo2 = $${index++}`); values.push(user.photo2);
    fields.push(`photo3 = $${index++}`); values.push(user.photo3);
    fields.push(`photo4 = $${index++}`); values.push(user.photo4);
    fields.push(`photo5 = $${index++}`); values.push(user.photo5);

    // Проверка, есть ли что обновлять
    if (fields.length === 0) {
      return false;
    }

    const query = `
      UPDATE users
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $1
    `;

    const updateRes = await pool.query(query, values);
    return (updateRes.rowCount ?? 0) > 0;
  } catch (err) {
    return false;
  }
};

/**
 * ❌ Удалить пользователя
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  const query = `
    DELETE FROM users 
    WHERE id = $1
  `;

  try {
    const result = await pool.query(query, [id]);
   return (result.rowCount ?? 0) > 0;
  } catch (error) {
    return false;
  }
};

export const clearPhotoColumn = async (userId: number, column: string) => {
  const validColumns = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];
  if (!validColumns.includes(column)) {
    throw new Error('Неверное имя колонки');
  }

  const query = `UPDATE users SET ${column} = NULL WHERE id = $1`;
  await pool.query(query, [userId]);
};

export const getAllUsers = async (): Promise<User[]> => {
  const query = `
    SELECT id, username, email, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return [];
  }
};

export const updateUserPhotos = async (
  userId: number,
  newPhotoUrls: string[]
): Promise<boolean> => {
  try {
    const res = await pool.query(
      'SELECT photo1, photo2, photo3, photo4, photo5 FROM users WHERE id = $1',
      [userId]
    );

    if (res.rowCount === 0) return false;

    const currentPhotos = [
      res.rows[0].photo1,
      res.rows[0].photo2,
      res.rows[0].photo3,
      res.rows[0].photo4,
      res.rows[0].photo5,
    ];

    const updatedPhotos = [...currentPhotos];

    for (const url of newPhotoUrls) {
      const emptyIndex = updatedPhotos.findIndex(p => !p);
      if (emptyIndex !== -1) {
        updatedPhotos[emptyIndex] = url;
      } else {
        console.warn('⚠️ Максимум 5 фото — новые игнорируются');
        break;
      }
    }

    if (updatedPhotos.every((val, idx) => val === currentPhotos[idx])) {
      return true;
    }

    const query = `
      UPDATE users
      SET photo1 = $2,
          photo2 = $3,
          photo3 = $4,
          photo4 = $5,
          photo5 = $6,
          updated_at = NOW()
      WHERE id = $1
    `;

    const values = [
      userId,
      updatedPhotos[0] || null,
      updatedPhotos[1] || null,
      updatedPhotos[2] || null,
      updatedPhotos[3] || null,
      updatedPhotos[4] || null,
    ];

    const updateRes = await pool.query(query, values);
    return (updateRes.rowCount ?? 0) > 0;
  } catch (err) {
    return false;
  }
};