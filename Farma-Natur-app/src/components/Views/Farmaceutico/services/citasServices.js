import axios from 'axios';

const API_URL = 'http://localhost:8080/citas';

//FUNCION PARA OBTENER TODAS LAS CITAS
export const getCitas = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
