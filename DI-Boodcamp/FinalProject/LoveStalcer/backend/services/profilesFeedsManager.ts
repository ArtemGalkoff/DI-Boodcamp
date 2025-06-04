import pool from '../config/db';

export const getUnlikedUsers = async (
  userId: number,
  gender?: string,
  minAge?: number,
  maxAge?: number
) => {
  let query = `
    SELECT id, username, gender, age, bio, photo1
    FROM users
    WHERE id != $1
      AND id NOT IN (
        SELECT liked_user_id FROM likes WHERE user_id = $1
      )
  `;

  const values: any[] = [userId];
  let paramIndex = values.length;

  if (gender) {
    paramIndex += 1;
    query += ` AND gender = $${paramIndex}`;
    values.push(gender);
  }

  if (minAge !== undefined) {
    paramIndex += 1;
    query += ` AND age >= $${paramIndex}`;
    values.push(minAge);
  }

  if (maxAge !== undefined) {
    paramIndex += 1;
    query += ` AND age <= $${paramIndex}`;
    values.push(maxAge);
  }

  const result = await pool.query(query, values);
  return result.rows;
};