<template>
  <div class="citas-user-layout">
    <UserNav :userName="userName" />
    <div class="citas-user-container">
      <h2 class="citas-user-title">Historial de Citas</h2>
      <button class="solicitar-btn-main" @click="showForm = true">Solicitar nueva cita</button>
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
  <div v-if="showForm" class="modal-overlay">
    <div class="modal-form">
      <h3>Solicitar nueva cita</h3>
      <form @submit.prevent="enviarNuevaCita">
        <label>Título:
          <input v-model="form.titulo" required />
        </label>
        <label>Fecha y hora fin:
          <input type="datetime-local" v-model="form.fecha_fin" required />
        </label>
        <label>Farmacéutico (usuario):
          <input v-model="form.usernameFarma" required />
        </label>
        <label style="display:flex;align-items:center;gap:8px;">
          <input type="checkbox" v-model="form.oferta" />
          Oferta
        </label>
        <button type="submit" class="solicitar-btn">Enviar solicitud</button>
        <button type="button" class="cancelar-btn" @click="showForm = false">Cancelar</button>
      </form>
    </div>
  </div>
  <div v-if="showSuccess" class="success-modal">
    <span>Solicitud de cita enviada por email correctamente</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';
import { getCitasByCliente, solicitarCitaPorEmail } from './CitaUserService.js';
import userServices from '@/components/services/userServices.js';
import axios from 'axios';

const citas = ref([]);
const userName = ref('');
const showSuccess = ref(false);
const showForm = ref(false);
const farmaceuticos = ref([]);
const form = ref({
  titulo: '',
  fecha_fin: '',
  usernameFarma: '',
  oferta: false
});

async function fetchFarmaceuticos() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/usuarios/farmaceuticos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    farmaceuticos.value = res.data;
  } catch (e) {
    farmaceuticos.value = [];
  }
}

async function fetchCitas() {
  try {
    const result = await getCitasByCliente(userName.value);
    citas.value = result;
  } catch (e) {
    citas.value = [];
  }
}

function formatFechaHora(fecha) {
  if (!fecha) return '';
  const d = new Date(fecha);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function enviarNuevaCita() {
  try {
    const citaDTO = {
      titulo: form.value.titulo,
      fecha_fin: form.value.fecha_fin,
      oferta: form.value.oferta,
      usernameFarma: { username: form.value.usernameFarma },
      usernameCliente: { username: userName.value }
    };
    const res = await solicitarCitaPorEmail(citaDTO);
    // Si el backend responde con 200 pero no es JSON, no habrá error, pero puede que res sea undefined
    if (res && (res.message || res.detail)) {
      alert(res.message || res.detail);
      return;
    }
    showSuccess.value = true;
    showForm.value = false;
    setTimeout(() => showSuccess.value = false, 1800);
    fetchCitas();
    form.value = { titulo: '', fecha_fin: '', usernameFarma: '', oferta: false };
  } catch (e) {
    alert('No se pudo enviar la solicitud de cita');
  }
}

onMounted(async () => {
  try {
    const user = await userServices.getUsuarioCompleto();
    userName.value = user.data.username;
  } catch (e) {
    userName.value = '';
  }
  fetchCitas();
  fetchFarmaceuticos();
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
.solicitar-btn-main {
  display: block;
  margin: 0 auto 24px auto;
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.solicitar-btn-main:hover {
  background: #1a7a1a;
}
.solicitar-btn {
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 10px;
}
.solicitar-btn:hover {
  background: #1a7a1a;
}
.cancelar-btn {
  background: #eee;
  color: #444;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 10px;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
.modal-form {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 16px #0002;
  padding: 36px 32px 28px 32px;
  min-width: 340px;
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.modal-form h3 {
  margin-bottom: 12px;
  color: #269b24;
  text-align: center;
}
.modal-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}
.modal-form input, .modal-form select {
  margin-top: 4px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.success-modal {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #27ae60;
  color: #fff;
  padding: 18px 36px;
  border-radius: 10px;
  font-size: 1.15rem;
  font-weight: 600;
  box-shadow: 0 2px 16px #0002;
  z-index: 2000;
  animation: fadeInOut 1.8s;
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) scale(0.95); }
  10% { opacity: 1; transform: translateX(-50%) scale(1); }
  90% { opacity: 1; transform: translateX(-50%) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) scale(0.95); }
}
</style>
