import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Métricas generales (solo admin)
router.get('/metrics', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [
      userCount,
      appointmentCount,
      totalRevenue,
      activeUsers
    ] = await Promise.all([
      prisma.user.count(),
      prisma.appointment.count(),
      prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true }
      }),
      prisma.user.count({
        where: {
          appointments: {
            some: {
              dateTime: {
                gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
              }
            }
          }
        }
      })
    ]);

    res.json({
      userCount,
      appointmentCount,
      totalRevenue: totalRevenue._sum.amount || 0,
      activeUsers
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Análisis de síntomas (para profesionales)
router.get('/symptoms-analysis', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.query;

    const symptoms = await prisma.symptomLog.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Análisis de tendencias
    const trends = symptoms.reduce((acc, log) => {
      Object.entries(log.symptoms).forEach(([symptom, intensity]) => {
        if (!acc[symptom]) {
          acc[symptom] = [];
        }
        acc[symptom].push({ date: log.date, intensity });
      });
      return acc;
    }, {});

    res.json({ trends });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Estadísticas de citas
router.get('/appointment-stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const stats = await prisma.appointment.groupBy({
      by: ['status'],
      _count: true
    });

    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;