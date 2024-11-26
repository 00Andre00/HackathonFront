import { createApp } from 'vue'; // Importar Vue
import { createPinia } from 'pinia'; // Importar Pinia

import App from './App.vue'; // Tu componente principal
import router from './router'; // El enrutador
import '@/assets/main.css'

// Importa Firebase
import { app, auth, firestore } from '@/firebase';

// Crear la instancia de la app Vue
const vueApp = createApp(App); // Crear la instancia de la app Vue

// Usar Pinia y Router
vueApp.use(createPinia()); // Usar Pinia
vueApp.use(router); // Usar Vue Router

// Proveer las instancias de Firebase a toda la app
vueApp.provide('firebaseApp', app);
vueApp.provide('auth', auth);
vueApp.provide('firestore', firestore);

// Montar la app en el DOM
vueApp.mount('#app');
