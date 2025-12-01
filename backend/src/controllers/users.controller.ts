import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error getting user by id:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Nombre, email y contraseña son requeridos',
            });
        }

        const existing = await UserModel.findByEmail(email);
        if (existing) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const id = await UserModel.create({
            name,
            email,
            password_hash: passwordHash,
        });

        res.status(201).json({
            id,
            name,
            email,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const { name, email, password } = req.body;

        const existing = await UserModel.findById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const updateData: {
            name?: string;
            email?: string;
            password_hash?: string;
        } = {};

        if (name !== undefined) {
            updateData.name = name;
        }

        if (email !== undefined) {
            updateData.email = email;
        }

        if (password) {
            updateData.password_hash = await bcrypt.hash(password, 10);
        }

        await UserModel.update(id, updateData);

        const updated = await UserModel.findById(id);

        res.json(updated);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        const existing = await UserModel.findById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await UserModel.delete(id);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

