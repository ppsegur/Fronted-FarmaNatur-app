<template>
  <div class="card-cita">
    <div class="icon-container">
      <!-- Icono de cliente -->
      <svg width="38" height="38" fill="#2196f3" viewBox="0 0 24 24">
        <path fill="#2196f3" d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z"/>
      </svg>
    </div>
    <div class="card-title">Cliente con más citas</div>
    <div class="card-data">
      <span v-if="cliente">{{ cliente.username }}</span>
      <span v-else>Cargando...</span>
    </div>
    <div class="card-subdata" v-if="numeroCitas !== null">
      Total citas: <b>{{ numeroCitas }}</b>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getClienteConMasCitas, getNumeroDeCitasCliente } from '../services/citasServices.js';

const cliente = ref(null);
const numeroCitas = ref(null);

onMounted(async () => {
  try {
    const res = await getClienteConMasCitas();
    cliente.value = res.data;

    if (cliente.value?.username) {
      const response = await getNumeroDeCitasCliente(cliente.value.username);
      numeroCitas.value = response.data;
    }
  } catch (e) {
    cliente.value = { username: 'No disponible' };
    numeroCitas.value = '-';
  }
});
</script>
<style scoped>
.card-cita {
  width: 150px;
  height: 180px;
  border-radius: 22px;
  background: #efefef;
  box-shadow: 8px 8px 18px #bebebe, -8px -8px 18px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: censter;
  margin: 8px;
  padding: 12px 8px;
}
.icon-container {
  margin-bottom: 10px;
  color: #81a3c6;
  background-color: #7db8f2;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #0080ff; /* Azul */
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