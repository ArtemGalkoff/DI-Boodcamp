import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Dialog {
  partner_id: number;
  userName: string;
  photo1: string;
  last_message: string;
  last_message_time: string;
}

const DialogsList = () => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDialogs = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/chat/dialogs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch dialogs');
        }
        const data = await res.json();
        setDialogs(data);
      } catch (err: any) {
        setError(err.message || 'Error loading dialogs');
      } finally {
        setLoading(false);
      }
    };

    fetchDialogs();
  }, []);

  const handleDelete = async (partnerId: number) => {
    if (!confirm('Are you sure you want to delete this dialog?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/chat/dialogs/${partnerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete dialog');

      setDialogs(prev => prev.filter(dialog => dialog.partner_id !== partnerId));
    } catch (err: any) {
      alert(err.message || 'Error deleting dialog');
    }
  };

  if (loading) return <p>Loading dialogs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (dialogs.length === 0) return <p className="text-center mt-12 text-black animate-pulse text-3xl font-serif">No dialogs yet</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Dialogs</h2>
      <div className="border rounded-xl shadow p-4 bg-white">
        <ul className="space-y-3">
          {dialogs.map((dialog) => (
            <li
              key={dialog.partner_id}
              className="relative border rounded-lg p-3 hover:bg-gray-50 transition"
            >
              <button
                onClick={() => handleDelete(dialog.partner_id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                title="Delete dialog"
              >
                &times;
              </button>
              <Link
                to={`/chat/${dialog.partner_id}`}
                className="flex items-start gap-3"
              >
                <img
                  src={dialog.photo1}
                  alt={dialog.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{dialog.userName}</div>
                  <div className="text-sm text-gray-700 truncate">{dialog.last_message}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(dialog.last_message_time).toLocaleString()}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DialogsList;