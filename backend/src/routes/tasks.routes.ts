import { Router } from 'express';
import { getTasks, createTask } from '../controllers/tasks.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * GET /tasks
 */
router.get('/list', authMiddleware, getTasks);

/**
 * POST /tasks
 * body: { title, description? }
 */
router.post('/add', authMiddleware, createTask);

export default router;
