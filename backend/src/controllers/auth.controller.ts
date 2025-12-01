import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        console.log('🔐 Intentando login para:', email);

        // Validar campos requeridos
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y contraseña son requeridos'
            });
        }

        // Buscar usuario en la base de datos
        const user = await UserModel.findByEmail(email);

        if (!user) {
            console.log('❌ Usuario no encontrado:', email);
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        console.log('✅ Usuario encontrado, verificando contraseña...');

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            console.log('❌ Contraseña incorrecta para:', email);
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        console.log('✅ Login exitoso para:', email);

        // Generar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET || 'secret_mock_fallback',
            { expiresIn: '24h' }
        );

        // Responder con token y datos del usuario (sin password)
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('💥 Error en login:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Nombre, email y contraseña son requeridos'
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                message: 'El usuario ya existe'
            });
        }

        // Hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const userId = await UserModel.create({
            name,
            email,
            password_hash: passwordHash
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: { id: userId, name, email }
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}