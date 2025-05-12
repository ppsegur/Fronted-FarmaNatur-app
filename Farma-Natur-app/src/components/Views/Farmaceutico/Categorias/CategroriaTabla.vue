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
        <!-- Modal de eliminar -->
    <Teleport to="body">
<div
  v-if="modalEliminarVisible"
  class="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
>
  <div
    class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm transform transition-transform duration-300 scale-100"
  > 
  <!-- Imagen dentro del modal -->
  <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
  <img
    src="../../../../assets/img/DeleteImageModal.png"
    alt="Eliminar categoría"
    style="width: 96px; height: 96px; object-fit: cover;"
  />
</div>
    <h2 class="text-xl font-semibold mb-4 text-red-700">Eliminar Categoría</h2>
    <p class="mb-7 text-black-700">
      ¿Estás seguro de que deseas eliminar la categoría <strong>{{ categoriaAEliminarNombre }}</strong>?
    </p>
    <div class="flex justify-center gap-4 mt-6">
  <button
    type="button"
    class="custom-button bg-gray-200 text-gray-700 mr-2"
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
      <div
        v-if="modalEditarVisible"
        class="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-transform duration-300 scale-100"
        >
          <h2 class="text-xl font-semibold mb-4 text-black-700"> Editar Categoría</h2>
          <br>
          <form @submit.prevent="guardarEdicionCategoria">
            <div class="mb-4">
              <div class="input-container">
  <input
    id="nombre"
    type="text"
    v-model="categoriaAEditar.nombre"
    class="input"
    placeholder=" "
  />
  <label for="nombre" class="label">Nombre</label>
  <div class="topline"></div>
  <div class="underline"></div>
  </div>
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
    class="custom-button bg-blue-500 text-white flex items-center justify-center"
    @click="guardarEdicionCategoria"
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
import { getCategorias, editCategoria, deleteCategoria } from '../services/categoriaServices.js';

const categorias = ref([]);
const modalEditarVisible = ref(false);
const modalEliminarVisible = ref(false);
const categoriaSeleccionada = ref('');
const categoriaAEditar = ref({ id: null, nombre: '' });
const categoriaAEliminarNombre = ref('');

watch([modalEditarVisible, modalEliminarVisible], ([editar, eliminar]) => {
document.body.style.overflow = (editar || eliminar) ? 'hidden' : 'auto';
});



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
</script>



<style scoped>
/* Estilos para la tabla */
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
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #aef4ae;
  z-index: 1000;
  width: 500px;
  height: 300px;
  margin-left: 350px;
  margin-top: 200px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.655);
}
/* Estilo para centrar y bajar los botones */
.flex {
  justify-content: center;
  gap: 16px; /* Espaciado entre botones */
}

.mt-6 {
  margin-top: 24px; /* Bajar los botones */
}



.modal-text {
  gap: 4px;
  font-size: 1rem;
  font-weight: bold; /* Letras más fuertes */
  color: #4a5568; /* Gris oscuro */
  margin-bottom: 24px;
}
/* Contenedor del input */
.input-container {
  position: relative;
  margin-bottom: 16px;
}

/* Estilo del input */
.input {
  padding: 10px;
  height: 40px;
  width: 100%;
  border: 2px solid #0B2447;
  border-top: none;
  border-bottom: none;
  font-size: 16px;
  background: transparent;
  outline: none;
  box-shadow: 7px 7px 0px 0px #0B2447;
  transition: all 0.5s;
}

.input:focus {
  box-shadow: none;
  transition: all 0.5s;
}

/* Estilo del label */
.label {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #0B2447;
  font-size: 14px;
  transition: all 0.5s;
  transform: scale(0);
  z-index: -1;
}

/* Línea superior animada */
.input-container .topline {
  position: absolute;
  background-color: #0B2447;
  width: 0%;
  height: 2px;
  right: 0;
  top: 0;
  transition: all 0.5s;
}

.input-container input[type="text"]:focus ~ .topline {
  width: 35%;
  transition: all 0.5s;
}

/* Línea inferior animada */
.input-container .underline {
  position: absolute;
  background-color: #0B2447;
  width: 0%;
  height: 2px;
  right: 0;
  bottom: 0;
  transition: all 0.5s;
}

.input-container input[type="text"]:focus ~ .underline {
  width: 100%;
  transition: all 0.5s;
}

/* Animación del label al enfocar */
.input-container input[type="text"]:focus ~ .label {
  top: -10px;
  transform: scale(1);
  transition: all 0.5s;
}
/*Estilos para los botones de los mosales */
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
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  font-weight: 500;
  font-size: 14px;
  border-radius: 500px;
  overflow: hidden;
  align-items: center;
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

.custom-button::before,
.custom-button::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.custom-button::before {
  content: "";
  background: #000;
  width: 120%;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.custom-button:hover::before {
  transform: translate3d(100%, 0, 0);
}

/**Estilos botones de eliminar  */
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
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  font-weight: 500;
  font-size: 14px;
  border-radius: 500px;
  overflow: hidden;
  align-items: center;
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

.custom-button-delete::before,
.custom-button-delete::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.custom-button-delete::before {
  content: "";
  background: #000000;
  width: 120%;
  color:white;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.custom-button-delete:hover::before {
  transform: translate3d(100%, 0, 0);
}

</style>