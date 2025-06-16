<template>
    <UserNav
        :userName="userName"
        @logout="handleLogout"
        @back="handleBack"
    />
    </template>

<script setup>
import { ref } from 'vue';
import UserNav from '@/components/MicroComponents/cliente/UserNav.vue';

const userName = ref(''); // Aquí puedes obtener el nombre del usuario de tu lógica de autenticación
const emit = defineEmits(['logout', 'back']);

function handleLogout() {
    emit('logout');
}
function handleBack() {
    emit('back');
}
</script>