import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import storyRoutes from './routes/storyRoutes';
import contributorRoutes from './routes/contributorRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Регистрация маршрутов
app.use('/api/auth', authRoutes);
app.use('/api', storyRoutes);
app.use('/api', contributorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});