# 🌿 Proyecto: Farma-Natur  
📄 **Documento:** Documentación Frontend  
👨‍💻 **Autor:** José Rafael Segura Rodríguez  "ppsegur"
📅 **Fecha:** Abril 2025  

---

## 📑 Índice

1. [Introducción](#1-introducción)  
2. [Tecnologías Utilizadas](#2-tecnologías-utilizadas)  
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)  
4. [Diseño de Vistas y Funcionalidades](#4-diseño-de-vistas-y-funcionalidades)  
5. [Flujo de Usuario](#5-flujo-de-usuario)  
6. [Proceso de Desarrollo](#6-proceso-de-desarrollo)  
7. [Integración con Backend](#7-integración-con-backend)  
8. [Diseño UI/UX](#8-diseño-uiux)  
9. [Pruebas](#9-pruebas)  
10. [Mejoras de la Aplicación para un Futuro](#10-mejoras-de-la-aplicación-para-un-futuro)  
11. [Conclusión](#11-conclusión)  
12. [Diseño Figma](#diseño-figma)  
13. [Seguimiento del Desarrollo](#seguimiento-del-desarrollo)

---

## 1. Introducción

**Farma-Natur** es una aplicación web farmacéutica centrada en mejorar la experiencia tanto de clientes como de farmacéuticos. Su frontend está diseñado con un enfoque moderno, funcional e intuitivo, permitiendo comprar productos, reservar citas y gestionar el inventario desde un mismo entorno.

---

## 2. Tecnologías Utilizadas

- ✅ Vue.js 3  
- ✅ Pinia (estado global)  
- ✅ Vue Router  
- ✅ TailwindCSS o BootstrapVue + UI Verse  
- ✅ Axios (consumo de API REST)  
- ✅ Vite (bundler para desarrollo rápido)

---

## 3. Arquitectura del Proyecto

La estructura modular garantiza escalabilidad y claridad:

/src │
├── auth/ # Login, registro, verificación 
├── cliente/ # Vistas y lógica del cliente 
├── farmaceutico/ # Vistas y lógica del farmacéutico 
├── shared/ # Componentes reutilizables 
├── services/ # Conexión con la API 
├── store/ # Gestión del estado con Pinia 
├── router/ # Configuración de rutas 
└── assets/ # Estilos, logos e imágenes

---

## 4. Diseño de Vistas y Funcionalidades

### 4.1 Cliente

- 🏠 Inicio: Promociones y productos destacados  
- 🛒 Catálogo: Lista de productos filtrables  
- 🔍 Detalle de Producto: Información completa y reseñas  
- 🧺 Carrito: Gestión de compra  
- 📦 Historial de Pedidos  
- 👤 Perfil personal editable  
- 📅 Citas con farmacéuticos  
- 📝 Comentarios y valoraciones de productos

### 4.2 Farmacéutico

- 📊 Dashboard con KPIs y estadísticas  
- 💊 Gestión de Productos (CRUD)  
- 🗂️ Categorías  
- 👥 Gestión de usuarios y roles  
- 📅 Citas: Confirmación y seguimiento  
- 🧹 Moderación de comentarios

---

## 5. Flujo de Usuario

**Cliente:**  
`Registro → Login → Navegación → Compra → Citas → Comentarios`

**Farmacéutico:**  
`Login → Dashboard → Gestión interna → Citas → Moderación`

---

## 6. Proceso de Desarrollo

1. Inicialización del proyecto con `Vite + Vue 3`  
2. Instalación de dependencias principales  
3. Creación de estructura modular  
4. Definición de rutas y roles  
5. Desarrollo de servicios API  
6. Implementación progresiva de vistas  
7. Conexión e integración con el backend

---

## 7. Integración con Backend

- 🔐 Axios con interceptores  
- 🔑 Manejo completo de tokens JWT  
- 🔁 Servicios separados para:
  - Usuarios
  - Productos
  - Categorías
  - Citas
  - Comentarios
  - Carrito

---

## 8. Diseño UI/UX

- 🎨 Paleta de colores: Verde, azul y blanco 
 # 🔍 Diseño Figma

[✨ Ver diseño en Figma](https://www.figma.com/design/DfvcTrNuvsvGRXWgNrzOjq/FarmaApp?node-id=4-34&t=89zc4DeU3uDM8eOm-1)

---

## 9. Pruebas

- 🔄 Casos probados manualmente:
  - Registro/Login
  - Compra completa
  - Reserva de cita
  - Comentar producto
- ✔️ Validación de flujos críticos y vistas protegidas
---
-- Pruebas realizadas en el Backend:
  [👨‍💻 Ver plan de prubas BACKEND](https://docs.google.com/spreadsheets/d/10QcS-cPko2D2f58Ouh0B5J2aEdARNVyq-dRoOhzOk3I/edit?usp=sharing)

---

## 10. Mejoras de la Aplicación para un Futuro

- 📷 Subida de recetas médicas  
- 💬 Chat en tiempo real cliente-farmacéutico  
- 🤒 Diagnóstico guiado de síntomas  
- 🎁 Sistema de fidelización y puntos  
- 👤 Modo invitado  
- 🔔 Notificaciones push  
- 📚 Blog con consejos de salud  
- 📦 Gestión avanzada de stock  
- 🔁 Reprogramación de citas  
- 📲 App PWA (progresiva)

---

## 11. Conclusión

**Farma-Natur** ha sido diseñada para cubrir de forma moderna e intuitiva las necesidades de una farmacia natural, tanto a nivel comercial como de atención personalizada. Esta base sólida permitirá seguir escalando y evolucionando en futuras versiones.



---

## 📋 Seguimiento del Desarrollo

[📄 Documento de seguimiento del Frontend](https://docs.google.com/document/d/1CKoF6_kfoBOP1d3VeVEYfRH5FKdfB_Z2rFaq_NJVPGk/edit?usp=sharing)

---
