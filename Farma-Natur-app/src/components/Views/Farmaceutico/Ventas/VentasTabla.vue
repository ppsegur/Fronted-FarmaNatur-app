<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Ventas</h2>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Fecha</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Total</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Productos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="venta in ventas" :key="venta.id" class="hover:bg-green-200 transition-colors duration-200">
          <td class="border border-gray-300 px-4 py-2">{{ venta.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ formatFecha(venta.fechaCreacion) }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ venta.importeTotal }} €</td>
          <td class="border border-gray-300 px-4 py-2">
            <ul>
              <li v-if="venta.lineasVenta.length === 0">Sin productos</li>
              <li v-for="(linea, idx) in venta.lineasVenta" :key="idx">
                {{ linea.producto?.nombre || 'Producto' }} (x{{ linea.cantidad || 1 }})
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getVentas } from '../services/ventasService.js';

const ventas = ref([]);

function formatFecha(fecha) {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleString();
}

onMounted(async () => {
  try {
    ventas.value = await getVentas();
  } catch (e) {
    ventas.value = [];
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