import axios from 'axios';

const API_URL = 'http://localhost:8080/categoria';

const ALL_CATEGORIAS_URL = `${API_URL}/all`;
//Función para obtener todas las categorías
export const getCategorias = async () => {
  const response = await axios.get(ALL_CATEGORIAS_URL);
  return response.data;
};

//Función para editar una categoría por nombre
export const editCategoria = async ( nombre, data) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error('No hay token disponible');
        window.location.href = '/login';
        return Promise.reject(new Error('No hay token disponible'));
    }
    
    return axios.put(`${API_URL}/${encodeURIComponent(nombre)}`, data, {
        headers: {
        Authorization: `Bearer ${token}`
        },
    });
    }

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