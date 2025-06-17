<template>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>
  
   
    
    <!-- Eliminado <br/><br/> innecesario y ajustado el paginado a 6 productos por página -->
  <div class="product-list-layout">
    <UserNav :userName="userName" @abrir-carrito="showCarrito = true" />
    <div class="product-list-container">
      <h2 class="product-list-title">Catálogo de Productos</h2>
      <div class="filtros-bar">
        <input v-model="searchTerm" @keyup.enter="onSearch" placeholder="Buscar producto..." class="search-input" />
        <select v-model="selectedCategoria" @change="onCategoriaChange" class="categoria-select">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.nombre">{{ cat.nombre }}</option>
        </select>
        <button @click="onSearch" class="buscar-btn">Buscar</button>
      </div>
      <div class="productos-grid">
        <div v-for="producto in productos" :key="producto.id" class="producto-card">
          <img :src="getImgUrlCard(producto)" alt="img" class="producto-img" @error="onImgError($event)" @click="goToDetail(producto)" />
          <div class="producto-info" @click="goToDetail(producto)">
            <h3 class="producto-nombre">{{ producto.nombre }}</h3>
            <p class="producto-descripcion">{{ producto.descripcion }}</p>
            <p class="producto-precio">{{ producto.precio }} €</p>
          </div>
          <button class="add-cart-btn" @click.stop="addToCart(producto)">Añadir al carrito</button>
        </div>
      </div>
      <div class="pagination">
        <button :disabled="page === 0" @click="prevPage">Anterior</button>
        <span>Página {{ page + 1 }}</span>
        <button :disabled="!hasMore" @click="nextPage">Siguiente</button>
      </div>
    </div>
    <CarritoModal :visible="showCarrito" @close="showCarrito = false" />
    <div v-if="showSuccess" class="success-modal">
    <span>Producto añadido al carrito</span>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';
import { useRouter } from 'vue-router';
import imagenDefault from '@/assets/img/notfound.jpg';
import { getProductos } from '@/components/Views/Farmaceutico/services/productoService.js';
import { getCategorias } from '@/components/Views/Farmaceutico/services/categoriaServices.js';
import { addProductoAlCarrito } from '../Carrito/carritoServices.js';
import CarritoModal from '../Carrito/CarritoModal.vue';

const productos = ref([]);
const page = ref(0);
const size = ref(6);
const hasMore = ref(true);
const userName = ref('');
const router = useRouter();
const showCarrito = ref(false);
const showSuccess = ref(false);
const searchTerm = ref('');
const selectedCategoria = ref('');
const categorias = ref([]);

function getImgUrlCard(producto) {
  return producto.imagen || producto.url
    ? `http://localhost:8080/download/${producto.imagen || producto.url}`
    : imagenDefault;
}
function onImgError(event) {
  event.target.src = imagenDefault;
}

async function fetchCategorias() {
  try {
    categorias.value = await getCategorias();
  } catch (e) {
    categorias.value = [];
  }
}

async function fetchProductos() {
  try {
    let productosData = await getProductos(page.value, size.value);
    let lista = productosData.content || productosData;
    // Filtrado en frontend si searchTerm o selectedCategoria
    if (searchTerm.value) {
      lista = lista.filter(p => p.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()));
    }
    if (selectedCategoria.value) {
      lista = lista.filter(p => p.categoria && p.categoria.nombre === selectedCategoria.value);
    }
    productos.value = lista;
    hasMore.value = lista.length === size.value;
  } catch (e) {
    productos.value = [];
    hasMore.value = false;
  }
}

function onSearch() {
  page.value = 0;
  fetchProductos();
}

function onCategoriaChange() {
  page.value = 0;
  fetchProductos();
}

function prevPage() {
  if (page.value > 0) {
    page.value--;
  }
}
function nextPage() {
  if (hasMore.value) {
    page.value++;
  }
}

watch([page, searchTerm, selectedCategoria], () => {
  fetchProductos();
  // Opcional: hacer scroll al top de la lista
  const container = document.querySelector('.product-list-container');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function goToDetail(producto) {
  router.push({ name: 'product-detail', params: { id: producto.id } });
}

async function addToCart(producto) {
  try {
    await addProductoAlCarrito(producto);
    showSuccess.value = true;
    setTimeout(() => showSuccess.value = false, 1800);
  } catch (e) {
    alert('Error al añadir al carrito');
  }
}

onMounted(() => {
  fetchCategorias();
  fetchProductos();
});
</script>

<style scoped>
.product-list-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.product-list-container {
  max-width: 1400px;
  margin: 40px auto 0 auto;
  padding: 0 16px;
  width: 100%;
}
.product-list-title {
  font-size: 2rem;
  color: #269b24;
  margin-bottom: 32px;
  text-align: center;
}
.filtros-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}
.search-input {
  flex: 1;
  padding: 10px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.categoria-select {
  padding: 10px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.buscar-btn {
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.buscar-btn:hover {
  background: #1a7a1a;
}
.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 32px;
}
.producto-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.08);
  padding: 18px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
  min-height: 320px;
}
.producto-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,60,0.18);
}
.producto-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #f2f2f2;
  cursor: pointer;
}
.producto-info {
  text-align: center;
  cursor: pointer;
}
.producto-nombre {
  font-size: 1.1rem;
  font-weight: bold;
  color: #269b24;
  margin-bottom: 8px;
}
.producto-descripcion {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 10px;
}
.producto-precio {
  font-size: 1.1rem;
  color: #1a7a1a;
  font-weight: bold;
}
.add-cart-btn {
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}
.add-cart-btn:hover {
  background: #1a7a1a;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin-bottom: 32px;
}
.pagination button {
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.pagination button:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}
.ver-carrito-btn {
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  margin: 18px auto 0 auto;
  display: block;
  transition: background 0.2s;
}
.ver-carrito-btn:hover {
  background: #1a7a1a;
}
.success-modal {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #27ae60;
  color: #fff;
  padding: 18px 36px;
  border-radius: 10px;
  font-size: 1.15rem;
  font-weight: 600;
  box-shadow: 0 2px 16px #0002;
  z-index: 2000;
  animation: fadeInOut 1.8s;
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) scale(0.95); }
  10% { opacity: 1; transform: translateX(-50%) scale(1); }
  90% { opacity: 1; transform: translateX(-50%) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) scale(0.95); }
}
</style>
