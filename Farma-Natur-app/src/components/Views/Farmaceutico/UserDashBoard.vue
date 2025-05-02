<template>
    <div class="usuarios-container">
      <h2>Gestión de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuarios" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <select v-model="user.role">
                <option value="CLIENTE">Cliente</option>
                <option value="FARMACEUTICO">Farmacéutico</option>
                <option value="ADMIN">Admin</option>
              </select>
            </td>
            <td>
              <button @click="guardarCambios(user)">💾</button>
              <button @click="eliminarUsuario(user.username)">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import UsuarioService from '../../services/userServices'
  import { jwtDecode } from 'jwt-decode'
  const usuarios = ref([])
    const userName = ref('')
    const userRole = ref('')
  const cargarUsuarios = async () => {
  try {
    const response = await UsuarioService.getAllUsuarios(0, 10, 'id,asc');
    usuarios.value = response.data.content;
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
    if (error.response && error.response.status === 403) {
      alert('No tienes permisos para acceder a esta funcionalidad.');
    } else if (error.message === 'Network Error') {
      alert('No se pudo conectar con el servidor. Verifica tu conexión o contacta al administrador.');
    } else {
      alert('Hubo un problema al cargar los usuarios. Por favor, intenta nuevamente más tarde.');
    }
  }
};
  
  
  onMounted(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token)
      userName.value = decoded.name || decoded.username || 'USERNAME'
      userRole.value = decoded.role || 'FARMACEUTICO'
    }
    cargarUsuarios()
  })
  
  const guardarCambios = async (user) => {
    try {
      await UsuarioService.editUsuario(user.username, {
        username: user.username,
        email: user.email,
        role: user.role
      })
      alert('Usuario actualizado correctamente')
    } catch (err) {
      alert('Error al actualizar el usuario')
    }
  }
  
  const eliminarUsuario = async (username) => {
    if (!confirm(`¿Estás seguro de eliminar a ${username}?`)) return
    try {
      await UsuarioService.deleteUsuario(username)
      alert('Usuario eliminado correctamente')
      cargarUsuarios()
    } catch (err) {
      alert('Error al eliminar el usuario')
    }
  }
  </script>
  
  <style scoped>
  /* igual que antes... */
  </style>
  