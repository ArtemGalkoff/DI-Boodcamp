import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import matchRoutes from './routes/matchRoutes';
import locationRoutes from './routes/locationRoutes';
import chatRoutes from './routes/chatRoutes';
import { setupSocket } from './socket'; 
import  feedRoutes  from './routes/feedRoutes';
import pushRoutes from './routes/pushRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://lovestalkerfrontend.onrender.com',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: 'https://lovestalkerfrontend.onrender.com',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🌐 Welcome to LoveStalcer Backend API');
});

app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api', locationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/push', pushRoutes);

setupSocket(io); 

server.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});