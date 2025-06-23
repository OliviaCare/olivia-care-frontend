# Integración con Wellhub (Gympass) - Firestore

Esta documentación explica cómo integrar OliviaCare con Wellhub usando **Firestore** como base de datos.

## 📋 Resumen del Flujo

1. **Usuario activa Partner App** en Wellhub
2. **Wellhub solicita Access Token** a tu API usando API Key
3. **Tu API devuelve Access Token** válido
4. **Wellhub envía datos del usuario** para registro
5. **Tu API procesa el registro** y devuelve URL de redirección
6. **Usuario es redirigido** a tu plataforma

## 🚀 **MIGRACIÓN COMPLETA A FIRESTORE**

### ✅ **Archivos Refactorizados**

Todos los archivos han sido migrados de Prisma a Firestore:

- ✅ `server/index.js` - Firebase Admin inicializado
- ✅ `server/routes/auth.js` - Endpoints de Wellhub con Firestore
- ✅ `server/routes/wellhub-webhooks.js` - Webhooks con Firestore
- ✅ `server/routes/analytics.js` - Métricas con Firestore
- ✅ `server/routes/appointments.js` - Citas con Firestore
- ✅ `server/routes/billing.js` - Pagos con Firestore
- ✅ `server/routes/symptoms.js` - Síntomas con Firestore
- ✅ `server/middleware/auth.js` - Autenticación con Firestore
- ✅ `server/package.json` - Dependencias actualizadas
- ✅ `firestore.rules` - Reglas de seguridad

### 📦 **Dependencias Actualizadas**

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "firebase-admin": "^12.0.0",
    "stripe": "^14.0.0",
    "zod": "^3.22.4"
  }
}
```

**❌ Eliminado**: `@prisma/client`, `prisma`  
**✅ Añadido**: `firebase-admin`, `zod`

## 🔧 Configuración Necesaria

### Variables de Entorno

Añadir al archivo `.env`:

```env
# Wellhub Integration
WELLHUB_API_KEY="your-wellhub-api-key-here"           # Proporcionado por Wellhub
WELLHUB_CANCEL_WEBHOOK_SECRET="your-cancel-secret"     # Lo generas tú

WELLHUB_CHANGE_WEBHOOK_SECRET="your-change-secret"     # Lo generas tú

# App
CLIENT_URL="http://localhost:3000"  # URL de tu frontend
JWT_SECRET="your-jwt-secret"
PORT=5000
NODE_ENV=development
```

### Setup Completo

```bash
# 1. Instalar dependencias actualizadas
cd server
npm install

# 2. Generar webhook secrets
npm run generate-wellhub-secrets

# 3. Configurar Firebase Service Account
# - Ve a Firebase Console
# - Genera service account key

