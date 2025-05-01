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
    height: 100%; 
    width: 100%; 
    background-color: #ffffff; 
   
}
  
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(173, 239, 123); 
    border-radius: 15px;
    box-shadow: 25px 30px 20px rgba(0, 0, 0, 0.5);
    padding: 20px;
    width: 100%; 
    max-width: 1200px; 
    height: 90%; 
    border: 3px solid black;
    
  }
  
  .form-section {
    flex: 1;
    padding: 30px;
    max-width: 400px;
  }
  
  .logo-section {
    flex: 1;
    text-align: center;
    min-height: 500px; 
    min-width: 100px;
    padding: 30px;
    color: white;
    background-image: url('../../assets/img/fotoLogin.jpg'); 
    background-size: cover;
    background-position: center; 
    border-radius: 15px;
  }
  
  .logo-section h1 {
    margin-top: 20px;
    font-size: 36px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); 
  }
  
  button {
    font-size: 18px;
    padding: 15px;
    border-radius: 8px;
  }
  

  </style>