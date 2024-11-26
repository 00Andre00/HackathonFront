<template>
    <div class="register-container">
      <h2>Registrar nuevo usuario</h2>
      <form @submit.prevent="register">
        <div>
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="role">Rol:</label>
          <select v-model="role" id="role">
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { setDoc, doc } from 'firebase/firestore'
  import { auth, firestore } from '@/firebase'
  
  const email = ref('')
  const password = ref('')
  const role = ref('usuario')
  const errorMessage = ref('')
  
  const register = async () => {
    if (!email.value || !password.value) {
      errorMessage.value = 'Por favor, ingresa todos los campos.'
      return
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
  
      // Guardar el rol del usuario en Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        role: role.value
      })
  
      console.log('Usuario registrado con éxito y rol guardado en Firestore')
  
      // Redirigir al login o dashboard, dependiendo de tu flujo
    } catch (error) {
      console.error('Error al registrar al usuario:', error)
      errorMessage.value = 'Hubo un error al registrar el usuario.'
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  