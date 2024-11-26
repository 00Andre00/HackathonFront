<template>
    <div class="login-container">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUsuarioStore } from '@/stores/userStore'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  const usuarioStore = useUsuarioStore()
  
  const login = () => {
    if (username.value === '' || password.value === '') {
      errorMessage.value = 'Por favor, ingresa tus credenciales.'
      return
    }
  
    const userRole = fakeLogin(username.value, password.value)
  
    if (userRole) {
      usuarioStore.setRol(userRole)
      localStorage.setItem('userRole', userRole)
  
      // Redirigir al lugar correspondiente dependiendo del rol
      if (userRole === 'administrador') {
        router.push('/dashboard')
      } else {
        router.push('/inicio')
      }
    } else {
      errorMessage.value = 'Credenciales incorrectas.'
    }
  }
  
  const fakeLogin = (username: string, password: string): string | null => {
    if (username === 'admin' && password === 'admin123') {
      return 'administrador'
    } else if (username === 'user' && password === 'user123') {
      return 'usuario'
    } else {
      return null
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>  