// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase config object (can be empty for emulator use)
const firebaseConfig = {};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Set up Firebase Auth and connect to emulator
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

// Set up Firestore and connect to emulator
const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

export { auth, db };
