<template>
  <div class="comentario-card cliente">
    <span class="icon">👤</span>
    <div>
      <div class="titulo">Cliente que más comenta</div>
      <div class="valor">{{ cliente?.nombre || cliente?.username || 'Sin datos' }}</div>
      <div class="detalle" v-if="cliente">Total comentarios: {{ cliente.totalComentarios ?? 'N/A' }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({ cliente: Object });
</script>

<style scoped>
.comentario-card.cliente { background: #ffe0b2; }
.icon { font-size: 2.2rem; margin-right: 10px; }
.titulo { font-weight: bold; }
.valor { font-size: 1.2rem; }
.detalle { font-size: 0.95rem; color: #ef6c00; }
.comentario-card {
  display: flex; align-items: center; gap: 10px;
  border-radius: 12px; box-shadow: 0 2px 8px #0001;
  padding: 18px 24px; min-width: 230px; min-height: 90px;
}
</style>