import pool from '../db/pool';

export const addContributor = async (story_id: string, user_id: string) => {
  const result = await pool.query(
    'INSERT INTO contributors (story_id, user_id) VALUES ($1, $2) RETURNING id, story_id, user_id',
    [story_id, user_id]
  );
  return result.rows[0];
};

export const getContributors = async (story_id: string) => {
  const result = await pool.query('SELECT * FROM contributors WHERE story_id = $1', [story_id]);
  return result.rows;
};

export const removeContributor = async (id: string) => {
  await pool.query('DELETE FROM contributors WHERE id = $1', [id]);
};