<template>
<div>
<h2 class="text-xl font-bold mb-4 text-green-700">Listado de Citas</h2>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">ID</th>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCitas } from '../services/citasServices.js';

const citas = ref([]);

const cargarCitas = async () => {
  try {
    const response = await getCitas();
    console.log('Citas obtenidas:', response.data);
    citas.value = response.data; // Asigna las citas obtenidas
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