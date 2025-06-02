import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import type { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { sendLocation } from "../slices/locationSlice"; // 🆕

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      // ✅ Локация будет отправлена 1 раз
      localStorage.setItem('locationSent', 'false');
      sendLocation();
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default Login;