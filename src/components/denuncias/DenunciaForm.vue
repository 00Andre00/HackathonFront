<template>
  <form @submit.prevent="submitForm">
    <h2>Registrar Nueva Denuncia</h2>
    <div class="form-group">
      <label for="titulo">Título</label>
      <input
        type="text"
        id="titulo"
        v-model="denuncia.titulo"
        placeholder="Ingresa un título"
        required
      />
    </div>
    <div class="form-group">
      <label for="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        v-model="denuncia.descripcion"
        placeholder="Describe la denuncia"
        required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="auditor">Auditor Asignado</label>
      <input
        type="text"
        id="auditor"
        v-model="denuncia.auditor"
        placeholder="Nombre del auditor"
      />
    </div>
    <div class="form-group">
      <label for="estado">Estado</label>
      <select id="estado" v-model="denuncia.estado" required>
        <option value="En proceso">En proceso</option>
        <option value="Admitido">Admitido</option>
        <option value="No Admitido">No Admitido</option>
        <option value="Derivado">Derivado</option>
      </select>
    </div>
    <button type="submit">Registrar Denuncia</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { firestore } from "@/firebase";
import { collection, addDoc } from "firebase/firestore"; // Importar las funciones necesarias

export default defineComponent({
  name: "DenunciaForm",
  setup() {
    const denuncia = reactive({
      titulo: "",
      descripcion: "",
      auditor: "",
      estado: "En proceso",
      fecha: new Date().toISOString().split("T")[0], // Fecha actual
    });

    const submitForm = async () => {
      try {
        // Referencia a la colección "denuncias" en Firestore
        const denunciaRef = collection(firestore, "denuncias");

        // Añadir la denuncia a la base de datos
        await addDoc(denunciaRef, denuncia);
        alert("Denuncia registrada con éxito.");
        
        // Reiniciar el formulario
        denuncia.titulo = "";
        denuncia.descripcion = "";
        denuncia.auditor = "";
        denuncia.estado = "En proceso";
      } catch (error) {
        console.error("Error al registrar la denuncia:", error);
      }
    };

    return {
      denuncia,
      submitForm,
    };
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
form input,
form textarea,
form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.7rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
