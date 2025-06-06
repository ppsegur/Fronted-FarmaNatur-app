<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Comentarios</h2>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Contenido</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Autor</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="comentario in comentarios"
          :key="comentario.id"
          class="hover:bg-green-200 transition-colors duration-200"
        >
          <td class="border border-gray-300 px-4 py-2">{{ comentario.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.contenido }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.autor?.username || comentario.cliente?.username || 'Desconocido' }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.fecha ? new Date(comentario.fecha).toLocaleString() : '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllComentarios } from '../services/comentarioServices.js';

const comentarios = ref([]);

onMounted(async () => {
  try {
    comentarios.value = await getAllComentarios(0, 50); // Puedes ajustar el tamaño
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
  }
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
  background-color: #d4f4dd;
}

.table-auto thead th {
  background-color: #e6f7e6;
  color: #2f855a;
}

.table-auto tbody td {
  color: #4a5568;
  font-size: 0.875rem;
}
</style>