# 4. Iniciar servidor
npm run dev
```

## 🛠 Endpoints Implementados

### 1. Autenticación - GET `/api/auth/wellhub/token`

**Propósito**: Wellhub solicita un access token usando tu API Key

**Headers Requeridos**:
```
X-Api-Key: <tu-api-key-de-wellhub>
Content-Type: application/json
```

**Respuesta exitosa (200)**:
```json
{
  "access_token": "eyJhbGciO...",
  "token_type": "Bearer",
  "expires_at": 1571536335
}
```

### 2. Registro - POST `/api/auth/wellhub/register`

**Propósito**: Wellhub envía datos del usuario para registro

**Headers Requeridos**:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body**:
```json
{
  "gympass_user_id": "gpw-29caecdf-2d5e-40b8-82b4-d0a044fa4679",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "origin": "ios",
  "user_status": "1",
  "country_code": "GB"
}
```

**Respuesta exitosa (200)**:
```json
{
  "redirect_link": "https://tuapp.com/signup?source=wellhub&temp_id=abc123"
}
```

## 📡 Webhooks

### 1. Cancelación - POST `/api/webhooks/wellhub/cancel`

**Propósito**: Notificación cuando un usuario cancela su plan

### 2. Cambio de Plan - POST `/api/webhooks/wellhub/change`

**Propósito**: Notificación cuando un usuario cambia su plan

## 🗃 Estructura de Firestore

### Colección `users`
```javascript
{
  id: "user123",  // Auto-generado por Firestore
  email: "user@example.com",
  name: "John Doe",
  role: "PATIENT", // 'ADMIN', 'PROFESSIONAL', 'PATIENT'
  emailVerified: true,
  
  // Campos de Wellhub
  wellhubUserId: "gpw-29caecdf-2d5e-40b8-82b4-d0a044fa4679",
  wellhubStatus: "active", // 'active', 'cancelled', 'paused'
  wellhubCancelledAt: Timestamp,
  wellhubChangedAt: Timestamp,
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Colección `wellhubTempUsers`
```javascript
{
  id: "tempId123",  // ID del documento = tempId
  tempId: "tempId123",
  wellhubUserId: "gpw-29caecdf-2d5e-40b8-82b4-d0a044fa4679",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  origin: "ios",
  userStatus: "1",
  countryCode: "GB",
  createdAt: Timestamp,
  expiresAt: Timestamp  // 30 minutos después de createdAt
}
```

### Colección `wellhubEvents`
```javascript
{
  id: "event123",  // Auto-generado
  userId: "user123",  // Referencia al usuario
  wellhubUserId: "gpw-29caecdf-2d5e-40b8-82b4-d0a044fa4679",
  eventType: "cancel", // 'cancel' o 'change'
  eventData: {
    // Datos completos del webhook
    gympass_user_id: "gpw-xxx",
    event_type: "cancel",
    cancelled_at: "2023-10-15T10:00:00Z"
  },
  processedAt: Timestamp
}
```

### Otras Colecciones Migradas

```javascript
// appointments
{
  id: "appointment123",
  userId: "user123",
  professionalId: "prof123",
  dateTime: Timestamp,
  status: "PENDING", // 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'
  notes: "Optional notes",
  createdAt: Timestamp,
  updatedAt: Timestamp
}

// payments
{
  id: "payment123",
  userId: "user123",
  appointmentId: "appointment123",
  amount: 50.00,
  status: "COMPLETED", // 'PENDING', 'COMPLETED', 'FAILED'
  stripeId: "pi_xxxxx",
  createdAt: Timestamp,
  updatedAt: Timestamp
}

// symptoms
{
  id: "symptom123",
  userId: "user123",
  date: Timestamp,
  symptoms: {
    "dolor_cabeza": 7,
    "fatiga": 5,
    "nauseas": 3
  },
  notes: "Optional notes",
  createdAt: Timestamp,
  updatedAt: Timestamp
}

// professionals
{
  id: "prof123",
  email: "doctor@example.com",
  name: "Dr. Smith",
  speciality: "Gynecology",
  license: "MD12345",
  verified: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔄 Flujo de Usuario Nuevo

1. Usuario activa app en Wellhub
2. Wellhub llama a `/api/auth/wellhub/token`
3. Tu API devuelve access token
4. Wellhub llama a `/api/auth/wellhub/register` con datos
5. Tu API crea documento en `wellhubTempUsers`
6. Tu API devuelve URL: `/signup?source=wellhub&temp_id=abc123`
7. Usuario es redirigido a tu frontend
8. Frontend lee `temp_id` y consulta Firestore
9. Frontend muestra formulario pre-llenado
10. Usuario completa registro
11. Backend crea usuario final con `wellhubUserId`
12. Backend elimina documento temporal

## 🔄 Flujo de Usuario Existente

1. Usuario intenta activar app en Wellhub
2. Wellhub llama a `/api/auth/wellhub/register`
3. Tu API busca en `users` por `wellhubUserId` o `email`
4. Tu API encuentra usuario existente
5. Tu API devuelve URL: `/login?source=wellhub&gpw_id=xxx`
6. Usuario es redirigido a login

## 📊 Datos para Proveer a Wellhub

### Sandbox (Desarrollo)
- **Auth Endpoint**: `https://yourtestapi.com/api/auth/wellhub/token`
- **Registration Endpoint**: `https://yourtestapi.com/api/auth/wellhub/register`
- **API Key**: [Wellhub te lo proporciona]

### Production
- **Auth Endpoint**: `https://yourapi.com/api/auth/wellhub/token`
- **Registration Endpoint**: `https://yourapi.com/api/auth/wellhub/register`
- **API Key**: [Wellhub te lo proporciona]

### Webhooks
- **Cancel URL**: `https://yourapi.com/api/webhooks/wellhub/cancel`
- **Change URL**: `https://yourapi.com/api/webhooks/wellhub/change`
- **Cancel Secret**: [Lo generas con el script]
- **Change Secret**: [Lo generas con el script]

## 🔐 Seguridad

### Firestore Rules
```javascript
// users - Solo propietario y admin
match /users/{userId} {
  allow create: if isAuthenticated() && request.auth.uid == userId;
  allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
  allow update: if isAuthenticated() && request.auth.uid == userId;
  allow delete: if false;
}

// wellhubTempUsers - Solo para uso interno del servidor
match /wellhubTempUsers/{tempId} {
  allow read, write: if false; // Solo acceso desde server-side
}

// wellhubEvents - Solo para auditoría y admin
match /wellhubEvents/{eventId} {
  allow read: if isAdmin();
  allow write: if false; // Solo el servidor puede escribir
}

// appointments - Solo propietario
match /appointments/{appointmentId} {
  allow read, write: if isAuthenticated() && 
    (request.auth.uid == resource.data.userId || isAdmin());
}

// payments - Solo propietario
match /payments/{paymentId} {
  allow read, write: if isAuthenticated() && 
    (request.auth.uid == resource.data.userId || isAdmin());
}

// symptoms - Solo propietario
match /symptoms/{symptomId} {
  allow read, write: if isAuthenticated() && 
    (request.auth.uid == resource.data.userId || isAdmin());
}
```

## 🧪 Testing

### Probar Autenticación
```bash
curl -X GET "http://localhost:5000/api/auth/wellhub/token" \
  -H "X-Api-Key: tu-api-key" \
  -H "Content-Type: application/json"
```

### Probar Registro
```bash
curl -X POST "http://localhost:5000/api/auth/wellhub/register" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "gympass_user_id": "gpw-test-123",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Probar Otros Endpoints
```bash
# Obtener métricas (requiere autenticación)
curl -X GET "http://localhost:5000/api/analytics/metrics" \
  -H "Authorization: Bearer <user_jwt_token>"

# Crear cita
curl -X POST "http://localhost:5000/api/appointments" \
  -H "Authorization: Bearer <user_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "professionalId": "prof123",
    "dateTime": "2024-01-15T10:00:00Z",
    "notes": "Consulta regular"
  }'
