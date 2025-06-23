import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../config/firebase.js';
import { User, WellhubTempUser } from '../types/index.js';
import crypto from 'crypto';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();

// Schemas de validación
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['PATIENT', 'PROFESSIONAL', 'ADMIN']).optional().default('PATIENT')
});

// Función auxiliar para generar IDs temporales
function generateTempId(): string {
  return crypto.randomBytes(16).toString('hex');
}

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ message: 'Login endpoint working' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ message: 'Register endpoint working' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/auth/wellhub/token
router.get('/wellhub/token', async (req: Request, res: Response): Promise<void> => {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    
    // Validar API Key de Wellhub
    if (!apiKey || apiKey !== process.env.WELLHUB_API_KEY) {
      res.status(403).json({ 
        error: 'Forbidden. Missing API key or wrong API key' 
      });
      return;
    }

    // Generar access token (JWT válido por 1 hora)
    const accessToken = jwt.sign(
      { 
        source: 'wellhub',
        issued_at: Date.now()
      },
      process.env.JWT_SECRET!,
      { 
        expiresIn: '1h',
        issuer: 'oliviacare'
      }
    );

    const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hora en segundos

    res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_at: expiresAt
    });

  } catch (error) {
    console.error('Error generating Wellhub access token:', error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

// POST /api/auth/wellhub/register
router.post('/wellhub/register', async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        error: 'Unauthorized Request. Missing or wrong access token' 
      });
      return;
    }

    // Extraer y validar el token
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      if (decoded.source !== 'wellhub') {
        throw new Error('Invalid token source');
      }
    } catch (jwtError) {
      res.status(401).json({ 
        error: 'Unauthorized Request. Invalid access token' 
      });
      return;
    }

    // Extraer datos del body
    const { 
      gympass_user_id,
      email,
      first_name,
      last_name,
      origin,
      user_status,
      country_code
    } = req.body;

    // Validar datos requeridos
    if (!gympass_user_id) {
      res.status(400).json({ 
        error: 'Missing required field: gympass_user_id' 
      });
      return;
    }

    // Buscar usuario existente por wellhubUserId
    const wellhubUserQuery = await db.collection('users')
      .where('wellhubUserId', '==', gympass_user_id)
      .limit(1)
      .get();

    // Buscar usuario existente por email si se proporciona
    let emailUserQuery = null;
    if (email) {
      emailUserQuery = await db.collection('users')
        .where('email', '==', email)
        .limit(1)
        .get();
    }

    const existingUser = !wellhubUserQuery.empty ? wellhubUserQuery.docs[0] : 
                        (emailUserQuery && !emailUserQuery.empty ? emailUserQuery.docs[0] : null);

    let redirectLink: string;

    if (existingUser) {
      // Usuario ya existe - enviar a página de login
      redirectLink = `${process.env.FRONTEND_URL}/login?source=wellhub&gpw_id=${gympass_user_id}`;
    } else {
      // Nuevo usuario - crear registro temporal y enviar a signup
      const tempUserId = generateTempId();
      
      // Guardar datos temporales para el proceso de signup
      await db.collection('wellhubTempUsers').doc(tempUserId).set({
        tempId: tempUserId,
        wellhubUserId: gympass_user_id,
        email: email || null,
        firstName: first_name || null,
        lastName: last_name || null,
        origin: origin || null,
        userStatus: user_status || null,
        countryCode: country_code || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutos
      });

      redirectLink = `${process.env.FRONTEND_URL}/signup?source=wellhub&temp_id=${tempUserId}`;
    }

    res.json({
      redirect_link: redirectLink
    });

  } catch (error) {
    console.error('Error in Wellhub user registration:', error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
});

// GET /api/auth/wellhub/temp/:token - Obtener datos temporales para completar registro
router.get('/wellhub/temp/:token', async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;

    const tempUserDoc = await db.collection('wellhubTempUsers').doc(token).get();

    if (!tempUserDoc.exists) {
      res.status(404).json({ error: 'Token no encontrado o expirado' });
      return;
    }

    const tempUserData = tempUserDoc.data() as WellhubTempUser;

    // Verificar si ha expirado
    if (new Date() > tempUserData.expiresAt) {
      // Eliminar registro expirado
      await tempUserDoc.ref.delete();
      res.status(410).json({ error: 'Token expirado' });
      return;
    }

    res.json({
      email: tempUserData.email,
      firstName: tempUserData.firstName,
      lastName: tempUserData.lastName,
      wellhubUserId: tempUserData.wellhubUserId
    });
  } catch (error) {
    console.error('Get temp user error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/auth/wellhub/complete - Completar registro desde Wellhub
router.post('/wellhub/complete', async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400).json({ error: 'Token y contraseña requeridos' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    // Obtener datos temporales
    const tempUserDoc = await db.collection('wellhubTempUsers').doc(token).get();

    if (!tempUserDoc.exists) {
      res.status(404).json({ error: 'Token no encontrado o expirado' });
      return;
    }

    const tempUserData = tempUserDoc.data() as WellhubTempUser;

    // Verificar si ha expirado
    if (new Date() > tempUserData.expiresAt) {
      await tempUserDoc.ref.delete();
      res.status(410).json({ error: 'Token expirado' });
      return;
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario final
    const newUser = {
      email: tempUserData.email,
      password: hashedPassword,
      firstName: tempUserData.firstName,
      lastName: tempUserData.lastName,
      role: 'PATIENT' as const,
      isActive: true,
      wellhubUserId: tempUserData.wellhubUserId,
      wellhubPlanId: tempUserData.wellhubPlanId,
      wellhubCompanyId: tempUserData.wellhubCompanyId,
      wellhubSubscriptionStartDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const userRef = await db.collection('users').add(newUser);

    // Eliminar registro temporal
    await tempUserDoc.ref.delete();

    // Generar JWT
    const jwtToken = jwt.sign(
      { userId: userRef.id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Respuesta sin contraseña
    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      token: jwtToken,
      user: {
        id: userRef.id,
        ...userResponse
      }
    });
  } catch (error) {
    console.error('Complete Wellhub registration error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router; 