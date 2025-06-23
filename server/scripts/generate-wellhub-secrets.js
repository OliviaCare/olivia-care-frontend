#!/usr/bin/env node

/**
 * Script para generar los webhook secrets que debes proporcionar a Wellhub
 * Ejecutar con: node scripts/generate-wellhub-secrets.js
 */

import crypto from 'crypto';

console.log('🔐 Generando Webhook Secrets para Wellhub...\n');

// Generar secrets aleatorios y seguros
const cancelSecret = crypto.randomBytes(32).toString('hex');
const changeSecret = crypto.randomBytes(32).toString('hex');

console.log('📋 Añade estas variables a tu archivo .env:');
console.log('');
console.log(`WELLHUB_CANCEL_WEBHOOK_SECRET="${cancelSecret}"`);
console.log(`WELLHUB_CHANGE_WEBHOOK_SECRET="${changeSecret}"`);
console.log('');

console.log('📤 Proporciona estos datos a Wellhub en su portal:');
console.log('');
console.log('🚫 Cancel Webhook:');
console.log(`   URL: https://tuapi.com/api/webhooks/wellhub/cancel`);
console.log(`   Secret: ${cancelSecret}`);
console.log('');
console.log('🔄 Change Webhook:');
console.log(`   URL: https://tuapi.com/api/webhooks/wellhub/change`);
console.log(`   Secret: ${changeSecret}`);
console.log('');

console.log('⚠️  IMPORTANTE:');
console.log('   - Guarda estos secrets de forma segura');
console.log('   - NO los compartas públicamente');
console.log('   - Úsalos EXACTAMENTE como se muestran aquí');
console.log('   - Wellhub los usará para firmar sus webhooks'); 