import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'

import App from './App.vue'
import router from './router'
import Navbar from '@/components/Navbar.vue';


const app = createApp(App)

app.component('Navbar', Navbar)
app.use(createPinia())
app.use(router)

app.mount('#app')
