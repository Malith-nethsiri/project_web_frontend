import { create } from '@/lib/create-store'
import { User } from '@/types'
import { apiClient } from '@/lib/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName?: string) => Promise<void>
  logout: () => Promise<void>
  getCurrentUser: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      // Call backend /auth/login; token is stored inside ApiClient
      await apiClient.login({ email, password })
      // Fetch current user to populate the store
      const user = await apiClient.getCurrentUser()
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (err: any) {
      set({
        error: err.response?.data?.detail || err.message || 'Login failed',
        isLoading: false,
      })
      throw err
    }
  },

  register: async (email: string, password: string, fullName?: string) => {
    set({ isLoading: true, error: null })
    try {
      // Pass full name to backend; adjust backend if necessary
      await apiClient.register({ email, password, full_name: fullName })
      set({ isLoading: false })
    } catch (err: any) {
      set({
        error: err.response?.data?.detail || err.message || 'Registration failed',
        isLoading: false,
      })
      throw err
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await apiClient.logout()
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      })
    }
  },

  getCurrentUser: async () => {
    set({ isLoading: true })
    try {
      const user = await apiClient.getCurrentUser()
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  clearError: () => set({ error: null }),
}))