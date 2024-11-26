import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Importa Firebase
import { app, auth, firestore } from '@/firebase'

// Crear la instancia de la app Vue
const vueApp = createApp(App)

App.use(createPinia())
App.use(router)

// Usar Pinia y Router
vueApp.use(createPinia())
vueApp.use(router)

// Proveer las instancias de Firebase a toda la app
vueApp.provide('firebaseApp', app)
vueApp.provide('auth', auth)
vueApp.provide('firestore', firestore)

// Montar la app en el DOM
vueApp.mount('#app')
