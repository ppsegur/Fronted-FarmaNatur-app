<template>
    <header class="farma-header">
      <button class="menu-button" @click="toggleNavBar">
        <i class="pi pi-bars"></i>
      </button>
      <h1 class="header-title">Farma Natur</h1>
    </header>
  
    <FarmaNavBar v-if="isNavBarOpen" @close="toggleNavBar" />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import FarmaNavBar from './FarmaNavBar.vue';
  
  const isNavBarOpen = ref(false);
  
  const toggleNavBar = () => {
    isNavBarOpen.value = !isNavBarOpen.value; // Corregido: faltaba .value
  };
  </script>
  
  <style scoped>
  .farma-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    z-index: 1000;
  }
  
  .menu-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }
  
  .header-title {
    font-size: 20px;
    font-weight: bold;
  }
  </style>