import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';  // Типизированный dispatch
import { registerUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch(); // Типизированный dispatch
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);  // Стейт для хранения ошибки

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Используем unwrap() для обработки ошибок
      await dispatch(registerUser({ username, email, password })).unwrap();
      navigate('/login');
    } catch (err) {
      // Приводим err к типу `unknown` и проверяем перед использованием
      if (err instanceof Error) {
        setError('Registration failed: ' + err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error(err);  // Логируем ошибку для отладки
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}  {/* Показываем ошибку, если есть */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
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
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;