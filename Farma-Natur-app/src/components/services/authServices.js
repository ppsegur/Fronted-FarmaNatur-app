import axios from 'axios'

const API_URL = 'http://localhost:8080/auth' // Ajusta a tu backend


// Configura axios para usar el token de autenticación en las cabeceras
// Función del login
// import jwt_decode from 'jwt-decode'
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  const { token } = response.data
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const decoded = jwt_decode(token)
    return {
        user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        verificado: true,
        }
    }
    
}
const decoded = await authService.login({
    username: username.value,
    password: password.value
  })
  
  if (!decoded.enabled) {
    alert('Tu cuenta aún no ha sido verificada. Revisa tu correo.')
    router.push('/verify')
    return
  }
  
  if (decoded.role === 'CLIENTE') {
    router.push('/productos')
  } else if (decoded.role === 'FARMACEUTICO') {
    router.push('/dashboard')
  } else {
    router.push('/home') // fallback
  }


  // Función de registro
const register = async (userData) => {
  await axios.post(`${API_URL}/register`, userData)
}


// Función de verificación
const verifyAccount = async ({ email, token }) => {
    const response = await axios.post(`${API_URL}/verify-2fa`, {
      email,
      token
    })
    return response.data
  }

// Función
const logout = () => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
}

export default {
  login,
  register,
  logout
}
