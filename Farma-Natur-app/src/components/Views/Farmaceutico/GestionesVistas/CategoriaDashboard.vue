
<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';
import CategroriaTabla from '../Categorias/CategroriaTabla.vue';
import CategoriaCardMas from '../Categorias/CategoriaCardMas.vue';
import CategoriaMessage from '../messages/CategoriaMessage.vue';
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
      <br>
      <br>
      <h1 class="dashboard-title">Gestión de Categorías</h1>
      <CategoriaMessage />

      <hr style="width: 100%; border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />

    <div class="categoria-layout">
  <CategoriaCardMas class="categoria-card-mas" />
  <div class="table-container">
    <CategroriaTabla />
  </div>
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
  margin-top: 10px;
  width: 100% ;
}
.categoria-layout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  flex-wrap: wrap; /* opcional: para que se adapten en pantallas pequeñas */
}



/* Estilo para el título */
.dashboard-title {
  font-size: 2rem; 
  font-weight: bold; 
  margin: 10px 0 20px 20px;
  color: #1f2937;
  margin-top: 70px;
}
/*Contenedor de la carta con mas productos por categoria */
.categoria-card-mas {
  background-color: #ffffff; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
  padding: 20px; 
  margin-left: 40px; 
  align-self: flex-start !important;
  width:350px;
  left: 0;
  max-width: 800px; 
  justify-content: center;
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

