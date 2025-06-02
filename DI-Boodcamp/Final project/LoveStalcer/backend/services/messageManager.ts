import pool from '../config/db';
import { Message } from '../models/Message';

// Сохранение сообщения
export const saveMessage = async (message: Message) => {
  const query = `
    INSERT INTO messages (sender_id, receiver_id, content, timestamp)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [message.senderId, message.receiverId, message.content, message.timestamp];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Получение всех сообщений между двумя пользователями
export const getMessagesBetweenUsers = async (userId1: number, userId2: number) => {
  const query = `
    SELECT * FROM messages 
    WHERE (sender_id = $1 AND receiver_id = $2) 
    OR (sender_id = $2 AND receiver_id = $1)
    ORDER BY timestamp ASC;
  `;
  const values = [userId1, userId2];
  const result = await pool.query(query, values);
  return result.rows;
};

export const getDialogsForUser = async (userId: number) => {
  const query = `
    SELECT
      CASE
        WHEN sender_id = $1 THEN receiver_id
        ELSE sender_id
      END AS partner_id,
      MAX(timestamp) AS last_message_time,
      (ARRAY_AGG(content ORDER BY timestamp DESC))[1] AS last_message,
      u.username AS userName,
      u.photo1 
    FROM messages
    JOIN users u ON u.id = CASE
      WHEN sender_id = $1 THEN receiver_id
      ELSE sender_id
    END
    WHERE sender_id = $1 OR receiver_id = $1
    GROUP BY partner_id, u.username, u.photo1
    ORDER BY last_message_time DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const deleteDialogBetweenUsers = async (userId: number, partnerId: number) => {
  await pool.query(
    `DELETE FROM messages 
     WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)`,
    [userId, partnerId]
  );
};





