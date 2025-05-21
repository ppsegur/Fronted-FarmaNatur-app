import axios from 'axios';

const API_URL = 'http://localhost:8080/categoria';

const ALL_CATEGORIAS_URL = `${API_URL}/all`;
//Función para obtener todas las categorías
export const getCategorias = async () => {
  const response = await axios.get(ALL_CATEGORIAS_URL);
  return response.data;
};

//Función para editar una categoría por nombre
export const editCategoria = async (nombre, data) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No hay token disponible');
      window.location.href = '/login';
      return Promise.reject(new Error('No hay token disponible'));
    }
  
    return axios.put(`${API_URL}/${encodeURIComponent(nombre)}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

//Función para eliminar una categoría por nombre
export const deleteCategoria = async (nombre) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error('No hay token disponible');
        window.location.href = '/login';
        return Promise.reject(new Error('No hay token disponible'));
    }
    
    return axios.delete(`${API_URL}/${encodeURIComponent(nombre)}`, {
        headers: {
        Authorization: `Bearer ${token}`
        },
    });
}
//FUncion para sacar la categoria con mas productos 
export const getTopCategoria = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.get(`${API_URL}/top-categoria`, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
    },
  });
};

// Función para crear una nueva columna para decir el
// nº de productos que tiene la categoria
export const contarProductosPorCategoria = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.get(`http://localhost:8080/conteo-productos`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};