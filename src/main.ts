import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Navbar from '@/components/Navbar.vue'

// Importa Firebase
import { app, auth, firestore } from 'src/firebase'

// Crear la instancia de la app Vue
const vueApp = createApp(App)

// Registrar el componente globalmente
vueApp.component('Navbar', Navbar)

// Usar Pinia y Router
vueApp.use(createPinia())
vueApp.use(router)

// Proveer las instancias de Firebase a toda la app
vueApp.provide('firebaseApp', app)
vueApp.provide('auth', auth)
vueApp.provide('firestore', firestore)

// Montar la app en el DOM
vueApp.mount('#app')
