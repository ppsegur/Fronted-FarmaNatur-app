<template>
  <div class="card-cita">
    <div class="icon-container">
      <span class="icon-bg">
        <svg width="28" height="28" fill="#ff9800" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/>
        </svg>
      </span>
    </div>
    <div class="card-title">Media citas por día</div>
    <div class="card-data">
      <span>
        {{ typeof media === 'number' && !isNaN(media) ? media.toFixed(2) : 'No disponible' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMediaCitasPorDia } from '../services/citasServices.js';

const media = ref(null);

onMounted(async () => {
  try {
    const res = await getMediaCitasPorDia();
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
  background: #efefef; /* Fondo neutro igual que la card de cliente */
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-bg {
  background: #fff3e0; /* Fondo suave para el icono */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ff9800;
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