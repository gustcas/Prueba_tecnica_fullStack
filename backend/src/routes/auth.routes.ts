import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();

/**
 * POST /auth/login
 * body: { email, password }
 */
router.post('/login', login);

router.post('/register', register);

export default router;
