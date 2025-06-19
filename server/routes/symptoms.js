import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Schema de validación
const symptomLogSchema = z.object({
  date: z.string().datetime(),
  symptoms: z.record(z.number()),
  notes: z.string().optional()
});

// Registrar síntomas
router.post('/', authenticateToken, async (req, res) => {
  try {
    const data = symptomLogSchema.parse(req.body);
    
    const symptomLog = await prisma.symptomLog.create({
      data: {
        userId: req.user.id,
        date: new Date(data.date),
        symptoms: data.symptoms,
        notes: data.notes
      }
    });

    res.json(symptomLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener historial de síntomas
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const symptoms = await prisma.symptomLog.findMany({
      where: {
        userId: req.user.id,
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    res.json(symptoms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;