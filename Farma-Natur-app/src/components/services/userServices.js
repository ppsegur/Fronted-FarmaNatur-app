import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080';


// Función para obtener el rol del usuario actual
const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error('Error al obtener el rol:', error);
    return null;
  }
};

// Verificar si el usuario tiene un rol específico o alguno de una lista de roles
const hasRole = (requiredRoles) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }
  
  return userRole === requiredRoles;
};

// Decodifica el token si está presente
const token = localStorage.getItem('token');
if (token) {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    
    if (!decoded.verified) {
      console.error('El usuario no está verificado.');
    }

    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decoded.exp < currentTime) {
      console.error('El token ha expirado.');
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    localStorage.removeItem('token');
  }
}

// Métodos del servicio
const getAllUsuarios = async (page = 0, size = 10, sort = 'id,asc') => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No hay token disponible');
      window.location.href = '/login';
      return Promise.reject(new Error('No hay token disponible'));
    }
    
    return axios.get(`${API_URL}/auth/todos`, {
      params: { page, size, sort },
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).catch(error => {
      if (error.response && error.response.status === 403) {
        console.error('No tienes permisos para acceder a esta información');
        return Promise.reject(new Error('No tienes permisos para acceder a esta información'));
      }
      return Promise.reject(error);
    });
  };



const deleteUsuario = (username) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }
  
  return axios.delete(`${API_URL}/auth/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

const editUsuario = (username, data) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }
  
  return axios.put(`${API_URL}/auth/${username}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};
const getUsuarioById = async (userId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No hay token disponible');
      window.location.href = '/login';
      return Promise.reject(new Error('No hay token disponible'));
    }
    
    return axios.get(`${API_URL}/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  };const getUsuarioCompleto = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No hay token disponible');
      window.location.href = '/login';
      return Promise.reject(new Error('No hay token disponible'));
    }
  
    try {
      const decoded = jwtDecode(token);
      return {
        data: {
          id: decoded.sub,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
          verified: decoded.verified
        }
      };
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return Promise.reject(error);
    }
  };
// Función para obtener usuarios según el rol (si el backend lo soporta)
const getUsuariosByRole = (role, page = 0, size = 10) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }
  
  // Ajusta esta URL según la API de tu backend
  return axios.get(`${API_URL}/auth/byRole/${role}`, {
    params: { page, size },
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

// Exportar todas las funciones correctamente
const userServices = {
  getAllUsuarios,


   deleteUsuario,
  editUsuario,
  getUserRole,
  hasRole,
  getUsuariosByRole,
  getUsuarioById,
    getUsuarioCompleto,
};

export default userServices;