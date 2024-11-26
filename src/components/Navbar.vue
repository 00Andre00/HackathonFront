<template>
  <nav>
    <ul>
      <li><router-link to="/inicio">Inicio</router-link></li>
      <!-- Mostrar botón de Dashboard solo si es admin -->
      <li v-if="rol === 'administrador'"><router-link to="/dashboard">Dashboard</router-link></li>
      <li><button @click="logout">Cerrar sesión</button></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useUsuarioStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const usuarioStore = useUsuarioStore()
const router = useRouter()

// Obtener el rol del usuario desde el store
const rol = usuarioStore.rol

// Función para cerrar sesión
const logout = () => {
  usuarioStore.logout()
  router.push('/')  // Redirigir al login después de cerrar sesión
}
</script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 10px;
}

ul {
  display: flex;
  gap: 10px;
}

li {
  list-style-type: none;
}

a {
  color: white;
  text-decoration: none;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
}
</style>
