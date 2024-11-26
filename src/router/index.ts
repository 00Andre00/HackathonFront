import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '@/views/Inicio.vue';
import Inicio2 from '@/views/Inicio2.vue';
import Login from '@/views/Login.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/inicio2', name: 'Inicio2', component: Inicio2 },
  { path: '/login', name: 'Login', component: Login } 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
