const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("../config/serviceAccountKey.json")),
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


module.exports = {
  verifyGoogleToken
};
