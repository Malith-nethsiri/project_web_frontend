'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render after hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="btn-ghost p-2 w-10 h-10">
        <div className="w-4 h-4 animate-pulse bg-gray-300 rounded" />
      </button>
    )
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'light') return <SunIcon className="h-4 w-4" />
    if (theme === 'dark') return <MoonIcon className="h-4 w-4" />
    return <ComputerDesktopIcon className="h-4 w-4" />
  }

  const getLabel = () => {
    if (theme === 'light') return 'Light mode'
    if (theme === 'dark') return 'Dark mode'
    return 'System theme'
  }

  return (
    <button
      onClick={cycleTheme}
      className="btn-ghost p-2 w-10 h-10"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  )
}