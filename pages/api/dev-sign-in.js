/* eslint-disable global-require, import/no-unresolved */
const path = require('path');
const fs = require('fs');

const DEV_USER = {
  uid: 'dev-test-user',
  email: 'dev-test-user@example.com',
  displayName: 'Dev Test User',
};

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'production') {
    res.status(404).end();
    return;
  }

  try {
    // Import firebase-admin and its auth module
    // eslint-disable-next-line global-require, import/no-unresolved
    const admin = require('firebase-admin');
    // eslint-disable-next-line global-require, import/no-unresolved
    const { getAuth } = require('firebase-admin/auth');

    // Check if already initialized
    let app;
    try {
      app = admin.getApp();
    } catch (e) {
      // App not initialized yet
      const serviceAccountPath = path.join(process.cwd(), '.secrets', 'serviceAccountKey.json');
      const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');
      const serviceAccount = JSON.parse(serviceAccountJson);

      app = admin.initializeApp({
        credential: admin.cert(serviceAccount),
      });
    }

    const auth = getAuth(app);

    await auth.getUser(DEV_USER.uid).catch(() => auth.createUser(DEV_USER));
    const token = await auth.createCustomToken(DEV_USER.uid);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Dev sign-in error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
