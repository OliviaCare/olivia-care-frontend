import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Schema de validación
const appointmentSchema = z.object({
  professionalId: z.string(),
  dateTime: z.string().datetime(),
  notes: z.string().optional()
});

// Crear cita
router.post('/', authenticateToken, async (req, res) => {
  try {
    const data = appointmentSchema.parse(req.body);
    
    const appointment = await prisma.appointment.create({
      data: {
        userId: req.user.id,
        professionalId: data.professionalId,
        dateTime: new Date(data.dateTime),
        status: 'PENDING',
        notes: data.notes
      },
      include: {
        professional: true
      }
    });

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener citas del usuario
router.get('/my-appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        professional: true
      }
    });

    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar estado de cita
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await prisma.appointment.update({
      where: {
        id: req.params.id
      },
      data: {
        status
      }
    });

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;