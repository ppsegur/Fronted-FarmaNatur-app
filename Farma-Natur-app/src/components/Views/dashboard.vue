<template>
    <div class="dashboard-container">
      <FarmaHeader />
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bienvenido al panel de control de Farma-Natur</p>
        <p>Contenido del dashboard...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import FarmaHeader from '../MicroComponents/Farmaceutico/FarmaHeader.vue';
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