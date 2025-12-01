import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Role types for the CMT system
export type UserRole =
  | 'CONTRACT_MANAGEMENT_SENIOR_MANAGER'
  | 'CONTRACT_MANAGEMENT_ADMINISTRATOR'
  | 'CONTRACT_MANAGEMENT_SUPERVISOR'
  | 'CONTRACT_MANAGEMENT_ANALYST'
  | 'USER'
  | 'SYSTEM_ADMINISTRATOR'

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
    role: 'CONTRACT_MANAGEMENT_SENIOR_MANAGER',
    email: 'john.smith@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '2',
    username: 'sadmin',
    name: 'Sarah Administrator',
    role: 'CONTRACT_MANAGEMENT_ADMINISTRATOR',
    email: 'sarah.admin@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '3',
    username: 'msupervisor',
    name: 'Michael Supervisor',
    role: 'CONTRACT_MANAGEMENT_SUPERVISOR',
    email: 'michael.supervisor@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '4',
    username: 'janalyst',
    name: 'Jane Analyst',
    role: 'CONTRACT_MANAGEMENT_ANALYST',
    email: 'jane.analyst@company.com',
    department: 'Contract Management',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '5',
    username: 'buser',
    name: 'Bob User',
    role: 'USER',
    email: 'bob.user@company.com',
    department: 'Operations',
    loginTime: '',
    authProvider: 'application'
  },
  {
    id: '6',
    username: 'sysadmin',
    name: 'System Admin',
    role: 'SYSTEM_ADMINISTRATOR',
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
  const isCMTTeam = computed(() => {
    if (!user.value) return false
    return user.value?.role === 'CONTRACT_MANAGEMENT_SENIOR_MANAGER' ||
           user.value?.role === 'CONTRACT_MANAGEMENT_ADMINISTRATOR' ||
           user.value?.role === 'CONTRACT_MANAGEMENT_SUPERVISOR' ||
           user.value?.role === 'CONTRACT_MANAGEMENT_ANALYST' ||
           user.value?.role === 'SYSTEM_ADMINISTRATOR'
  })

  // Get role display name
  const getRoleDisplayName = (role: UserRole): string => {
    const roleNames: Record<UserRole, string> = {
      'CONTRACT_MANAGEMENT_SENIOR_MANAGER': 'Contract Management Senior Manager',
      'CONTRACT_MANAGEMENT_ADMINISTRATOR': 'Contract Management Administrator',
      'CONTRACT_MANAGEMENT_SUPERVISOR': 'Contract Management Supervisor',
      'CONTRACT_MANAGEMENT_ANALYST': 'Contract Management Analyst',
      'USER': 'User',
      'SYSTEM_ADMINISTRATOR': 'System Administrator'
    }
    return roleNames[role]
  }

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
    isCMTTeam,
    getRoleDisplayName,
    login,
    logout,
    initializeAuth,
    findUser,
    mockUsers
  }
})