<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';
const userName = ref('');
const userRole = ref('');

// Importaciones de las cards 
import CitasCardClienteMas from '../Citas/CitasCardClienteMas.vue';
import CitasCardFarmaMas from '../Citas/CitasCardFarmaMas.vue';
import CitasMessage from '../messages/CitasMessage.vue';
import CitasTabla from '../Citas/CitasTabla.vue';
import CitasDiaCard from '../Citas/CitasDiaCard.vue';
import CitasMesCard from '../Citas/CitasMesCard.vue';


onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    userName.value = decoded.name || decoded.username || 'USERNAME';
    userRole.value = decoded.role || 'FARMACEUTICO';
  }
});
</script>

<template>
        <FarmaHeader :userName="userName" :userRole="userRole" />
<br><br>
<br><br>
<br><br>
<br><br>
<br><br>
<br><br>
<br><br>
  <div class="dashboard-container" style="padding-top: 150px;">
    <h1 class="dashboard-title" style="padding-left:20px ;">Gestión de Citas</h1>
    <br>
    <CitasMessage />
    <br>
    <hr style="border: 1px solid #ccc; width: 100%;" />
    <br>
    <transition-group name="card" tag="div" class="citas-card">
  <CitasCardClienteMas key="card1" />
  <CitasCardFarmaMas key="card2" />
  <CitasDiaCard key="card3" />
  <CitasMesCard key="card4" />
</transition-group>

    <br>
    <div class="dashboard-tabla">
    <CitasTabla />
    </div>
    </div>
</template>

<style scoped>
.dashboard-container {
  margin-top:20px;

}
.dashboard-tabla {
   background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  border: 1px solid #e0e0e0;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-left: 100px;
  padding-top:- 100px;
  padding-right: 100px;
  padding-bottom: 30px;
  margin-bottom: 20px;
}
.citas-card {
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 16px;
}
.citas-card > * {
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s;
}

.citas-card > *:hover {
  transform: translateY(-18px) scale(1.04);
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  z-index: 2;
}
.card-enter-active {
  transition: all 0.6s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.card-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Cascada animación */
.citas-card > *:nth-child(1) {
  transition-delay: 0s;
}
.citas-card > *:nth-child(2) {
  transition-delay: 0.1s;
}
.citas-card > *:nth-child(3) {
  transition-delay: 0.2s;
}
.citas-card > *:nth-child(4) {
  transition-delay: 0.3s;
}


</style>
