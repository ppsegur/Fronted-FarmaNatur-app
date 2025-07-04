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
export const deleteCita = async (clienteId, farmaceuticoId, fechaInicio) => {
  const token = localStorage.getItem('token');
  
  // Formatear fecha para el backend (ej: asegurar 6 decimales en los segundos)
  const fechaFormateada = formatDateForBackend(fechaInicio);

  return axios.delete(
    `${API_URL}/${clienteId}/${farmaceuticoId}/${fechaFormateada}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
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



//Funcion para obtener la madia de citas por dia 
export const getMediaCitasPorDia = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.get(`${API_URL}/media/dia`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}



// Funcion para obtener la media de citas por mes
export const getMediaCitasPorMes = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.get(`${API_URL}/media/mes`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

//FUNCION PARA CREAR UNA CITA
export const createCita = async (cita) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No hay token disponible');
    window.location.href = '/login';
    return Promise.reject(new Error('No hay token disponible'));
  }

  return axios.post(`${API_URL}/crear`, cita, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
//FUNFIÖN PARA CANCELAR UNA CITA 
// citasServices.js
export const anularCita = async (clienteId, farmaceuticoId, fechaInicio, motivo) => {
  const token = localStorage.getItem('token');
  return axios.patch(
    `${API_URL}/${clienteId}/${farmaceuticoId}/${fechaInicio}/anular`,
    motivo,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
// Función auxiliar para formatear fecha
export const formatDateForBackend = (dateString) => {
  const date = new Date(dateString);
  const isoString = date.toISOString(); // Ej: "2025-05-16T18:00:00.000Z"
  
  // Reemplazar 'Z' por '.000000' o mantener los decimales existentes
  if (isoString.includes('.')) {
    return isoString.replace('Z', '').padEnd(26, '0').substring(0, 26);
  } else {
    return isoString.replace('Z', '.000000');
  }
};