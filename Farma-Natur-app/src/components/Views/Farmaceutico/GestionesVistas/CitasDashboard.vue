<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import FarmaHeader from '@/components/MicroComponents/Farmaceutico/FarmaHeader.vue';

// Datos de usuario
const userName = ref('');
const userRole = ref('');

// Componentes
import CitasCardClienteMas from '../Citas/CitasCardClienteMas.vue';
import CitasCardFarmaMas from '../Citas/CitasCardFarmaMas.vue';
import CitasMessage from '../messages/CitasMessage.vue';
import CitasTabla from '../Citas/CitasTabla.vue';
import CitasDiaCard from '../Citas/CitasDiaCard.vue';
import CitasMesCard from '../Citas/CitasMesCard.vue';
import CardCrearCita from '../Citas/CardCrearCita.vue';
import CitasModalCrear from '../Citas/CitasModalCrear.vue';
import { createCita } from '../services/citasServices.js';

// Estado del modal
const showCrearCitaModal = ref(false);
const createMsg = ref('');

// Datos para el modal
const farmaceuticos = ref([]);
const clientes = ref([]);
const citasTablaRef = ref(null);

// Cargar datos al montar el componente
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  try {
    const decoded = jwtDecode(token);
    userName.value = decoded.name || decoded.username || 'USERNAME';
    userRole.value = decoded.role || 'FARMACEUTICO';
  
    const res = await axios.get('http://localhost:8080/auth/todos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Filtrar correctamente por roles
    const usuarios = res.data;
    farmaceuticos.value = usuarios
      .filter(u => u.role === 'FARMACEUTICO')
      .map(f => ({
        username: f.username,
        nombre: f.nombre || f.username
      }));
      
    clientes.value = usuarios
      .filter(u => u.role === 'CLIENTE')
      .map(c => ({
        username: c.username,
        nombre: c.nombre || c.username
      }));

    console.log('Usuarios filtrados:', {
      farmaceuticos: farmaceuticos.value,
      clientes: clientes.value
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
});

// Manejar creación de cita
async function crearCitaHandler(formData) {
  createMsg.value = '';
  try {
    console.log('Enviando datos:', formData); 
    await createCita(formData);
    createMsg.value = '¡Cita creada con éxito!';
    showCrearCitaModal.value = false;
    
    if (citasTablaRef.value) {
      citasTablaRef.value.refreshData();
    }
  } catch (e) {
    console.error('Detalles del error:', {
      message: e.message,
      response: e.response?.data,
      request: e.config?.data
    });
    createMsg.value = `Error al crear cita: ${e.response?.data?.message || e.message}`;
  }
}

</script>
<template>
  <FarmaHeader :userName="userName" :userRole="userRole" />
  <br><br>
  <div class="dashboard-container" style="padding-top: 150px;">
    <h1 class="dashboard-title" style="padding-left:20px;">Gestión de Citas</h1>
    <br>
    <CitasMessage />
    <br>
    <hr style="border: 1px solid #ccc; width: 100%;" />
    <br>
    <div class="citas-card">
      <transition-group name="card">
        <CitasCardClienteMas key="card1" />
        <CitasCardFarmaMas key="card2" />
        <CitasDiaCard key="card3" />
        <CitasMesCard key="card4" />
      </transition-group>
      <CardCrearCita @abrir-modal="showCrearCitaModal = true" />
    </div>
    <CitasModalCrear
  :show="showCrearCitaModal"
  :farmaceuticos="farmaceuticos"
  :clientes="clientes"
  :msg="createMsg"
  @cerrar="showCrearCitaModal = false"
  @crear="crearCitaHandler"
/>
    <br>
    <div class="dashboard-tabla">
      <CitasTabla ref="citasTablaRef" />
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
