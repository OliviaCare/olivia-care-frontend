import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';

const db = admin.firestore();

// Middleware para autenticar token JWT
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verificar token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Obtener datos del usuario desde Firestore
    const userDoc = await db.collection('users').doc(decoded.userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    req.user = {
      id: userDoc.id,
      ...userData,
      isAdmin: userData.role === 'ADMIN'
    };

    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware para verificar que el usuario es admin
export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Middleware para verificar que el usuario es profesional
export const isProfessional = (req, res, next) => {
  if (!req.user || req.user.role !== 'PROFESSIONAL') {
    return res.status(403).json({ error: 'Professional access required' });
  }
  next();
};

// Middleware para verificar que el usuario es paciente
export const isPatient = (req, res, next) => {
  if (!req.user || req.user.role !== 'PATIENT') {
    return res.status(403).json({ error: 'Patient access required' });
  }
  next();
}; 