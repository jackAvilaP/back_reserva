const dotenv = require('dotenv');

const { getStorage } = require('firebase/storage');
const { initializeApp } = require('firebase/app');

dotenv.config({path: "./config.env"});

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId:  process.env.FIREBASE_PROJECT_ID,
    storageBucket:  process.env.FIREBASE_API_STORAGE,
    appId:  process.env.FIREBASE_API_ID
  };

const firebasApp = initializeApp(firebaseConfig);

const storage = getStorage(firebasApp);

module.exports = { storage };