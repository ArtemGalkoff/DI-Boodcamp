import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleHomeClick = () => {
    if (isAuthenticated && user) {
      navigate('/login');  
    } else {
      navigate('/register');
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div>
        <button
          onClick={handleHomeClick}
          className="text-xl font-bold hover:text-gray-300 bg-transparent border-none cursor-pointer"
        >
          Home
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated && user ? (
          <>
          <span>Hi, {user.username}</span>
          <Link to="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link to="/dialogs" className="hover:text-gray-300">
             Dialogs
          </Link>
            <button onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
    >
          Logout
    </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;