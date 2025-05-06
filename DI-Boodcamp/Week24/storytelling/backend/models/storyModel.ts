import pool from '../db/pool';

export const createStory = async (title: string, content: string, author_id: string) => {
  const result = await pool.query(
    'INSERT INTO stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING id, title, content, author_id',
    [title, content, author_id]
  );
  return result.rows[0];
};

export const getAllStories = async () => {
  const result = await pool.query('SELECT * FROM stories');
  return result.rows;
};

export const updateStory = async (id: string, title: string, content: string) => {
  const result = await pool.query(
    'UPDATE stories SET title = $1, content = $2 WHERE id = $3 RETURNING id, title, content',
    [title, content, id]
  );
  return result.rows[0];
};

export const deleteStory = async (id: string) => {
  await pool.query('DELETE FROM stories WHERE id = $1', [id]);
};