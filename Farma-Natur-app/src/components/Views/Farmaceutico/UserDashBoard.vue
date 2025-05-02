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
  
  const usuarios = ref([])
  
  const cargarUsuarios = async () => {
    const res = await UsuarioService.getAllUsuarios()
    usuarios.value = res.data.content
  }
  
  onMounted(() => {
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
  