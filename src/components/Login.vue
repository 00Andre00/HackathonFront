<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div>
        <img src="../assets/img/abc.png" alt="Contraloria">
      </div>
      <!-- Título -->
      <h2 class="text-2xl font-semibold text-center text-gray-700">Iniciar sesión</h2>
      <p class="mt-2 text-center text-sm text-gray-500">
        ¿Aún no tienes una cuenta? 
        <router-link to="/registro" class="text-blue-500 hover:underline">Regístrate aquí</router-link>.
      </p>

      <!-- Formulario -->
      <form @submit.prevent="login" class="mt-6">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            id="email"
            v-model="username"
            required
            placeholder="Correo electrónico"
            class="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <div class="relative">
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Contraseña"
              class="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Botón de inicio de sesión -->
        <button
          type="submit"
          class="w-full px-4 py-3 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          INICIAR SESIÓN
        </button>
      </form>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
        {{ errorMessage }}
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
    const userDoc = await getDoc(doc(firestore, 'users', uid))

    if (userDoc.exists()) {
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
.error {
  color: red;
}
</style>