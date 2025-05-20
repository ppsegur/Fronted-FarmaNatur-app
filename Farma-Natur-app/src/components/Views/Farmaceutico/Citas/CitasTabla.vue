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
    <td class="border border-gray-300 px-4 py-2">{{ cita.tittle }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ cita.usernameFarma?.username }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ cita.usernameCliente?.username }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ cita.fecha_inicio.slice(0, 10) }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ cita.fecha_inicio.slice(11, 16) }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ cita.precio }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ cita.oferta }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ obtenerTurno(cita.fecha_inicio) }}</td>

    <td class="border border-gray-300 px-4 py-2 flex justify-center gap-2">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="editarCita(cita)"
      >
        Editar
      </button>
      <button
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        @click="eliminarCita(cita.tittle)"
      >
        Eliminar
      </button>
    </td>
  </tr>
</tbody>
    </table>
  </div>

  <Teleport to="body">
  <div v-if="modalEditarVisible" class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 shadow-2xl w-full max-w-md">
      <h2 class="text-xl font-bold text-blue-600 mb-4">Editar Cita</h2>
      <form @submit.prevent="guardarCitaEditada">
        <label class="block mb-2 text-sm font-medium">Fecha Inicio</label>
        <input type="datetime-local" v-model="citaSeleccionada.fecha_inicio" class="w-full mb-4 border p-2 rounded" />
        
        <label class="block mb-2 text-sm font-medium">Fecha Fin</label>
        <input type="datetime-local" v-model="citaSeleccionada.fecha_fin" class="w-full mb-4 border p-2 rounded" />
        
        <label class="block mb-2 text-sm font-medium">Precio</label>
        <input type="number" v-model="citaSeleccionada.precio" class="w-full mb-4 border p-2 rounded" />

        <label class="block mb-2 text-sm font-medium">Especial</label>
        <select v-model="citaSeleccionada.oferta" class="w-full mb-4 border p-2 rounded">
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </select>

        <div class="flex justify-end gap-2">
          <button type="button" class="bg-gray-300 px-4 py-2 rounded" @click="modalEditarVisible = false">Cancelar</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</Teleport>

</template>

<script setup>
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
const eliminarCita = async (titulo) => {
  try {
    await deleteCita(titulo);
    await cargarCitas();
  } catch (error) {
    console.error("Error eliminando cita:", error);
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
</style>