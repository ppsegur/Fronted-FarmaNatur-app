<template>
    <div class="dashboard-container">
      <FarmaHeader
      :userName="username" 
      :userRole="userRole"  />
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bienvenido al panel de control de Farma-Natur</p>
        <p>Contenido del dashboard...</p>
      </div>
    </div>
  </template>
  
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
      userName.value = decoded.name || decoded.username || 'Usuario'
      userRole.value = decoded.role || 'Usuario'
    }
  })
  </script>
  
  
  <style>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full height of the viewport */
    background-color: #f0f0f0; /* Light gray background */
    overflow: hidden;
  }
  
  .dashboard-content {
    margin-top: 60px; /* Altura del header */
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
  </style>