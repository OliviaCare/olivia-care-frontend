import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import Stripe from 'stripe';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Crear intento de pago
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos
      currency: 'eur',
      metadata: { appointmentId }
    });

    const payment = await prisma.payment.create({
      data: {
        userId: req.user.id,
        appointmentId,
        amount,
        status: 'PENDING',
        stripeId: paymentIntent.id
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Confirmar pago
router.post('/confirm-payment', authenticateToken, async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'COMPLETED' }
    });

    if (payment.appointmentId) {
      await prisma.appointment.update({
        where: { id: payment.appointmentId },
        data: { status: 'CONFIRMED' }
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener historial de pagos
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        appointment: {
          include: {
            professional: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;