<template>
  <div class="dashboard-container">

    <FarmaHeader :userName="userName" :userRole="userRole" />
    <div style="height: 20px;"></div>
    <div class="dashboard-content">
      <div class="welcome-card">
        <h1 class="welcome-title">¡Bienvenido a <span class="brand">FarmaNatur</span>, tu espacio de gestión farmacéutica!</h1>
        <p class="welcome-subtitle">
          Gracias por formar parte del equipo que hace posible una atención más humana, profesional y eficaz.
        </p>
        <p>
          Esta plataforma está diseñada especialmente para facilitar tu día a día como farmacéutico, ofreciéndote acceso rápido y seguro a todas las herramientas necesarias para la gestión de citas, el seguimiento de pacientes, la planificación de horarios y mucho más.
        </p>
        <p>
          Aquí podrás consultar tus próximas citas, gestionar anulaciones, acceder a estadísticas de actividad y colaborar con otros profesionales para ofrecer el mejor servicio posible. Nuestro objetivo es que te sientas respaldado en todo momento y que puedas centrarte en lo más importante: <b>cuidar la salud y el bienestar de nuestros clientes</b>.
        </p>
        <p>
          Sabemos que el tiempo es valioso, por eso hemos reunido en un solo lugar todo lo que necesitas.
        </p>
        <div class="welcome-tip">
          👉 <b>Selecciona las tres barras de la esquina superior izquierda</b> y empieza a gestionar tu día con eficiencia.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import FarmaHeader from '../MicroComponents/Farmaceutico/FarmaHeader.vue'

const userName = ref('')
const userRole = ref('Farmaceutico')

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded = jwtDecode(token)
    userName.value = decoded.name || decoded.username || 'USERNAME'
    userRole.value = decoded.role || 'FARMACEUTICO'
  }
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f3f4f6;
  padding: 0;
  width: 100% !important;
}

.dashboard-content {
  margin-top: 110px; /* Más separación superior */
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.welcome-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px #0001;
  padding: 28px 60px 18px 60px; /* Menos alto, más ancho */
  max-width: 1100px;            /* Más ancho */
  width: 100%;
  min-height: 180px;            /* Menos alto */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #269b24;
  margin-bottom: 8px;
  line-height: 1.2;
}

.brand {
  color: #1e7e34;
  font-weight: 800;
  letter-spacing: 1px;
}

.welcome-subtitle {
  font-size: 1.15rem;
  color: #388e3c;
  font-weight: 500;
  margin-bottom: 8px;
}

.welcome-card p {
  color: #444;
  font-size: 1.05rem;
  margin-bottom: 0;
}

.welcome-tip {
  background: #e0f7fa;
  color: #269b24;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 18px;
  margin-top: 10px;
  font-size: 1.08rem;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>