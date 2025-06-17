<template>
  <div class="citas-user-layout">
    <UserNav :userName="userName" />
    <div class="citas-user-container">
      <h2 class="citas-user-title">Historial de Citas</h2>
      <div v-if="citas.length === 0" class="citas-vacio">No tienes citas registradas.</div>
      <div v-else class="citas-grid">
        <div v-for="cita in citas" :key="cita.fechaInicio + cita.titulo" class="cita-card">
          <div class="cita-header">
            <span class="cita-titulo">{{ cita.titulo }}</span>
            <span class="cita-precio">{{ cita.precio }} €</span>
          </div>
          <div class="cita-info">
            <span class="cita-fecha">{{ formatFechaHora(cita.fechaInicio) }} - {{ formatFechaHora(cita.fecha_fin) }}</span>
            <span class="cita-farma">Farmacéutico: {{ cita.usernameFarma?.username }}</span>
            <span class="cita-oferta" v-if="cita.oferta">En oferta</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';
import { getCitasByCliente } from './CitaUserService.js';
import userServices from '@/components/services/userServices.js';

const citas = ref([]);
const userName = ref('');

async function fetchCitas() {
  try {
    console.log('Username usado para fetch:', userName.value);
    const result = await getCitasByCliente(userName.value);
    console.log('Respuesta de getCitasByCliente:', result);
    citas.value = result;
  } catch (e) {
    console.error('Error al obtener citas:', e);
    citas.value = [];
  }
}

function formatFecha(fecha) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString();
}

function formatFechaHora(fecha) {
  if (!fecha) return '';
  const d = new Date(fecha);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

onMounted(async () => {
  // Usa el servicio para obtener el username real del token
  try {
    const user = await userServices.getUsuarioCompleto();
    userName.value = user.data.username;
  } catch (e) {
    userName.value = '';
  }
  fetchCitas();
});
</script>

<style scoped>
.citas-user-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.citas-user-container {
  max-width: 1200px;
  margin: 40px auto 0 auto;
  padding: 0 16px;
  width: 100%;
}
.citas-user-title {
  font-size: 2rem;
  color: #269b24;
  margin-bottom: 32px;
  text-align: center;
}
.citas-vacio {
  color: #888;
  font-style: italic;
  text-align: center;
  margin-top: 40px;
}
.citas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}
.cita-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.08);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cita-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #269b24;
  font-size: 1.1rem;
}
.cita-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #444;
}
.cita-motivo {
  font-weight: 500;
}
.cita-estado {
  color: #1a7a1a;
}
</style>
