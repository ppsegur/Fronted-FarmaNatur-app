<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Citas</h2>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Paciente</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Fecha</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Hora</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="cita in citas"
          :key="cita.id"
          class="hover:bg-green-200 transition-colors duration-200"
        >
          <td class="border border-gray-300 px-4 py-2">{{ cita.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ cita.paciente }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ cita.fecha }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ cita.hora }}</td>
          <td class="border border-gray-300 px-4 py-2 flex justify-center gap-2">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              @click="editarCita(cita)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              @click="eliminarCita(cita.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCitas } from '../services/citasServices.js';

const citas = ref([]);

const cargarCitas = async () => {
  try {
    const response = await getCitas();
    citas.value = response.data; // Asigna las citas obtenidas
  } catch (error) {
    console.error('Error al obtener las citas:', error);
  }
};


onMounted(() => {
  cargarCitas();
});
</script>

<style scoped>
.table-auto {
  border-spacing: 0;
}

th,
td {
  text-align: left;
  padding: 12px 16px;
}

th {
  font-size: 1rem;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #e5f7e5;
}
</style>