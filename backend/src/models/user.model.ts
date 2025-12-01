import { pool } from '../db/pool';

export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
}

export class UserModel {
    static async findAll(): Promise<Omit<User, 'password_hash'>[]> {
        try {
            const [rows] = await pool.execute(
                'SELECT id, name, email, created_at FROM users ORDER BY id ASC'
            );

            return rows as Omit<User, 'password_hash'>[];
        } catch (error) {
            console.error('Error finding all users:', error);
            throw error;
        }
    }
    static async findByEmail(email: string): Promise<User | null> {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            const users = rows as User[];
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async findById(id: number): Promise<User | null> {
        try {
            const [rows] = await pool.execute(
                'SELECT id, name, email, created_at FROM users WHERE id = ?',
                [id]
            );

            const users = rows as User[];
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error('Error finding user by id:', error);
            throw error;
        }
    }

    static async create(user: Omit<User, 'id' | 'created_at'>): Promise<number> {
        try {
            const [result] = await pool.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                [user.name, user.email, user.password_hash]
            );

            return (result as any).insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async update(
        id: number,
        data: Partial<Omit<User, 'id' | 'created_at'>>
    ): Promise<void> {
        try {
            const fields: string[] = [];
            const values: any[] = [];

            if (data.name !== undefined) {
                fields.push('name = ?');
                values.push(data.name);
            }

            if (data.email !== undefined) {
                fields.push('email = ?');
                values.push(data.email);
            }

            if (data.password_hash !== undefined) {
                fields.push('password_hash = ?');
                values.push(data.password_hash);
            }

            if (!fields.length) {
                return;
            }

            values.push(id);

            await pool.execute(
                `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
                values
            );
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}
