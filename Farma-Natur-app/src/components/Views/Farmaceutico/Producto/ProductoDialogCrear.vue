<script setup>
import { ref, onMounted } from 'vue';
import { crearProducto } from '../services/productoService.js';
import { getCategorias } from '../services/categoriaServices.js';

const emit = defineEmits(['close', 'created']);
const form = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  categoria: '', // Aquí irá el ID o nombre de la categoría seleccionada
});
const file = ref(null);
const preview = ref('');
const categorias = ref([]);

onMounted(async () => {
  categorias.value = await getCategorias();
});

function onFileChange(e) {
  file.value = e.target.files[0];
  if (file.value) {
    preview.value = URL.createObjectURL(file.value);
  }
}

async function handleCrearProducto() {
  const categoriaObj = categorias.value.find(cat => cat.nombre === form.value.categoria || cat.id === form.value.categoria);
  const productoPayload = {
    ...form.value,
    categoria: categoriaObj,
  };

  const formData = new FormData();
  formData.append('producto', new Blob([JSON.stringify(productoPayload)], { type: 'application/json' }));
  if (file.value) formData.append('file', file.value);

  await crearProducto(formData);
  emit('created');
  close();
}

function close() {
  emit('close');
}
</script>

<template>
  <div class="dialog-backdrop" @click.self="close">
    <div class="dialog">
      <h3>Crear producto</h3>
    <form @submit.prevent="handleCrearProducto">
  <label>Nombre: <input v-model="form.nombre" required /></label>
  <label>Descripción: <input v-model="form.descripcion" required /></label>
  <label>Precio: <input v-model.number="form.precio" type="number" step="0.01" required min="0.01" /></label>
  <label>Stock: <input v-model.number="form.stock" type="number" required min="1" /></label>
  <label>Categoría:
    <select v-model="form.categoria" required>
      <option value="" disabled>Selecciona una categoría</option>
      <option v-for="cat in categorias" :key="cat.id" :value="cat.nombre">{{ cat.nombre }}</option>
    </select>
  </label>
  <label>Imagen:
    <input type="file" @change="onFileChange" accept="image/*" required />
    <img v-if="preview" :src="preview" style="width: 60px; margin-top: 8px;" />
  </label>
  <div class="dialog-actions">
    <button type="submit" class="btn-green">Crear</button>
    <button type="button" class="btn-red" @click="close">Cancelar</button>
  </div>
</form>
    </div>
  </div>
</template>
<style scoped>
.dialog-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.18); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.dialog { background: #fff; border-radius: 12px; padding: 28px 32px; min-width: 340px; box-shadow: 0 4px 24px #0002; display: flex; flex-direction: column; gap: 16px; }
.dialog-actions { display: flex; gap: 12px; margin-top: 12px; }
.btn-green { background: #269b24; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-weight: bold; cursor: pointer; }
.btn-red { background: #e53935; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-weight: bold; cursor: pointer; }
</style>