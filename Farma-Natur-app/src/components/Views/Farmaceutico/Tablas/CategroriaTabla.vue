<template>
    <div>
      <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Categorías</h2>
      <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
        <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Nombre</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Acciones</th>

        </tr>
      </thead>
      <tbody>
        <tr
          v-for="categoria in categorias"
          :key="categoria.id"
          class="hover:bg-green-200 transition-colors duration-200"
        >
          <td class="border border-gray-300 px-4 py-2">{{ categoria.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ categoria.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <!-- Botones de acción -->
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              @click="editarCategoria(categoria.id)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors ml-2"
              @click="eliminarCategoria(categoria.id)"
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
  import { onMounted, ref } from 'vue';
  import { getCategorias } from '../services/categoriaServices.js';
  
  const categorias = ref([]);
  
  onMounted(async () => {
    try {
      categorias.value = await getCategorias();
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  });
  </script>

  
<style scoped>
/* Estilos  para la tabla */
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