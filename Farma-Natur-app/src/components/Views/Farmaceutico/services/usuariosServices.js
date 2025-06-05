import axios from 'axios';



export const getUsuarioByUsername = async (username) => {
  const token = localStorage.getItem('token');
  return axios.get(`http://localhost:8080/usuarios/username/${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};