<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-700">Iniciar sesión</h2>
      <p class="mt-2 text-center text-sm text-gray-500">
        Ingresa tus credenciales para continuar.
      </p>

      <form @submit.prevent="login" class="mt-6">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">Usuario</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Ingresa tu usuario"
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Ingresa tu contraseña"
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Iniciar sesión
        </button>
      </form>

      <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <p class="mt-4 text-center text-sm text-gray-500">
        ¿No tienes una cuenta? 
        <router-link to="/registro" class="text-blue-500 hover:underline">Regístrate aquí</router-link>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, signInWithEmailAndPassword, getDoc, doc, firestore } from '@/firebase'
import { useUsuarioStore } from '@/stores/userStore'

// Variables reactivas
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const usuarioStore = useUsuarioStore()

// Función para iniciar sesión
const login = async () => {
  if (username.value === '' || password.value === '') {
    errorMessage.value = 'Por favor, ingresa tus credenciales.'
    return
  }

  try {
    // Iniciar sesión con Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, username.value, password.value)
    const user = userCredential.user

    // Obtener el rol del usuario desde Firestore
    const userRole = await getUserRole(user.uid)

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
      errorMessage.value = 'No se pudo obtener el rol del usuario.'
    }
  } catch (error) {
    errorMessage.value = 'Credenciales incorrectas o error en la autenticación.'
    console.error(error)
  }
}

// Obtener el rol del usuario desde Firestore usando el uid
const getUserRole = async (uid: string): Promise<string | null> => {
  try {
    // Obtener el documento del usuario desde Firestore
    const userDoc = await getDoc(doc(firestore, 'users', uid))

    if (userDoc.exists()) {
      // Retornar el rol del usuario
      return userDoc.data()?.role || null
    } else {
      return null
    }
  } catch (error) {
    console.error('Error al obtener el rol del usuario:', error)
    return null
  }
}
</script>

<style scoped>
/* Estilo para los mensajes de error */
.error {
  color: red;
}
</style>