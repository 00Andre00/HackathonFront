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
              <th scope="col" class="px-6 py-3 border-b">Fecha de Recepción</th>
              <th scope="col" class="px-6 py-3 border-b">Año de Ingreso</th>
              <th scope="col" class="px-6 py-3 border-b">Entidad Sujeta a Control</th>
              <th scope="col" class="px-6 py-3 border-b">Ámbito Geográfico</th>
              <th scope="col" class="px-6 py-3 border-b">Provincia</th>
              <th scope="col" class="px-6 py-3 border-b">Distrito</th>
              <th scope="col" class="px-6 py-3 border-b">Fecha de Registro Recepción</th>
              <th scope="col" class="px-6 py-3 border-b">Auditor Encargado de la Etapa de Recepción</th>
              <th scope="col" class="px-6 py-3 border-b">Fecha de Evaluación de la Admisión o No de la Denuncia</th>
              <th scope="col" class="px-6 py-3 border-b">Resultado de la Etapa de Recepción</th>
              <th scope="col" class="px-6 py-3 border-b">Auditor Encargado de la Etapa de Evaluación</th>
              <th scope="col" class="px-6 py-3 border-b">Fecha de Culminación de la Evaluación</th>
              <th scope="col" class="px-6 py-3 border-b">Resultado de la Etapa de la Evaluación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" class="bg-white hover:bg-gray-50">
              <td class="px-6 py-4 border-b">{{ index + 1 }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaRecepcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.anoIngreso }}</td>
              <td class="px-6 py-4 border-b">{{ item.entidadSujetaControl }}</td>
              <td class="px-6 py-4 border-b">{{ item.ambitoGeografico }}</td>
              <td class="px-6 py-4 border-b">{{ item.provincia }}</td>
              <td class="px-6 py-4 border-b">{{ item.distrito }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaRegistroRecepcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.auditorEncargadoRecepcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaEvaluacionAdmision }}</td>
              <td class="px-6 py-4 border-b">{{ item.resultadoRecepcion }}</td>
              <td class="px-6 py-4 border-b">{{ item.auditorEncargadoEvaluacion }}</td>
              <td class="px-6 py-4 border-b">{{ item.fechaCulminacionEvaluacion }}</td>
              <td class="px-6 py-4 border-b">{{ item.resultadoEvaluacion }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulario para agregar datos -->
      <div class="mt-8">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Agregar nuevo registro</h3>
        <form @submit.prevent="addItem" class="grid grid-cols-1 gap-4">
          <div>
            <label for="fechaRecepcion" class="block text-sm font-medium text-gray-700">Fecha de Recepción</label>
            <input
              type="date"
              id="fechaRecepcion"
              v-model="newItem.fechaRecepcion"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="anoIngreso" class="block text-sm font-medium text-gray-700">Año de Ingreso</label>
            <select
              id="anoIngreso"
              v-model="newItem.anoIngreso"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Selecciona un año</option>
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
          <div>
            <label for="entidadSujetaControl" class="block text-sm font-medium text-gray-700">Entidad Sujeta a Control</label>
            <input
              type="text"
              id="entidadSujetaControl"
              v-model="newItem.entidadSujetaControl"
              placeholder="Escribe la entidad sujeta a control"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="ambitoGeografico" class="block text-sm font-medium text-gray-700">Ámbito Geográfico</label>
            <input
              type="text"
              id="ambitoGeografico"
              v-model="newItem.ambitoGeografico"
              placeholder="Escribe el ámbito geográfico"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="provincia" class="block text-sm font-medium text-gray-700">Provincia</label>
            <input
              type="text"
              id="provincia"
              v-model="newItem.provincia"
              placeholder="Escribe la provincia"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="distrito" class="block text-sm font-medium text-gray-700">Distrito</label>
            <input
              type="text"
              id="distrito"
              v-model="newItem.distrito"
              placeholder="Escribe el distrito"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="fechaRegistroRecepcion" class="block text-sm font-medium text-gray-700">Fecha de Registro Recepción</label>
            <input
              type="date"
              id="fechaRegistroRecepcion"
              v-model="newItem.fechaRegistroRecepcion"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="auditorEncargadoRecepcion" class="block text-sm font-medium text-gray-700">Auditor Encargado de la Etapa de Recepción</label>
            <input
              type="text"
              id="auditorEncargadoRecepcion"
              v-model="newItem.auditorEncargadoRecepcion"
              placeholder="Escribe el nombre del auditor"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="fechaEvaluacionAdmision" class="block text-sm font-medium text-gray-700">Fecha de Evaluación de la Admisión o No de la Denuncia</label>
            <input
              type="date"
              id="fechaEvaluacionAdmision"
              v-model="newItem.fechaEvaluacionAdmision"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="resultadoRecepcion" class="block text-sm font-medium text-gray-700">Resultado de la Etapa de Recepción</label>
            <input
              type="text"
              id="resultadoRecepcion"
              v-model="newItem.resultadoRecepcion"
              placeholder="Escribe el resultado"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="auditorEncargadoEvaluacion" class="block text-sm font-medium text-gray-700">Auditor Encargado de la Etapa de Evaluación</label>
            <input
              type="text"
              id="auditorEncargadoEvaluacion"
              v-model="newItem.auditorEncargadoEvaluacion"
              placeholder="Escribe el nombre del auditor"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="fechaCulminacionEvaluacion" class="block text-sm font-medium text-gray-700">Fecha de Culminación de la Evaluación</label>
            <input
              type="date"
              id="fechaCulminacionEvaluacion"
              v-model="newItem.fechaCulminacionEvaluacion"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="resultadoEvaluacion" class="block text-sm font-medium text-gray-700">Resultado de la Etapa de la Evaluación</label>
            <input
              type="text"
              id="resultadoEvaluacion"
              v-model="newItem.resultadoEvaluacion"
              placeholder="Escribe el resultado"
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
  {
    fechaRecepcion: '2023-01-01',
    anoIngreso: 2023,
    entidadSujetaControl: 'Entidad 1',
    ambitoGeografico: 'Ámbito 1',
    provincia: 'Provincia 1',
    distrito: 'Distrito 1',
    fechaRegistroRecepcion: '2023-01-02',
    auditorEncargadoRecepcion: 'Auditor 1',
    fechaEvaluacionAdmision: '2023-01-03',
    resultadoRecepcion: 'Resultado 1',
    auditorEncargadoEvaluacion: 'Auditor 2',
    fechaCulminacionEvaluacion: '2023-01-04',
    resultadoEvaluacion: 'Resultado 2'
  },
  {
    fechaRecepcion: '2023-02-01',
    anoIngreso: 2023,
    entidadSujetaControl: 'Entidad 2',
    ambitoGeografico: 'Ámbito 2',
    provincia: 'Provincia 2',
    distrito: 'Distrito 2',
    fechaRegistroRecepcion: '2023-02-02',
    auditorEncargadoRecepcion: 'Auditor 3',
    fechaEvaluacionAdmision: '2023-02-03',
    resultadoRecepcion: 'Resultado 3',
    auditorEncargadoEvaluacion: 'Auditor 4',
    fechaCulminacionEvaluacion: '2023-02-04',
    resultadoEvaluacion: 'Resultado 4'
  }
])

