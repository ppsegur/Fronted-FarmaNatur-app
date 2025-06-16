<script setup>
import { ref } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
});

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const emit = defineEmits(['logout', 'back']);

const handleLogout = () => {
  emit('logout');
  closeDropdown();
};

const handleBack = () => {
  emit('back');
  closeDropdown();
};
</script>

<template>
  <nav class="user-navbar">
    <router-link to="/" class="nav-item" active-class="active">HOME</router-link>
    <router-link to="/catalogo" class="nav-item" active-class="active">CATÁLOGO</router-link>
    <router-link to="/carrito" class="nav-item" active-class="active">CARRITO</router-link>
    <router-link to="/historial" class="nav-item" active-class="active">HISTORIAL</router-link>
    <div class="nav-item profile" @mouseenter="toggleDropdown" @mouseleave="closeDropdown">
      PERFIL
      <i class="pi pi-chevron-down profile-arrow"></i>
      <div v-if="showDropdown" class="dropdown-menu">
        <div class="dropdown-username">
          <i class="pi pi-user-circle"></i>
          <span>{{ userName }}</span>
        </div>
        <button class="dropdown-btn" @click="handleBack">
          <i class="pi pi-arrow-left"></i> Retroceder
        </button>
        <button class="dropdown-btn logout" @click="handleLogout">
          <i class="pi pi-sign-out"></i> Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.user-navbar {
  width: 100%;
  background: #43a047;
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 70px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  z-index: 1000;
}

.nav-item {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin-right: 40px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  padding: 12px 18px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
}

.nav-item:last-child {
  margin-right: 0;
}

.nav-item:hover,
.nav-item.active {
  background: #111;
  color: #fff;
}

.profile {
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
}

.profile-arrow {
  margin-left: 8px;
  font-size: 1rem;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  right: 0;
  background: #222;
  color: #fff;
  min-width: 200px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  padding: 18px 0 10px 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-username {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 400;
  padding: 6px 20px 10px 20px;
  border-bottom: 1px solid #444;
  margin-bottom: 8px;
}

.dropdown-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  text-align: left;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-btn:hover {
  background: #388e3c;
}

.dropdown-btn.logout {
  color: #e53935;
}

.dropdown-btn.logout:hover {
  background: #b71c1c;
  color: #fff;
}

@media (max-width: 700px) {
  .user-navbar {
    flex-direction: column;
    height: auto;
    padding: 0 10px;
  }
  .nav-item {
    margin-right: 0;
    margin-bottom: 8px;
    font-size: 1.1rem;
    width: 100%;
    text-align: left;
  }
}
</style>
