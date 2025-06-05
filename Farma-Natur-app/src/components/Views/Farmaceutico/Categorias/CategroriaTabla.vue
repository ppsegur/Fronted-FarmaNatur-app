<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Categorías</h2>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Nombre</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Número de productos </th>
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
            {{
              conteoProductos.find((item) => item.getNombre === categoria.nombre)?.getNumProductos || 0
            }}
          </td>
          <td class="border border-gray-300 px-4 py-2 flex justify-center gap-2 ">
            <IconButton
              tooltip="Editar"
              color="blue"
              @click="abrirModalEditar(categoria)"
            >
              <path
                d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              />
            </IconButton>
            <IconButton
              tooltip="Eliminar"
              color="red"
              @click="abrirModalEliminar(categoria)"
            >
              <path
                d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"
              />
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Eliminar -->
    <Teleport to="body">
      <div v-if="modalEliminarVisible" class="modal-overlay">
        <div class="modal-box">
          <img
            src="../../../../assets/img/DeleteImageModal.png"
            alt="Eliminar categoría"
          />
          <h2 class="modal-title" style="color:#e53e3e;">Eliminar Categoría</h2>
          <div class="modal-text">
            ¿Estás seguro de que deseas eliminar la categoría <strong>{{ categoriaAEliminarNombre }}</strong>?
          </div>
          <div class="flex justify-center gap-4 mt-6">
            <button
              type="button"
              class="custom-button bg-gray-200 text-gray-700"
              @click="cerrarModalEliminar"
            >
              <span>Cancelar</span>
            </button>
            <button
              type="button"
              class="custom-button-delete bg-red-500 text-white"
              @click="confirmarEliminarCategoria"
            >
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Editar -->
    <Teleport to="body">
      <div v-if="modalEditarVisible" class="modal-overlay">
        <div class="modal-box">
          <h2 class="modal-title" style="color:#2563eb;">Editar Categoría</h2>
          <form @submit.prevent="guardarEdicionCategoria">
            <div class="formField">
              <input
                type="text"
                v-model="categoriaAEditar.nombre"
                required
              />
              <span>Nombre</span>
            </div>
            <div class="flex justify-center gap-4 mt-6">
              <button
                type="button"
                class="custom-button bg-gray-200 text-gray-700"
                @click="cerrarModalEditar"
              >
                <span>Cancelar</span>
              </button>
              <button
                type="submit"
                class="custom-button bg-blue-500 text-white"
              >
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import IconButton from '../botones/IconButton.vue';
import { onMounted, ref, watch } from 'vue';
import { getCategorias, editCategoria, deleteCategoria, contarProductosPorCategoria } from '../services/categoriaServices.js';

const categorias = ref([]);
const modalEditarVisible = ref(false);
const modalEliminarVisible = ref(false);
const categoriaSeleccionada = ref('');
const categoriaAEditar = ref({ id: null, nombre: '' });
const categoriaAEliminarNombre = ref('');
const conteoProductos = ref([]);

watch([modalEditarVisible, modalEliminarVisible], ([editar, eliminar]) => {
  document.body.style.overflow = (editar || eliminar) ? 'hidden' : 'auto';
});

onMounted(async () => {
  await cargarCategorias();
  await cargarConteoProductos();
});

const cargarCategorias = async () => {
  try {
    categorias.value = await getCategorias();
  } catch (error) {
    console.error("Error al obtener categorías:", error);
  }
};

const abrirModalEditar = (categoria) => {
  categoriaSeleccionada.value = categoria.nombre;
  categoriaAEditar.value = { nombre: categoria.nombre };
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

const abrirModalEliminar = (categoria) => {
  categoriaAEliminarNombre.value = categoria.nombre;
  modalEliminarVisible.value = true;
  modalEditarVisible.value = false;
};

const cerrarModalEliminar = () => {
  modalEliminarVisible.value = false;
  categoriaAEliminarNombre.value = '';
};

const confirmarEliminarCategoria = async () => {
  try {
    await deleteCategoria(categoriaAEliminarNombre.value);
    await cargarCategorias();
    cerrarModalEliminar();
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
  }
};

const cargarConteoProductos = async () => {
  try {
    const response = await contarProductosPorCategoria();
    conteoProductos.value = response.data;
  } catch (error) {
    console.error("Error al obtener el conteo de productos:", error);
  }
};
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

td.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
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

/* MODALES IGUAL QUE EN CITAS */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(174, 244, 174, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-box {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
  text-align: center;
  position: relative;
  animation: modalIn 0.3s;
}

@keyframes modalIn {
  from { transform: translateY(40px) scale(0.95); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}

.modal-box img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  margin-bottom: 18px;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 1rem;
}

.modal-text {
  color: #444;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.flex {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 1.5rem;
}

/* Inputs del modal */
.formField {
  margin: 18px 0 0 0;
  position: relative;
  width: 100%;
}

.formField input {
  width: 100%;
  padding: 10px 15px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #f1f1f1;
  color: #333;
  font-size: 16px;
  font-weight: 550;
  transition: 0.3s;
  box-shadow: 0 0 0 2px transparent;
}

.formField input:hover,
.formField input:focus {
  box-shadow: 0 0 0 2px #35eb25;
}

.formField span {
  position: absolute;
  left: 15px;
  top: 10px;
  color: #666;
  font-size: 15px;
  font-weight: 600;
  pointer-events: none;
  transition: 0.2s;
  background: transparent;
}

.formField input:focus + span,
.formField input:valid + span {
  transform: translateY(-22px) scale(0.95);
  color: #4deb25;
  background: #fff;
  padding: 0 4px;
}

/* Botones igual que en Citas */
.custom-button {
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  border-radius: 500px;
  overflow: hidden;
  background: #66ff66;
  color: ghostwhite;
  transition: all 0.4s ease;
}

.custom-button span {
  position: relative;
  z-index: 50;
  transition: color 0.4s;
}

.custom-button:hover span {
  color: black;
}

.custom-button::before {
  content: "";
  background: #000;
  width: 120%;
  left: -10%;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 0;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.custom-button:hover::before {
  transform: translate3d(100%, 0, 0);
}

.custom-button-delete {
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  border-radius: 500px;
  overflow: hidden;
  background: #ff0000;
  color: ghostwhite;
  transition: all 0.4s ease;
}

.custom-button-delete span {
  position: relative;
  z-index: 50;
  transition: color 0.4s;
}

.custom-button-delete:hover span {
  color: black;
}

.custom-button-delete::before {
  content: "";
  background: #000000;
  width: 120%;
  color: white;
  left: -10%;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 0;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.custom-button-delete:hover::before {
  transform: translate3d(100%, 0, 0);
}
</style>