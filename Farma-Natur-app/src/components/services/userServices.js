// src/components/services/UsuarioService.js
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de instalar jwt-decode si no lo has hecho ya
const API_URL = 'http://localhost:8080';

// Decodifica el token si está presente
const token = localStorage.getItem('sub');
if (token) {
  const decoded = jwtDecode(token);
  console.log(decoded);

  // Verifica el rol del usuario
  if (decoded.role !== 'ADMIN' && decoded.role !== 'FARMACEUTICO') {
    console.error('El usuario no tiene permisos para acceder a este recurso.');
    alert('No tienes permisos para acceder a esta funcionalidad.');
    window.location.href = '/';
  }
}
// Métodos del servicio
const getAllUsuarios = (page = 0, size = 6, sort = 'id,asc') => {
    const token = localStorage.getItem('token');
    console.log('Token obtenido:', token); // Depuración
    
    if (!token) {
      throw new Error('No se encontró un token en el almacenamiento local.');
    }
    
    try {
      const decoded = jwtDecode(token);
      console.log('Token decodificado:', decoded); // Verifica los datos
      
      if (!decoded.role || (decoded.role !== 'FARMACEUTICO' && decoded.role !== 'ADMIN')) {
        throw new Error('El usuario no tiene los permisos necesarios');
      }
      
      return axios.get(`${API_URL}/auth/todos`, {
        params: { page, size, sort },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      throw error;
    }
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