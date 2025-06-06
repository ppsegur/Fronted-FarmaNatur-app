<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-green-700" style="padding-top:10px">Listado de Usuarios</h2>
    <table class="table-auto border-collapse w-full border border-gray-300 bg-gray-50">
      <thead class="bg-green-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Username</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Email</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700">Rol</th>
          <th class="border border-gray-300 px-4 py-2 text-left text-green-700" style="min-width: 200px;">Acciones</th>
        </tr>
      </thead>
  <tbody>
  <tr v-for="usuario in usuarios" :key="usuario.id">
    <td class="border border-gray-300 px-4 py-2">{{ usuario.username }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ usuario.role }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ usuario.email }}</td>
   <td class="border border-gray-300 px-4 py-2" style="min-width: 200px;">
  <div v-if="usuario.email !== 'ADMIN'" class="flex justify-center gap-2">
    <IconButton
      tooltip="Editar"
      color="green"
      @click="abrirModalEditar(usuario)"
    >
      <path d="M12 20h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" stroke="currentColor" stroke-width="2"/>
    </IconButton>
    <IconButton
      tooltip="Eliminar"
      color="red"
      @click="abrirModalEliminar(usuario)"
    >
      <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"/>
    </IconButton>
  </div>
</td>

  </tr>
</tbody>
    </table>

    <!-- Modal Eliminar -->
    <Teleport to="body">
      <div v-if="modalEliminarVisible" class="modal-overlay">
        <div class="modal-box">
          <img
            src="../../../../assets/img/DeleteImageModal.png"
            alt="Eliminar usuario"
          />
          <h2 class="modal-title" style="color:#e53e3e;">Eliminar Usuario</h2>
          <div class="modal-text">
            ¿Estás seguro de que deseas eliminar el usuario <strong>{{ usuarioAEliminar?.username }}</strong>?
          </div>
          <div class="flex justify-center gap-4 mt-6">
            <button
              type="button"
              class="custom-button bg-gray-200 text-gray-700"
              @click="cerrarModalEliminar"
            >
              <span>Cancelar</span>
            </button>
            <button
              type="button"
              class="custom-button-delete bg-red-500 text-white"
              @click="confirmarEliminarUsuario"
            >
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div><Teleport to="body">
  <div v-if="modalEditarVisible" class="modal-overlay">
    <div class="modal-box">
      <h2 class="modal-title" style="color:#2563eb;">Editar Usuario</h2>
      <form @submit.prevent="confirmarEditarUsuario">
        <div class="formField">
          <label>Email:</label>
          <input v-model="usuarioAEditar.email" type="email" required />
        </div>
        <div class="formField">
          <label>Rol:</label>
          <select v-model="usuarioAEditar.role" required>
            <option value="CLIENTE">CLIENTE</option>
            <option value="FARMACEUTICO">FARMACEUTICO</option>
          </select>
        </div>
        <div class="formField">
          <label>Nueva contraseña:</label>
          <input v-model="usuarioAEditar.password" type="password" required />
        </div>
        <div class="formField">
          <label>Repite contraseña:</label>
          <input v-model="usuarioAEditar.verifyPassword" type="password" required />
        </div>
        <div class="flex justify-center gap-4 mt-6">
          <button type="button" class="custom-button bg-gray-200 text-gray-700" @click="cerrarModalEditar">
            <span>Cancelar</span>
          </button>
          <button type="submit" class="custom-button bg-green-500 text-white">
            <span>Guardar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import IconButton from '../botones/IconButton.vue'; // Ajusta la ruta si es necesario
import userServices from '../../../services/userServices';

const usuarios = ref([]);
const modalEliminarVisible = ref(false);
const usuarioAEliminar = ref(null);

