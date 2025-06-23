import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middleware/auth.js';
import Stripe from 'stripe';
import { db } from '../config/firebase.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router() as express.Router;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Crear intento de pago
router.post('/create-payment-intent', authenticateToken, async (req: any, res: any) => {
  try {
    const { appointmentId, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos
      currency: 'eur',
      metadata: { appointmentId: appointmentId || 'no-appointment' }
    });

    const paymentData = {
      userId: req.user.id,
      appointmentId: appointmentId || null,
      amount,
      status: 'PENDING',
      stripeId: paymentIntent.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const paymentRef = await db.collection('payments').add(paymentData);

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentRef.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Confirmar pago
router.post('/confirm-payment', authenticateToken, async (req: any, res: any) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }

    // Verificar que el pago existe
    const paymentDoc = await db.collection('payments').doc(paymentId).get();
    
    if (!paymentDoc.exists) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const paymentData = paymentDoc.data();

    // Verificar que el pago pertenece al usuario
    if (paymentData?.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Actualizar el estado del pago
    await paymentDoc.ref.update({
      status: 'COMPLETED',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Si hay una cita asociada, actualizar su estado
    if (paymentData?.appointmentId) {
      const appointmentDoc = await db.collection('appointments').doc(paymentData.appointmentId).get();
      
      if (appointmentDoc.exists) {
        await appointmentDoc.ref.update({
          status: 'CONFIRMED',
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    // Obtener los datos actualizados del pago
    const updatedPaymentDoc = await paymentDoc.ref.get();
    const updatedPaymentData = updatedPaymentDoc.data();

    res.json({
      id: paymentId,
      ...updatedPaymentData
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Obtener historial de pagos
router.get('/history', authenticateToken, async (req: any, res: any) => {
  try {
    const paymentsSnapshot = await db.collection('payments')
      .where('userId', '==', req.user.id)
      .orderBy('createdAt', 'desc')
      .get();

    const payments = [];

    for (const doc of paymentsSnapshot.docs) {
      const paymentData = doc.data();
      
      let appointmentData = null;
      let professionalData = null;

      // Si hay cita asociada, obtener sus datos
      if (paymentData.appointmentId) {
        const appointmentDoc = await db.collection('appointments').doc(paymentData.appointmentId).get();
        
        if (appointmentDoc.exists) {
          appointmentData = appointmentDoc.data();
          
          // Si hay profesional asociado, obtener sus datos
          if (appointmentData?.professionalId) {
            const professionalDoc = await db.collection('professionals').doc(appointmentData.professionalId).get();
            
            if (professionalDoc.exists) {
              professionalData = professionalDoc.data();
            }
          }
        }
      }

      payments.push({
        id: doc.id,
        ...paymentData,
        appointment: appointmentData ? {
          ...appointmentData,
          professional: professionalData
        } : null
      });
    }

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 