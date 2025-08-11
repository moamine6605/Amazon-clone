import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "clone-6f203.firebaseapp.com",
  projectId: "clone-6f203",
  storageBucket: "clone-6f203.firebasestorage.app",
  messagingSenderId: "484817421290",
  appId: "1:484817421290:web:aef468cbecf4c9da87a893",
  measurementId: "G-VQMNRY5F3C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);