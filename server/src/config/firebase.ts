import admin from "firebase-admin";
import { readFileSync } from "fs";


// Inicializar Firebase Admin solo si no está ya inicializado
if (!admin.apps.length) {
  try {
    // Intentar usar la variable de entorno GOOGLE_APPLICATION_CREDENTIALS primero
    const serviceAccount = JSON.parse(
      readFileSync(
        "./src/config/oliviacaredev-firebase-adminsdk-fbsvc-8203277de4.json",
        "utf8"
      )
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });

    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw error;
  }
}

export const db = admin.firestore();
export default admin;
