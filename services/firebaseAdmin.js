const admin = require("firebase-admin");

// Load the service account JSON uploaded as a Render secret
const serviceAccount = require("/opt/render/project/env/serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firestore and Admin for use in your app
const db = admin.firestore();
module.exports = { admin, db };
