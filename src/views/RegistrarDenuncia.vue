<template>
    <div>
      <h1>Registro de Denuncias</h1>
      <DenunciaForm />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import DenunciaForm from "@/components/denuncias/DenunciaForm.vue";
  
  export default defineComponent({
    name: "RegistrarDenuncia",
    components: {
      DenunciaForm,
    },
  });
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  </style>
  