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

// FUNCION PARA ELIMINAR UNA CITA
export const deleteCita = async (titulo) => {
  const token = localStorage.getItem('token');
  return axios.delete(`http://localhost:8080/citas/${titulo}`, {
    headers: { Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
    },
  });
};
// FUNCION PARA EDITAR UNA CITA
export const updateCita = async (cita, data) => {
  const token = localStorage.getItem('token');
  const clienteId = cita.clienteId;
  const farmaceuticoId = cita.farmaceuticoId;
  const fechaInicio = cita.fecha_inicio;

  return axios.put(
    `http://localhost:8080/citas/editar?clienteId=${clienteId}&farmaceuticoId=${farmaceuticoId}&fechaInicio=${encodeURIComponent(fechaInicio)}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};
//FUNCION PARA OBTENER EL NOMBRE DEL FARMACEUTICO CON MAS CITAS 
export const getFarmaceuticoConMasCitas = async () => {
  const token = localStorage.getItem('token');
localStorage.getItem('token')
  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.get(`${API_URL}/top-farmaceutico`, {
    
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}


// FUNCION PARA OBTENER EL NOMBRE DEL CLIENTE CON MAS CITAS
export const getClienteConMasCitas = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.get(`${API_URL}/top-cliente`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getNumeroDeCitasFarmaceutico = async (username) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }
  return axios.get(`${API_URL}/numero-citas-farmaceutico/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getNumeroDeCitasCliente = async (username) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }
  return axios.get(`${API_URL}/numero-citas-cliente/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

