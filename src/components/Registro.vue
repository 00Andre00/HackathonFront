<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <div>
          <img src="../assets/img/abc.png" alt="Contraloria">
        </div>
        <h2 class="text-2xl font-semibold text-center text-gray-700">Crear una cuenta</h2>
        <form @submit.prevent="register" class="mt-6">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Correo electrónico</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Ingresa tu correo"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-600">Rol</label>
            <select
              id="role"
              v-model="role"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="" disabled>Selecciona un rol</option>
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full px-4 py-3 text-white bg-red-600 rounded-lg font-medium hover:bg-red-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Registrarse
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">{{ errorMessage }}</p>
        <p class="mt-4 text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta? 
          <router-link to="/" class="text-red-500 hover:underline">Inicia sesión</router-link>.
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { auth, createUserWithEmailAndPassword, firestore, doc, setDoc } from '@/firebase'
  
  // Variables reactivas
  const email = ref('')
  const password = ref('')
  const role = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  // Función para registrar al usuario
  const register = async () => {
    if (email.value === '' || password.value === '' || role.value === '') {
      errorMessage.value = 'Por favor, completa todos los campos.'
      return
    }
  
    try {
      // Crear usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
  
      // Guardar información del usuario en Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: email.value,
        role: role.value,
      })
  
      // Redirigir al login
      router.push('/')
    } catch (error) {
      errorMessage.value = 'Hubo un error al registrar al usuario.'
      console.error(error)
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  