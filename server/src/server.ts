import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/firebase.js'; // Inicializar Firebase

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
import authRoutes from './routes/auth.js';
import appointmentsRoutes from './routes/appointments.js';
import symptomsRoutes from './routes/symptoms.js';
import billingRoutes from './routes/billing.js';
import analyticsRoutes from './routes/analytics.js';
import wellhubWebhooksRoutes from './routes/wellhub-webhooks.js';

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/symptoms', symptomsRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/webhooks/wellhub', wellhubWebhooksRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'oliviacare-backend'
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'OliviaCare API Server running with TypeScript and Firestore' });
});

// Manejo de errores globales
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
}); 