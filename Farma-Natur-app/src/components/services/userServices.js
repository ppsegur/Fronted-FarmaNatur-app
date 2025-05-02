// src/components/services/UsuarioService.js
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de instalar jwt-decode si no lo has hecho ya
const API_URL = 'http://localhost:8080';

// Decodifica el token si está presente
const token = localStorage.getItem('sub');
if (token) {
  const decoded = jwtDecode(token);
  console.log(decoded);
  if (!decoded.verified) {
    console.error('El usuario no está verificado.');
  }

const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp < currentTime) {
    console.error('El token ha expirado.');
    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
    window.location.href = '/login';
  }

}
// Métodos del servicio
const getAllUsuarios = (page = 0, size = 10, sort = 'id,asc') => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/auth/todos`, {
    params: { page, size, sort },
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUsuarioActual = () => {
  return axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const deleteUsuario = (username) => {
  return axios.delete(`${API_URL}/auth/${username}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const editUsuario = (username, data) => {
  return axios.put(`${API_URL}/auth/${username}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export default {
  getAllUsuarios,
  getUsuarioActual,
  deleteUsuario,
  editUsuario,
};