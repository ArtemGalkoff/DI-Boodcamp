import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../slices/matchesSlice';
import type { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Matches = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { matches, loading, error } = useSelector((state: RootState) => state.matches);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const handleStartChat = (userId: number) => {
    navigate(`/chat/${userId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My matches</h2>
      {matches.length === 0 ? (
        <p>No matches yet 😢</p>
      ) : (
        <ul className="space-y-4">
          {matches.map((user) => (
            <li key={user.id} className="flex items-center space-x-4 border p-4 rounded-lg shadow">
              <Link to={`/user/${user.id}`}>
  <img
    src={user.photo1 || '/default-avatar.png'}
    alt={user.username}
    width="50"
    height="50"
    className="rounded-full object-cover cursor-pointer"
  />
</Link>
              <div className="flex-1">
                <p className="text-lg font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">{user.gender}</p>
              </div>
              <button
                onClick={() => handleStartChat(user.id)}
                className="btn btn-primary"
              >
                Начать чат
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Matches;