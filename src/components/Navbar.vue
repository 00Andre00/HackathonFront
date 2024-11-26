<script lang="ts" setup>
</script>

<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between">
      <h1 class="text-lg font-bold">¡Bad Boys!</h1>
      <ul class="flex space-x-4">
        <li>
          <RouterLink to="/" class="hover:text-blue-400">Inicio</RouterLink>
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="/inicio2" class="hover:text-blue-400">Inicio 2</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
</style>
  