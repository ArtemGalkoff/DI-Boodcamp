import pool from '../config/db';

export const saveLocation = async (userId: number, latitude: number, longitude: number) => {
  const query = `
    UPDATE users
    SET latitude = $1, longitude = $2
    WHERE id = $3;
  `;
  const values = [latitude, longitude, userId];

  await pool.query(query, values);
};