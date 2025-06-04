import { Server } from 'socket.io';
import { saveMessage } from '../services/messageManager';

const onlineUsers = new Map<number, Set<string>>(); 

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    let currentUserId: number | null = null;

    socket.on('registerUser', (userId: number) => {
      currentUserId = userId;
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId)?.add(socket.id);
    });

    socket.on('sendMessage', async (message) => {
      const { senderId, receiverId, content } = message;

      const savedMessage = await saveMessage({
        id: 0,
        senderId,
        receiverId,
        content,
        timestamp: new Date(),
      });

      onlineUsers.get(senderId)?.forEach((socketId) => {
        io.to(socketId).emit('receiveMessage', savedMessage);
      });

      onlineUsers.get(receiverId)?.forEach((socketId) => {
        io.to(socketId).emit('receiveMessage', savedMessage);
      });
    });

    socket.on('disconnect', () => {
      if (currentUserId !== null) {
        const sockets = onlineUsers.get(currentUserId);
        sockets?.delete(socket.id);
        if (sockets && sockets.size === 0) {
          onlineUsers.delete(currentUserId);
        }
      }
    });
  });
};