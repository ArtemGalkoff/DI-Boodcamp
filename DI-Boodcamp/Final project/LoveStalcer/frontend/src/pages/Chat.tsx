import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSocket, connectSocket } from '../socketClient';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  timestamp: string;
}

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const user = localStorage.getItem('user');
  const currentUserId = user ? JSON.parse(user).id : null;

  useEffect(() => {
    if (currentUserId) {
      connectSocket(currentUserId);
      const socket = getSocket();

      socket.on('receiveMessage', (message: Message) => {
        if (
          (message.sender_id === Number(userId) && message.receiver_id === currentUserId) ||
          (message.sender_id === currentUserId && message.receiver_id === Number(userId))
        ) {
          setMessages(prev => [...prev, message]);
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [currentUserId, userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchUsername = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/id/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setUsername(data.username || null);
      } catch {
        setUsername(null);
      }
    };

    fetchUsername();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/chat/messages/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (err: any) {
        setError(err.message || 'Error loading messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId || !currentUserId) return;

    const socket = getSocket();
    const messageToSend = {
      senderId: currentUserId,
      receiverId: Number(userId),
      content: newMessage,
    };

    socket.emit('sendMessage', messageToSend);
    setNewMessage('');
  };

  return (
    <div className="min-h-[93vh] flex items-center justify-center bg-base-200">
      <div className="w-[500px] h-[700px] flex flex-col border rounded-lg shadow-lg bg-[#f3f4f6] relative">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-lg">
          <h2 className="text-lg font-semibold">Chat with {username || userId}</h2>
          <button
            onClick={() => navigate('/matches')}
            className="text-gray-500 hover:text-red-500 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 flex flex-col">
          {loading && <p>Loading messages...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {messages.length === 0 && !loading && <p>No messages yet</p>}

          {messages.map(msg => {
            const isOwn = msg.sender_id === currentUserId;

            return (
              <div
                key={msg.id}
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words ${
                  isOwn
                    ? 'bg-blue-500 text-white self-end ml-auto'
                    : 'bg-gray-200 text-gray-800 self-start mr-auto'
                }`}
              >
                <div>{msg.content}</div>
                <div className="text-[10px] text-right opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message input */}
        <form onSubmit={handleSend} className="p-3 border-t bg-white flex">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;