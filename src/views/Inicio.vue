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
              <th scope="col" class="px-6 py-3 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" class="bg-white hover:bg-gray-50">
              <td class="px-6 py-4 border-b">{{ index + 1 }}</td>
              <td class="px-6 py-4 border-b">{{ item.nombre }}</td>
              <td class="px-6 py-4 border-b">{{ item.descripcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.estado}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulario para agregar datos -->
      <div class="mt-8 flex flex-col items-center">
        <button
          type="submit"
          class="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Lista de elementos iniciales
const items = ref([
  { nombre: 'Ejemplo 1', descripcion: 'Descripción del ejemplo 1', estado: 'Pendiente' },
  { nombre: 'Ejemplo 2', descripcion: 'Descripción del ejemplo 2', estado: 'Inválido' },
])

// Datos para un nuevo registro
const newItem = ref({
  nombre: '',
  descripcion: '',
  estado: ''
})

// Función para agregar un nuevo registro a la lista
const addItem = () => {
  if (newItem.value.nombre && newItem.value.descripcion && newItem.value.estado) {
    items.value.push({ ...newItem.value })
    newItem.value.nombre = ''
    newItem.value.descripcion = ''
    newItem.value.estado = ''
  }
}
</script>

<style scoped>
/* Estilo adicional si es necesario */
</style>
