<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';
import VentasMessage from '../messages/VentasMessage.vue';
import VentasTabla from '../Ventas/VentasTabla.vue'; // <--- IMPORTA AQUÍ

const userName = ref('');
const userRole = ref('');

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    userName.value = decoded.name || decoded.username || 'USERNAME';
    userRole.value = decoded.role || 'FARMACEUTICO';
  }
});
</script>

<template>
  <FarmaHeader :userName="userName" :userRole="userRole" />
  <div class="dashboard-container">
    <h1 class="dashboard-title">Gestión de Ventas</h1>
    <div style="display: flex; flex-direction: row; align-items: flex-start; padding-left:50px;">
      <VentasMessage />
    </div>
    <hr style="width: 100%; border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />
    <div class="ventas-layout">
      <div class="table-container">
        <VentasTabla />
      </div>
    </div>
  </div>
</template>