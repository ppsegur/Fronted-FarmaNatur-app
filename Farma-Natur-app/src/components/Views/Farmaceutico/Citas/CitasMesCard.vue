<template>
  <div class="card-cita">
    <div class="icon-container">
      <!-- Icono de calendario mes -->
      <svg width="38" height="38" fill="#4caf50" viewBox="0 0 24 24">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/>
      </svg>
    </div>
    <div class="card-title">Media citas por mes</div>
    <div class="card-data">
      <span>
        {{ typeof media === 'number' && !isNaN(media) ? media.toFixed(2) : 'No disponible' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMediaCitasPorMes } from '../services/citasServices.js'; 

const media = ref(null);

onMounted(async () => {
  try {
    const res = await getMediaCitasPorMes();
    media.value = Number(res.data);
  } catch (e) {
    media.value = null;
  }
});
</script>

<style scoped>
.card-cita {
  width: 150px;
  height: 180px;
  border-radius: 22px;
  background: #e8f5e9;
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
</style>