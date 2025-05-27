const admin = require("firebase-admin");
const env = require("dotenv").config("../.env");

admin.initializeApp({ 
    projectId: env.GOOGLE_CLOUD_PROJECT,
    credential: admin.credential.applicationDefault(), 
});

module.exports = admin;