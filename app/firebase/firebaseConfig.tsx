// firebase/firebaseConfig.tsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// ✅ Firebase config (same as sa console mo)
const firebaseConfig = {
  apiKey: "AIzaSyAo_MhsDMQ5uB99L-GY567pUD-dN90e9p8",
  authDomain: "tricomplain.firebaseapp.com",
  databaseURL: "https://tricomplain-default-rtdb.firebaseio.com",
  projectId: "tricomplain",
  storageBucket: "tricomplain.firebasestorage.app",
  messagingSenderId: "544319175423",
  appId: "1:544319175423:web:c75de4b1add1cec0b1aaca",
  measurementId: "G-8T751HLBFX",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Services
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
