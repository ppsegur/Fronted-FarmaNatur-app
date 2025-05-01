<template>
  <div class="verify-page">
    <div class="message-box">
      <p>
        Hemos enviado un QR a tu correo con el que podrás verificar tu cuenta y acceder a la página.  
        (Recuerda instalar Google Authenticator para poder escanear el QR)
      </p>
      <button @click="showModal = true">Verificar la cuenta</button>
    </div>

    <div v-if="showModal" class="modal-backdrop">
      <div class="modal">
        <form class="form">
          <div class="content">
            <p align="center">Enter your OTP Code</p>
            <div class="inp">
              <input v-model="code[0]" maxlength="1" class="input" type="text" placeholder="" @input="focusNext(0, $event)">
              <input v-model="code[1]" maxlength="1" class="input" type="text" placeholder="" @input="focusNext(1, $event)">
              <input v-model="code[2]" maxlength="1" class="input" type="text" placeholder="" @input="focusNext(2, $event)">
              <input v-model="code[3]" maxlength="1" class="input" type="text" placeholder="" @input="focusNext(3, $event)">
              <input v-model="code[4]" maxlength="1" class="input" type="text" placeholder="" @input="focusNext(4, $event)">
              <input v-model="code[5]" maxlength="1" class="input" type="text" placeholder="" @input="focusNext(5, $event)">
            </div>
            <button type="button" @click="handleVerify">Verify</button>
          </div>
        </form>
        <small>Después de verificar, loguéate y podrás acceder a la aplicación</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authServices'

const code = ref(Array(6).fill(''))
const showModal = ref(false)
const router = useRouter()

const focusNext = (index, event) => {
  if (event.target.value && index < 5) {
    const nextInput = document.querySelectorAll('.input')[index + 1]
    nextInput.focus()
  }
  
  // Si se borra un carácter, retroceder al campo anterior
  if (!event.target.value && index > 0) {
    const prevInput = document.querySelectorAll('.input')[index - 1]
    prevInput.focus()
  }
}

const handleVerify = async () => {
  const email = localStorage.getItem('emailRegisterTemp')
  const fullCode = code.value.join('')
  
  console.log('Enviando a backend:', { email, code: fullCode })

  try {
    const response = await authService.verifyAccount({
      email,
      code: fullCode
    })
    console.log('Respuesta del backend:', response)
    alert('Cuenta verificada correctamente')
    router.push('/auth')
  } catch (err) {
    console.error('Error en verificación:', err)
    alert('Código incorrecto o expirado')
  }
}
</script>

<style scoped>
.verify-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  height: 100%;
  background-color: #a2f3a2;
  padding: 20px;
  box-sizing: border-box;
}

.message-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.message-box button {
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.message-box {
  background: white;
  padding: 2rem;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.message-box button {
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #333;
  color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #333333;
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
  border: 1px solid #fff;
  width: 20em;
  height: 12em;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
  margin-bottom: auto;
}

.form p {
  color: #fff;
  font-weight: bolder;
}

.inp {
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
}

.input + .input {
  margin-left: 0.5em;
}

.input {
  color: #fff;
  height: 2em;
  width: 2em;
  float: left;
  text-align: center;
  background: #00000000;
  outline: none;
  border: 1px #fff solid;
  border-radius: 5px;
  transition: all 0.6s ease;
  font-size: larger;
}

.input:focus {
  outline: none;
  border: 1px #fff solid;
}

.input:not(:placeholder-shown) {
  background-color: #fff;
  color: #333;
  width: 1em;
  height: 1em;
}

.form button {
  margin-left: auto;
  margin-right: auto;
  background-color: #00000000;
  color: #fff;
  width: 8.5em;
  height: 2.3em;
  border: #fff 0.1em solid;
  border-radius: 5px;
  transition: all 0.5s ease;
  cursor: pointer;
}

.form button:hover {
  background-color: #fff;
  color: #000;
}

.modal small {
  color: #ccc;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 10px;
}
:deep(.verify-page) {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>