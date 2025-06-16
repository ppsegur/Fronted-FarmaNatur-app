<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700">Listado de Productos</h2>
    <button class="crear-btn" @click="showCrear = true">+ Crear producto</button>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>
            <img
              v-if="producto.imagen || producto.url"
              :src="getImgUrl(producto)"
              alt="img"
              style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;"
            />
          </td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precio }} €</td>
          <td>{{ producto.stock }}</td>
          <td>{{ producto.categoria?.nombre || 'N/A' }}</td>
          <td style="display: flex; gap: 8px;">
            <IconButton tooltip="Editar" color="green" @click="openEditar(producto)">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.18A3 3 0 0 0 12 3a3 3 0 0 0-2.82 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2zm7-16a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-2 6h2v6h-2zm0 8h2v2h-2z"/></svg>
            </IconButton>
            <IconButton tooltip="Eliminar" color="red" @click="openEliminar(producto)">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zm3.46-7.12a1 1 0 0 1 1.41 0l1.13 1.13 1.13-1.13a1 1 0 0 1 1.41 1.41l-1.13 1.13 1.13 1.13a1 1 0 0 1-1.41 1.41l-1.13-1.13-1.13 1.13a1 1 0 0 1-1.41-1.41l1.13-1.13-1.13-1.13a1 1 0 0 1 0-1.41z"/></svg>
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="display: flex; justify-content: center; gap: 16px; margin-top: 16px;">
      <button :disabled="page === 0" @click="prevPage" class="crear-btn">Anterior</button>
      <span>Página {{ page + 1 }}</span>
      <button :disabled="isLastPage" @click="nextPage" class="crear-btn">Siguiente</button>
    </div>
    <ProductoDialogEditar
      v-if="showEditar"
      :producto="productoSeleccionado"
      @close="showEditar = false"
      @updated="fetchProductos"
    />
    <ProductoDialogEliminar
      v-if="showEliminar"
      :producto="productoSeleccionado"
      @close="showEliminar = false"
      @deleted="fetchProductos"
    />
    <ProductoDialogCrear
      v-if="showCrear"
      @close="showCrear = false"
      @created="fetchProductos"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getProductos } from '../services/productoService.js';
import IconButton from '../botones/IconButton.vue';
import ProductoDialogEditar from './ProductoDialogEditar.vue';
import ProductoDialogEliminar from './ProductoDialogEliminar.vue';
import ProductoDialogCrear from './ProductoDialogCrear.vue';

const productos = ref([]);
const showEditar = ref(false);
const showEliminar = ref(false);
const showCrear = ref(false);
const productoSeleccionado = ref(null);

const page = ref(0);
const size = ref(10);
const isLastPage = ref(false);

function getImgUrl(producto) {
  return producto.imagen || producto.url
    ? `http://localhost:8080/download/${producto.imagen || producto.url}`
    : '';
}
function openEditar(producto) {
  productoSeleccionado.value = producto;
  showEditar.value = true;
}
function openEliminar(producto) {
  productoSeleccionado.value = producto;
  showEliminar.value = true;
}

async function fetchProductos() {
  try {
    const data = await getProductos(page.value, size.value);
    // Si tu backend devuelve paginado tipo Spring Data:
    if (data && Array.isArray(data.content)) {
      productos.value = data.content;
      isLastPage.value = data.last;
    } else {
      // Si solo devuelve array:
      productos.value = data;
      isLastPage.value = data.length < size.value;
    }
  } catch (e) {
    productos.value = [];
  }
}

function nextPage() {
  if (!isLastPage.value) {
    page.value++;
    fetchProductos();
  }
}
function prevPage() {
  if (page.value > 0) {
    page.value--;
    fetchProductos();
  }
}

onMounted(fetchProductos);
watch(page, fetchProductos);
</script>

<style scoped>
.crear-btn {
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: bold;
  margin-bottom: 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.crear-btn:hover {
  background: #1a7a1a;
}
.table-auto {
  border-spacing: 0;
}
th, td {
  text-align: left;
  padding: 12px 16px;
}
th {
  font-size: 1rem;
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr:hover {
  background-color: #d4f4dd;
}
.table-auto thead th {
  background-color: #e6f7e6;
  color: #2f855a;
}
.table-auto tbody td {
  color: #4a5568;
  font-size: 0.875rem;
}
</style>