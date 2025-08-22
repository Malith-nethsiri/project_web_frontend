'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/auth'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function DebugPage() {
  const { user, isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuthStore()
  const [testEmail, setTestEmail] = useState('demo@valuerpro.com')
  const [testPassword, setTestPassword] = useState('password')
  const [testFullName, setTestFullName] = useState('Test User')
  const [regEmail, setRegEmail] = useState('test@example.com')
  const [regPassword, setRegPassword] = useState('password123')
  const [regFullName, setRegFullName] = useState('Test User')

  const handleTestLogin = async () => {
    try {
      console.log('🧪 Testing login with:', { email: testEmail, password: '***' })
      await login(testEmail, testPassword)
    } catch (error) {
      console.error('🧪 Test login failed:', error)
    }
  }

  const handleTestRegister = async () => {
    try {
      console.log('🧪 Testing registration with:', { email: regEmail, fullName: regFullName, password: '***' })
      await register(regEmail, regPassword, regFullName)
    } catch (error) {
      console.error('🧪 Test registration failed:', error)
    }
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    console.log('🗑️ LocalStorage cleared')
    window.location.reload()
  }

  const showLocalStorageContents = () => {
    const contents = {
      access_token: localStorage.getItem('access_token'),
      user: localStorage.getItem('user'),
    }
    console.log('💾 LocalStorage contents:', contents)
    alert(JSON.stringify(contents, null, 2))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            🐛 Debug & Testing Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test authentication flows, inspect state, and debug issues
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                📊 Current Authentication State
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Authenticated</label>
                  <div>
                    <Badge variant={isAuthenticated ? 'success' : 'destructive'}>
                      {isAuthenticated ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Loading</label>
                  <div>
                    <Badge variant={isLoading ? 'default' : 'secondary'}>
                      {isLoading ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>

              {error && (
                <div>
                  <label className="text-sm font-medium text-red-600">Current Error</label>
                  <div className="mt-1 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                    <p className="text-red-800 dark:text-red-200">{error}</p>
                  </div>
                  <Button onClick={clearError} variant="outline" size="sm" className="mt-2">
                    Clear Error
                  </Button>
                </div>
              )}

              {user && (
                <div>
                  <label className="text-sm font-medium">User Data</label>
                  <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                    <div>ID: {user.id}</div>
                    <div>Email: {user.email}</div>
                    <div>Name: {user.full_name}</div>
                    <div>Active: {user.is_active ? 'Yes' : 'No'}</div>
                    <div>Created: {new Date(user.created_at).toLocaleString()}</div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button onClick={showLocalStorageContents} variant="outline" size="sm">
                  Show LocalStorage
                </Button>
                <Button onClick={clearLocalStorage} variant="destructive" size="sm">
                  Clear LocalStorage
                </Button>
                {isAuthenticated && (
                  <Button onClick={() => logout()} variant="outline" size="sm">
                    Logout
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Login Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                🔐 Login Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="test-email">Email</label>
                <Input
                  id="test-email"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="test-password">Password</label>
                <Input
                  id="test-password"
                  type="password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <Button 
                onClick={handleTestLogin}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Testing Login...' : 'Test Login'}
              </Button>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                  API Integration:
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Using real backend API endpoints at /auth/login
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Registration Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                📝 Registration Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="reg-email">Email</label>
                <Input
                  id="reg-email"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="reg-password">Password</label>
                <Input
                  id="reg-password"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="reg-fullname">Full Name</label>
                <Input
                  id="reg-fullname"
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Full Name"
                />
              </div>
              <Button 
                onClick={handleTestRegister}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Testing Registration...' : 'Test Registration'}
              </Button>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
                  Note:
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Registration uses real backend API at /auth/register
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Network & API Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                🌐 Network & API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">API Base URL</label>
                <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                  {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Current Mode</label>
                <div className="mt-1">
                  <Badge variant="success">API MODE</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Authentication is using real backend API calls.
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  🔍 How to Debug:
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>1. Open DevTools (F12)</li>
                  <li>2. Go to Console tab</li>
                  <li>3. Try login/registration</li>
                  <li>4. Watch for emoji logs (🔐, 📝, ✅, ❌)</li>
                  <li>5. Check Network tab for API calls</li>
                  <li>6. Inspect Application tab → Local Storage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Console Output */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Testing Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">✅ Working Features:</h4>
                <ul className="space-y-1 text-sm">
                  <li>✅ Real API authentication system</li>
                  <li>✅ Error handling and display</li>
                  <li>✅ Loading states</li>
                  <li>✅ LocalStorage persistence</li>
                  <li>✅ State management (Zustand)</li>
                  <li>✅ Console logging for debugging</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">🔧 Test Scenarios:</h4>
                <ul className="space-y-1 text-sm">
                  <li>🔧 Valid login (with real backend credentials)</li>
                  <li>🔧 Invalid login (wrong credentials)</li>
                  <li>🔧 Registration with backend validation</li>
                  <li>🔧 Error state handling</li>
                  <li>🔧 Logout functionality</li>
                  <li>🔧 Route protection (try /dashboard)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}