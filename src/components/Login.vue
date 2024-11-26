<template>
  <div class="flex items-center justify-center min-h-screen bg-cover bg-center relative">
    <div class="absolute inset-0 bg-[url('../assets/img/bkg.jpeg')] bg-cover bg-center opacity-50"></div>
    <div class="relative w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
      <div>
        <img src="../assets/img/abc.png" alt="Contraloria" />
      </div>
      <!-- Título -->
      <h2 class="text-2xl font-semibold text-center text-gray-700">Iniciar sesión</h2>
      <p class="mt-2 text-center text-sm text-gray-500">
        ¿Aún no tienes una cuenta?
        <router-link to="/registro" class="text-red-500 hover:underline">Regístrate aquí</router-link>.
      </p>

      <!-- Formulario -->
      <form @submit.prevent="login" class="mt-6">
        <div class="mb-4">
          <label for="email" class="block text-xm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            id="email"
            v-model="username"
            required
            placeholder="Correo electrónico"
            class="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="mb-8">
          <label for="password" class="block text-xm font-medium text-gray-700">Contraseña</label>
          <div class="relative">
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Contraseña"
              class="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Botón de inicio de sesión -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-3 text-white bg-red-600 rounded-lg font-medium hover:bg-red-700 focus:ring-4 focus:ring-blue-300 focus:outline-none flex items-center justify-center"
        >
          <template v-if="loading">
            <!-- Spinner -->
            <svg
              class="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.28.805 4.374 2.143 6.057l1.857-1.766z"
              ></path>
            </svg>
            Cargando...
          </template>
          <template v-else>
            INICIAR SESIÓN
          </template>
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

interface Registro {
  id?: string // El ID será opcional porque lo añadiremos después
  ambitoGeografico: string
  provincia: string
  entidadSujetaControl: string
}

interface Registro {
  id?: string // El ID será opcional porque lo añadiremos después
  ambitoGeografico: string
  provincia: string
  entidadSujetaControl: string
}


// Variables reactivas
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false) // Estado de carga
const router = useRouter()
const usuarioStore = useUsuarioStore()

// Función para iniciar sesión
const login = async () => {
  if (username.value === '' || password.value === '') {
    errorMessage.value = 'Por favor, ingresa tus credenciales.'
    return
  }

  loading.value = true // Activar el estado de carga

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
  } finally {
    loading.value = false // Desactivar el estado de carga
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
/* No es necesario más estilo aquí si usas Tailwind para el fondo */
.error {
  color: red;
}
</style>
