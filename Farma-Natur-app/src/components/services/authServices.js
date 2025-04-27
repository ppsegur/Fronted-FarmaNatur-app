import axios from 'axios'

const API_URL = 'http://localhost:8080/auth' // Ajusta a tu backend

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  const { token } = response.data
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const register = async (userData) => {
  await axios.post(`${API_URL}/register`, userData)
}

const logout = () => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
}

export default {
  login,
  register,
  logout
}
