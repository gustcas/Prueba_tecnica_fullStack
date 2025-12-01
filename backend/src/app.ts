import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import tasksRoutes from './routes/tasks.routes';
import usersRoutes from './routes/users.routes';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

app.use(errorMiddleware);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
