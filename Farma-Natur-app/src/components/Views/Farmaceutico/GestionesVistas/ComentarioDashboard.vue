<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';
import ComentarioTabla from '../Comentario/ComentarioTabla.vue';
import ComentarioMessage from '../messages/ComentarioMessage.vue';

// Importa tus cards
import ComentarioCardProducto from '../Comentario/Cards/ComentarioCardProducto.vue';
import ComentarioCardCliente from '../Comentario/Cards/ComentarioCardCliente.vue';
import ComentarioCardTTres from '../Comentario/Cards/ComentarioCardTTres.vue';

// Importa los servicios
import {
  getProductoMasComentado,
  getClienteQueMasComenta,
  getTop3ProductosMasComentados,
} from '../services/comentarioServices.js';

const userName = ref('');
const userRole = ref('');

const productoMasComentado = ref(null);
const clienteMasComenta = ref(null);
const top3Productos = ref([]);
const mediaComentariosMes = ref([]);

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    userName.value = decoded.name || decoded.username || 'USERNAME';
    userRole.value = decoded.role || 'FARMACEUTICO';
  }
  // Carga los datos para las cards
  try {
    productoMasComentado.value = await getProductoMasComentado();
  } catch {}
  try {
    clienteMasComenta.value = await getClienteQueMasComenta();
  } catch {}
  try {
    top3Productos.value = await getTop3ProductosMasComentados();
  } catch {}
  try {
    mediaComentariosMes.value = await getMediaComentariosMes();
  } catch {}
});
</script>

<template>
  <FarmaHeader :userName="userName" :userRole="userRole" />

  <div class="dashboard-container">
    <h1 class="dashboard-title">Gestión de Comentarios</h1>
    
    <div style="display: flex; flex-direction: row; align-items: flex-start; padding-left:50px;">
      <ComentarioMessage />
    </div>
    <hr style="width: 100%; border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />
    <div class="comentario-cards-row">
      <ComentarioCardProducto :producto="productoMasComentado" />
      <ComentarioCardCliente :cliente="clienteMasComenta" />
      <ComentarioCardTTres :productos="top3Productos" />
    </div>
    <div class="comentario-layout">
      <div class="table-container">
        <ComentarioTabla />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100% !important;
  background-color: #f3f4f6;
  padding: 0;
  margin-top: 200px;
  width: 100%;
}
.comentario-cards-row {
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-left: 30px;
  margin-bottom: 16px;
  justify-content: center;
  align-items: flex-start;
}
.comentario-layout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0 20px 20px;
  color: #1f2937;
  margin-top: 70px;
}
.table-container {
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-left: 120px;
  width: calc(100% -60px);
  max-width: 800px;
  margin-bottom: 20px;
}
</style>