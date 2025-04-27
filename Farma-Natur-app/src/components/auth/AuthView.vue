<template>
    <div class="container-father">
      <div class="auth-container">
        <div class="form-section">
          <Login />
        </div>
  
        <div class="logo-section">
          <h1>Farma-Natur</h1>
        </div>
  
        <div class="form-section">
          <Register />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Login from './login.vue'
  import Register from './register.vue'
  </script>
  
  <style scoped>
  .container-father {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Ocupa todo el espacio disponible */
    width: 100%; /* Asegura que ocupe todo el ancho */
    background-color: #ffffff; /* Fondo claro */
  }
  
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(173, 239, 123); /* Fondo blanco para la tarjeta */
    border-radius: 15px; /* Bordes redondeados */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para efecto de tarjeta */
    padding: 20px;
    width: 100%; /* Ocupa todo el ancho */
    max-width: 1200px; /* Limita el ancho máximo */
    height: 90%; /* Ajusta la altura para que sea proporcional */
  }
  
  .form-section {
    flex: 1;
    padding: 30px;
    max-width: 400px;
  }
  
  .logo-section {
    flex: 1;
    text-align: center;
    height: 100%; /* Asegura que ocupe toda la altura */
    padding: 30px;
    color: white;
    background-image: url('../../assets/img/fotoLogin.jpg'); /* Imagen como fondo */
    background-size: cover; /* Asegura que la imagen cubra todo el div */
    background-position: center; /* Centra la imagen */
    border-radius: 15px; /* Bordes redondeados para que coincida con la tarjeta */
  }
  
  .logo-section h1 {
    margin-top: 20px;
    font-size: 36px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra para el texto */
  }
  
  button {
    font-size: 18px;
    padding: 15px;
    border-radius: 8px;
  }
  
  input {
    font-size: 16px;
    padding: 12px;
    border-radius: 8px;
  }
  </style>