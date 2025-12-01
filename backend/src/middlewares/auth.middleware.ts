import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: number; email: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = header.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_mock') as any;
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
