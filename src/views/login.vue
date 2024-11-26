<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-semibold">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-semibold">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { auth, signInWithEmailAndPassword } from '@/firebase';
  
  export default defineComponent({
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref<string | null>(null);
  
      const handleLogin = async () => {
        errorMessage.value = null;  // Clear any previous error message
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          // Redirect to another page after successful login (optional)
          console.log('Logged in successfully');
        } catch (error) {
          errorMessage.value = 'Invalid email or password';
          console.error(error);
        }
      };
  
      return {
        email,
        password,
        errorMessage,
        handleLogin
      };
    }
  });
  </script>
  
  <style scoped>
  /* Optional styles for customizations */
  </style>
  