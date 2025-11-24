import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  role: 'CMT_TEAM' | 'GENERAL_USER'
  name: string
  loginTime: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)

  const isCMTTeam = computed(() => user.value?.role === 'CMT_TEAM')

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('cmt_user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
    isLoading.value = false
  }

  const login = (role: 'CMT_TEAM' | 'GENERAL_USER', name: string) => {
    const userData: User = {
      role,
      name,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('cmt_user', JSON.stringify(userData))
    user.value = userData
  }

  const logout = () => {
    localStorage.removeItem('cmt_user')
    user.value = null
  }

  return {
    user,
    isLoading,
    isCMTTeam,
    login,
    logout,
    initializeAuth
  }
})