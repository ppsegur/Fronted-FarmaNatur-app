<template>
<div>
<h2 class="text-xl font-bold mb-4 text-green-700">Listado de Citas</h2>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Titulo</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Farmaceutico</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Paciente</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Fecha</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Hora</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Precio</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Oferta</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Turno</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Acciones</th>
        </tr>
      </thead>
     <tbody>
<tr
  v-for="cita in citas"
  :key="cita.tittle + cita.fecha_inicio"
  :class="['transition-colors', 'duration-200', turnoClase(obtenerTurno(cita.fecha_inicio))]"
>
  <td class="border border-gray-300 px-6 py-2 ">{{ cita.tittle }}</td>
  <td class="border border-gray-300 px-4 py-2">{{ cita.usernameFarma?.username }}</td>
  <td class="border border-gray-300 px-4 py-2">{{ cita.usernameCliente?.username }}</td>
  <td class="border border-gray-300 px-6 py-2 min-w-[140px]">{{ cita.fecha_inicio.slice(0, 10) }}</td>
  <td class="border border-gray-300 px-6 py-2 min-w-[100px]">{{ cita.fecha_inicio.slice(11, 16) }}</td>
  <td class="border border-gray-300 px-4 py-2">{{ cita.precio }}</td>
  <td class="border border-gray-300 px-4 py-2">{{ cita.oferta }}</td>
  <td class="border border-gray-300 px-4 py-2">{{ obtenerTurno(cita.fecha_inicio) }}</td>
<td class="border border-gray-300 px-4 py-2 flex justify-center gap-2">
  <IconButton
    tooltip="Editar"
    color="blue"
    @click="editarCita(cita)"
  >
    <path
      d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    />
  </IconButton>
  <IconButton
  tooltip="Eliminar"
  color="red"
  @click="abrirModalEliminar(cita)"
>
  <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"/>
</IconButton>
</td>
  </tr>
</tbody>
    </table>
  </div>
<Teleport to="body">
  <div v-if="modalEditarVisible" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-title" style="color:greenyellow;">Editar Cita</div>
      <form @submit.prevent="guardarCitaEditada">
       <div class="formField">
  <input type="text" v-model="citaSeleccionada.titulo" required />
  <span>Título</span>
</div>
<div class="formField">
  <input type="datetime-local" v-model="citaSeleccionada.fecha_inicio" required />
  <span>Fecha Inicio</span>
</div>
<div class="formField">
  <input type="datetime-local" v-model="citaSeleccionada.fecha_fin" required />
  <span>Fecha Fin</span>
</div>
<div class="formField">
  <input type="number" v-model="citaSeleccionada.precio" required />
  <span>Precio</span>
</div>
<div class="formField">
  <select v-model="citaSeleccionada.oferta" required>
    <option :value="true">Sí</option>
    <option :value="false">No</option>
  </select>
  <span>Oferta</span>
</div>
        <div class="modal-actions">
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
<Teleport to="body">
  <div v-if="modalEliminarVisible" class="modal-overlay">
    <div class="modal-box">
      <img
        src="../../../../assets/img/DeleteImageModal.png"
        alt="Eliminar cita"
      />
      <div class="modal-title">Eliminar Cita</div>
      <div class="modal-text">
        ¿Estás seguro de que deseas eliminar la cita <strong>{{ citaAEliminar?.tittle }}</strong>?
      </div>
      <div class="modal-actions">
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
          @click="confirmarEliminarCita"
        >
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  </div>
</Teleport>

</template>

<script setup>
import IconButton from '../botones/IconButton.vue';
import { ref, onMounted } from 'vue';
import { getCitas, deleteCita, updateCita } from '../services/citasServices.js';
import { getUsuarioByUsername } from '../services/usuariosServices.js';
const citas = ref([]);

const citaSeleccionada = ref(null);
const modalEditarVisible = ref(false);
const cargarCitas = async () => {
  try {
    const response = await getCitas();
    citas.value = response.data.map(cita => ({
      ...cita,
      titulo: cita.tittle || cita.titulo // Soporta ambos por compatibilidad
    }));
  } catch (error) {
    console.error('Error al obtener las citas:', error);
  }
};
//Método para obtener la columna del turno 
function obtenerTurno(fecha) {
  const hora = parseInt(fecha.slice(11, 13));
  if (hora >= 6 && hora < 14) return 'Mañana';
  if (hora >= 14 && hora < 20) return 'Tarde';
  return 'Noche';
}

