<template>
  <div class="card-cita card-crear-cita" @click="$emit('abrir-modal')">
    <div class="icon-container">
      <span class="icon-bg">
        <svg width="38" height="38" fill="#1976d2" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 7v2H7v2h5v-2h-3v-2h3v-2h-5v2h3zm7 9H5V9h14v11zm0-13H5V6h14v1z"/>
        </svg>
      </span>
    </div>
    <div class="card-title">Crear nueva cita</div>
    <div class="card-data">Haz clic para crear una cita</div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.card-cita {
  width: 260px;
  height: 180px;
  border-radius: 22px;
  background: #e3f2fd;
  box-shadow: 8px 8px 18px #bebebe, -8px -8px 18px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 8px;
  padding: 12px 8px;
  cursor: pointer;
  border: 2px dashed #1976d2;
}
.icon-container {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-bg {
  background: #bbdefb;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1976d2;
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