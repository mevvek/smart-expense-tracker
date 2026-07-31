// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVgPycrrSqClxovqLPE6b50eNrKT_LGUg",
  authDomain: "smart-expense-tracker-1f1a0.firebaseapp.com",
  projectId: "smart-expense-tracker-1f1a0",
  storageBucket: "smart-expense-tracker-1f1a0.firebasestorage.app",
  messagingSenderId: "150320478409",
  appId: "1:150320478409:web:e7d1714506bc9c5fbb3518",
  measurementId: "G-QR9CR1EE0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();