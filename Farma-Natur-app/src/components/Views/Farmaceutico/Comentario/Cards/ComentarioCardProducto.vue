<template>
  <div class="comentario-card producto">
    <span class="icon">🛒</span>
    <div>
      <div class="titulo">Producto más comentado</div>
      <div class="valor">{{ producto?.nombre || 'Sin datos' }}</div>
      <div class="detalle" v-if="producto">Total comentarios: {{ producto.totalComentarios }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({ producto: Object });
</script>

<style scoped>
.comentario-card.producto { background: #e0f7fa; }
.icon { font-size: 2.2rem; margin-right: 10px; }
.titulo { font-weight: bold; }
.valor { font-size: 1.2rem; }
.detalle { font-size: 0.95rem; color: #00796b; }
.comentario-card {
  display: flex; align-items: center; gap: 10px;
  border-radius: 12px; box-shadow: 0 2px 8px #0001;
  padding: 18px 24px; min-width: 230px; min-height: 90px;
}
</style>