import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'onthelow'; 
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    if (!decoded.username) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
