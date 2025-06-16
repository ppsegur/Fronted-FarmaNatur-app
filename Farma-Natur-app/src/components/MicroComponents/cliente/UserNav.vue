<template>
    <nav class="user-nav">
        <ul>
            <li><router-link to="/" class="nav-link" active-class="active">HOME</router-link></li>
            <li><router-link to="/catalogo" class="nav-link" active-class="active">CATÁLOGO</router-link></li>
            <li><router-link to="/carrito" class="nav-link" active-class="active">CARRITO</router-link></li>
            <li><router-link to="/historial" class="nav-link" active-class="active">HISTORIAL</router-link></li>
            <li class="profile-dropdown">
                <router-link to="/" custom v-slot="{ navigate }">
                  <button class="profile-btn" @click="dropdownOpen = !dropdownOpen">
                    PERFIL <i class="pi pi-chevron-down"></i>
                  </button>
                  <ul class="dropdown-menu" v-show="dropdownOpen">
                    <li style="font-weight:bold; color:#27ae60; cursor:default;">
                      <i class="pi pi-user-circle"></i> {{ userName }}
                    </li>
                    <li @click="$emit('back'); dropdownOpen = false"><i class="pi pi-arrow-left"></i> Retroceder</li>
                    <li>
                      <button class="logout-btn" @click="navigate(); $emit('logout'); dropdownOpen = false">
                        <i class="pi pi-sign-out"></i> Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    userName: {
        type: String,
        default: 'Usuario',
    },
});
const dropdownOpen = ref(false);
</script>

<style scoped>
.user-nav {
    background: #27ae60;
    padding: 1rem;
    border-radius: 8px;
}
.user-nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
}
.nav-link {
    text-decoration: none;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 300;
    letter-spacing: 1px;
    transition: background 0.2s, color 0.2s;
    padding: 8px 16px;
    border-radius: 6px;
}
.nav-link:hover, .active {
    background: #111;
    color: #fff !important;
}
.profile-dropdown {
    position: relative;
}
.profile-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 300;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.profile-btn:hover {
    color: #111;
}
.dropdown-menu {
    position: absolute;
    top: 120%;
    right: 0;
    background: #fff;
    color: #222;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    min-width: 180px;
    z-index: 10;
    padding: 0.5rem 0;
    display: none;
    flex-direction: column;
    gap: 0;
}
.profile-dropdown:hover .dropdown-menu,
.dropdown-menu.open {
    display: flex;
}
.dropdown-menu li {
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    color: #222;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}
.dropdown-menu li:hover {
    background: #f2f2f2;
    color: #27ae60;
}
.dropdown-menu li[style*="cursor:default"]:hover {
    background: none;
    color: #27ae60;
    cursor: default;
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
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
}
.logout-btn:hover {
    background-color: #c62828;
}
</style>