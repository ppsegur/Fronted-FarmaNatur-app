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
  
  if (to.meta.requiresAuth && !token) {
    next('/auth') // si no hay token, manda al login
  } else {
    next()
  }
})

export default router