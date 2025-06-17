<template>
  <div class="historial-layout">
    <UserNav :userName="userName" />
    <div class="historial-container">
      <h2 class="historial-title">Historial de Compras</h2>
      <div v-if="ventas.length === 0" class="historial-vacio">No hay compras registradas.</div>
      <div v-else class="historial-grid">
        <div v-for="venta in ventas" :key="venta.id" class="historial-card">
          <div class="historial-card-header">
            <span class="historial-fecha">{{ formatFecha(venta.fechaCreacion) }}</span>
            <span class="historial-total">Total: {{ venta.importeTotal }} €</span>
          </div>
          <div class="historial-productos">
            <div v-if="venta.lineasVenta.length === 0" class="producto-nombre" style="color:#888;">Sin productos</div>
            <div v-else v-for="linea in venta.lineasVenta" :key="linea.productoId" class="historial-producto">
              <span class="producto-nombre">{{ linea.nombreProducto || 'Producto desconocido' }}</span>
              <span class="producto-cantidad">x{{ linea.cantidad }}</span>
              <span class="producto-precio">{{ linea.precioUnitario }} €</span>
              <span class="producto-subtotal">Subtotal: {{ linea.subtotal }} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';

const ventas = ref([]);
const userName = ref(''); // Puedes obtener el nombre real del usuario si tienes auth

async function fetchHistorial() {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/carrito/historial', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    console.log('Historial:', data);
    ventas.value = data;
  } catch (e) {
    ventas.value = [];
    console.error('Error al obtener historial', e);
  }
}

function formatFecha(fecha) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString();
}

onMounted(fetchHistorial);
</script>

<style scoped>
.historial-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.historial-container {
  width: 80vw;
  max-width: 1600px;
  margin: 40px auto 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}
:deep(.user-nav) {
  width: 100vw;
  margin: 0 auto;
  border-radius: 0 0 12px 12px;
  max-width: none;
  left: 0;
  right: 0;
  position: relative;
}
.historial-title {
  font-size: 2rem;
  color: #269b24;
  margin-bottom: 32px;
  text-align: center;
}
.historial-vacio {
  color: #888;
  font-style: italic;
  text-align: center;
  margin-top: 40px;
}
.historial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}
.historial-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.08);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.historial-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #269b24;
  font-size: 1.1rem;
}
.historial-productos {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.producto-nombre {
  font-weight: 500;
  color: #333;
}
.producto-cantidad {
  color: #888;
  margin-left: 8px;
}
</style>
