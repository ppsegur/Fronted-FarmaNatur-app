<template>
    <div class="auth-form">
      <h2>Register</h2>
      <p>Crea tu cuenta</p>
      <form @submit.prevent="handleRegister">
      <!-- Input para email -->
      <div class="form-control">
        <input 
          v-model="email" 
          type="email" 
          required
        />
        <i class="pi pi-envelope input-icon"></i>
        <label>
          <span style="transition-delay:0ms">E</span>
          <span style="transition-delay:50ms">m</span>
          <span style="transition-delay:100ms">a</span>
          <span style="transition-delay:150ms">i</span>
          <span style="transition-delay:200ms">l</span>
        </label>
      </div>

      <!-- Input para confirmar email -->
      <div class="form-control">
        <input 
          v-model="confirmEmail" 
          type="email" 
          required
        />
        <i class="pi pi-check-circle input-icon"></i>
        <label>
          <span style="transition-delay:0ms">C</span>
          <span style="transition-delay:50ms">o</span>
          <span style="transition-delay:100ms">n</span>
          <span style="transition-delay:150ms">f</span>
          <span style="transition-delay:200ms">i</span>
          <span style="transition-delay:250ms">r</span>
          <span style="transition-delay:300ms">m</span>
          <span style="transition-delay:350ms"> </span>
          <span style="transition-delay:400ms">E</span>
          <span style="transition-delay:450ms">m</span>
          <span style="transition-delay:500ms">a</span>
          <span style="transition-delay:550ms">i</span>
          <span style="transition-delay:600ms">l</span>
        </label>
      </div>

      <!-- Input para username -->
      <div class="form-control">
        <input 
          v-model="username" 
          type="text" 
          required
        />
        <i class="pi pi-user input-icon"></i>
        <label>
          <span style="transition-delay:0ms">U</span>
          <span style="transition-delay:50ms">s</span>
          <span style="transition-delay:100ms">e</span>
          <span style="transition-delay:150ms">r</span>
          <span style="transition-delay:200ms">n</span>
          <span style="transition-delay:250ms">a</span>
          <span style="transition-delay:300ms">m</span>
          <span style="transition-delay:350ms">e</span>
        </label>
      </div>

      <!-- Input para password -->
      <div class="form-control">
        <input 
          v-model="password" 
          type="password" 
          required
        />
        <i class="pi pi-lock input-icon"></i>
        <label>
          <span style="transition-delay:0ms">P</span>
          <span style="transition-delay:50ms">a</span>
          <span style="transition-delay:100ms">s</span>
          <span style="transition-delay:150ms">s</span>
          <span style="transition-delay:200ms">w</span>
          <span style="transition-delay:250ms">o</span>
          <span style="transition-delay:300ms">r</span>
          <span style="transition-delay:350ms">d</span>
        </label>
      </div>

      <!-- Input para confirmar password -->
      <div class="form-control">
        <input 
          v-model="confirmPassword" 
          type="password" 
          required
        />
        <i class="pi pi-shield input-icon"></i>
        <label>
          <span style="transition-delay:0ms">C</span>
          <span style="transition-delay:50ms">o</span>
          <span style="transition-delay:100ms">n</span>
          <span style="transition-delay:150ms">f</span>
          <span style="transition-delay:200ms">i</span>
          <span style="transition-delay:250ms">r</span>
          <span style="transition-delay:300ms">m</span>
          <span style="transition-delay:350ms"> </span>
          <span style="transition-delay:400ms">P</span>
          <span style="transition-delay:450ms">a</span>
          <span style="transition-delay:500ms">s</span>
          <span style="transition-delay:550ms">s</span>
          <span style="transition-delay:600ms">w</span>
          <span style="transition-delay:650ms">o</span>
          <span style="transition-delay:700ms">r</span>
          <span style="transition-delay:750ms">d</span>
        </label>
      </div>


        <!-- Botón de registro -->
        <button type="submit">Register
            <!--Añadimos plantilla de ui verse -->
            <div class="star-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 784.11 815.53"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          class="fil0"
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 784.11 815.53"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          class="fil0"
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 784.11 815.53"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          class="fil0"
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 784.11 815.53"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          class="fil0"
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 784.11 815.53"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          class="fil0"
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 784.11 815.53"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          class="fil0"
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        ></path>
      </g>
    </svg>
  </div>
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import authService from '../services/authServices'
  import { useRouter } from 'vue-router'
  import 'primeicons/primeicons.css'

  const router = useRouter()
  const email = ref('')
  const username = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const confirmEmail = ref('')
  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden')
      return
    }
    if (email.value !== confirmEmail.value) {
      alert('Los correos no coinciden')
      return
    }
    if (username.value.length < 3) {
      alert('El nombre de usuario debe tener al menos 3 caracteres')
      return
    }
    console.log({
    email: email.value,
    username: username.value,
    password: password.value,
  })
  localStorage.setItem('emailRegisterTemp', email.value)
  localStorage.setItem('usernameRegisterTemp', username.value)
  
    try {
      await authService.register({ email: email.value, username: username.value, password: password.value,verifyEmail:confirmEmail.value, verifyPassword:confirmPassword.value })
      router.push('/verify')
    } catch (error) {
      console.error('Registration failed', error)
    }
  }
  </script>
  
  <style scoped>
  

  .auth-form { text-align: center; }
  input { margin:5px 0; padding: 5px; width: 100%; }
  button { color: white; padding: 10px; width: 100%; }
   /* Estilos para las estrellas */
   button {
  position: relative;
  padding: 12px 35px;
  background:rgb(5, 175, 5);
  font-size: 17px;
  font-weight: 500;
  color: #181818;
  border: 3px solid green;
  border-radius: 8px;
  box-shadow: 0 0 0 #fec1958c;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.star-1 {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 25px;
  height: auto;
  filter: drop-shadow(0 0 0 #f1ffef);
  z-index: -5;
  transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
}

.star-2 {
  position: absolute;
  top: 45%;
  left: 45%;
  width: 15px;
  height: auto;
  filter: drop-shadow(0 0 0 #efffef);
  z-index: -5;
  transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
}

.star-3 {
  position: absolute;
  top: 40%;
  left: 40%;
  width: 5px;
  height: auto;
  filter: drop-shadow(0 0 0 #effff0);
  z-index: -5;
  transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
}

.star-4 {
  position: absolute;
  top: 20%;
  left: 40%;
  width: 8px;
  height: auto;
  filter: drop-shadow(0 0 0 #effff4);
  z-index: -5;
  transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
}

.star-5 {
  position: absolute;
  top: 25%;
  left: 45%;
  width: 15px;
  height: auto;
  filter: drop-shadow(0 0 0 #effff2);
  z-index: -5;
  transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
}

.star-6 {
  position: absolute;
  top: 5%;
  left: 50%;
  width: 5px;
  height: auto;
  filter: drop-shadow(0 0 0 #efffef);
  z-index: -5;
  transition: all 0.8s ease;
}

button:hover {
  background: transparent;
  color: #3cd32b;
  box-shadow: 0 0 25px #99fe958c;
}

button:hover .star-1 {
  position: absolute;
  top: -80%;
  left: -30%;
  width: 25px;
  height: auto;
  filter: drop-shadow(0 0 10px #effff1);
  z-index: 2;
}

button:hover .star-2 {
  position: absolute;
  top: -25%;
  left: 10%;
  width: 15px;
  height: auto;
  filter: drop-shadow(0 0 10px #f1ffef);
  z-index: 2;
}

button:hover .star-3 {
  position: absolute;
  top: 55%;
  left: 25%;
  width: 5px;
  height: auto;
  filter: drop-shadow(0 0 10px #effff0);
  z-index: 2;
}

button:hover .star-4 {
  position: absolute;
  top: 30%;
  left: 80%;
  width: 8px;
  height: auto;
  filter: drop-shadow(0 0 10px #efffef);
  z-index: 2;
}

button:hover .star-5 {
  position: absolute;
  top: 25%;
  left: 115%;
  width: 15px;
  height: auto;
  filter: drop-shadow(0 0 10px #effff3);
  z-index: 2;
}

button:hover .star-6 {
  position: absolute;
  top: 5%;
  left: 60%;
  width: 5px;
  height: auto;
  filter: drop-shadow(0 0 10px #effff0);
  z-index: 2;
}

.fil0 {
  fill: #effff5;
}
/* Estilos para el contenedor principal */
.auth-form {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.auth-form h2 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.auth-form p {
  font-size: 20px;
  color: #000000;
  margin-bottom: 20px;
}

/* Estilos para los inputs */
.form-control {
  position: relative;
  margin: 20px 0;
}

.form-control input {
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #515151;
  background: transparent;
}

.form-control input:focus {
  outline: none;
}

.form-control label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  display: flex;
}

.form-control label span {
  transition: 0.2s ease all;
  transition-delay: calc(var(--index) * 0.05s);
}

.form-control input:focus ~ label span,
.form-control input:valid ~ label span {
  transform: translateY(-20px);
  font-size: 14px;
  color: #2b681f;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  transition: all 0.3s ease;
}

.form-control input:focus ~ .input-icon,
.form-control input:valid ~ .input-icon {
  color: #2b681f;
}
/* Estilos para los iconos de los inputs */
.input-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
  transition: all 0.3s ease;
}

.form-control input:focus ~ .input-icon,
.form-control input:valid ~ .input-icon {
  color: rgb(0, 112, 17);
}

/* Ajustar el padding derecho del input para que no se solape con el icono */
.form-control input {
  padding-right: 30px !important;
}

/* Asegurar que el contenedor tenga posición relativa */
.form-control {
  position: relative;
}

  </style>
  