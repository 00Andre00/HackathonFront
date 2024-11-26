// src/firebase/firebase.js

// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";

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
const app = initializeApp(firebaseConfig);

// Exportar la instancia de Firebase para usarla en otros archivos
export { app };
