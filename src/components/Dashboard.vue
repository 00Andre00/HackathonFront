<template>
    <template v-if="load">
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div class="bg-white rounded-lg shadow-lg p-6 h-auto mt-4 animate-pulse duration-200">
          <div class="block space-y-5">
            <h2 class="bg-gray-200 h-10 w-full rounded-md skeleton-loader duration-200"></h2>
            <h2 class="bg-gray-200 h-14 w-full rounded-md skeleton-loader duration-200"></h2>
            <h2 class="bg-gray-200 h-14 w-full rounded-md skeleton-loader duration-200"></h2>
            <h2 class="bg-gray-200 h-10 mt-1 w-[5%] rounded-md skeleton-loader duration-200"></h2>
            <h2 class="bg-gray-200 h-14 mt-4 w-full rounded-md skeleton-loader duration-200"></h2>
          </div>
        </div>
      </div>
    </div>
    </template>

    <template v-else>
  <div class="flex-1 p-10 font-Roboto bg-gray-100 min-h-screen">
    <div class="mt-6 space-y-10">
      <!-- Título -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Gestión de Registros</h2>

      <!-- Filtro por Estado -->
      <div class="flex items-center space-x-4">
        <label for="estado" class="text-gray-700 font-medium">Filtrar por estado:</label>
        <select
          id="estado"
          v-model="selectedEstado"
          @change="filtrarPorEstado"
          class="border-gray-300 rounded-lg px-4 py-2 shadow focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos</option>
          <option value="Desestimado">Desestimado</option>
          <option value="Para servvicio de control">Para servvicio de control</option>
        </select>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto mt-4">
        <table class="w-full max-w-full bg-white border rounded-md shadow">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 border-b">#</th>
              <th scope="col" class="px-6 py-3 border-b">Ámbito Geográfico</th>
              <th scope="col" class="px-6 py-3 border-b">Auditor de Evaluación</th>
              <th scope="col" class="px-6 py-3 border-b">Auditor de Recepción</th>
              <th scope="col" class="px-6 py-3 border-b">Año</th>
              <th scope="col" class="px-6 py-3 border-b">Distrito</th>
              <th scope="col" class="px-6 py-3 border-b">Entidad</th>
              <th scope="col" class="px-6 py-3 border-b">Fecha de Culminación de Evaluación</th>
              <th scope="col" class="px-6 py-3 border-b">Fecha de Evaluación</th>
              <th scope="col" class="px-6 py-3 border-b">Fecha de Recepción</th>
              <th scope="col" class="px-6 py-3 border-b">Registro de Recepción</th>
              <th scope="col" class="px-6 py-3 border-b">Provincia</th>
              <th scope="col" class="px-6 py-3 border-b">Resultado de Etapa de Evaluación</th>
              <th scope="col" class="px-6 py-3 border-b">Resultado de Etapa de Recepción</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredItems"
              :key="item.id"
              class="bg-white hover:bg-gray-50"
            >
              <td class="px-6 py-4 border-b">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td class="px-6 py-4 border-b">{{ item.ambitoGeografico }}</td>
              <td class="px-6 py-4 border-b">{{ item.auditorEncargadoDeLaEtapaDeEvaluacion }}</td>
              <td class="px-6 py-4 border-b">{{ item.auditorEncargadoDeLaFechaDeRecepcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.añoDeIngreso }}</td>
              <td class="px-6 py-4 border-b">{{ item.distrito }}</td>
              <td class="px-6 py-4 border-b">{{ item.entidadSujetaAControl }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaDeCulminacionDeLaEtapaDeEvaluacion }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaDeEvaluacion }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaDeRecepcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaDeRegistroDeRecepcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.provincia }}</td>
              <td class="px-6 py-4 border-b">{{ item.resultadoDeLaEtapaDeEvaluacion }}</td>
              <td class="px-6 py-4 border-b">{{ item.resultadoDeLaEtapaDeRecepcion }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Controles de Paginación -->
      <div class="flex items-center justify-between mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>
        <span class="text-gray-700">Página {{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="!hasMore"
          class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>



</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { firestore } from '@/firebase'
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore'

// Variables reactivas
const load = ref(false)
const items = ref<Registro[]>([]) // Lista de registros completos
const filteredItems = ref<Registro[]>([]) // Lista filtrada
const selectedEstado = ref('') // Estado seleccionado para filtrar
const itemsPerPage = 10 // Cantidad de registros por página
const currentPage = ref(1) // Página actual
const lastVisible = ref(null) // Último documento visible en Firestore
const hasMore = ref(true) // Si hay más registros disponibles

// Define el tipo de datos
interface Registro {
  id?: string
  ambitoGeografico: string
  auditorEncargadoDeLaEtapaDeEvaluacion: string
  auditorEncargadoDeLaFechaDeRecepcion: string
  añoDeIngreso: string
  distrito: string
  entidadSujetaAControl: string
  fechaDeCulminacionDeLaEtapaDeEvaluacion: string
  fechaDeEvaluacion: string
  fechaDeRecepcion: string
  fechaDeRegistroDeRecepcion: string
  provincia: string
  resultadoDeLaEtapaDeEvaluacion: string
  resultadoDeLaEtapaDeRecepcion: string
}

// Función para filtrar registros por estado
const filtrarPorEstado = () => {
  if (selectedEstado.value === '') {
    filteredItems.value = items.value // Mostrar todos si no hay filtro
  } else {
    filteredItems.value = items.value.filter(
      (item) => item.resultadoDeLaEtapaDeEvaluacion === selectedEstado.value
    )
  }
}

// Función para obtener datos de Firestore con paginación
const obtenerRegistros = async (reset: boolean = false) => {
  load.value = true
  try {
    if (reset) {
      items.value = []
      lastVisible.value = null
      currentPage.value = 1
      hasMore.value = true
    }

    const registrosQuery = lastVisible.value
      ? query(
          collection(firestore, 'registros'),
          orderBy('ambitoGeografico'),
          startAfter(lastVisible.value),
          limit(itemsPerPage)
        )
      : query(
          collection(firestore, 'registros'),
          orderBy('ambitoGeografico'),
          limit(itemsPerPage)
        )

    const querySnapshot = await getDocs(registrosQuery)

    if (!querySnapshot.empty) {
      const nuevosRegistros = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Registro))

      items.value = nuevosRegistros
      filteredItems.value = nuevosRegistros // Actualizar la lista filtrada
      lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1]
      hasMore.value = nuevosRegistros.length === itemsPerPage
    } else {
      hasMore.value = false
    }
  } catch (error) {
    console.error('Error al obtener registros:', error)
  } finally {
    load.value = false
  }
}

// Función para ir a la página anterior
const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    await obtenerRegistros(true)
  }
}

// Función para ir a la página siguiente
const nextPage = async () => {
  if (hasMore.value) {
    currentPage.value++
    await obtenerRegistros()
  }
}

// Cargar los datos al montar el componente
onMounted(() => {
  obtenerRegistros()
})
</script>
