<template>
    <div>
      <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Categorías</h2>
      <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
        <thead class="bg-green-100">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.nombre" class="hover:bg-green-200 transition-colors duration-200">
            <td class="border border-gray-300 px-4 py-2">{{ categoria.nombre }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { getCategorias } from '../services/categoriaServices.js';
  
  const categorias = ref([]);
  
  onMounted(async () => {
    try {
      categorias.value = await getCategorias();
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  });
  </script>