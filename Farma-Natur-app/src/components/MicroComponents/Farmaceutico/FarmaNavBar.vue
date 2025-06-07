<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    default: 'Farmacéutico', 
  },
});

const emit = defineEmits(['close']);

const closeNavBar = () => {
  emit('close');
};
</script>

<template>
  <div class="navbar-overlay" @click.self="closeNavBar">
    <nav class="navbar">
      <div class="navbar-header">
        <div class="logo-container">
          <i class="pi pi-leaf logo-icon"></i>
          <span class="logo-text">FarmaNatur</span>
        </div>
        <button class="close-button" @click="closeNavBar">
          <i class="pi pi-times"></i>
        </button>
      </div>
      
      <ul class="nav-links">
        <li>
          <router-link to="/" class="nav-link" @click="closeNavBar">
            <i class="pi pi-home nav-icon"></i>
            <span class="nav-text">Inicio</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/productos" class="nav-link" @click="closeNavBar">
            <i class="pi pi-shopping-bag nav-icon"></i>
            <span class="nav-text">Productos</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/categoria" class="nav-link" @click="closeNavBar">
            <i class="pi pi-shopping-bag nav-icon"></i>
            <span class="nav-text">Categoria</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/pedidos" class="nav-link" @click="closeNavBar">
            <i class="pi pi-shopping-cart nav-icon"></i>
            <span class="nav-text">Pedidos</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/Citas" class="nav-link" @click="closeNavBar">
            <i class="pi pi-calendar nav-icon"></i>
            <span class="nav-text">Citas</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/usuarios" class="nav-link" @click="closeNavBar">
            <i class="pi pi-user nav-icon"></i>
            <span class="nav-text">Usuarios</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
        <li>
            <router-link to="/Comentarios" class="nav-link" @click="closeNavBar">
            <i class="pi pi-comments nav-icon"></i>
            <span class="nav-text">Comentarios</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
            </router-link>
        </li>
      </ul>
      
      <div class="nav-footer">
        <div class="user-info">
          <i class="pi pi-user-circle user-icon"></i>
          <div>
            <!-- Aquí se muestra el nombre de usuario del usuario logueado -->

            <p class="user-name">{{ userName }}</p>
            <p class="user-role">{{ userRole }}</p>
          </div>
        </div>
        <router-link to="/" @click="closeNavBar">
        <button class="logout-btn">
         
            <i class="pi pi-sign-out"></i> Cerrar sesión
        
        </button>
      </router-link>
      </div>
    </nav>
  </div>
</template>




<style scoped>
.navbar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.navbar {
  width: 280px;
  height: 100%;
  background: linear-gradient(160deg, #ffffff 0%, #e6f4ea 100%);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.navbar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 24px;
  color: #43a047;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2e7d32;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #888;
  cursor: pointer;
  transition: 0.3s;
}

.close-button:hover {
  color: #e53935;
  transform: rotate(90deg);
}

.nav-links {
  flex: 1;
  padding: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  margin-bottom: 10px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #d0e8d0;
  transform: translateX(5px);
}

.nav-icon {
  margin-right: 12px;
  font-size: 1.2rem;
  color: #388e3c;
}

.nav-text {
  flex-grow: 1;
}

.arrow-icon {
  font-size: 0.9rem;
  color: #999;
}

.router-link-active {
  background-color: #388e3c;
  color: white;
}

.router-link-active .nav-icon,
.router-link-active .arrow-icon {
  color: white;
}

.nav-footer {
  padding: 20px;
  border-top: 1px solid #ccc;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.user-icon {
  font-size: 2rem;
  color: #2e7d32;
}

.user-name {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  margin: 0;
}

.user-role {
  font-size: 0.85rem;
  color: #777;
  margin: 0;
}

/* Añade margen superior al botón de logout para separarlo del user-info */
.logout-btn {
  margin-top: -100px;
}

.logout-btn {
  width: 100%;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c62828;
}
</style>
