<template>
  <div class="card-cita">
    <div class="icon-container">
      <!-- Icono de farmaceútico -->
      <svg width="38" height="38" fill="#4caf50" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z"/>
      </svg>
    </div>
    <div class="card-title">Farmacéutico con más citas</div>
    <div class="card-data">
      <span v-if="farmaceutico">{{ farmaceutico.nombre }}</span>
      <span v-else>Cargando...</span>
    </div>
    <div class="card-subdata" v-if="farmaceutico">
      Total citas: <b>{{ farmaceutico.totalCitas }}</b>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFarmaceuticoConMasCitas } from '../services/citasServices.js';

const farmaceutico = ref(null);

onMounted(async () => {
  try {
    const res = await getFarmaceuticoConMasCitas();
    farmaceutico.value = res.data;
  } catch (e) {
    farmaceutico.value = { nombre: 'No disponible', totalCitas: '-' };
  }
});
</script>

<style scoped>
.card-cita {
  width: 150px;
  height: 180px;
  border-radius: 22px;
  background: #e0e0e0;
  box-shadow: 8px 8px 18px #bebebe, -8px -8px 18px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 8px;
  padding: 12px 8px;
}
.icon-container {
  margin-bottom: 10px;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #388e3c;
  text-align: center;
  margin-bottom: 6px;
}
.card-data {
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
  margin-bottom: 2px;
  text-align: center;
}
.card-subdata {
  font-size: 0.95rem;
  color: #555;
  text-align: center;
}
</style>