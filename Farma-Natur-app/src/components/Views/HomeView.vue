<template>
  <div class="home-layout">
    <UserNav
      :userName="userName"
      @logout="handleLogout"
      @back="handleBack"
    />
    <div class="home-content">
      <!-- Aquí puedes poner el contenido principal de la home si lo necesitas -->
    </div>
    <UserFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';
import UserFooter from '@/components/MicroComponents/cliente/UserFooter.vue';

const userName = ref(''); // Aquí puedes obtener el nombre del usuario de tu lógica de autenticación
const emit = defineEmits(['logout', 'back']);

function handleLogout() {
    emit('logout');
}
function handleBack() {
    emit('back');
}
</script>

<style scoped>
.home-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.home-content {
  flex: 1 1 auto;
}
:deep(.user-nav) {
  width: 100%;
  margin: 0 auto;
  border-radius: 0 0 12px 12px;
  max-width: none;
}
:deep(.user-footer) {
  width: 100vw;
  margin: 0;
  border-radius: 0;
  max-width: none;
  min-width: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  position: relative;
}
</style>