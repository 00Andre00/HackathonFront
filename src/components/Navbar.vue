<template>
  <nav class="bg-gray-800 text-white px-6 py-4 shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Menú de navegación -->
      <ul class="flex items-center space-x-6">
        <!-- Mostrar "Inicio" para todos los usuarios -->
        <li v-if="rol === 'usuario'">
          <router-link
            to="/inicio"
            class="hover:text-blue-400 font-medium text-lg"
          >
            Inicio
          </router-link>
        </li>

        <!-- Mostrar "Dashboard" solo para administradores -->
        <li v-if="rol === 'administrador'">
          <router-link
            to="/dashboard"
            class="hover:text-blue-400 font-medium text-lg"
          >
            Dashboard
          </router-link>
        </li>
      </ul>

      <!-- Botón de cerrar sesión -->
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Cerrar sesión
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUsuarioStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const usuarioStore = useUsuarioStore()
const router = useRouter()

// Reactividad para el rol
const rol = computed(() => usuarioStore.rol)

// Función para cerrar sesión
const logout = () => {
  usuarioStore.logout()
  router.push('/') // Redirigir al login después de cerrar sesión
}
</script>

<style scoped>
/* Mejoras de diseño */
nav {
  background-color: #1f2937; /* Gris oscuro */
  color: white;
}

button {
  font-size: 14px;
  font-weight: bold;
  border: none;
}
</style>
