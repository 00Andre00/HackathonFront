<template>
    <div>
      <h2>Detalles de Denuncia</h2>
      <p>Fecha: {{ denuncia.fecha }}</p>
      <p>Auditor: {{ denuncia.auditor }}</p>
      <p>Estado: {{ denuncia.estado }}</p>
      <div>
        <label for="estado">Actualizar Estado:</label>
        <select v-model="denuncia.estado">
          <option>Admitido</option>
          <option>No Admitido</option>
          <option>En proceso</option>
        </select>
        <button @click="updateDenuncia">Actualizar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        denuncia: {},
      };
    },
    methods: {
      fetchDenuncia() {
        // Simulación: puedes usar servicios reales
        this.denuncia = {
          fecha: '2024-11-26',
          auditor: 'Carlos',
          estado: 'En proceso',
        };
      },
      updateDenuncia() {
        console.log('Denuncia actualizada:', this.denuncia);
      },
    },
    mounted() {
      this.fetchDenuncia();
    },
  };
  </script>
  