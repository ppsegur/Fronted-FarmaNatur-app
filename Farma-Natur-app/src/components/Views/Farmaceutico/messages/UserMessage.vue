<template>
<div class="card">
  <svg class="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
      fill-opacity="1"
    ></path>
  </svg>

  <div class="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke-width="0"
      fill="currentColor"
      stroke="currentColor"
      class="icon"
    >
      <path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM352 176c0-26.5-21.5-48-48-48s-48 21.5-48 48 21.5 48 48 48 48-21.5 48-48zm-48 80c-44.2 0-80 35.8-80 80h32c0-26.5 21.5-48 48-48s48 21.5 48 48h32c0-44.2-35.8-80-80-80z"
      ></path>
    </svg>
  </div>
  <div class="message-text-container">
    <p class="message-text">Hola Farmacéutico, bienvenido a la gestión de usuarios</p>
    <p class="sub-text">Aquí podrás editar, eliminar y gestionar los usuarios del sistema.</p>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    stroke-width="0"
    fill="none"
    stroke="currentColor"
    class="cross-icon"
  >
  </svg>
</div>
</template>

<style>
.card {
  width: 600px;
  height: 80px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 30px;
  gap: 15px;
}
.wave {
  position: absolute;
  transform: rotate(90deg);
  left: -31px;
  top: 32px;
  width: 80px;
  fill: #04e4003a;
}
.icon-container {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04e40048;
  border-radius: 50%;
  margin-left: 8px;
}
.icon {
  width: 17px;
  height: 17px;
  color: #269b24;
}
.message-text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
}
.message-text,
.sub-text {
  margin: 0;
  cursor: default;
}
.message-text {
  color: #269b24;
  font-size: 17px;
  font-weight: 700;
}
.sub-text {
  font-size: 14px;
  color: #555;
}
.cross-icon {
  width: 18px;
  height: 18px;
  color: #555;
  cursor: pointer;
}
</style>