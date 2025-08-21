'use client'

import { useEffect, useState } from 'react'

export function ServiceWorkerRegistration() {
  const [swStatus, setSwStatus] = useState<'loading' | 'registered' | 'updated' | 'error'>('loading')
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      registerServiceWorker()
    }
  }, [])

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      
      console.log('[PWA] Service Worker registered successfully:', registration.scope)
      setSwStatus('registered')

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New content is available; please refresh.')
              setUpdateAvailable(true)
              setSwStatus('updated')
            }
          })
        }
      })

      // Listen for controller change (new SW activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] New service worker activated')
        window.location.reload()
      })

      // Request persistent storage
      if ('storage' in navigator && 'persist' in navigator.storage) {
        const persistent = await navigator.storage.persist()
        console.log('[PWA] Persistent storage granted:', persistent)
      }

      // Register for background sync if supported
      if ('sync' in window.ServiceWorkerRegistration.prototype) {
        console.log('[PWA] Background Sync is supported')
      }

      // Register for periodic sync if supported
      if ('periodicSync' in window.ServiceWorkerRegistration.prototype) {
        try {
          const reg = registration as any
          await reg.periodicSync.register('check-reports', {
            minInterval: 24 * 60 * 60 * 1000, // 24 hours
          })
          console.log('[PWA] Periodic sync registered')
        } catch (error) {
          console.log('[PWA] Periodic sync not available:', error)
        }
      }

    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error)
      setSwStatus('error')
    }
  }

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
      })
    }
  }

  // Don't render anything in the UI - this is just for registration
  return null
}

// Install prompt component
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    console.log('[PWA] User response to install prompt:', outcome)
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">📱</div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Install ValuerPro</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add to your home screen for quick access
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDismiss}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Dismiss
          </button>
          <button
            onClick={handleInstall}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
}

// Offline status indicator
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center text-sm z-50">
      <span className="mr-2">⚠️</span>
      You are currently offline. Some features may be limited.
    </div>
  )
}