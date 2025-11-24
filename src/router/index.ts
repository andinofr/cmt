import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/workspace-selector',
      name: 'workspace-selector',
      component: () => import('@/views/WorkspaceSelector.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/planning',
      name: 'planning',
      component: () => import('@/views/PlanningWorkspace.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/execution',
      name: 'execution',
      component: () => import('@/views/ExecutionWorkspace.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/central-hub',
      name: 'central-hub',
      component: () => import('@/views/CentralHub.vue'),
      meta: { requiresAuth: true, requiresCMT: true }
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isLoading) {
    next()
    return
  }

  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
    return
  }

  if (to.meta.requiresCMT && !authStore.isCMTTeam) {
    next('/workspace-selector')
    return
  }

  next()
})

export default router