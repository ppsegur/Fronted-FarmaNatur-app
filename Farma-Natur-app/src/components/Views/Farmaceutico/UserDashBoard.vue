<template>
    <div class="usuarios-container">
      <h2>Gestión de Usuarios</h2>
  
      <div v-if="loading" class="loading">Cargando usuarios…</div>
      <div v-else-if="error" class="error">{{ error }}</div>
  
      <div v-else>
        <div v-if="usuarios.length">
          <table>
            <thead>
  <tr>
    <th>ID</th>
    <th>Username</th>
    <th>Email</th>
    <th>Rol</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody>
  <tr v-for="user in usuarios" :key="user.id">
    <td>{{ user.id }}</td>
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td> <!-- Mostrar email -->
    <td>{{ user.role }}</td> <!-- Mostrar rol -->
    
  </tr>
</tbody>
          </table>
        </div>
  
        <div v-else class="no-data">
          No hay usuarios para mostrar o no tienes permisos para verlos.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import {jwtDecode} from 'jwt-decode'
  import UsuarioService from '../../services/userServices';
  const router = useRouter()
  const usuarios = ref([])
  const loading = ref(false)
  const error = ref(null)

  const userName = ref('')
  const userRole = ref('ADMIN')
  onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded = jwtDecode(token)
    userName.value = decoded.name || decoded.username || 'USERNAME'
    userRole.value = decoded.role || 'ROLE_FADMIN'
    console.log('Token decodificado:', decoded)

    cargarUsuarios()
  }
})


  // ─────────────────────────────────── cargar usuarios ─
  const cargarUsuarios = async ( ) => {
  loading.value = true;
  error.value = null;

  try {
    // Cargar todos los usuarios si el rol es ADMIN o FARMACEUTICO
   {
      const res = await UsuarioService.getAllUsuarios();
      usuarios.value = res.data.content || [];
      console.log(usuarios.value)
   
      // Cargar solo los datos del usuario actual
     // const res = await UsuarioService.getUsuarioActual();
     // usuarios.value = [res.data];
    }
  } catch (err) {
    console.error('Error al cargar usuarios:', err);
    if (err.response && err.response.status === 403) {
      error.value = 'No tienes permisos para acceder a esta información.';
    } else {
      error.value = 'Error al cargar información de usuarios.';
    }
    usuarios.value = [];
  } finally {
    loading.value = false;
  }
};
  
  // ──────────────────────────────── acciones tabla ─────
  
  

  

  const guardarCambios = async (user) => {
    if (!isAdmin.value) return alert('Permiso denegado')
  
    try {
      await UsuarioService.editUsuario(user.username, {
        username: user.username,
        email: user.email,
        role: user.role
      })
      alert('Usuario actualizado')
    } catch (e) {
      console.error(e)
      alert('Error al actualizar')
    }
  }
  
  const eliminarUsuario = async (username) => {
    if (!isAdmin.value) return alert('Permiso denegado')
    if (!confirm(`¿Eliminar a ${username}?`)) return
  
    try {
      await UsuarioService.deleteUsuario(username)
      alert('Usuario eliminado')
      cargarUsuarios()
    } catch (e) {
      console.error(e)
      alert('Error al eliminar')
    }
  }
  
  const verDetallesCliente = (user) => {
    router.push(`/cliente/${user.username}`)
  }
  </script>
  
  <style scoped>
  .usuarios-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  button {
    margin: 0 4px;
    padding: 4px 8px;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 18px;
  }
  
  .loading,
  .error,
  .no-data {
    text-align: center;
    padding: 20px;
    margin-top: 20px;
  }
  
  .error {
    color: #e74c3c;
  }
  
  .no-data {
    color: #7f8c8d;
  }
  </style>
  