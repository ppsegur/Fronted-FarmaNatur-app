import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'


import AuthView from '@/components/auth/AuthView.vue'
import DashboardView from '@/components/Views/dashboard.vue'
import Verify from '@/components/auth/verify.vue'
import HomeView from '@/components/Views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    component: AuthView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
    {
        path: '/verify',
        component: Verify, 
    },
    {
        path:'/home',
        component: HomeView,  
        meta: { requiresAuth: false }
    }
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protección de rutas
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')

  // Si no hay token y la ruta requiere autenticación, redirigir al login
  if (!token && to.meta.requiresAuth) {
    return next('/login')
  }

  if (token) {
    const decoded = jwtDecode(token)

    // Permitir acceso a /auth incluso si no está verificado
    if (!decoded.verified && to.path !== '/verify' && to.path !== '/auth') {
      return next('/verify')
    }

    // Verificar roles si la ruta tiene un meta.role
    if (to.meta.role && to.meta.role !== decoded.role) {
      return next('/')
    }
  }

  next()
})
  

export default router