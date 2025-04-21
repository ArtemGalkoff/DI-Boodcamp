const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Подключаем маршруты
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

// Базовый корневой маршрут
app.get('/', (req, res) => {
  res.send('Welcome to the Authentication App');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
