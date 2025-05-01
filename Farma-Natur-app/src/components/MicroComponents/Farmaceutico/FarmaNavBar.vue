<template>
  <div class="navbar-overlay" @click.self="closeNavBar">
    <nav class="navbar">
      <button class="close-button" @click="closeNavBar">
        <i class="pi pi-times"></i> <!-- Ícono de cerrar -->
      </button>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Productos</a></li>
        <li><a href="#">Pedidos</a></li>
        <li><a href="#">Perfil</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

const closeNavBar = () => {
  emit('close');
};
</script>

<style scoped>
.navbar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: repeating-linear-gradient(45deg, #92c9b1, #92c9b1 20px, #b3e0d2 20px, #b3e0d2 40px);

  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}
</style>