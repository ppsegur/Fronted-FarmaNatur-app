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


export const deleteCita = async (titulo) => {
  const token = localStorage.getItem('token');
  return axios.delete(`http://localhost:8080/citas/${titulo}`, {
    headers: { Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
    },
  });
};
export const updateCita = async (cita, data) => {
  const token = localStorage.getItem('token');
  return axios.put(
    `http://localhost:8080/citas/${encodeURIComponent(cita.titulo)}`, // <-- usa 'titulo'
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};


