<script setup>
//import HelloWorld from './components/HelloWorld.vue'


</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  background-color: #f4f5f4; /* Fondo claro */
  padding: 0; /* Elimina el padding para que ocupe todo el espacio */
  margin: 0; 
  overflow: hidden; /* Evita el scroll */
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  min-width: 1200px;
}


router-view {
  width: 100%;
  height: 100%; /* Asegura que el contenido ocupe toda la altura */
  max-width: none; /* Elimina restricciones de ancho */
  transform: none; /* Elimina el escalado */
}
</style>