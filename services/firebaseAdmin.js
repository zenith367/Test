const admin = require("firebase-admin");

// Load the service account JSON from Render secret
const serviceAccount = JSON.parse(process.env['serviceAccountKey.json']);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firestore and Admin for use in your app
const db = admin.firestore();
module.exports = { admin, db };
