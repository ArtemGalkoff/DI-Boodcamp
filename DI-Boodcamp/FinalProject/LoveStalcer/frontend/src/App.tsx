import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Chat from './pages/Chat';
import DialogsList from './pages/DialogsList';
import GuestProfile from './pages/GuestProfile';
import Home from './pages/Home';
import Login from './pages/Login';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import ProfilesFeed from './pages/ProfilesFeed';
import PushManager from './pages/PushManager';
import Register from './pages/Register';

import { restoreSession } from './slices/authSlice';
import { refreshAccessToken } from './slices/auth'; 
import type { AppDispatch } from './store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    const isTokenValid = token && token !== 'null' && token !== 'undefined';
    const isUserValid = userString && userString !== 'null' && userString !== 'undefined';

    if (isTokenValid && isUserValid) {
      try {
        const user = JSON.parse(userString as string);
        dispatch(restoreSession({ token: token as string, user }));
      } catch (err) {
        console.error('Parsing error user from localStorage:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      
      refreshAccessToken().then((result) => {
        if (result) {
          localStorage.setItem('token', result.accessToken);
          localStorage.setItem('user', JSON.stringify(result.user));
          dispatch(restoreSession({ token: result.accessToken, user: result.user }));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      });
    }
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen bg-red-300 text-blue-800">
        <Navbar />
        <PushManager />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/matches" element={<PrivateRoute><Matches /></PrivateRoute>} />
          <Route path="/feed" element={<PrivateRoute><ProfilesFeed /></PrivateRoute>} />
          <Route path="/dialogs" element={<PrivateRoute><DialogsList /></PrivateRoute>} />

          <Route path="/chat/:userId" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/chat" element={<Navigate to="/dialogs" replace />} />
          <Route path="/profile/:userId" element={<GuestProfile />} />
          <Route path="/user/:userId" element={<GuestProfile />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
};

export default App;