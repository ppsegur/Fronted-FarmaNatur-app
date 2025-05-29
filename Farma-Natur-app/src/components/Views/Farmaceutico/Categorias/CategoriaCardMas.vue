<template>
    <div class="card">
        <img src="@/assets/img/iconoCardMasCategoria.png" alt="Icono Categoría" class="icon" />
                <h3 class="card-title">Categoría con más productos</h3>
      <p v-if="topCategoria" class="card-content">
        <strong>{{ topCategoria.getNombre }}</strong> con <strong>{{ topCategoria.getNumProductos }}</strong> productos.
      </p>
      <p v-else class="card-content">Cargando...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getTopCategoria } from '../services/categoriaServices.js';
  
  const topCategoria = ref(null);
  
  onMounted(async () => {
    try {
      const response = await getTopCategoria();
      console.log('Categoría con más productos:', response.data);
      topCategoria.value = response.data;
    } catch (error) {
      console.error('Error al obtener la categoría con más productos:', error);
    }
  });
  </script>
  
  <style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .card {
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto 16px auto; /* Centrado horizontal y margen inferior */
  }
  
  .card-title {
    font-size: 1rem;
    font-weight: bold;
    color: #2f855a;
    margin-bottom: 8px;
    text-align: center;
  }
  
  .card-content {
    font-size: 1rem;
    color: #4a5568;
    text-align: center;
  }
  .icon {
  
  width: 30px;
  height: 30px; 
  border-radius: 8px;
  margin-bottom: 16px;
  object-fit: contain; 
}
  </style>