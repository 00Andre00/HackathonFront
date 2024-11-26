<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <!-- Título -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Gestión de Datos</h2>

      <!-- Tabla -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead class="bg-gray-50 text-gray-700 uppercase text-sm">
            <tr>
              <th scope="col" class="px-6 py-3 border-b">#</th>
              <th scope="col" class="px-6 py-3 border-b">Nombre</th>
              <th scope="col" class="px-6 py-3 border-b">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" class="bg-white hover:bg-gray-50">
              <td class="px-6 py-4 border-b">{{ index + 1 }}</td>
              <td class="px-6 py-4 border-b">{{ item.nombre }}</td>
              <td class="px-6 py-4 border-b">{{ item.descripcion }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulario para agregar datos -->
      <div class="mt-8">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Agregar nuevo registro</h3>
        <form @submit.prevent="addItem" class="grid grid-cols-1 gap-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="newItem.nombre"
              placeholder="Escribe el nombre"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              id="descripcion"
              v-model="newItem.descripcion"
              placeholder="Escribe la descripción"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Lista de años para el selector de años
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

// Lista de elementos iniciales
const items = ref([
  { nombre: 'Ejemplo 1', descripcion: 'Descripción del ejemplo 1' },
  { nombre: 'Ejemplo 2', descripcion: 'Descripción del ejemplo 2' },
])

// Datos para un nuevo registro
const newItem = ref({
  nombre: '',
  descripcion: '',
})

// Función para agregar un nuevo registro a la lista
const addItem = () => {
  if (newItem.value.nombre && newItem.value.descripcion) {
    items.value.push({ ...newItem.value })
    newItem.value.nombre = ''
    newItem.value.descripcion = ''
  }
}
</script>

<style scoped>
/* Estilo adicional si es necesario */
</style>