<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-title" style="color:#1976d2;">Crear nueva cita</div>
        <form @submit.prevent="emitirCrearCita">
          <div class="formField">
  <label for="titulo">Tipo de cita</label>
  <select id="titulo" v-model="form.titulo" required>
    <option value="" disabled>Selecciona tipo</option>
    <option value="basica">Básica</option>
    <option value="general">General</option>
    <option value="terapia">Terapia</option>
  </select>
</div>
          <div class="formField">
          <select v-model="form.usernameFarma" required>
            <option value="" disabled>Selecciona</option>
            <option v-for="f in props.farmaceuticos" :key="f.username" :value="f.username">
              {{ f.username }}
            </option>
          </select>
            <span>Farmacéutico</span>
          </div>
          <div class="formField">
            <select v-model="form.usernameCliente" required>
              <option value="" disabled>Selecciona</option>
              <option v-for="c in props.clientes" :key="c.username" :value="c.username">
                {{  c.username }}
              </option>
            </select>
            <span>Cliente</span>
          </div>
          <div class="formField">
            <input type="number" v-model.number="form.precio" min="0" required />
            <span>Precio</span>
          </div>
          <div class="formField">
            <label style="display:flex;align-items:center;gap:8px;">
              <input type="checkbox" v-model="form.oferta" />
              Oferta
            </label>
          </div>
          <div class="formField">
            <input type="datetime-local" v-model="form.fecha_inicio" required />
            <span>Fecha inicio</span>
          </div>
          <div class="formField">
            <input type="datetime-local" v-model="form.fecha_fin" required />
            <span>Fecha fin</span>
          </div>
       
          <div class="modal-actions">
            <button type="button" class="c-button c-button--gooey-gray" @click="$emit('cerrar')">
              Cancelar
              <div class="c-button__blobs"><div></div><div></div><div></div></div>
            </button>
            <button type="submit" class="c-button c-button--gooey-green">
              Crear
              <div class="c-button__blobs"><div></div><div></div><div></div></div>
            </button>
          </div>
          <div v-if="msg" class="modal-msg">{{ msg }}</div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({

   farmaceuticos: {
    type: Array,
    default: () => []  
  },
  clientes: {
    type: Array,
    default: () => []  
  },
  show: Boolean,
 
  msg: String
});
const emit = defineEmits(['cerrar', 'crear']);

watch(() => props.farmaceuticos, (newVal) => {
  console.log('Farmacéuticos en modal:', newVal);
}, { immediate: true });
watch(() => props.clientes, (newVal) => {
  console.log('Clientes en modal:', newVal);
}, { immediate: true });
const form = ref({
  titulo: '',
  usernameFarma: '',
  usernameCliente: '',
  precio: 0,
  oferta: false,
  fecha_inicio: '',
  fecha_fin: '',
  tipo: ''
});
function emitirCrearCita() {
  emit('crear', {
    fecha_inicio: form.value.fecha_inicio, 
    usernameFarma: { username: form.value.usernameFarma},
    usernameCliente: { username: form.value.usernameCliente },
    titulo: form.value.titulo,
    precio: form.value.precio,
    oferta: form.value.oferta,
    fecha_fin: form.value.fecha_fin,
    usernameFarma: { username: form.value.usernameFarma},
    usernameCliente: { username: form.value.usernameCliente },
    
  });
}

watch(() => props.show, (val) => {
  if (!val) {
    // Limpiar formulario al cerrar
    form.value = {
      titulo: '',
      usernameFarma: '',
      usernameCliente: '',
      precio: 0,
      oferta: false,
      fecha_inicio: '',
      fecha_fin: ''
    };
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(174, 244, 174, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-box {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
  text-align: center;
  position: relative;
  animation: modalIn 0.3s;
}

@keyframes modalIn {
  from { transform: translateY(40px) scale(0.95); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}

.modal-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 1.5rem;
}

.formField {
  margin: 18px 0 0 0;
  position: relative;
  width: 100%;
}

.formField input,
.formField select {
  width: 100%;
  padding: 10px 15px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #f1f1f1;
  color: #333;
  font-size: 16px;
  font-weight: 550;
  transition: 0.3s;
  box-shadow: 0 0 0 2px transparent;
}

.formField input:hover,
.formField input:focus,
.formField select:hover,
.formField select:focus {
  box-shadow: 0 0 0 2px #35eb25;
}

.formField span {
  position: absolute;
  left: 15px;
  top: 10px;
  color: #666;
  font-size: 15px;
  font-weight: 600;
  pointer-events: none;
  transition: 0.2s;
  background: transparent;
}

.formField input:focus + span,
.formField input:valid + span,
.formField select:focus + span,
.formField select:valid + span {
  transform: translateY(-22px) scale(0.95);
  color: #4deb25;
  background: #fff;
  padding: 0 4px;
}

/* Estilos para los botones gooey */
.c-button {
  color: #000;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  padding: 0.9em 1.6em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  margin: 0 8px;
}

.c-button--gooey-green {
  color: #06c8d9;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #06c8d9;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button--gooey-red {
  color: #ff4d4d;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #ff4d4d;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button--gooey-gray {
  color: #666;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #666;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button__blobs {
  height: 100%;
  filter: url(#goo);
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -3px;
  right: -1px;
  z-index: -1;
}

.c-button__blobs div {
  width: 34%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  transform: scale(1.4) translateY(125%) translateZ(0);
  transition: all 700ms ease;
}

.c-button--gooey-green .c-button__blobs div {
  background-color: #06c8d9;
}

.c-button--gooey-red .c-button__blobs div {
  background-color: #ff4d4d;
}

.c-button--gooey-gray .c-button__blobs div {
  background-color: #666;
}

.c-button__blobs div:nth-child(1) {
  left: -5%;
}

.c-button__blobs div:nth-child(2) {
  left: 30%;
  transition-delay: 60ms;
}

.c-button__blobs div:nth-child(3) {
  left: 66%;
  transition-delay: 25ms;
}

.c-button--gooey-green:hover {
  color: #fff;
}

.c-button--gooey-red:hover {
  color: #fff;
}

.c-button--gooey-gray:hover {
  color: #fff;
}

.c-button:hover .c-button__blobs div {
  transform: scale(1.4) translateY(0) translateZ(0);
}
</style>