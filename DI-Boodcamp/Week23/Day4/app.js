const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('./data');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('JWT Auth Server is Running ✅');
});

const generateToken = (user, expiresIn) => {
  return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn });
};

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);

  const accessToken = generateToken(newUser, process.env.JWT_EXPIRATION);
  const refreshToken = generateToken(newUser, process.env.JWT_REFRESH_EXPIRATION);

  res.cookie('token', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, { httpOnly: true });

  res.status(201).json({ accessToken, refreshToken });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.sendStatus(401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.sendStatus(401);

  const accessToken = generateToken(user, process.env.JWT_EXPIRATION);
  const refreshToken = generateToken(user, process.env.JWT_REFRESH_EXPIRATION);

  res.cookie('token', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, { httpOnly: true });

  res.status(200).json({ accessToken, refreshToken });
});

app.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = generateToken(user, process.env.JWT_EXPIRATION);
    res.cookie('token', newAccessToken, { httpOnly: true });
    res.status(200).json({ accessToken: newAccessToken });
  });
});

app.get('/protected', authenticateJWT, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

// 🚪 Выход
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});