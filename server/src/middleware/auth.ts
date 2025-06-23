import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/firebase.js';


interface JWTPayload {
  userId: string;
  source?: string;
  [key: string]: any;
}

// Middleware para autenticar token JWT
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    // Verificar token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    
    // Obtener datos del usuario desde Firestore
    const userDoc = await db.collection('users').doc(decoded.userId).get();
    
    if (!userDoc.exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userData = userDoc.data();
    req.user = {
      id: userDoc.id,
      ...userData,
      isAdmin: userData?.role === 'ADMIN'
    };

    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }
};

// Middleware para verificar que el usuario es admin
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
};

// Middleware para verificar que el usuario es profesional
export const isProfessional = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'PROFESSIONAL') {
    res.status(403).json({ error: 'Professional access required' });
    return;
  }
  next();
};

// Middleware para verificar que el usuario es paciente
export const isPatient = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'PATIENT') {
    res.status(403).json({ error: 'Patient access required' });
    return;
  }
  next();
}; 