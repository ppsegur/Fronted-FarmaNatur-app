<script setup>
//import HelloWorld from './components/HelloWorld.vue'


</script>

<template>
  <div class="app-container">
    <router-view />
   
  </div>
  
</template>

<style scoped>
@import "tailwindcss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #app {
  height: 100%;
  width: 100%;
}
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  padding: 0;
  margin: 0;

  width: 100% !important;

}

:deep(.verify-page) {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>