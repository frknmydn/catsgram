import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from '../models/User';

declare module 'express-serve-static-core' {
    interface Request {
        email?: string;
        userType?: UserType;
    }
}

export const authenticateToken = (req: Request & { email?: string, userType?: UserType }, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.status(401).json({ error: 'Missing token.' });
    }

    try {
        const verifiedToken = jwt.verify(token, 'veryberrysecretanahtar') as { email: string, userType: UserType };
        
        req.email = verifiedToken.email;
        req.userType = verifiedToken.userType;  
        
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

export const verifyToken = (token: string): { email: string, userType: UserType } | null => {
    try {
        const verifiedToken = jwt.verify(token, 'veryberrysecretanahtar') as { email: string, userType: UserType };
        return verifiedToken;
    } catch (error) {
        return null;
    }
};