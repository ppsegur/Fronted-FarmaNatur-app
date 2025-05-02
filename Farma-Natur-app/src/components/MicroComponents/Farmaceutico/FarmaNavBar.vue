<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    default: 'Farmacéutico', // Valor predeterminado
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
          <router-link to="/pedidos" class="nav-link" @click="closeNavBar">
            <i class="pi pi-shopping-cart nav-icon"></i>
            <span class="nav-text">Pedidos</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/citas" class="nav-link" @click="closeNavBar">
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
          <router-link to="/configuracion" class="nav-link" @click="closeNavBar">
            <i class="pi pi-cog nav-icon"></i>
            <span class="nav-text">Configuración</span>
            <i class="pi pi-chevron-right arrow-icon"></i>
          </router-link>
        </li>
      </ul>
      
      <div class="nav-footer">
        <div class="user-info">
          <i class="pi pi-user-circle user-icon"></i>
          <div>
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9f5f1 100%);
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.navbar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 1.8rem;
  color: #2e7d32;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2e7d32;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:hover {
  color: #d32f2f;
  transform: rotate(90deg);
}

.nav-links {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 5px;
}

.nav-link:hover {
  background-color: rgba(46, 125, 50, 0.1);
  transform: translateX(5px);
}

.nav-link.router-link-active {
  background-color: #2e7d32;
  color: white;
}

.nav-link.router-link-active .nav-icon,
.nav-link.router-link-active .arrow-icon {
  color: white;
}

.nav-icon {
  font-size: 1.2rem;
  color: #2e7d32;
  margin-right: 15px;
  width: 24px;
  text-align: center;
}

.nav-text {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
}

.arrow-icon {
  font-size: 0.9rem;
  color: #666;
  transition: all 0.3s ease;
}

.nav-link:hover .arrow-icon {
  transform: translateX(3px);
  color: #2e7d32;
}

.nav-footer {
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.user-icon {
  font-size: 2.5rem;
  color: #2e7d32;
}

.user-name {
  font-weight: 600;
  margin: 0;
  color: #333;
}

.user-role {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background: none;
  border: 1px solid #d32f2f;
  color: #d32f2f;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #d32f2f;
  color: white;
}
</style>