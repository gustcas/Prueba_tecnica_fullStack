import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { pool } from '../db/pool';

export async function getTasks(req: AuthRequest, res: Response) {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [req.user?.id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo tareas' });
    }
}

export async function createTask(req: AuthRequest, res: Response) {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'title es requerido' });
        }

        const [result] = await pool.query(
            'INSERT INTO tasks (user_id, title, description, completed) VALUES (?, ?, ?, ?)',
            [req.user?.id, title, description || '', 0]
        );

        res.status(201).json({
            id: (result as any).insertId,
            title,
            description,
            completed: 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creando tarea' });
    }
}
