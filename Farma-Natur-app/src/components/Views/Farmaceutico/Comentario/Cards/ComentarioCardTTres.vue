<template>
  <div class="comentario-card top3">
    <span class="icon">🏆</span>
    <div>
      <div class="titulo">Top 3 productos más comentados</div>
      <ol class="top-list">
        <li v-for="(prod, idx) in productos" :key="idx">
          {{ prod.nombre || 'Sin nombre' }} <span class="count">({{ prod.total ?? 'N/A' }})</span>
        </li>
        <li v-if="!productos || productos.length === 0">Sin datos</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
defineProps({ productos: Array });
</script>


<style scoped>
.comentario-card.producto { background: #e0f7fa; }
.icon {
  font-size: 2.2rem;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 100%;
}
.titulo { font-weight: bold; }
.valor { font-size: 1.2rem; }
.detalle { font-size: 0.95rem; color: #00796b; }
.comentario-card {
  display: flex; align-items: center; gap: 10px;
  border-radius: 12px; box-shadow: 0 2px 8px #0001;
  padding: 18px 24px; min-width: 230px; min-height: 90px;
}
</style>