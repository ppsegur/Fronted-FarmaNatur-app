import { createRouter, createWebHistory } from 'vue-router'


import AuthView from '@/components/auth/AuthView.vue'
import DashboardView from '@/components/Views/dashboard.vue'
import Verify from './components/auth/verify.vue'
import HomeView from './components/Views/HomeView.vue'

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
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (!token && to.meta.requiresAuth) {
      return next('/login')
    }
  
    if (token) {
      const decoded = jwt_decode(token)
  
      if (!decoded.enabled) return next('/verificar') // si no está verificado, bloqueamos
  
      if (to.meta.role && to.meta.role !== decoded.role) {
        return next('/no-autorizado')
      }
    }
  
    next()
  })
  

export default router