'use client'

import React, { useEffect } from 'react'
import { clsx } from 'clsx'
// Using emoji icons instead of Heroicons to avoid dependency issues
const icons = {
  CheckCircleIcon: '✅',
  XCircleIcon: '❌',
  ExclamationTriangleIcon: '⚠️',
  InformationCircleIcon: 'ℹ️',
  XMarkIcon: '✖️',
}
import { useUIStore } from '@/stores/ui'

export function NotificationContainer() {
  const { notifications, removeNotification } = useUIStore()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

interface NotificationItemProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose: () => void
}

function NotificationItem({ type, message, onClose }: NotificationItemProps) {
  const typeIcons = {
    success: icons.CheckCircleIcon,
    error: icons.XCircleIcon,
    warning: icons.ExclamationTriangleIcon,
    info: icons.InformationCircleIcon,
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
  }

  const Icon = typeIcons[type]

  return (
    <div
      className={clsx(
        'flex items-start p-4 rounded-lg border shadow-sm animate-slide-up',
        colors[type]
      )}
    >
      <span className="text-lg mr-3 mt-0.5 flex-shrink-0">{Icon}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 flex-shrink-0 text-current hover:text-opacity-75 transition-colors"
      >
        <span className="text-sm">{icons.XMarkIcon}</span>
      </button>
    </div>
  )
}