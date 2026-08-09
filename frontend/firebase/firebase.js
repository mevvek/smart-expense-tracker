import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVgPycrrSqClxovqLPE6b50eNrKT_LGUg",
  authDomain: "smart-expense-tracker-1f1a0.firebaseapp.com",
  projectId: "smart-expense-tracker-1f1a0",
  storageBucket: "smart-expense-tracker-1f1a0.firebasestorage.app",
  messagingSenderId: "150320478409",
  appId: "1:150320478409:web:e7d1714506bc9c5fbb3518",
  measurementId: "G-QR9CR1EE0P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();