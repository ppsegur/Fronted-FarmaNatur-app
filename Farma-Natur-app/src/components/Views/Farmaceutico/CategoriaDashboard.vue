
<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';
import CategroriaTabla from './Tablas/CategroriaTabla.vue';

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
      <h1 class="dashboard-title">Gestión de Categorías</h1>
      <div class="table-container">
        <CategroriaTabla />
      </div>
    </div>
  </template>
  
<style scoped>
/* Contenedor principal */
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100% !important;
  background-color: #f3f4f6; 
  padding: 0;
  width: 100% !important;
}

/* Estilo para el título */
.dashboard-title {
  font-size: 2rem; 
  font-weight: bold; 
  margin: 10px 0 20px 20px;
  color: #1f2937;
  margin-top: 70px;
}

/* Contenedor de la tabla */
.table-container {
  background-color: #ffffff; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
  padding: 20px; 
  margin-left: 120px;
  width: calc(100% -60px);
  max-width: 800px; 
}
</style>

