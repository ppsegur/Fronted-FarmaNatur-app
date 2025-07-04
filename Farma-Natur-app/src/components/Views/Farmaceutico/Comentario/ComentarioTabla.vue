<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Comentarios</h2>
    <!-- Buscar y filtro de comentarios -->
    <div class="filtros-barra mb-4 flex gap-4 items-center">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar comentario..."
        class="input-busqueda"
      />
      <select v-model="filtroCliente" class="select-filtro">
        <option value="">Todos los clientes</option>
        <option
          v-for="cliente in clientesUnicos"
          :key="cliente"
          :value="cliente"
        >{{ cliente }}</option>
      </select>
      <select v-model="filtroProducto" class="select-filtro">
        <option value="">Todos los productos</option>
        <option
          v-for="producto in productosUnicos"
          :key="producto"
          :value="producto"
        >{{ producto }}</option>
      </select>
    </div>

    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Comentario</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Producto</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Categoría</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Cliente</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Precio</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Stock</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="comentario in comentariosFiltrados"
          :key="comentario.id"
          class="hover:bg-green-200 transition-colors duration-200"
        >
          <td class="border border-gray-300 px-4 py-2">{{ comentario.comentario }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.producto?.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.producto?.categoria?.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.cliente?.username }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.producto?.precio }} €</td>
          <td class="border border-gray-300 px-4 py-2">{{ comentario.producto?.stock }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <IconButton
              tooltip="Eliminar"
              color="red"
              @click="abrirDialogEliminar(comentario)"
            >
              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"/>
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de confirmación de eliminación -->
    <dialog ref="dialogEliminar" class="dialog-eliminar">
      <div class="dialog-content">
        <h3 class="text-red-600 font-bold text-xl mb-2">¿Eliminar comentario?</h3>
        <p class="text-gray-700 mb-6">¿Seguro que deseas eliminar este comentario?</p>
        <div class="flex justify-center gap-4">
          <button 
            type="button" 
            class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            @click="cerrarDialogEliminar"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            @click="confirmarEliminarComentario"
          >
            Eliminar
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import IconButton from '../botones/IconButton.vue';
import { getAllComentarios, deleteComentario } from '../services/comentarioServices.js';

const comentarios = ref([]);
const dialogEliminar = ref(null);
const comentarioAEliminar = ref(null);

const abrirDialogEliminar = (comentario) => {
  comentarioAEliminar.value = comentario;
  dialogEliminar.value.showModal();
};

const cerrarDialogEliminar = () => {
  dialogEliminar.value.close();
  comentarioAEliminar.value = null;
};

const confirmarEliminarComentario = async () => {
  try {
    await deleteComentario(comentarioAEliminar.value.cliente.id, comentarioAEliminar.value.producto.id);
    comentarios.value = await getAllComentarios(0, 50);
    cerrarDialogEliminar();
  } catch (error) {
    alert('Error al eliminar el comentario');
    console.error(error);
  }
};

const busqueda = ref('');
const filtroCliente = ref('');
const filtroProducto = ref('');

// Computados para los select únicos
const clientesUnicos = computed(() =>
  [...new Set(comentarios.value.map(c => c.cliente?.username || ''))].filter(Boolean)
);
const productosUnicos = computed(() =>
  [...new Set(comentarios.value.map(c => c.producto?.nombre || ''))].filter(Boolean)
);

// Computado para filtrar comentarios
const comentariosFiltrados = computed(() => {
  return comentarios.value.filter(c => {
    const coincideBusqueda =
      (c.comentario || '').toLowerCase().includes(busqueda.value.toLowerCase()) ||
      (c.cliente?.username || '').toLowerCase().includes(busqueda.value.toLowerCase()) ||
      (c.producto?.nombre || '').toLowerCase().includes(busqueda.value.toLowerCase());
    const coincideCliente = !filtroCliente.value || (c.cliente?.username === filtroCliente.value);
    const coincideProducto = !filtroProducto.value || (c.producto?.nombre === filtroProducto.value);
    return coincideBusqueda && coincideCliente && coincideProducto;
  });
});

onMounted(async () => {
  try {
    comentarios.value = await getAllComentarios(0, 50);
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

.dialog-eliminar {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 12px;
  padding: 0;
  width: auto;
  max-width: 90vw;
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.18);
  background: transparent;
  z-index: 1000;
}

.dialog-eliminar::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  min-width: 300px;
  max-width: 500px;
  text-align: center;
}
.dialog-content button {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s,
    transform 0.15s;
  box-shadow: 0 2px 8px #0001;
  outline: none;
  margin: 0 0.2rem;
  display: inline-block;
}

.dialog-content button:active {
  transform: scale(0.97);
}

.dialog-content .bg-gray-200 {
  background: #f3f4f6;
  color: #222;
  border: 2px solid #bdbdbd;
}

.dialog-content .bg-gray-200:hover {
  background: #e5e7eb;
  color: #111;
  border-color: #22c55e;
}

.dialog-content .bg-red-600 {
  background: linear-gradient(90deg, #dc2626 60%, #ef4444 100%);
  color: #fff;
  border: 2px solid #dc2626;
}

.dialog-content .bg-red-600:hover {
  background: linear-gradient(90deg, #b91c1c 60%, #dc2626 100%);
  color: #fff;
  border-color: #b91c1c;
}
/* Estilos para el buscar y el filtrado de comentarios  */
.filtros-barra {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  justify-content: flex-start;
}

.input-busqueda {
  border: 1.5px solid #a7f3d0;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  width: 220px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  background: #f6fff8;
}

.input-busqueda:focus {
  border-color: #38b2ac;
  background: #e6fffa;
}

.select-filtro {
  border: 1.5px solid #a7f3d0;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background: #f6fff8;
  outline: none;
  transition: border 0.2s;
}

.select-filtro:focus {
  border-color: #38b2ac;
  background: #e6fffa;
}
</style>