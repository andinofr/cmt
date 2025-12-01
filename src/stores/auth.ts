import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Role types for the CMT system
export enum UserRole {
  CONTRACT_MANAGEMENT_SENIOR_MANAGER = "Contract Management Senior Manager",
  CONTRACT_MANAGEMENT_ADMINISTRATOR = "Contract Management Administrator",
  CONTRACT_MANAGEMENT_SUPERVISOR = "Contract Management Supervisor",
  CONTRACT_MANAGEMENT_ANALYST = "Contract Management Analyst",
  USER = "User",
  SYSTEM_ADMINISTRATOR = "System Administrator"
}

export interface User {
  id: string
  username: string
  name: string
  role: UserRole
  email: string
  department: string
  loginTime: string
  authProvider: 'application' | 'frontgate' | 'windows'
}

// Mock users database
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'jsmith',
    name: 'John Smith',
    role: UserRole.CONTRACT_MANAGEMENT_SENIOR_MANAGER,
    email: 'john.smith@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '2',
    username: 'sadmin',
    name: 'Sarah Administrator',
    role: UserRole.CONTRACT_MANAGEMENT_ADMINISTRATOR,
    email: 'sarah.admin@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '3',
    username: 'msupervisor',
    name: 'Michael Supervisor',
    role: UserRole.CONTRACT_MANAGEMENT_SUPERVISOR,
    email: 'michael.supervisor@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '4',
    username: 'janalyst',
    name: 'Jane Analyst',
    role: UserRole.CONTRACT_MANAGEMENT_ANALYST,
    email: 'jane.analyst@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '5',
    username: 'buser',
    name: 'Bob User',
    role: UserRole.USER,
    email: 'bob.user@company.com',
    department: 'Operations',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '6',
    username: 'sysadmin',
    name: 'System Admin',
    role: UserRole.SYSTEM_ADMINISTRATOR,
    email: 'sys.admin@company.com',
    department: 'IT',
    loginTime: '',
    authProvider: 'application'
  }
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)

  // Check if user belongs to Contract Management team
  const isCMTSenior = computed(() => {
    if (!user.value) return false

    return user.value?.role === UserRole.CONTRACT_MANAGEMENT_SENIOR_MANAGER
  })

  // Check if user belongs to Contract Management team
  const isCMTAdmin = computed(() => {
    if (!user.value) return false

    return user.value?.role === UserRole.CONTRACT_MANAGEMENT_ADMINISTRATOR
  })

  // Check if user belongs to Contract Management team
  const isCMTSPV = computed(() => {
    if (!user.value) return false

    return user.value?.role === UserRole.CONTRACT_MANAGEMENT_SUPERVISOR
  })

  // Check if user belongs to Contract Management team
  const isCMTAnalyst = computed(() => {
    if (!user.value) return false

    return user.value?.role === UserRole.CONTRACT_MANAGEMENT_ANALYST
  })

  // Check if user belongs to Contract Management team
  const isUser = computed(() => {
    if (!user.value) return false

    return user.value?.role === UserRole.USER
  })

  // Check if user belongs to Contract Management team
  const isSYSAdmin = computed(() => {
    if (!user.value) return false

    return user.value?.role === UserRole.SYSTEM_ADMINISTRATOR
  })

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('cmt_user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
    isLoading.value = false
  }

  const login = (userData: User) => {
    const loggedInUser: User = {
      ...userData,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('cmt_user', JSON.stringify(loggedInUser))
    user.value = loggedInUser
  }

  // Find user by username (unified credentials for all methods)
  const findUser = (username: string, authProvider: 'application' | 'frontgate' | 'windows'): User | null => {
    // All authentication methods now use the same user pool
    return mockUsers.find(u =>
      u.username === username.toLowerCase() && u.authProvider === 'application'
    ) || null
  }

  const logout = () => {
    localStorage.removeItem('cmt_user')
    user.value = null
  }

  return {
    user,
    isLoading,
    isCMTSenior,
    isCMTAdmin,
    isCMTSPV,
    isCMTAnalyst,
    isUser,
    isSYSAdmin,
    login,
    logout,
    initializeAuth,
    findUser,
    mockUsers
  }
})