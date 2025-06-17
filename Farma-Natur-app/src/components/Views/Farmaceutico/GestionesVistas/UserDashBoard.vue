<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';
import UserTabla from '../Usuarios/UserTabla.vue';
import UserMessage from '../messages/UserMessage.vue';

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
    <br />
    <br />  

    <br />
    <br />
    <br />
  <div class="dashboard-container">
    <h1 class="dashboard-title">Gestión de Usuarios</h1>
    <div style="display: flex; flex-direction: row; align-items: flex-start; padding-left:50px;">
      <UserMessage />
      <!-- Si quieres agregar un card extra aquí, puedes hacerlo -->
    </div>

    <hr style="width: 100%; border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />

    <div class="user-layout">
      <div class="table-container">
        <UserTabla />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f3f4f6;
  padding: 0 0 40px 0;
  width: 100%;
  /* Elimina margin-top grande si lo tienes */
}

.ventas-layout {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-x: auto;
}

.table-container {
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-left: 120px;
  width: calc(100% - 60px);
  max-width: 1100px;
  margin-bottom: 20px;
  max-height: 70vh;
  overflow-y: auto;
}
.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0 20px 20px;
  color: #1f2937;
  margin-top: 40px;
}
</style>