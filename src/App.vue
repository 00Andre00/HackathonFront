<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { useUsuarioStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const usuarioStore = useUsuarioStore()

onMounted(() => {
  const storedRole = localStorage.getItem('userRole')
  if (storedRole) {
    usuarioStore.setRol(storedRole)
  }
})
</script>

<template>
  <Navbar v-if="usuarioStore.authenticated" />
  <RouterView />
</template>
