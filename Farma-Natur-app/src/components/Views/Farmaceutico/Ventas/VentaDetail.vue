<template>
  <div v-if="visible" class="drawer-backdrop" @click.self="close">
    <div class="drawer">
      <div class="drawer-header">
        <span class="drawer-title">🛒 Detalle de la venta</span>
        <button class="close-btn" @click="close" title="Cerrar">×</button>
      </div>
      <ul v-if="lineas && lineas.length" class="productos-lista">
        <li v-for="linea in lineas" :key="linea.productoId" class="detalle-item">
          <div class="producto-nombre">{{ linea.nombreProducto }}</div>
          <div class="producto-info">
            <span>Cantidad: <b>{{ linea.cantidad }}</b></span>
            <span>Precio: <b>{{ linea.precioUnitario }} €</b></span>
            <span>Subtotal: <b>{{ linea.subtotal }} €</b></span>
          </div>
        </li>
      </ul>
      <div v-else class="sin-productos">
        <em>Sin productos en esta venta.</em>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  lineas: Array
});
const emit = defineEmits(['close']);
function close() {
  emit('close');
}
</script>

<style scoped>
.drawer-backdrop {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(0,0,0,0.18);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}
.drawer {
  background: #fff;
  width: 370px;
  height: 100%;
  box-shadow: -2px 0 12px #0002;
  padding: 0 0 24px 0;
  overflow-y: auto;
  border-radius: 18px 0 0 18px;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.22s;
}
@keyframes slideIn {
  from { transform: translateX(100%);}
  to { transform: translateX(0);}
}
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e0f7fa;
  padding: 18px 24px 12px 24px;
  border-radius: 18px 0 0 0;
}
.drawer-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #269b24;
  display: flex;
  align-items: center;
  gap: 8px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #269b24;
  cursor: pointer;
  transition: color 0.2s;
  margin-left: 10px;
}
.close-btn:hover {
  color: #1a7a1a;
}
.productos-lista {
  list-style: none;
  padding: 18px 24px 0 24px;
  margin: 0;
}
.detalle-item {
  background: #f3f4f6;
  border-radius: 10px;
  margin-bottom: 18px;
  padding: 14px 16px;
  box-shadow: 0 1px 4px #0001;
}
.producto-nombre {
  font-weight: bold;
  font-size: 1.08rem;
  color: #269b24;
  margin-bottom: 6px;
}
.producto-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.98rem;
  color: #333;
}
.sin-productos {
  padding: 32px 24px;
  color: #888;
  text-align: center;
}
</style>