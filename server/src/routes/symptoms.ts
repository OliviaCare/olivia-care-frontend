import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middleware/auth.js';
import { z } from 'zod';
import { db } from '../config/firebase.js';

const router = express.Router() as express.Router;

// Schema de validación
const symptomLogSchema = z.object({
  date: z.string().datetime(),
  symptoms: z.record(z.number()),
  notes: z.string().optional()
});

// Registrar síntomas
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const data = symptomLogSchema.parse(req.body);
    
    const symptomLogData = {
      userId: req.user.id,
      date: new Date(data.date),
      symptoms: data.symptoms,
      notes: data.notes || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const symptomLogRef = await db.collection('symptoms').add(symptomLogData);

    res.json({
      id: symptomLogRef.id,
      ...symptomLogData
    });
  } catch (error) {
    console.error('Error creating symptom log:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Obtener historial de síntomas
router.get('/history', authenticateToken, async (req: any, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = db.collection('symptoms')
      .where('userId', '==', req.user.id);

    // Aplicar filtros de fecha si se proporcionan
    if (startDate) {
      query = query.where('date', '>=', new Date(startDate as string));
    }
    
    if (endDate) {
      query = query.where('date', '<=', new Date(endDate as string));
    }

    // Ordenar por fecha descendente
    query = query.orderBy('date', 'desc');

    const symptomsSnapshot = await query.get();
    
    const symptoms: any[] = [];
    symptomsSnapshot.forEach(doc => {
      const data = doc.data();
      symptoms.push({
        id: doc.id,
        ...data,
        // Convertir timestamp de Firestore a formato Date si es necesario
        date: data.date.toDate ? data.date.toDate() : data.date
      });
    });

    res.json(symptoms);
  } catch (error) {
    console.error('Error fetching symptom history:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Obtener estadísticas de síntomas
router.get('/stats', authenticateToken, async (req: any, res) => {
  try {
    const symptomsSnapshot = await db.collection('symptoms')
      .where('userId', '==', req.user.id)
      .get();

    const symptomStats: Record<string, any> = {};
    let totalLogs = 0;

    symptomsSnapshot.forEach(doc => {
      const data = doc.data();
      totalLogs++;
      
      if (data.symptoms && typeof data.symptoms === 'object') {
        Object.entries(data.symptoms).forEach(([symptom, intensity]) => {
          if (!symptomStats[symptom]) {
            symptomStats[symptom] = {
              count: 0,
              totalIntensity: 0,
              maxIntensity: 0,
              minIntensity: 10
            };
          }
          
          symptomStats[symptom].count++;
          symptomStats[symptom].totalIntensity += intensity as number;
          symptomStats[symptom].maxIntensity = Math.max(symptomStats[symptom].maxIntensity, intensity as number);
          symptomStats[symptom].minIntensity = Math.min(symptomStats[symptom].minIntensity, intensity as number);
        });
      }
    });

    // Calcular promedios
    Object.keys(symptomStats).forEach(symptom => {
      symptomStats[symptom].averageIntensity = 
        symptomStats[symptom].totalIntensity / symptomStats[symptom].count;
    });

    res.json({
      totalLogs,
      symptomStats
    });
  } catch (error) {
    console.error('Error fetching symptom stats:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 