import express from 'express';
import crypto from 'crypto';
import admin from 'firebase-admin';

const router = express.Router();

const db = admin.firestore();

/**
 * Verificar la autenticidad del webhook usando el secret
 */
function verifyWebhookSignature(payload, signature, secret) {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

/**
 * POST /api/webhooks/wellhub/cancel
 * Webhook para cancelaciones de usuarios
 */
router.post('/cancel', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'] || req.headers['x-signature'];
    const payload = req.body;
    
    // Verificar la signatura del webhook
    if (!verifyWebhookSignature(payload, signature, process.env.WELLHUB_CANCEL_WEBHOOK_SECRET)) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const data = JSON.parse(payload.toString());
    const { gympass_user_id, event_type, cancelled_at } = data;

    if (!gympass_user_id) {
      return res.status(400).json({ error: 'Missing gympass_user_id' });
    }

    // Buscar el usuario por wellhubUserId
    const userQuery = await db.collection('users')
      .where('wellhubUserId', '==', gympass_user_id)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.warn(`User with Wellhub ID ${gympass_user_id} not found for cancellation`);
      return res.status(404).json({ error: 'User not found' });
    }

    const userDoc = userQuery.docs[0];
    const userId = userDoc.id;

    // Actualizar el estado del usuario
    await userDoc.ref.update({
      wellhubStatus: 'cancelled',
      wellhubCancelledAt: new Date(cancelled_at),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Log del evento para auditoría
    await db.collection('wellhubEvents').add({
      userId: userId,
      wellhubUserId: gympass_user_id,
      eventType: 'cancel',
      eventData: data,
      processedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`User ${gympass_user_id} cancelled Wellhub subscription`);
    res.status(200).json({ message: 'Cancellation processed successfully' });

  } catch (error) {
    console.error('Error processing Wellhub cancellation webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/webhooks/wellhub/change
 * Webhook para cambios de plan de usuarios
 */
router.post('/change', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'] || req.headers['x-signature'];
    const payload = req.body;
    
    // Verificar la signatura del webhook
    if (!verifyWebhookSignature(payload, signature, process.env.WELLHUB_CHANGE_WEBHOOK_SECRET)) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const data = JSON.parse(payload.toString());
    const { gympass_user_id, event_type, new_status, changed_at } = data;

    if (!gympass_user_id) {
      return res.status(400).json({ error: 'Missing gympass_user_id' });
    }

    // Buscar el usuario por wellhubUserId
    const userQuery = await db.collection('users')
      .where('wellhubUserId', '==', gympass_user_id)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.warn(`User with Wellhub ID ${gympass_user_id} not found for status change`);
      return res.status(404).json({ error: 'User not found' });
    }

    const userDoc = userQuery.docs[0];
    const userId = userDoc.id;

    // Actualizar el estado del usuario
    await userDoc.ref.update({
      wellhubStatus: new_status || 'active',
      wellhubChangedAt: new Date(changed_at),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Log del evento para auditoría
    await db.collection('wellhubEvents').add({
      userId: userId,
      wellhubUserId: gympass_user_id,
      eventType: 'change',
      eventData: data,
      processedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`User ${gympass_user_id} changed Wellhub plan to ${new_status}`);
    res.status(200).json({ message: 'Plan change processed successfully' });

  } catch (error) {
    console.error('Error processing Wellhub change webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 