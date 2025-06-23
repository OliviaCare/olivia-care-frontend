import crypto from 'crypto';

/**
 * Genera secretos para webhooks de Wellhub
 */
function generateWellhubSecrets(): void {
  console.log('🔐 Generando secretos para integración con Wellhub...\n');

  // Generar secreto para webhook
  const webhookSecret = crypto.randomBytes(32).toString('hex');
  
  console.log('📋 Variables de entorno para agregar a tu .env:');
  console.log('----------------------------------------');
  console.log(`WELLHUB_WEBHOOK_SECRET=${webhookSecret}`);
  console.log('----------------------------------------\n');

  console.log('📝 Instrucciones:');
  console.log('1. Copia la variable WELLHUB_WEBHOOK_SECRET a tu archivo .env');
  console.log('2. Proporciona este secreto a Wellhub para la configuración de webhooks');
  console.log('3. Wellhub te proporcionará el WELLHUB_API_KEY que también necesitas agregar al .env\n');

  console.log('🔗 Endpoints para Wellhub:');
  console.log(`   Token: GET ${process.env.FRONTEND_URL || 'http://localhost:5000'}/api/auth/wellhub/token`);
  console.log(`   Register: POST ${process.env.FRONTEND_URL || 'http://localhost:5000'}/api/auth/wellhub/register`);
  console.log(`   Webhooks: POST ${process.env.FRONTEND_URL || 'http://localhost:5000'}/api/webhooks/wellhub`);
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateWellhubSecrets();
}

export { generateWellhubSecrets }; 