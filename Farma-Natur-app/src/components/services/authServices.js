// src/components/services/authServices.js
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'  // ✅ CORRECTO


const API_URL = 'http://localhost:8080/auth'
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  const { token } = response.data
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const decoded = jwtDecode(token)
  console.log('Decoded token:', decoded) // Verifica el contenido del token decodificado
  return decoded
}

const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData)
}

const verifyAccount = async ({ email, code }) => {
  const response = await axios.post(`${API_URL}/verify-2fa`, { email, code })
  const { token } = response.data
  localStorage.setItem('token', token) // Actualiza el token en localStorage
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}` // Actualiza el header de autorización
  return jwtDecode(token) // Devuelve el token decodificado

}

const logout = () => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
}

export default {
  login,
  register,
  logout,
  verifyAccount
}
