<script setup>
import { ref, watch, onMounted } from 'vue';
import { editProducto } from '../services/productoService.js';
import { getCategorias } from '../services/categoriaServices.js';

const props = defineProps({ producto: Object });
const emit = defineEmits(['close', 'updated']);

const form = ref({ ...props.producto });
const file = ref(null);
const preview = ref(
  props.producto.imagen || props.producto.url
    ? `http://localhost:8080/download/${props.producto.imagen || props.producto.url}`
    : ''
);

watch(() => props.producto, (nuevo) => {
  Object.assign(form.value, nuevo);
  preview.value =
    nuevo.imagen || nuevo.url
      ? `http://localhost:8080/download/${nuevo.imagen || nuevo.url}`
      : '';
});
const categorias = ref([]);

onMounted(async () => {
  categorias.value = await getCategorias();
});

watch(() => props.producto, (nuevo) => {
  Object.assign(form.value, nuevo);
  preview.value = nuevo.imagen ? `/uploads/${nuevo.imagen}` : '';
});

function onFileChange(e) {
  file.value = e.target.files[0];
  if (file.value) {
    preview.value = URL.createObjectURL(file.value);
  }
}

async function editarProducto() {
  const categoriaObj = categorias.value.find(cat => cat.nombre === form.value.categoria?.nombre || cat.id === form.value.categoria?.id || cat.nombre === form.value.categoria);
  const productoPayload = {
    ...form.value,
    categoria: categoriaObj,
  };

  const formData = new FormData();
  formData.append('producto', new Blob([JSON.stringify(productoPayload)], { type: 'application/json' }));
  if (file.value) formData.append('file', file.value);

  await editProducto(props.producto.id, formData);
  emit('updated');
  close();
}

function close() {
  emit('close');
}
</script>

<template>
  <div class="dialog-backdrop" @click.self="close">
    <div class="dialog">
      <h3>Editar producto</h3>
      <form @submit.prevent="editarProducto">
        <label>Nombre: <input v-model="form.nombre" required /></label>
        <label>Descripción: <input v-model="form.descripcion" required /></label>
        <label>Precio: <input v-model.number="form.precio" type="number" step="0.01" required /></label>
        <label>Stock: <input v-model.number="form.stock" type="number" required /></label>
        <label>Categoría:
          <select v-model="form.categoria.nombre" required>
            <option value="" disabled>Selecciona una categoría</option>
            <option v-for="cat in categorias" :key="cat.id" :value="cat.nombre">{{ cat.nombre }}</option>
          </select>
        </label>
        <label>Imagen:
          <input type="file" @change="onFileChange" accept="image/*" />
          <img v-if="preview" :src="preview" style="width: 60px; margin-top: 8px;" />
        </label>
        <div class="dialog-actions">
          <button type="submit" class="btn-green">Guardar</button>
          <button type="button" class="btn-red" @click="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.dialog-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.18); z-index: 1000;
  display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 12px; padding: 28px 32px; min-width: 340px;
  box-shadow: 0 4px 24px #0002; display: flex; flex-direction: column; gap: 16px;
}
.dialog-actions { display: flex; gap: 12px; margin-top: 12px; }
.btn-green { background: #269b24; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-weight: bold; cursor: pointer; }
.btn-red { background: #e53935; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-weight: bold; cursor: pointer; }
</style>