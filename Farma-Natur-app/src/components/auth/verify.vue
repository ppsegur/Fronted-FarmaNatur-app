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
        <p>Pon el código de verificación</p>
        <input v-model="code" maxlength="6" placeholder="Código 2FA" />
        <button @click="handleVerify">Verificar</button>
        <small>Después de verificar, loguéate y podrás acceder a la aplicación</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authServices'

const code = ref('')
const showModal = ref(false)
const router = useRouter()

const handleVerify = async () => {
  const email = localStorage.getItem('emailRegisterTemp')
  console.log('Enviando a backend:', { email, code: code.value })

  try {
    const response = await authService.verifyAccount({
      email,
      code: code.value
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
  background-color: #a2f3a2;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.message-box {
  background: white;
  padding: 2rem;
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
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  text-align: center;
}

.modal button {
  background-color: #4caf50;
  padding: 0.6rem;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