const cargarUsuarios = async () => {
  try {
    const response = await userServices.getAllUsuarios();
    usuarios.value = response;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

const abrirModalEliminar = (usuario) => {
  usuarioAEliminar.value = usuario;
  modalEliminarVisible.value = true;
};

const cerrarModalEliminar = () => {
  usuarioAEliminar.value = null;
  modalEliminarVisible.value = false;
};

const confirmarEliminarUsuario = async () => {
  if (!usuarioAEliminar.value) return;
  try {
    await userServices.deleteUsuario(usuarioAEliminar.value.username);
    usuarios.value = usuarios.value.filter(u => u.username !== usuarioAEliminar.value.username);
    cerrarModalEliminar();
  } catch (error) {
    alert('Error al eliminar usuario');
    console.error(error);
  }
};

const modalEditarVisible = ref(false);
const usuarioAEditar = ref({
  username: '',
  email: '',
  role: '',
  password: '',
  verifyPassword: ''
});

const abrirModalEditar = (usuario) => {
  usuarioAEditar.value = {
    username: usuario.username,
    email: usuario.email,
    role: usuario.role,
    password: '',
    verifyPassword: ''
  };
  modalEditarVisible.value = true;
};

const cerrarModalEditar = () => {
  modalEditarVisible.value = false;
  usuarioAEditar.value = {
    username: '',
    email: '',
    role: '',
    password: '',
    verifyPassword: ''
  };
};

const confirmarEditarUsuario = async () => {
  try {
    await userServices.editUsuario(usuarioAEditar.value.username, {
      password: usuarioAEditar.value.password,
      verifyPassword: usuarioAEditar.value.verifyPassword,
      email: usuarioAEditar.value.email,
      role: usuarioAEditar.value.role,
    });
    await cargarUsuarios();
    cerrarModalEditar();
    alert('Usuario editado correctamente'); // Mensaje de éxito
  } catch (error) {
    alert('Error al editar usuario');
    console.error(error);
  }
};

onMounted(() => {
  cargarUsuarios();
});
</script>

<style scoped>
.table-auto {
  border-spacing: 0;
}
th, td {
  text-align: left;
  padding: 16px 12px;
}
th {
  font-size: 1rem;
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
.table-auto thead th {
  background-color: #e6f7e6;
  color: #2f855a;
}
.table-auto tbody td {
  color: #4a5568;
  font-size: 0.875rem;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
tr:hover {
  background-color: #d4f4dd;
}

/* MODAL Y BOTONES IGUAL QUE EN CATEGORIAS */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(174, 244, 174, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
  text-align: center;
  position: relative;
  animation: modalIn 0.3s;
}
@keyframes modalIn {
  from { transform: translateY(40px) scale(0.95); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
.modal-box img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  margin-bottom: 18px;
}
.modal-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 1rem;
}
.modal-text {
  color: #444;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}
.custom-button {
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  border-radius: 500px;
  overflow: hidden;
  background: #66ff66;
  color: ghostwhite;
  transition: all 0.4s ease;
}
.custom-button span {
  position: relative;
  z-index: 50;
  transition: color 0.4s;
}
.custom-button:hover span {
  color: black;
}
.custom-button::before {
  content: "";
  background: #000;
  width: 120%;
  left: -10%;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 0;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}
.custom-button:hover::before {
  transform: translate3d(100%, 0, 0);
}
.custom-button-delete {
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  border-radius: 500px;
  overflow: hidden;
  background: #ff0000;
  color: ghostwhite;
  transition: all 0.4s ease;
}
.custom-button-delete span {
  position: relative;
  z-index: 50;
  transition: color 0.4s;
}
.custom-button-delete:hover span {
  color: black;
}
.custom-button-delete::before {
  content: "";
  background: #000000;
  width: 120%;
  color: white;
  left: -10%;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 0;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}
.custom-button-delete:hover::before {
  transform: translate3d(100%, 0, 0);
}
.formField {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.formField label {
  font-weight: 500;
  margin-bottom: 0.3rem;
}
.formField input, .formField select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}
</style>