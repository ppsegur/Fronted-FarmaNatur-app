<template>
  <div class="comentario-card media-mes">
    <span class="icon">📅</span>
    <div>
      <div class="titulo">Media comentarios por mes</div>
      <ul class="media-list">
        <li v-for="(item, idx) in media" :key="idx">
          {{ item[0] }}: <span class="count">{{ item[1] }}</span>
        </li>
        <li v-if="!media || media.length === 0">Sin datos</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({ media: Array });
</script>

<style scoped>
.comentario-card.media-mes { background: #c8e6c9; }
.icon { font-size: 2.2rem; margin-right: 10px; }
.titulo { font-weight: bold; }
.media-list { margin: 0; padding-left: 18px; font-size: 1.05rem; }
.count { color: #388e3c; font-size: 0.98rem; }
.comentario-card {
  display: flex; align-items: flex-start; gap: 10px;
  border-radius: 12px; box-shadow: 0 2px 8px #0001;
  padding: 18px 24px; min-width: 230px; min-height: 90px;
}
</style>