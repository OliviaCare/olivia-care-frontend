import express, { Request, Response, Router } from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middleware/auth.js';
import { z } from 'zod';
import { db } from '../config/firebase.js';

const router: Router = express.Router();

// Schema de validación
const appointmentSchema = z.object({
  professionalId: z.string(),
  dateTime: z.string().datetime(),
  notes: z.string().optional()
});

// Crear cita
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = appointmentSchema.parse(req.body);
    
    // Crear la cita en Firestore
    const appointmentData = {
      userId: req.user!.id,
      professionalId: data.professionalId,
      dateTime: new Date(data.dateTime),
      status: 'PENDING',
      notes: data.notes || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const appointmentRef = await db.collection('appointments').add(appointmentData);
    
    // Obtener datos del profesional
    const professionalDoc = await db.collection('professionals').doc(data.professionalId).get();
    const professionalData = professionalDoc.exists ? professionalDoc.data() : null;

    const appointment = {
      id: appointmentRef.id,
      ...appointmentData,
      professional: professionalData
    };

    res.json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Obtener citas del usuario
router.get('/my-appointments', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const appointmentsSnapshot = await db.collection('appointments')
      .where('userId', '==', req.user!.id)
      .orderBy('dateTime', 'desc')
      .get();

    const appointments = [];
    
    for (const doc of appointmentsSnapshot.docs) {
      const appointmentData = doc.data();
      
      // Obtener datos del profesional
      let professionalData = null;
      if (appointmentData.professionalId) {
        const professionalDoc = await db.collection('professionals').doc(appointmentData.professionalId).get();
        professionalData = professionalDoc.exists ? professionalDoc.data() : null;
      }

      appointments.push({
        id: doc.id,
        ...appointmentData,
        professional: professionalData
      });
    }

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Actualizar estado de cita
router.patch('/:id/status', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const appointmentId = req.params.id;

    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }

    // Verificar que la cita existe y pertenece al usuario
    const appointmentDoc = await db.collection('appointments').doc(appointmentId).get();
    
    if (!appointmentDoc.exists) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    const appointmentData = appointmentDoc.data();
    
    // Verificar que el usuario es el dueño de la cita o es admin
    if (appointmentData?.userId !== req.user!.id && !req.user!.isAdmin) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    // Actualizar el estado
    await appointmentDoc.ref.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Obtener los datos actualizados
    const updatedDoc = await appointmentDoc.ref.get();
    const updatedData = updatedDoc.data();

    res.json({
      id: appointmentId,
      ...updatedData
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 