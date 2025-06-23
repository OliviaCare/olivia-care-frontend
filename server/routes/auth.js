import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import admin from 'firebase-admin';

const router = express.Router();

const db = admin.firestore();

// Función auxiliar para generar IDs temporales
function generateTempId() {
  return crypto.randomBytes(16).toString('hex');
}

// Wellhub Integration Endpoints

/**
 * GET /api/auth/wellhub/token
 * Endpoint para que Wellhub obtenga un access token usando API Key
 */
router.get('/wellhub/token', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    // Validar API Key de Wellhub
    if (!apiKey || apiKey !== process.env.WELLHUB_API_KEY) {
      return res.status(403).json({ 
        error: 'Forbidden. Missing API key or wrong API key' 
      });
    }

    // Generar access token (JWT válido por 1 hora)
    const accessToken = jwt.sign(
      { 
        source: 'wellhub',
        issued_at: Date.now()
      },
      process.env.JWT_SECRET,
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

/**
 * POST /api/auth/wellhub/register
 * Endpoint para registro de usuarios desde Wellhub
 */
router.post('/wellhub/register', async (req, res) => {
  try {
    // Validar Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized Request. Missing or wrong access token' 
      });
    }

    // Extraer y validar el token
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.source !== 'wellhub') {
        throw new Error('Invalid token source');
      }
    } catch (jwtError) {
      return res.status(401).json({ 
        error: 'Unauthorized Request. Invalid access token' 
      });
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
      return res.status(400).json({ 
        error: 'Missing required field: gympass_user_id' 
      });
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

    let redirectLink;

    if (existingUser) {
      // Usuario ya existe - enviar a página de login
      redirectLink = `${process.env.CLIENT_URL}/login?source=wellhub&gpw_id=${gympass_user_id}`;
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

      redirectLink = `${process.env.CLIENT_URL}/signup?source=wellhub&temp_id=${tempUserId}`;
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

export default router; 