//Función para el hover segun el turno
function turnoClase(turno) {
  if (turno === 'Mañana') return 'hover-manana';
  if (turno === 'Tarde') return 'hover-tarde';
  if (turno === 'Noche') return 'hover-noche';
  return '';
}
const cerrarModalEditar = () => {
  modalEditarVisible.value = false;
  citaSeleccionada.value = null;
};

const editarCita = (cita) => {
  citaSeleccionada.value = { ...cita };
  modalEditarVisible.value = true;
};
console.log("Cita seleccionada:", citaSeleccionada.value);

const guardarCitaEditada = async () => {
  try {
    // 1. Obtener los IDs a partir de los usernames
    const clienteResp = await getUsuarioByUsername(
      typeof citaSeleccionada.value.usernameCliente === 'object'
        ? citaSeleccionada.value.usernameCliente.username
        : citaSeleccionada.value.usernameCliente
    );
    const farmaceuticoResp = await getUsuarioByUsername(
      typeof citaSeleccionada.value.usernameFarma === 'object'
        ? citaSeleccionada.value.usernameFarma.username
        : citaSeleccionada.value.usernameFarma
    );

    const clienteId = clienteResp.data.id;
    const farmaceuticoId = farmaceuticoResp.data.id;
    const fechaInicio = citaSeleccionada.value.fecha_inicio;

    // 2. Llama a updateCita con los IDs y el DTO
    console.log("Lo que ase manda al BAckend:", {
      clienteId,
      farmaceuticoId,
      fecha_inicio: fechaInicio,
      titulo: citaSeleccionada.value.titulo,
      usernameFarma: farmaceuticoResp.data.username,
      usernameCliente: clienteResp.data.username,
      precioCita: citaSeleccionada.value.precio,
      especial: citaSeleccionada.value.oferta,
      fecha_inicio: citaSeleccionada.value.fecha_inicio,
      fecha_fin: citaSeleccionada.value.fecha_fin,
    });
 await updateCita(
  { clienteId, farmaceuticoId, fecha_inicio: fechaInicio },
  {
    tittle: citaSeleccionada.value.titulo,
      usernameFarma: { id: farmaceuticoResp.data.id }, 
    usernameCliente: { id: clienteResp.data.id },    
    precio: citaSeleccionada.value.precio,
    oferta: citaSeleccionada.value.oferta,
    fecha_inicio: citaSeleccionada.value.fecha_inicio,
    fecha_fin: citaSeleccionada.value.fecha_fin,
  }
);

    await cargarCitas();
    modalEditarVisible.value = false;
  } catch (error) {
    console.error("Error actualizando cita:", error);
  }
};
const modalEliminarVisible = ref(false);
const citaAEliminar = ref(null);

const abrirModalEliminar = (cita) => {
  citaAEliminar.value = cita;
  modalEliminarVisible.value = true;
  modalEditarVisible.value = false;
};

const cerrarModalEliminar = () => {
  modalEliminarVisible.value = false;
  citaAEliminar.value = null;
};

const confirmarEliminarCita = async () => {
  try {
    await deleteCita(citaAEliminar.value.tittle);
    await cargarCitas();
    cerrarModalEliminar();
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
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
  padding: 16px 12px;

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


.table-auto thead th {
  background-color: #e6f7e6;
  color: #2f855a;
}

.table-auto tbody td {
  color: #4a5568;
  font-size: 0.875rem;
}


/* Hover por turno */
.hover-manana:hover {
  background-color: #fff9c4 !important; /* Amarillo claro */
}
.hover-tarde:hover {
  background-color: #ffe0b2 !important; /* Naranja claro */
}
.hover-noche:hover {
  background-color: #c5cae9 !important; /* Azul/lila claro */
}
/* Estilos para los modales */
/* Fondo verde translúcido y centrado para el modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(174, 244, 174, 0.85); /* Verde translúcido */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Caja del modal */
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

/* Imagen de advertencia */
.modal-box img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  margin-bottom: 18px;
}

/* Título del modal */
.modal-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e53e3e;
  margin-bottom: 1rem;
}

/* Texto del modal */
.modal-text {
  color: #444;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

/* Botones del modal */
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 1.5rem;
}

/* Estilos de los inputs del modal de editar  */
.formField {
  margin: 18px 0 0 0;
  position: relative;
  width: 100%;
}

.formField input,
.formField select {
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
.formField input:focus,
.formField select:hover,
.formField select:focus {
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
.formField input:valid + span,
.formField select:focus + span,
.formField select:valid + span {
  transform: translateY(-22px) scale(0.95);
  color: #4deb25;
  background: #fff;
  padding: 0 4px;
}
</style>