import admin from "firebase-admin";
class FirebaseAuth {
  constructor() {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      }),
      databaseURL: process.env.FIRESTORE_DATABASE,
    });
    const db = app.firestore();
    db.settings({ timestampsInSnapshots: true });
    this.collection = db.collection(process.env.FIRESTORE_COLLECTION);
  }

  async getDocuments() {
    const snaps = await this.collection.get();
    return snaps.docs.map((doc) => doc.data());
  }
}

export default FirebaseAuth;
