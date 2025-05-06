import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { loginUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch(); // Используем типизированный dispatch
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })) // Типизация будет правильной
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        // Обработай ошибку, если нужно
        console.error('Login failed', error);
      });
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;