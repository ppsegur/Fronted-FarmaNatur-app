<template>
  <div class="grafica-container">
    <h3 class="grafica-title">Ventas por día</h3>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { getVentasPorDia } from '../services/ventasService.js';

Chart.register(...registerables);

const props = defineProps({
  mes: Number,
  anio: Number,
});

const chartData = ref(null);
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
};

async function cargarDatos() {
  const mesActual = props.mes ?? (new Date().getMonth() + 1);
  const anioActual = props.anio ?? (new Date().getFullYear());
  const datos = await getVentasPorDia(mesActual, anioActual);
  chartData.value = {
    labels: datos.map(d => d.dia),
    datasets: [
      {
        label: 'Ventas',
        backgroundColor: '#4caf50',
        data: datos.map(d => d.totalVentas)
      }
    ]
  };
}

onMounted(cargarDatos);
watch([() => props.mes, () => props.anio], cargarDatos);
</script>

<style scoped>
.grafica-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 18px 18px 12px 18px;
  margin: 24px 0 10px 60px;
  width: 520px;
  min-width: 320px;
  max-width: 95vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grafica-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #269b24;
  margin-bottom: 10px;
}
</style>