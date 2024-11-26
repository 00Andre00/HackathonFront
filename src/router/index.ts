import { createRouter, createWebHistory } from 'vue-router'
import { useUsuarioStore } from '@/stores/userStore'
import Login from '@/components/Login.vue'
import Inicio from '@/views/Inicio.vue'
import Dashboard from '@/components/Dashboard.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/inicio', name: 'Inicio', component: Inicio },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, adminOnly: true },  // Solo accesible por admins
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guardia de navegación para verificar si el usuario está autenticado
router.beforeEach((to, from, next) => {
  const usuarioStore = useUsuarioStore()

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Si no está autenticado, redirigir al login
    if (!usuarioStore.authenticated) {
      next('/')  // Redirigir al login
    } else if (to.meta.adminOnly && usuarioStore.rol !== 'administrador') {
      next('/')  // Redirigir al inicio si no es admin
    } else {
      next()  // Permitir el acceso
    }
  } else {
    next()  // Continuar sin restricciones
  }
})

export default router;
