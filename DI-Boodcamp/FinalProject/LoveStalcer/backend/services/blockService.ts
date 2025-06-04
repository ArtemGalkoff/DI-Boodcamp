import pool from '../config/db';

export const blockUser = async (blockerId: number, blockedId: number) => {
  const query = `
    INSERT INTO blocked_users (blocker_id, blocked_id) 
    VALUES ($1, $2) RETURNING *;
  `;
  const values = [blockerId, blockedId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const unblockUser = async (blockerId: number, blockedId: number) => {
  const query = `
    DELETE FROM blocked_users 
    WHERE blocker_id = $1 AND blocked_id = $2;
  `;
  await pool.query(query, [blockerId, blockedId]);
};

export const isUserBlocked = async (blockerId: number, blockedId: number) => {
  const query = `
    SELECT * FROM blocked_users 
    WHERE blocker_id = $1 AND blocked_id = $2;
  `;
  const result = await pool.query(query, [blockerId, blockedId]);
  return result.rows.length > 0;
};