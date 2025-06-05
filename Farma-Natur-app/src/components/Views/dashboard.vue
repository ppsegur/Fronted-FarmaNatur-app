<script setup>
  import { ref, onMounted } from 'vue'
  import { jwtDecode } from 'jwt-decode'
  import FarmaHeader from '../MicroComponents/Farmaceutico/FarmaHeader.vue'
  
  // Declaras los refs vacíos primero
  const userName = ref('')
  const userRole = ref('Farmaceutico')
  
  onMounted(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token)
      userName.value = decoded.name || decoded.username || 'USERNAME'
      userRole.value = decoded.role || 'FARMACEUTICO'
    }
  })
  </script>

<template>
    <div class="dashboard-container">
      <FarmaHeader
      :userName="userName" 
      :userRole="userRole"  />
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bienvenido al panel de control de Farma-Natur</p>
        <p>Contenido del dashboard...</p>
      </div>
    </div>
  </template>
  
  
  <style>
  .dashboard-container {
  min-height: 100vh; /* Asegura que ocupe toda la altura de la ventana */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
  padding: 0;
  width: 100% !important;
}
  
  .dashboard-content {
    margin-top: 60px; /* Altura del header */
    padding: 20px;
    flex: 1;
  }
  </style>