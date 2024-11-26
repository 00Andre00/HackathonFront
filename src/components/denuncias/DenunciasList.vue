<template>
    <div>
      <h2>Lista de Denuncias</h2>
      <DenunciaFilter @filter="applyFilter" />
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Auditor</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="denuncia in filteredDenuncias" :key="denuncia.id">
            <td>{{ denuncia.fecha }}</td>
            <td>{{ denuncia.auditor }}</td>
            <td>{{ denuncia.estado }}</td>
            <td>
              <button @click="viewDetail(denuncia)">Ver Detalle</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import DenunciaFilter from './DenunciaFilter.vue';
  export default {
    components: { DenunciaFilter },
    data() {
      return {
        denuncias: [],
        filteredDenuncias: [],
      };
    },
    methods: {
      fetchDenuncias() {
        // Simula la carga de datos
        this.denuncias = [
          { id: 1, fecha: '2024-11-26', auditor: 'Carlos', estado: 'Admitido' },
          { id: 2, fecha: '2024-11-25', auditor: 'Nancy', estado: 'En proceso' },
        ];
        this.filteredDenuncias = this.denuncias;
      },
      applyFilter(filters) {
        this.filteredDenuncias = this.denuncias.filter((d) =>
          Object.keys(filters).every((key) => d[key] === filters[key])
        );
      },
      viewDetail(denuncia) {
        this.$router.push({ name: 'DenunciaDetail', params: { id: denuncia.id } });
      },
    },
    mounted() {
      this.fetchDenuncias();
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table th,
  table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  </style>
  