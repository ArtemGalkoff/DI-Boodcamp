import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetRegistrationSuccess } from '../slices/authSlice';
import type { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'; 

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const { loading, error, registrationSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (registrationSuccess) {
      navigate('/login');
      dispatch(resetRegistrationSuccess());
    }
  }, [registrationSuccess, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password, gender }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-[93vh] flex items-center justify-center bg-base-200">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md w-80 bg-[#7df9ff] text-black">
        <h2 className="text-xl mb-4 text-center font-bold">Register</h2>

        <input
  type="text"
  placeholder="Name"
  value={username}
  onChange={(e) => setName(e.target.value)}
  className="mb-3 w-full px-3 py-2 border rounded bg-[#e49595] text-white placeholder-white"
  required
/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded bg-[#e49595] text-white placeholder-white"
          required
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-[#e49595] text-white placeholder-white pr-10"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

       <select
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  className="mb-3 w-full px-3 py-2 border rounded bg-[#e49595] text-white placeholder-white"
  required
>
  <option value="" disabled className="bg-white text-black">
    Select gender
  </option>
  <option value="male" className="bg-white text-black">Male</option>
  <option value="female" className="bg-white text-black">Female</option>
  <option value="other" className="bg-white text-black">Other</option>
</select>

        <button
          type="button"
          className="w-full mb-3 flex items-center justify-center gap-2 border-2 border-gray-300 py-2 rounded hover:bg-gray-100"
          onClick={() => alert('Google Sign In')}
        >
          <FaGoogle className="text-red-500" />
          Sign up with Google
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#008B8B] text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default Register;