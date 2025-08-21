const CACHE_NAME = 'valuerpro-v1.0.0'
const STATIC_CACHE_URLS = [
  '/',
  '/dashboard',
  '/reports',
  '/upload',
  '/maps',
  '/profile',
  '/settings',
  '/auth/login',
  '/auth/register',
  '/manifest.json',
]

const API_CACHE_URLS = [
  '/api/auth/profile',
  '/api/reports',
  '/api/upload',
]

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static resources')
      return cache.addAll(STATIC_CACHE_URLS).catch((error) => {
        console.error('[Service Worker] Failed to cache static resources:', error)
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests with network first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache
          return cachedResponse
        }
        
        // Fallback to network, then cache
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        }).catch(() => {
          // Offline fallback
          return caches.match('/') || new Response(
            '<html><body><h1>Offline</h1><p>Please check your connection and try again.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          )
        })
      })
    )
    return
  }

  // Handle other requests with cache first strategy
  event.respondWith(cacheFirstStrategy(request))
})

// Cache first strategy for static resources
function cacheFirstStrategy(request) {
  return caches.match(request).then((cachedResponse) => {
    if (cachedResponse) {
      return cachedResponse
    }

    return fetch(request).then((response) => {
      if (response.status === 200) {
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone)
        })
      }
      return response
    }).catch((error) => {
      console.error('[Service Worker] Fetch failed:', error)
      throw error
    })
  })
}

// Network first strategy for API requests
function networkFirstStrategy(request) {
  return fetch(request).then((response) => {
    if (response.status === 200) {
      const responseClone = response.clone()
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseClone)
      })
    }
    return response
  }).catch(() => {
    return caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      throw new Error('Network unavailable and no cached data')
    })
  })
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync triggered:', event.tag)
  
  if (event.tag === 'sync-reports') {
    event.waitUntil(syncReports())
  }
  
  if (event.tag === 'sync-uploads') {
    event.waitUntil(syncUploads())
  }
})

async function syncReports() {
  try {
    // Get pending reports from IndexedDB
    const pendingReports = await getPendingReports()
    
    for (const report of pendingReports) {
      try {
        await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report)
        })
        
        // Remove from pending queue
        await removePendingReport(report.id)
        console.log('[Service Worker] Synced report:', report.id)
      } catch (error) {
        console.error('[Service Worker] Failed to sync report:', report.id, error)
      }
    }
  } catch (error) {
    console.error('[Service Worker] Sync reports failed:', error)
  }
}

async function syncUploads() {
  try {
    // Get pending uploads from IndexedDB
    const pendingUploads = await getPendingUploads()
    
    for (const upload of pendingUploads) {
      try {
        const formData = new FormData()
        formData.append('file', upload.file)
        formData.append('metadata', JSON.stringify(upload.metadata))
        
        await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        // Remove from pending queue
        await removePendingUpload(upload.id)
        console.log('[Service Worker] Synced upload:', upload.id)
      } catch (error) {
        console.error('[Service Worker] Failed to sync upload:', upload.id, error)
      }
    }
  } catch (error) {
    console.error('[Service Worker] Sync uploads failed:', error)
  }
}

// IndexedDB helpers (simplified for demo)
async function getPendingReports() {
  // In a real implementation, this would query IndexedDB
  return []
}

async function removePendingReport(id) {
  // In a real implementation, this would remove from IndexedDB
  console.log('Removing pending report:', id)
}

async function getPendingUploads() {
  // In a real implementation, this would query IndexedDB
  return []
}

async function removePendingUpload(id) {
  // In a real implementation, this would remove from IndexedDB
  console.log('Removing pending upload:', id)
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received')
  
  const options = {
    body: 'Your property valuation report is ready!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Report',
        icon: '/icons/action-view.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ]
  }

  if (event.data) {
    const payload = event.data.json()
    options.body = payload.body || options.body
    options.data = { ...options.data, ...payload.data }
  }

  event.waitUntil(
    self.registration.showNotification('ValuerPro', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.notification.data)
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    )
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-reports') {
    event.waitUntil(checkForReportUpdates())
  }
})

async function checkForReportUpdates() {
  try {
    const response = await fetch('/api/reports/updates')
    const updates = await response.json()
    
    if (updates.length > 0) {
      // Show notification about updates
      await self.registration.showNotification('ValuerPro Updates', {
        body: `${updates.length} report(s) have been updated`,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png'
      })
    }
  } catch (error) {
    console.error('[Service Worker] Failed to check for updates:', error)
  }
}