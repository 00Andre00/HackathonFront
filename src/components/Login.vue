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
.error {
  color: red;
}
</style>
