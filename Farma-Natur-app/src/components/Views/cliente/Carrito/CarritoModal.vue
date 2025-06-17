<template>
  <div v-if="visible" class="carrito-modal-overlay" @click.self="close">
    <div class="carrito-modal">
      <h2>Mi Carrito</h2>
      <div v-if="!carrito || !carrito.lineasVenta || carrito.lineasVenta.length === 0" class="carrito-vacio">
        El carrito está vacío.
      </div>
      <div v-else>
        <div v-for="linea in carrito.lineasVenta" :key="linea.productoId" class="carrito-linea">
          <span class="carrito-nombre">{{ linea.nombreProducto }}</span>
          <span class="carrito-cantidad">x{{ linea.cantidad }}</span>
          <span class="carrito-precio">{{ linea.precioUnitario }} €</span>
          <span class="carrito-subtotal">Subtotal: {{ linea.subtotal }} €</span>
        </div>
        <div class="carrito-total">
          <b>Total: {{ carrito.importeTotal }} €</b>
        </div>
      </div>
      <button class="finalizar-btn" @click="finalizar">Finalizar compra</button>
      <button class="cerrar-btn" @click="close">Cerrar</button>
    </div>
  </div>
  <div v-if="showSuccess" class="success-modal">
    <span>¡Compra finalizada con éxito!</span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { getCarrito, finalizarCompra } from './carritoServices.js';

const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(['close']);
const carrito = ref(null);
const showSuccess = ref(false);

async function fetchCarrito() {
  try {
    carrito.value = await getCarrito();
    console.log(carrito.value);
  } catch (e) {
    carrito.value = null;
  }
}

function close() {
  emit('close');
}

async function finalizar() {
  try {
    await finalizarCompra();
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
      close();
    }, 1800);
  } catch (e) {
    alert('No se pudo finalizar la compra');
  }
}

watch(() => props.visible, (val) => {
  if (val) fetchCarrito();
});
</script>

<style scoped>
.carrito-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.carrito-modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px #0002;
  padding: 32px 28px;
  min-width: 340px;
  max-width: 95vw;
}
.carrito-linea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.carrito-nombre {
  font-weight: 500;
  color: #269b24;
}
.carrito-cantidad, .carrito-precio, .carrito-subtotal {
  color: #444;
  margin-left: 12px;
}
.carrito-total {
  margin-top: 18px;
  font-size: 1.15rem;
  color: #1a7a1a;
  text-align: right;
}
.carrito-vacio {
  color: #888;
  font-style: italic;
  text-align: center;
  margin: 24px 0;
}
.cerrar-btn {
  margin-top: 24px;
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.cerrar-btn:hover {
  background: #1a7a1a;
}
.finalizar-btn {
  margin-top: 18px;
  background: #1a7a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 12px;
}
.finalizar-btn:hover {
  background: #269b24;
}
.success-modal {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #27ae60;
  color: #fff;
  padding: 18px 36px;
  border-radius: 10px;
  font-size: 1.15rem;
  font-weight: 600;
  box-shadow: 0 2px 16px #0002;
  z-index: 2000;
  animation: fadeInOut 1.8s;
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) scale(0.95); }
  10% { opacity: 1; transform: translateX(-50%) scale(1); }
  90% { opacity: 1; transform: translateX(-50%) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) scale(0.95); }
}
</style>
