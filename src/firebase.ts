// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app'; // Importación tipo-only
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth'; // Importación tipo-only
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore'; // Importación tipo-only

// Configuración de Firebase (esto lo obtienes desde tu consola de Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDTk1WY33v3HYrKJXYs4VV1p4xkMOx57zg",
  authDomain: "hackathon-2c86e.firebaseapp.com",
  projectId: "hackathon-2c86e",
  storageBucket: "hackathon-2c86e.firebasestorage.app",
  messagingSenderId: "475519267269",
  appId: "1:475519267269:web:fc302ba14211d50f241bac"
};

// Inicializar Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Exportar las instancias de Firebase que necesites
const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);

export { app, auth, firestore };
