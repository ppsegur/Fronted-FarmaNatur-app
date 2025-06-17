<template>
  <div class="ventas-table-container">
    <h2 class="ventas-title">Listado de Ventas</h2>
    <table class="ventas-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Productos</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="venta in ventas"
          :key="venta.id"
          class="venta-row"
          @click="showDetalle(venta.lineasVenta)"
        >
          <td class="venta-id">{{ venta.id }}</td>
          <td>{{ formatFecha(venta.fechaCreacion) }}</td>
          <td><b>{{ venta.importeTotal }} €</b></td>
          <td>
            <ul class="productos-lista">
              <li v-if="venta.lineasVenta.length === 0" class="producto-sin">Sin productos</li>
              <li v-for="(linea, idx) in venta.lineasVenta" :key="idx" class="producto-item">
                {{ linea.nombreProducto || linea.producto?.nombre || 'Producto' }} <span class="producto-cantidad">(x{{ linea.cantidad || 1 }})</span>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <VentaDetail
      :visible="detalleVisible"
      :lineas="lineasSeleccionadas"
      @close="detalleVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getVentas } from '../services/ventasService.js';
import VentaDetail from './VentaDetail.vue';

const ventas = ref([]);
const detalleVisible = ref(false);
const lineasSeleccionadas = ref([]);

function formatFecha(fecha) {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleString();
}

function showDetalle(lineas) {
  lineasSeleccionadas.value = lineas;
  detalleVisible.value = true;
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
.ventas-table-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 32px 28px;
  margin: 30px 0 0 0;
  width: 100%;
  max-width: 1100px;
}

.ventas-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #269b24;
  margin-bottom: 22px;
}

.ventas-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px #0001;
}

.ventas-table th,
.ventas-table td {
  padding: 14px 18px;
  text-align: left;
}

.ventas-table th {
  background: #e0f7fa;
  color: #269b24;
  font-size: 1.08rem;
  font-weight: 700;
  border-bottom: 2px solid #b2dfdb;
}

.ventas-table tbody tr {
  transition: background 0.18s;
  cursor: pointer;
}

.ventas-table tbody tr:hover {
  background: #e8f5e9;
}

.venta-id {
  font-size: 0.93rem;
  color: #888;
  max-width: 220px;
  word-break: break-all;
}

.productos-lista {
  margin: 0;
  padding-left: 18px;
  font-size: 0.98rem;
}

.producto-item {
  color: #333;
  margin-bottom: 2px;
}

.producto-cantidad {
  color: #269b24;
  font-weight: 600;
}

.producto-sin {
  color: #bdbdbd;
  font-style: italic;
}
</style>