<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';
import CitasTabla from '../Citas/CitasTabla.vue';
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

  <div class="dashboard-container" style="padding-top: 150px;">
    <h1 class="dashboard-title">Gestión de Citas</h1>
    <hr style="border: 1px solid #ccc; width: 100%;" />
    <br>
    <div style="display: flex; flex-direction: row; align-items: flex-start; padding-left: 100px; padding-right: 100px; padding-bottom: 100px;">
        <CitasTabla />
    </div>
    </div>
</template>
