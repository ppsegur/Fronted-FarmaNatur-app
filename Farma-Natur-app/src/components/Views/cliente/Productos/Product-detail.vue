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
            <button v-if="comentario.cliente?.username === userName" class="editar-comentario-btn" @click="abrirEditarComentario(comentario)">Editar</button>
          </div>
        </div>
        <form class="crear-comentario-form" @submit.prevent="crearComentario">
          <textarea v-model="nuevoComentario" placeholder="Escribe tu comentario..." maxlength="255" required></textarea>
          <button type="submit" class="add-comentario-btn" :disabled="creandoComentario">
            <span v-if="!creandoComentario">Comentar</span>
            <span v-else>Creando comentario...</span>
          </button>
        </form>
        <div v-if="showEditModal" class="modal-overlay">
          <div class="modal-form">
            <h3>Editar comentario</h3>
            <form @submit.prevent="editarComentario">
              <textarea v-model="comentarioEditado" maxlength="255" required></textarea>
              <button type="submit" class="add-comentario-btn" :disabled="editandoComentario">Guardar</button>
              <button type="button" class="cancelar-btn" @click="showEditModal = false">Cancelar</button>
            </form>
          </div>
        </div>
        <div v-if="errorMsg" class="error-modal">
          <span>{{ errorMsg }}</span>
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
import { addProductoAlCarrito } from '../Carrito/carritoServices.js';
import { crearComentarioProducto, editarComentarioProducto  } from './comentarioUserService.js';

const route = useRoute();
const router = useRouter();
const producto = ref({});
const comentarios = ref([]);
const userName = ref('');
const nuevoComentario = ref("");
const creandoComentario = ref(false);
const showEditModal = ref(false);
const comentarioEditado = ref("");
const editandoComentario = ref(false);
const errorMsg = ref("");
let comentarioAEditar = null;

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
  addProductoAlCarrito(producto.value)
    .then(() => alert('Producto añadido al carrito'))
    .catch(() => alert('Error al añadir al carrito'));
}

function goBack() {
  router.back();
}

function abrirEditarComentario(comentario) {
  comentarioAEditar = comentario;
  comentarioEditado.value = comentario.comentario;
  showEditModal.value = true;
  errorMsg.value = "";
}

async function editarComentario() {
  if (!comentarioAEditar) return;
  editandoComentario.value = true;
  try {
    await editarComentarioProducto(producto.value.id, comentarioEditado.value);
    showEditModal.value = false;
    await fetchProductoYComentarios();
  } catch (e) {
    errorMsg.value = e.message || 'No se pudo editar el comentario';
  } finally {
    editandoComentario.value = false;
  }
}

// Mostrar error de comentario duplicado
async function crearComentario() {
  if (!nuevoComentario.value.trim()) return;
  creandoComentario.value = true;
  errorMsg.value = "";
  try {
    await crearComentarioProducto(producto.value.id, nuevoComentario.value);
    nuevoComentario.value = "";
    await fetchProductoYComentarios();
  } catch (e) {
    // Si el backend devuelve un error 207 o similar, mostrar el mensaje
    errorMsg.value = e?.detail || e?.message || 'No se pudo crear el comentario';
  } finally {
    creandoComentario.value = false;
  }
}

// Obtener el username del usuario logueado (si tienes auth)
onMounted(async () => {
  // Buscar el producto y comentarios
  await fetchProductoYComentarios();
  // Obtener el username del usuario logueado
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userName.value = payload.username;
    }
  } catch {}
});
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
.crear-comentario-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}
.crear-comentario-form textarea {
  min-height: 60px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px 14px;
  font-size: 1rem;
  resize: vertical;
}
.add-comentario-btn {
  align-self: flex-end;
  background: #269b24;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.add-comentario-btn:hover {
  background: #1a7a1a;
}
.editar-comentario-btn {
  background: #ffc107;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}
.editar-comentario-btn:hover {
  background: #e0a800;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-form {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
}
.modal-form h3 {
  margin-bottom: 16px;
  font-size: 1.5rem;
  color: #269b24;
}
.error-modal {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #f44336;
  color: #fff;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: opacity 0.3s;
}
.error-modal span {
  display: block;
  font-weight: 500;
}
.cancelar-btn {
  background: #ccc;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}
.cancelar-btn:hover {
  background: #bbb;
}
</style>
