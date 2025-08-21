import { create } from '@/lib/create-store'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName?: string) => Promise<void>
  logout: () => void
  getCurrentUser: () => Promise<void>
  clearError: () => void
}

// Mock API functions for now
const mockLogin = async (email: string, password: string) => {
  console.log('🔐 Mock Login Attempt:', { email, password: '***' })
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('🔍 Checking credentials...')
  
  if (email === 'demo@valuerpro.com' && password === 'password') {
    const user: User = {
      id: '1',
      email: email,
      full_name: 'Demo User',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem('access_token', 'mock-jwt-token')
    localStorage.setItem('user', JSON.stringify(user))
    console.log('✅ Login successful:', user)
    return { access_token: 'mock-jwt-token', token_type: 'bearer', user }
  }
  console.log('❌ Login failed: Invalid credentials')
  throw new Error('Invalid credentials')
}

const mockRegister = async (email: string, password: string, fullName?: string) => {
  console.log('📝 Mock Register Attempt:', { email, fullName, password: '***' })
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: email,
    full_name: fullName || 'New User',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  console.log('✅ Registration successful:', user)
  return user
}

const mockGetCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('access_token')
  const userData = localStorage.getItem('user')
  
  if (token && userData) {
    return JSON.parse(userData)
  }
  throw new Error('Not authenticated')
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    console.log('🚀 Starting login process...')
    set({ isLoading: true, error: null })
    try {
      const response = await mockLogin(email, password)
      console.log('🎉 Login successful, updating store state')
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        isLoading: false 
      })
    } catch (error: any) {
      console.error('💥 Login error:', error)
      set({ 
        error: error.message || 'Login failed',
        isLoading: false 
      })
      throw error
    }
  },

  register: async (email: string, password: string, fullName?: string) => {
    console.log('📝 Starting registration process...')
    set({ isLoading: true, error: null })
    try {
      const user = await mockRegister(email, password, fullName)
      console.log('🎉 Registration successful')
      set({ isLoading: false })
    } catch (error: any) {
      console.error('💥 Registration error:', error)
      set({ 
        error: error.message || 'Registration failed',
        isLoading: false 
      })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    set({ 
      user: null, 
      isAuthenticated: false, 
      error: null 
    })
  },

  getCurrentUser: async () => {
    set({ isLoading: true })
    try {
      const user = await mockGetCurrentUser()
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      })
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      })
    }
  },

  clearError: () => set({ error: null }),
}))