import express from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { db } from '../config/firebase.js';

const router = express.Router() as express.Router;

// Métricas generales (solo admin)
router.get('/metrics', authenticateToken, isAdmin, async (req: any, res) => {
  try {
    // Obtener conteos de las diferentes colecciones
    const [
      usersSnapshot,
      appointmentsSnapshot,
      paymentsSnapshot
    ] = await Promise.all([
      db.collection('users').get(),
      db.collection('appointments').get(),
      db.collection('payments').where('status', '==', 'COMPLETED').get()
    ]);

    const userCount = usersSnapshot.size;
    const appointmentCount = appointmentsSnapshot.size;

    // Calcular revenue total
    let totalRevenue = 0;
    paymentsSnapshot.forEach(doc => {
      const payment = doc.data();
      totalRevenue += payment.amount || 0;
    });

    // Calcular usuarios activos (con citas en el último mes)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const activeAppointmentsSnapshot = await db.collection('appointments')
      .where('dateTime', '>=', lastMonth)
      .get();

    const activeUserIds = new Set<string>();
    activeAppointmentsSnapshot.forEach(doc => {
      const appointment = doc.data();
      activeUserIds.add(appointment.userId);
    });

    res.json({
      userCount,
      appointmentCount,
      totalRevenue,
      activeUsers: activeUserIds.size
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Análisis de síntomas (para profesionales)
router.get('/symptoms-analysis', authenticateToken, async (req: any, res: any) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const symptomsSnapshot = await db.collection('symptoms')
      .where('userId', '==', userId)
      .orderBy('date', 'asc')
      .get();

    const symptoms: any[] = [];
    symptomsSnapshot.forEach(doc => {
      symptoms.push({ id: doc.id, ...doc.data() });
    });

    // Análisis de tendencias
    const trends = symptoms.reduce((acc: Record<string, any[]>, log) => {
      if (log.symptoms && typeof log.symptoms === 'object') {
        Object.entries(log.symptoms).forEach(([symptom, intensity]) => {
          if (!acc[symptom]) {
            acc[symptom] = [];
          }
          acc[symptom].push({ 
            date: log.date.toDate ? log.date.toDate() : log.date, 
            intensity 
          });
        });
      }
      return acc;
    }, {});

    res.json({ trends });
  } catch (error) {
    console.error('Error fetching symptoms analysis:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Estadísticas de citas
router.get('/appointment-stats', authenticateToken, isAdmin, async (req: any, res) => {
  try {
    const appointmentsSnapshot = await db.collection('appointments').get();
    
    const stats: Record<string, number> = {};
    appointmentsSnapshot.forEach(doc => {
      const appointment = doc.data();
      const status = appointment.status || 'UNKNOWN';
      
      if (!stats[status]) {
        stats[status] = 0;
      }
      stats[status]++;
    });

    // Convertir a formato similar al de Prisma groupBy
    const formattedStats = Object.entries(stats).map(([status, count]) => ({
      status,
      _count: count
    }));

    res.json(formattedStats);
  } catch (error) {
    console.error('Error fetching appointment stats:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 