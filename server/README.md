# OliviaCare Backend - TypeScript + Firebase Admin

Backend en TypeScript para OliviaCare con integración completa de Firebase Admin SDK y soporte para Wellhub.

## 🚀 Características

- **TypeScript**: Tipado estático para mejor desarrollo
- **Firebase Admin SDK**: Gestión moderna de base de datos y autenticación
- **Wellhub Integration**: Endpoints para integración con Wellhub (ex-Gympass)
- **Arquitectura Modular**: Rutas, middleware y configuración separados
- **Validación de Datos**: Usando Zod para validación de schemas
- **Seguridad**: JWT tokens y validación de webhooks

## 📁 Estructura del Proyecto

```
server/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Configuración Firebase Admin
│   ├── middleware/
│   │   └── auth.ts              # Middleware de autenticación
│   ├── routes/
│   │   ├── auth.ts              # Rutas de autenticación + Wellhub
│   │   ├── appointments.ts      # Gestión de citas
│   │   ├── symptoms.ts          # Registro de síntomas
│   │   ├── billing.ts           # Facturación y pagos
│   │   ├── analytics.ts         # Métricas y analytics
│   │   └── wellhub-webhooks.ts  # Webhooks de Wellhub
│   ├── scripts/
│   │   └── generate-wellhub-secrets.ts  # Generador de secretos
│   ├── types/
│   │   └── index.ts             # Definiciones de tipos
│   └── index.ts                 # Punto de entrada principal
├── dist/                        # Archivos compilados
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠 Setup e Instalación

### 1. Instalar Dependencias

```bash
cd server
pnpm install
```

### 2. Configurar Firebase Admin

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Project Settings > Service Accounts**
4. Haz clic en **"Generate new private key"**
5. Descarga el archivo JSON

### 3. Variables de Entorno

Crea un archivo `.env` en el directorio `server/`:

```env
# Configuración del servidor
PORT=5000
NODE_ENV=development
JWT_SECRET=tu-jwt-secret-muy-seguro

# Firebase Admin SDK (Backend)
# Convierte el JSON completo a una sola línea
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"tu-project-id",...}

# URL del frontend
FRONTEND_URL=http://localhost:5173

# Wellhub Integration
WELLHUB_API_KEY=api-key-proporcionada-por-wellhub
WELLHUB_WEBHOOK_SECRET=secreto-generado-por-script

# Stripe (opcional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Generar Secretos de Wellhub

```bash
npm run generate-wellhub-secrets
```

### 5. Compilar y Ejecutar

```bash
# Desarrollo (con hot reload)
npm run dev

# Compilar
npm run build

# Producción
npm start

# Verificar tipos
npm run type-check
```

## 🔥 Firebase Admin vs Cliente

### Backend (Firebase Admin SDK)
- **Uso**: Operaciones del servidor
- **Permisos**: Acceso completo, bypassa reglas de seguridad
- **Autenticación**: Service Account Key
- **Variables**: Sin prefijo `VITE_`

### Frontend (Firebase Client SDK)
- **Uso**: Aplicación web/móvil
- **Permisos**: Limitado por reglas de seguridad
- **Autenticación**: API Keys públicas
- **Variables**: Con prefijo `VITE_`

## 🔐 Autenticación

### Métodos Disponibles

1. **JWT Tokens**: Para autenticación tradicional
2. **Firebase Auth Tokens**: Para integración con Firebase Authentication

```typescript
// Middleware JWT
import { authenticateToken } from '../middleware/auth.js';

// Middleware Firebase Auth
import { authenticateFirebaseToken } from '../middleware/auth.js';
```

## 🎯 Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Login de usuario
- `POST /api/auth/register` - Registro de usuario

### Wellhub Integration
- `GET /api/auth/wellhub/token` - Obtener token de acceso
- `POST /api/auth/wellhub/register` - Registro desde Wellhub
- `POST /api/webhooks/wellhub` - Webhooks de Wellhub

### Aplicación
- `GET /api/appointments` - Gestión de citas
- `GET /api/symptoms` - Registro de síntomas
- `GET /api/billing` - Facturación
- `GET /api/analytics` - Métricas

## 🌐 Colecciones Firestore

```typescript
// Usuarios
users: {
  email: string
  firstName: string
  lastName: string
  role: 'PATIENT' | 'PROFESSIONAL' | 'ADMIN'
  wellhubUserId?: string
  wellhubPlanId?: string
  // ...más campos
}

// Registros temporales de Wellhub
wellhubTempUsers: {
  wellhubUserId: string
  email: string
  expiresAt: Date
  // ...datos temporales
}

// Eventos de webhook
wellhubEvents: {
  eventType: string
  wellhubUserId: string
  processedAt: Date
  // ...datos del evento
}
```

## 🚨 Troubleshooting

### Error: "Firebase Admin not initialized"
- Verifica que `FIREBASE_SERVICE_ACCOUNT_KEY` esté configurada
- Asegúrate de que el JSON esté en una sola línea
- Valida que el service account tenga permisos

### Error: "Module not found"
- Ejecuta `npm run build` antes de `npm start`
- Verifica que las extensiones `.js` estén en los imports

### Error: "Invalid Firebase token"
- Regenera el service account key
- Verifica que el project_id sea correcto
- Asegúrate de usar Firebase Admin SDK, no Client SDK

## 📈 Monitoreo

### Health Check
```bash
curl http://localhost:5000/health
```

### Logs
- Logs estructurados con contexto
- Errores detallados en desarrollo
- IDs de request para tracking

## 🔄 Migración desde JavaScript

Completada la migración:
- ✅ TypeScript configurado
- ✅ Firebase Admin SDK implementado
- ✅ Tipos definidos
- ✅ Rutas migradas
- ✅ Middleware actualizado
- ✅ Scripts de utilidad

## 📚 Referencias

- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [TypeScript Express](https://expressjs.com/en/guide/typescript.html)
- [Wellhub Partner API](https://developers.wellhub.com/)
- [Zod Validation](https://zod.dev/) 