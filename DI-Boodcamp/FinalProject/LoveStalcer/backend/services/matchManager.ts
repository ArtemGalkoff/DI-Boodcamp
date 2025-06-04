import pool from '../config/db';

export const addLike = async (userId: number, likedUserId: number) => {
  if (userId === likedUserId) {
    throw new Error("You cannot like yourself.");
  }

  const existingLike = await pool.query(
    `SELECT * FROM likes WHERE user_id = $1 AND liked_user_id = $2`,
    [userId, likedUserId]
  );

  if (existingLike.rows.length === 0) {
    await pool.query(
      `INSERT INTO likes (user_id, liked_user_id) VALUES ($1, $2)`,
      [userId, likedUserId]
    );
  }

  const reciprocalLike = await pool.query(
    `SELECT * FROM likes WHERE user_id = $2 AND liked_user_id = $1`,
    [userId, likedUserId]
  );

  if (reciprocalLike.rows.length > 0) {

    const existingMatch = await pool.query(
      `
      SELECT * FROM matches
      WHERE (user_one_id = $1 AND user_two_id = $2)
         OR (user_one_id = $2 AND user_two_id = $1)
      `,
      [userId, likedUserId]
    );

    if (existingMatch.rows.length === 0) {
      const [id1, id2] = userId < likedUserId
        ? [userId, likedUserId]
        : [likedUserId, userId];

      const match = await pool.query(
        `INSERT INTO matches (user_one_id, user_two_id) VALUES ($1, $2) RETURNING *`,
        [id1, id2]
      );

      return { match: match.rows[0], status: 'matched' };
    }

    return { status: 'already_matched' };
  }

  return { status: 'liked' };
};

export const getUserMatches = async (userId: number) => {
  const result = await pool.query(
    `SELECT * FROM matches WHERE user_one_id = $1 OR user_two_id = $1`,
    [userId]
  );

  const matchedUserIds = result.rows.map(row =>
    row.user_one_id === userId ? row.user_two_id : row.user_one_id
  );

  if (matchedUserIds.length === 0) return [];

  const users = await pool.query(
    `SELECT id, username, gender, photo1 FROM users WHERE id = ANY($1::int[])`,
    [matchedUserIds]
  );

  return users.rows; 
};