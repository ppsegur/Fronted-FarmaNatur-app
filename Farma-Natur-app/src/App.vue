<script setup>
//import HelloWorld from './components/HelloWorld.vue'


</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff; 
  padding: 0; 
  margin: 0; 
  flex-direction: column;
  height: 100%;
  width: 100%;
 /* min-width: 1280px;*/
}

:deep(.verify-page) {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>