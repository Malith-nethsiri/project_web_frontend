'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Reports', href: '/reports', icon: '📄' },
  { name: 'Upload & Process', href: '/upload', icon: '📤' },
  { name: 'Maps & Location', href: '/maps', icon: '🗺️' },
  { name: 'Profile', href: '/profile', icon: '👤' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link href="/dashboard" className="text-xl font-bold text-primary-600 dark:text-primary-400">
              ValuerPro
            </Link>
            <button
              type="button"
              className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => onOpenChange(false)}
            >
              <span className="text-xl">×</span>
            </button>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                            isActive
                              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800'
                          }`}
                        >
                          <span
                            className={`text-lg shrink-0 ${
                              isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                            }`}
                          >
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export function MobileSidebarButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      onClick={onOpen}
    >
      <span className="text-xl">☰</span>
      <span className="sr-only">Open sidebar</span>
    </button>
  )
}