<template>
   <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
  <div class="home-layout">
    <UserNav
      :userName="userName"
      @logout="handleLogout"
      @back="handleBack"
    />
    <div class="home-content">
      <div class="welcome-card">
        <h1 class="welcome-title">¡Bienvenido a <span class="brand">FarmaNatur</span>!</h1>
        <p class="welcome-subtitle">
          Tu espacio personal para descubrir, comprar y gestionar tus productos de salud y bienestar.
        </p>
        <p>
          Desde aquí puedes explorar nuestro <b>catálogo</b> de productos naturales y farmacéuticos, añadir tus favoritos al <b>carrito</b> y realizar tus compras de forma rápida y segura.
        </p>
        <p>
          Accede a tu <b>historial</b> para consultar tus pedidos anteriores, repetir compras o hacer seguimiento de tus entregas. Todo pensado para que tengas el control total de tu experiencia FarmaNatur.
        </p>
        <p>
          Recuerda que puedes gestionar tu <b>perfil</b> para mantener tus datos siempre actualizados y disfrutar de una atención personalizada.
        </p>
        <div class="welcome-tip">
          👉 <b>Utiliza el menú superior</b> para navegar entre las secciones y aprovecha todas las ventajas de ser parte de nuestra comunidad.
        </div>
      </div>
      <h2 class="welcome-title" style="padding-left=29px">Productos destacados</h2>
      <div class="productos-grid">
        <div v-for="producto in productos" :key="producto.id" class="producto-card" @click="goToDetail(producto)">
          <img
            :src="getImgUrlCard(producto)"
            alt="img"
            class="producto-img"
            @error="onImgError($event)"
          />
          <div class="producto-info">
            <h3 class="producto-nombre">{{ producto.nombre }}</h3>
            <p class="producto-descripcion">{{ producto.descripcion }}</p>
            <p class="producto-precio">{{ producto.precio }} €</p>
          </div>
        </div>
      </div>
    </div>
    <UserFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';
import UserFooter from '@/components/MicroComponents/cliente/UserFooter.vue';
import { getProductos } from '@/components/Views/Farmaceutico/services/productoService.js';
import imagenDefault from '@/assets/img/notfound.jpg';
import { useRouter } from 'vue-router';

const userName = ref(''); 
const emit = defineEmits(['logout', 'back']);
const router = useRouter();

function handleLogout() {
    emit('logout');
}
function handleBack() {
    emit('back');
}

const productos = ref([]);

function getImgUrlCard(producto) {
  return producto.imagen || producto.url
    ? `http://localhost:8080/download/${producto.imagen || producto.url}`
    : imagenDefault;
}
function onImgError(event) {
  event.target.src = imagenDefault;
}

async function fetchProductos() {
  try {
    const data = await getProductos(0, 6);
    if (data && Array.isArray(data.content)) {
      productos.value = data.content;
    } else {
      productos.value = data;
    }
  } catch (e) {
    productos.value = [];
  }
}

function goToDetail(producto) {
  router.push({ name: 'product-detail', params: { id: producto.id } });
}

onMounted(fetchProductos);
</script>

<style scoped>
.home-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.home-content {
  flex: 1 1 auto;
}
:deep(.user-nav) {
  width: 100%;
  margin: 0 auto;
  border-radius: 0 0 12px 12px;
  max-width: none;
}
:deep(.user-footer) {
  width: 100vw;
  margin: 0;
  border-radius: 0;
  max-width: none;
  min-width: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  position: relative;
}
.productos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
}
.producto-info {
  text-align: center;
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
.welcome-card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.1);
  margin-bottom: 32px;
}
.welcome-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}
.welcome-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 16px;
}
.welcome-tip {
  margin-top: 16px;
  padding: 12px;
  background: #e1f5fe;
  border-left: 4px solid #01579b;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #01579b;
}
@media (max-width: 900px) {
  .productos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .productos-grid {
    grid-template-columns: 1fr;
  }
}
</style>