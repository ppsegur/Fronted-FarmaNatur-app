<template>
  <div class="dialog-backdrop" @click.self="close">
    <div class="dialog">
      <h3>¿Eliminar producto?</h3>
      <p>¿Seguro que deseas eliminar <b>{{ producto.nombre }}</b>?</p>
      <div class="dialog-actions">
        <button class="btn-red" @click="eliminar">Eliminar</button>
        <button class="btn-green" @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteProducto } from '../services/productoService.js';
const props = defineProps({ producto: Object });
const emit = defineEmits(['close', 'deleted']);

async function eliminar() {
  await deleteProducto(props.producto.id);
  emit('deleted');
  close();
}
function close() { emit('close'); }
</script>

<style scoped>
.dialog-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.18); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.dialog { background: #fff; border-radius: 12px; padding: 28px 32px; min-width: 340px; box-shadow: 0 4px 24px #0002; display: flex; flex-direction: column; gap: 16px; }
.dialog-actions { display: flex; gap: 12px; margin-top: 12px; }
.btn-green { background: #269b24; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-weight: bold; cursor: pointer; }
.btn-red { background: #e53935; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-weight: bold; cursor: pointer; }
</style>