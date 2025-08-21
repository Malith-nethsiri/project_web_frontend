import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const { user, isAuthenticated, isLoading, getCurrentUser } = useAuthStore()

  useEffect(() => {
    // Check if user is authenticated on mount
    if (!isAuthenticated && !isLoading) {
      getCurrentUser()
    }
  }, [isAuthenticated, isLoading, getCurrentUser])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}

export function useRequireAuth() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/auth/login?redirect=${pathname}`)
    }
  }, [isAuthenticated, isLoading, router, pathname])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}

export function useRedirectIfAuthenticated() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  return {
    isAuthenticated,
    isLoading,
  }
}