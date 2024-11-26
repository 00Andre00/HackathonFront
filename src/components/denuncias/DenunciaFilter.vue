<template>
    <div>
      <label>Estado:</label>
      <select v-model="filters.estado" @change="applyFilter">
        <option value="">Todos</option>
        <option value="Admitido">Admitido</option>
        <option value="No Admitido">No Admitido</option>
        <option value="En proceso">En proceso</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: {
          estado: '',
        },
      };
    },
    methods: {
      applyFilter() {
        this.$emit('filter', this.filters);
      },
    },
  };
  </script>
  