```

## 🧹 Limpieza de Datos Temporales

Crear un Cloud Function para limpiar documentos expirados:

```javascript
// Cloud Function para ejecutar diariamente
exports.cleanupExpiredTempUsers = functions.pubsub
  .schedule('0 2 * * *') // 2 AM todos los días
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const query = db.collection('wellhubTempUsers')
      .where('expiresAt', '<', now);
    
    const snapshot = await query.get();
    const batch = db.batch();
    
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`Cleaned up ${snapshot.size} expired temp users`);
  });
```

## ⚠️ Consideraciones Importantes

1. **Tiempo de respuesta**: El endpoint de registro debe responder en menos de 3000ms
2. **Seguridad**: Validar siempre la firma de los webhooks
3. **Logs**: Usar Firestore para auditoría completa
4. **Limpieza**: Implementar limpieza automática de datos temporales
5. **Índices**: Firestore creará índices automáticamente para las consultas
6. **Migraciones**: Migrar datos existentes de PostgreSQL/Prisma si es necesario

## 🔑 Flujo de Credenciales

### Lo que **Wellhub te proporciona**:
- `WELLHUB_API_KEY` (sandbox y producción)

### Lo que **tú generas**:
- `WELLHUB_CANCEL_WEBHOOK_SECRET`
- `WELLHUB_CHANGE_WEBHOOK_SECRET`
- `JWT_SECRET`

### Lo que **configuras en Firebase**:
- Service Account para Firebase Admin
- Reglas de seguridad de Firestore
- Índices (automáticos)

## 🚀 Ventajas de usar Solo Firestore

✅ **Una sola base de datos** - Eliminas PostgreSQL/Prisma  
✅ **Escalabilidad automática** - Firestore escala automáticamente  
✅ **Real-time** - Puedes escuchar cambios en tiempo real  
✅ **Seguridad robusta** - Reglas de seguridad granulares  
✅ **Backups automáticos** - Google maneja los backups  
✅ **Consistencia** - Misma tecnología en frontend y backend  
✅ **Sin configuración de BD** - No necesitas configurar PostgreSQL  
✅ **Costos predictibles** - Pagas por uso, no por infraestructura  

## 🔄 Migración desde Prisma

Si tienes datos existentes en PostgreSQL con Prisma:

1. **Exportar datos** de PostgreSQL
2. **Transformar formato** para Firestore
3. **Importar a Firestore** usando Firebase Admin
4. **Verificar migración** con queries de prueba
5. **Actualizar frontend** para usar nuevos endpoints 