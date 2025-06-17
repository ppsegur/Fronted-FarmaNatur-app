import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'


import AuthView from '@/components/auth/AuthView.vue'
import DashboardView from '@/components/Views/dashboard.vue'
import Verify from '@/components/auth/verify.vue'
import HomeView from '@/components/Views/HomeView.vue'
import CategoriaDashboard from '../src/components/Views/Farmaceutico/GestionesVistas/CategoriaDashboard.vue'
import CitasDashboard from './components/Views/Farmaceutico/GestionesVistas/CitasDashboard.vue'
import UserDashBoard from './components/Views/Farmaceutico/GestionesVistas/UserDashBoard.vue'
import ComentarioDashboard from './components/Views/Farmaceutico/GestionesVistas/ComentarioDashboard.vue'
import VentasDashboard from './components/Views/Farmaceutico/GestionesVistas/VentasDashboard.vue'
import ProductoDashboard from './components/Views/Farmaceutico/GestionesVistas/ProductoDashboard.vue'
import ProductDetail from '@/components/Views/cliente/Productos/Product-detail.vue';
const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth' ,
    component: AuthView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true , 
      role: 'ROLE_ADMIN' }, // Solo accesible para farmaceuticos
    
  },
    {
        path: '/verify',
        component: Verify, 
    },
    {
        path:'/home',
        component: HomeView,  
        meta: { requiresAuth: false }
    },
    {
      path:'/usuarios',
      component: UserDashBoard,
      meta: { requiresAuth: true,   role: ['ADMIN', 'FARMACEUTICO'] } // Solo accesible para farmaceuticos
    },
    {
      path:'/categoria',
      component: CategoriaDashboard,
      meta: { requiresAuth: true, role: ['ADMIN', 'FARMACEUTICO'] }    
    },
    {
      path: "/Citas",
      component: CitasDashboard,
      meta: { requiresAuth: true, role: ['ADMIN', 'FARMACEUTICO'] }
    },
  {
    path: '/Comentarios',
    component: ComentarioDashboard,
    meta: { requiresAuth: true, role: ['ADMIN', 'FARMACEUTICO'] } // Solo accesible para farmaceuticos
  },
{
  path: '/Ventas',
  component: VentasDashboard,
  meta: { requiresAuth: true, role: ['ADMIN', 'FARMACEUTICO'] } // Solo accesible para farmaceuticos
},
{
  path: '/Producto',
  component: ProductoDashboard,
  meta: { requiresAuth: true, role: ['ADMIN', 'FARMACEUTICO'] } // Solo accesible para farmaceuticos
},
{
  path: '/product-detail/:id',
  name: 'product-detail',
  component: ProductDetail,
  meta: { requiresAuth: false }
},
{
  path: '/historial',
  component: () => import('@/components/Views/cliente/Carrito/HistorialView.vue'),
  meta: { requiresAuth: true }
}
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');

  // Si no hay token y la ruta requiere autenticación, redirigir al login
  if (!token && to.meta.requiresAuth) {
    return next('/login');
  }

  if (token) {
    const decoded = jwtDecode(token);

    // Permitir acceso a /auth incluso si no está verificado
    if (!decoded.verified && to.path !== '/verify' && to.path !== '/auth') {
      return next('/verify');
    }

    // Verificar roles si la ruta tiene un meta.role
    if (to.meta.role && !to.meta.role.includes(decoded.role)) {
      return next('/'); // Redirigir al inicio si el rol no coincide
    }
  }

  next();
});
  

export default router