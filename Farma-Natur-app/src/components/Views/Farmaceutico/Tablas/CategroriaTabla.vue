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
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                @click="abrirModalEditar(categoria)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors ml-2"
                @click="abrirModalEliminar(categoria.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal Editar -->
      <Teleport to="body">
        <div
          v-if="modalEditarVisible"
          class="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-transform duration-300 scale-100"
          >
            <h2 class="text-xl font-semibold mb-4 text-blue-700">Editar Categoría</h2>
            <form @submit.prevent="guardarEdicionCategoria">
              <div class="mb-4">
                <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                <input
                  id="nombre"
                  type="text"
                  v-model="categoriaAEditar.nombre"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div class="flex justify-end mt-6">
                <button
                  type="button"
                  class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 mr-2 transition-colors"
                  @click="cerrarModalEditar"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { getCategorias, editCategoria } from '../services/categoriaServices.js';
  
  const categorias = ref([]);
  const modalEditarVisible = ref(false);
  const modalEliminarVisible = ref(false);
  const categoriaSeleccionada = ref('');
  const categoriaAEditar = ref({ id: null, nombre: '' });
  const categoriaAEliminarId = ref(null);
  
  onMounted(async () => {
    await cargarCategorias();
  });
  
  const cargarCategorias = async () => {
    try {
      categorias.value = await getCategorias();
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };
  
  const abrirModalEditar = (categoria) => {
  categoriaSeleccionada.value = categoria.nombre; // Guarda el nombre actual
  categoriaAEditar.value = { nombre: categoria.nombre }; // Inicializa el nuevo nombre con el actual
  modalEditarVisible.value = true;
  modalEliminarVisible.value = false;
};
const cerrarModalEditar = () => {
  modalEditarVisible.value = false;
  categoriaSeleccionada.value = '';
  categoriaAEditar.value = { nombre: '' };
};
  
const guardarEdicionCategoria = async () => {
  try {
    await editCategoria(categoriaSeleccionada.value, { nombre: categoriaAEditar.value.nombre });
    await cargarCategorias();
    cerrarModalEditar();
  } catch (error) {
    if (error.response) {
      console.error("Error del backend:", error.response.data);
    } else {
      console.error("Error al actualizar la categoría:", error);
    }
  }
};
  
  const abrirModalEliminar = (id) => {
    categoriaAEliminarId.value = id;
    modalEliminarVisible.value = true;
    modalEditarVisible.value = false;
  };
  
  const cerrarModalEliminar = () => {
    modalEliminarVisible.value = false;
    categoriaAEliminarId.value = null;
  };
  
  const confirmarEliminarCategoria = async () => {
    try {
      await deleteCategoria(categoriaAEliminarId.value);
      await cargarCategorias();
      cerrarModalEliminar();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };
  </script>
  
  
  
  <style scoped>
  /* Estilos para la tabla (sin cambios) */
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