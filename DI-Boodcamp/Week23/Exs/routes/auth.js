const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const USERS_FILE = './users.json';
const JWT_SECRET = 'your_secret_key'; // для продакшена используй process.env.JWT_SECRET

function getUsers() {
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Регистрация
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Fill all fields' });

  const users = getUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Registration successful' });
});

// Логин
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid password' });

  const accessToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 час
    sameSite: 'strict'
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    sameSite: 'strict'
  });

  res.json({ message: 'Login successful' });
});

// Обновление accessToken
router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: 'strict'
    });

    res.json({ message: 'Token refreshed' });
  });
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;