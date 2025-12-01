import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// GET /users
router.get('/', authMiddleware, getUsers);

// GET /users/:id
router.get('/:id', authMiddleware, getUserById);

// POST /users
router.post('/', authMiddleware, createUser);

// PUT /users/:id
router.put('/:id', authMiddleware, updateUser);

// DELETE /users/:id
router.delete('/:id', authMiddleware, deleteUser);

export default router;

