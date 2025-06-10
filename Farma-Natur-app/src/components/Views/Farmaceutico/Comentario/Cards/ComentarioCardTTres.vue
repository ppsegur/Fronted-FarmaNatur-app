<template>
  <div class="comentario-card top3">
    <span class="icon">🏆</span>
    <div>
      <div class="titulo">Top 3 productos más comentados</div>
      <ol class="top-list">
        <li v-for="(prod, idx) in productos" :key="idx">
          {{ prod[1] || 'Sin nombre' }} <span class="count">({{ prod[2] ?? 'N/A' }})</span>
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
.comentario-card.top3 { background: #e1bee7; }
.icon { font-size: 2.2rem; margin-right: 10px; }
.titulo { font-weight: bold; }
.top-list { margin: 0; padding-left: 18px; font-size: 1.05rem; }
.count { color: #7b1fa2; font-size: 0.98rem; }
.comentario-card {
  display: flex; align-items: flex-start; gap: 10px;
  border-radius: 12px; box-shadow: 0 2px 8px #0001;
  padding: 18px 24px; min-width: 230px; min-height: 90px;
}
</style>