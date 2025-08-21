import { create } from '@/lib/create-store'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

interface UIState {
  sidebarOpen: boolean
  notifications: Notification[]
  loading: boolean
  setSidebarOpen: (open: boolean) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  setLoading: (loading: boolean) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  notifications: [],
  loading: false,

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }))

    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
      }, notification.duration || 5000)
    }
  },

  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),

  setLoading: (loading: boolean) => set({ loading }),

  clearNotifications: () => set({ notifications: [] }),
}))