// Datos para un nuevo registro
const newItem = ref({
  fechaRecepcion: '',
  anoIngreso: '',
  entidadSujetaControl: '',
  ambitoGeografico: '',
  provincia: '',
  distrito: '',
  fechaRegistroRecepcion: '',
  auditorEncargadoRecepcion: '',
  fechaEvaluacionAdmision: '',
  resultadoRecepcion: '',
  auditorEncargadoEvaluacion: '',
  fechaCulminacionEvaluacion: '',
  resultadoEvaluacion: ''
})

// Función para agregar un nuevo registro a la lista
const addItem = () => {
  if (
    newItem.value.fechaRecepcion &&
    newItem.value.anoIngreso &&
    newItem.value.entidadSujetaControl &&
    newItem.value.ambitoGeografico &&
    newItem.value.provincia &&
    newItem.value.distrito &&
    newItem.value.fechaRegistroRecepcion &&
    newItem.value.auditorEncargadoRecepcion &&
    newItem.value.fechaEvaluacionAdmision &&
    newItem.value.resultadoRecepcion &&
    newItem.value.auditorEncargadoEvaluacion &&
    newItem.value.fechaCulminacionEvaluacion &&
    newItem.value.resultadoEvaluacion
  ) {
    items.value.push({ ...newItem.value, anoIngreso: Number(newItem.value.anoIngreso) })
    newItem.value.fechaRecepcion = ''
    newItem.value.anoIngreso = ''
    newItem.value.entidadSujetaControl = ''
    newItem.value.ambitoGeografico = ''
    newItem.value.provincia = ''
    newItem.value.distrito = ''
    newItem.value.fechaRegistroRecepcion = ''
    newItem.value.auditorEncargadoRecepcion = ''
    newItem.value.fechaEvaluacionAdmision = ''
    newItem.value.resultadoRecepcion = ''
    newItem.value.auditorEncargadoEvaluacion = ''
    newItem.value.fechaCulminacionEvaluacion = ''
    newItem.value.resultadoEvaluacion = ''
  }
}
</script>

<style scoped>
/* Estilo adicional si es necesario */
</style>