<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="fecha">Fecha:</label>
        <input type="date" v-model="denuncia.fecha" />
      </div>
      <div>
        <label for="auditor">Auditor:</label>
        <input type="text" v-model="denuncia.auditor" />
      </div>
      <div>
        <label for="estado">Estado:</label>
        <select v-model="denuncia.estado">
          <option>Admitido</option>
          <option>No Admitido</option>
          <option>En proceso</option>
        </select>
      </div>
      <button type="submit">Registrar Denuncia</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        denuncia: {
          fecha: '',
          auditor: '',
          estado: '',
        },
      };
    },
    methods: {
      submitForm() {
        this.$emit('save', this.denuncia);
        this.denuncia = { fecha: '', auditor: '', estado: '' }; // Resetea el formulario
      },
    },
  };
  </script>
  