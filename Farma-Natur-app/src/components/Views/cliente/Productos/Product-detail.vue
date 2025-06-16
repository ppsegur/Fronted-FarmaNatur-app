<template>
    <br/><br/>
    <br/> 
    <br/>
    <br/>
    <br/>
    
  <div class="product-detail-layout">
    <UserNav :userName="userName" />
    <div class="product-detail-container">
      <div class="product-detail-card">
        <button class="back-btn" @click="goBack">
          <i class="pi pi-arrow-left"></i> Volver atrás
        </button>
        <img :src="getImgUrl(producto)" alt="img" class="product-detail-img" @error="onImgError($event)" />
        <div class="product-detail-info">
          <h2 class="product-detail-title">{{ producto.nombre }}</h2>
          <p class="product-detail-desc">{{ producto.descripcion }}</p>
          <p class="product-detail-precio">{{ producto.precio }} €</p>
          <p class="product-detail-stock">Stock: {{ producto.stock }}</p>
          <p class="product-detail-categoria">Categoría: {{ producto.categoria?.nombre }}</p>
          <button class="add-cart-btn" @click="addToCart">Añadir al carrito</button>
        </div>
      </div>
      <div class="comentarios-section">
        <h3 class="comentarios-title">Comentarios</h3>
        <div v-if="comentarios.length === 0" class="comentario-vacio">No hay comentarios para este producto.</div>
        <div v-else>
          <div v-for="comentario in comentarios" :key="comentario.id" class="comentario-card">
            <div class="comentario-autor">{{ comentario.cliente?.username }}</div>
            <div class="comentario-texto">{{ comentario.comentario }}</div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';
import imagenDefault from '@/assets/img/notfound.jpg';
import { getComentariosDeProducto } from './productoUserService.js';
import { getProductos } from '@/components/Views/Farmaceutico/services/productoService.js';

const route = useRoute();
const router = useRouter();
const producto = ref({});
const comentarios = ref([]);
const userName = ref(''); // Puedes obtener el nombre real del usuario si tienes auth

function getImgUrl(producto) {
  return producto.imagen || producto.url
    ? `http://localhost:8080/download/${producto.imagen || producto.url}`
    : imagenDefault;
}
function onImgError(event) {
  event.target.src = imagenDefault;
}

async function fetchProductoYComentarios() {
  // Buscar el producto por id
  const id = route.params.id;
  const data = await getProductos(0, 100); // O usa un endpoint específico si tienes uno
  let lista = data && Array.isArray(data.content) ? data.content : data;
  producto.value = lista.find(p => p.id == id) || {};
  // Buscar comentarios
  if (producto.value && producto.value.nombre) {
    comentarios.value = await getComentariosDeProducto(producto.value.nombre);
    console.log(comentarios.value);
  } else {
    comentarios.value = [];
  }
}

function addToCart() {
  // Aquí va la lógica para añadir al carrito
  alert('Producto añadido al carrito (demo)');
}

function goBack() {
  router.back();
}

onMounted(fetchProductoYComentarios);
</script>

<style scoped>
.product-detail-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.product-detail-container {
  max-width: 1200px;
  margin: 40px auto 0 auto;
  padding: 0 16px;
  width: 100%;
}
.product-detail-card {
  display: flex;
  gap: 48px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.08);
  padding: 40px 32px;
  align-items: center;
}
.product-detail-img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  background: #f2f2f2;
}
.product-detail-info {
  flex: 1;
}
.product-detail-title {
  font-size: 2rem;
  font-weight: bold;
  color: #269b24;
  margin-bottom: 10px;
}
.product-detail-desc {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 12px;
}
.product-detail-precio {
  font-size: 1.3rem;
  color: #1a7a1a;
  font-weight: bold;
  margin-bottom: 18px;
}
.product-detail-stock,
.product-detail-categoria {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
}
.add-cart-btn {
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.add-cart-btn:hover {
  background: #1a7a1a;
}
.comentarios-section {
  margin-top: 48px;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.06);
}
.comentarios-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #269b24;
  margin-bottom: 18px;
}
.comentario-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 6px #0001;
  padding: 14px 22px;
  margin-bottom: 16px;
}
.comentario-autor {
  font-weight: bold;
  color: #388e3c;
  margin-bottom: 4px;
}
.comentario-texto {
  color: #444;
  font-size: 1.05rem;
}
.comentario-vacio {
  color: #888;
  font-style: italic;
}
.back-btn {
  background: none;
  border: none;
  color: #269b24;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 18px;
  transition: color 0.2s;
}
.back-btn:hover {
  color: #1a7a1a;
}
</style>
