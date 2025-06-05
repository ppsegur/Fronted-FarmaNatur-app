<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700" style="padding-top:10px">Listado de Citas</h2>
    <br>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Titulo</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Farmaceutico</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Fecha</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Paciente</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Precio</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Oferta</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Acciones</th>
        </tr>
      </thead>
      <tbody>
<tr
  v-for="cita in citas"
  :key="[
    cita.usernameFarma?.username || 'farmacia',
    cita.usernameCliente?.username || 'cliente',
    cita.fecha_inicio || Math.random()
  ].join('-')"
>          <td class="border border-gray-300 px-6 py-2">{{ cita.titulo }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ cita.usernameFarma?.username }}</td>
            <td class="border border-gray-300 px-4 py-2">
            {{ cita.fechaInicio ? (new Date(cita.fechaInicio).toLocaleDateString() + ' ' + new Date(cita.fechaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : 'Sin fecha' }}
            </td>

          <td class="border border-gray-300 px-4 py-2">{{ cita.usernameCliente?.username }}</td>
          
          <td class="border border-gray-300 px-4 py-2">{{ cita.precio }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ cita.oferta }}</td>
          <td class="border border-gray-300 px-4 py-2 flex justify-center gap-2">
        <IconButton
            tooltip="Anular"
            color="gray"
            @click="abrirModalAnular(cita)"
            v-if="!cita.anulada"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
          </IconButton>
            <IconButton
              tooltip="Editar"
              color="blue"
              @click="editarCita(cita)"
            >
              <path
                d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              />
            </IconButton>
            
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Editar -->
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
                class="c-button c-button--gooey-gray"
                @click="cerrarModalEditar"
              >
                Cancelar
                <div class="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </button>
              <button
                type="submit"
                class="c-button c-button--gooey-green"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="mr-1">
                  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                </svg>
                Guardar Cambios
                <div class="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    

    <!-- SVG filter para el efecto gooey -->
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: block; height: 0; width: 0;">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
          <feBlend in="SourceGraphic" in2="goo"></feBlend>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup>
import IconButton from '../botones/IconButton.vue';
import { ref, onMounted } from 'vue';
import { getCitas, updateCita, formatDateForBackend } from '../services/citasServices.js';
import { getUsuarioByUsername } from '../services/usuariosServices.js';

const citas = ref([]);
const citaSeleccionada = ref(null);
const modalEditarVisible = ref(false);
const modalAnularVisible = ref(false);
const citaAAnular = ref(null);

const cargarCitas = async () => {
  try {
    const response = await getCitas();
    console.log('Citas obtenidas:', response.data);
    citas.value = response.data.map(cita => ({
      ...cita,
      titulo: cita.tittle || cita.titulo,
      fechaInicio: cita.fechaInicio || null,
    }));
  } catch (error) {
    console.error('Error al obtener las citas:', error);
  }
};




const cerrarModalEditar = () => {
  modalEditarVisible.value = false;
  citaSeleccionada.value = null;
};

const editarCita = (cita) => {
  citaSeleccionada.value = { ...cita };
  modalEditarVisible.value = true;
};

const guardarCitaEditada = async () => {
  try {
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
    const fechaInicio = citaSeleccionada.value.fechaInicio;

    await updateCita(
      { clienteId, farmaceuticoId, fecha_inicio: fechaInicio },
      {
        titulo: citaSeleccionada.value.titulo,
        usernameFarma: { id: farmaceuticoResp.data.id }, 
        usernameCliente: { id: clienteResp.data.id },    
        precio: citaSeleccionada.value.precio,
        oferta: citaSeleccionada.value.oferta,
        fecha_inicio: citaSeleccionada.value.fechaInicio,
        fecha_fin: citaSeleccionada.value.fecha_fin,
      }
    );

    await cargarCitas();
    modalEditarVisible.value = false;
  } catch (error) {
    console.error("Error actualizando cita:", error);
  }
};
// Métodos

// Para recargar las citas en la tabla al crear una 
defineExpose({
  refreshData: cargarCitas
});

onMounted(() => {
  cargarCitas();
});
</script>

<style scoped>
/* Estilos de la tabla */
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



/* Estilos para los modales */
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
  color: #e53e3e;
  margin-bottom: 1rem;
}

.modal-text {
  color: #444;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 1.5rem;
}

/* Estilos de los inputs del modal de editar */
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

/* Estilos para los botones gooey */
.c-button {
  color: #000;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  padding: 0.9em 1.6em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  margin: 0 8px;
}

.c-button--gooey-green {
  color: #06c8d9;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #06c8d9;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button--gooey-red {
  color: #ff4d4d;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #ff4d4d;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button--gooey-gray {
  color: #666;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #666;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button__blobs {
  height: 100%;
  filter: url(#goo);
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -3px;
  right: -1px;
  z-index: -1;
}

.c-button__blobs div {
  width: 34%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  transform: scale(1.4) translateY(125%) translateZ(0);
  transition: all 700ms ease;
}

.c-button--gooey-green .c-button__blobs div {
  background-color: #06c8d9;
}

.c-button--gooey-red .c-button__blobs div {
  background-color: #ff4d4d;
}

.c-button--gooey-gray .c-button__blobs div {
  background-color: #666;
}

.c-button__blobs div:nth-child(1) {
  left: -5%;
}

.c-button__blobs div:nth-child(2) {
  left: 30%;
  transition-delay: 60ms;
}

.c-button__blobs div:nth-child(3) {
  left: 66%;
  transition-delay: 25ms;
}

.c-button--gooey-green:hover {
  color: #fff;
}

.c-button--gooey-red:hover {
  color: #fff;
}

.c-button--gooey-gray:hover {
  color: #fff;
}

.c-button:hover .c-button__blobs div {
  transform: scale(1.4) translateY(0) translateZ(0);
}
tr.nula {
  background-color: #f0f0f0;  
  opacity: 0.7;
  text-decoration: line-through;
}
</style>