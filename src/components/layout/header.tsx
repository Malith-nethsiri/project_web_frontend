'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/auth'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MobileSidebarButton } from './sidebar'
// Using emoji icons instead of Heroicons to avoid dependency issues
const icons = {
  BellIcon: '🔔',
  UserIcon: '👤',
  ChevronDownIcon: '▼',
  ArrowRightOnRectangleIcon: '🚪',
}

interface HeaderProps {
  onSidebarOpen: () => void
}

export function Header({ onSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuthStore()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    window.location.href = '/auth/login'
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <MobileSidebarButton onOpen={onSidebarOpen} />

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" />

      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-full p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <span className="text-xl">{icons.BellIcon}</span>
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 lg:dark:bg-gray-700" />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-2 rounded-full p-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-lg">{icons.UserIcon}</span>
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-2 text-sm font-semibold">
                  {user?.full_name || user?.email || 'User'}
                </span>
                <span className="ml-2 text-sm">{icons.ChevronDownIcon}</span>
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="mr-3 text-lg">{icons.ArrowRightOnRectangleIcon}</span>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}