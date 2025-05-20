import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// Para simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON
const serviceAccountPath = path.join(__dirname, '../config/serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


async function verifyGoogleToken(token) {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return {
      googleId: decoded.uid,
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture,
    };
  } catch (err) {
    throw new Error("Token inválido o expirado");
  }
}


export default {
  verifyGoogleToken
};
