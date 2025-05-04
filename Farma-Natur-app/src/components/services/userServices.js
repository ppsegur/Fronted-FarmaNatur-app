import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080';



// Verificar si el usuario tiene un rol específico o alguno de una lista de roles

// Decodifica el token si está presente
const token = localStorage.getItem('token');
if (token) {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    console.log('Token decodificado:', decoded)

    
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

export const getAllUsuarios = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No hay token disponible');
  }

  try {
    const response = await axios.get(`${API_URL}/auth/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers" : "Content-Type, Authorization",
        "Content-Type" : "application/json",
         
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('No tienes permisos para acceder a esta información');
    }
    throw error;
  }
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


// Exportar todas las funciones correctamente
const userServices = {
  getAllUsuarios,
   deleteUsuario,
  editUsuario,
  getUsuarioById,
    getUsuarioCompleto,
};

export default userServices;