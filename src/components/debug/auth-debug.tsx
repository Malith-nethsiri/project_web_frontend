'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function AuthDebug() {
  const { user, isAuthenticated, isLoading, error } = useAuthStore()
  const [isVisible, setIsVisible] = useState(false)
  const [localStorageData, setLocalStorageData] = useState<any>({})

  useEffect(() => {
    const updateLocalStorage = () => {
      if (typeof window !== 'undefined') {
        setLocalStorageData({
          access_token: localStorage.getItem('access_token'),
          user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
        })
      }
    }
    
    updateLocalStorage()
    const interval = setInterval(updateLocalStorage, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700"
        size="sm"
      >
        🐛 Debug
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm text-purple-800 dark:text-purple-200">
              🐛 Auth Debug Panel
            </CardTitle>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="text-xs space-y-3">
          {/* Current State */}
          <div>
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
              Current State:
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Authenticated:</span>
                <Badge variant={isAuthenticated ? 'success' : 'destructive'}>
                  {isAuthenticated ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Loading:</span>
                <Badge variant={isLoading ? 'default' : 'secondary'}>
                  {isLoading ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Has Error:</span>
                <Badge variant={error ? 'destructive' : 'success'}>
                  {error ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Error Details */}
          {error && (
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                Current Error:
              </h4>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-red-800 dark:text-red-200">
                {error}
              </div>
            </div>
          )}

          {/* User Info */}
          <div>
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
              User Data:
            </h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono">
              {user ? (
                <div>
                  <div>ID: {user.id}</div>
                  <div>Email: {user.email}</div>
                  <div>Name: {user.full_name}</div>
                  <div>Active: {user.is_active ? 'Yes' : 'No'}</div>
                </div>
              ) : (
                'No user data'
              )}
            </div>
          </div>

          {/* LocalStorage */}
          <div>
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
              LocalStorage:
            </h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono">
              <div>Token: {localStorageData.access_token ? '✅ Present' : '❌ Missing'}</div>
              <div>User: {localStorageData.user ? '✅ Present' : '❌ Missing'}</div>
            </div>
          </div>

          {/* Test Credentials */}
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
              Test Credentials:
            </h4>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-800 dark:text-green-200">
              <div>Email: demo@valuerpro.com</div>
              <div>Password: password</div>
            </div>
          </div>

          {/* Console Instructions */}
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              Console Logs:
            </h4>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-blue-800 dark:text-blue-200">
              Open DevTools → Console to see detailed auth logs
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}