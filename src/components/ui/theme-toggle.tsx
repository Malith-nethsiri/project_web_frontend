'use client'

import * as React from 'react'
import { useTheme } from '@/components/providers'
import { Button } from './button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <div className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-9 w-9"
    >
      {theme === 'light' ? (
        <span className="h-5 w-5">🌙</span>
      ) : (
        <span className="h-5 w-5">☀️</span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}