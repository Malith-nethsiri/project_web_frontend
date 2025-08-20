'use client'

import { useTheme } from '../../contexts/ThemeContext'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, effectiveTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render after hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder that matches the expected size during SSR
    return (
      <div
        style={{
          background: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '8px 12px',
          minWidth: '120px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          color: '#6b7280'
        }}
      >
        Loading...
      </div>
    )
  }

  const getIcon = () => {
    if (theme === 'light') return '☀️'
    if (theme === 'dark') return '🌙'
    return '💻' // system
  }

  const getLabel = () => {
    if (theme === 'light') return 'Light Mode'
    if (theme === 'dark') return 'Dark Mode'
    return `System (${effectiveTheme})`
  }

  // Debug log (safe for SSR)
  console.log('Theme Toggle State:', { theme, effectiveTheme })

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch theme. Current: ${getLabel()}`}
      title={getLabel()}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: 'var(--text-primary)',
        transition: 'all 0.2s ease',
        minWidth: '120px',
        justifyContent: 'center'
      }}
    >
      <span style={{ fontSize: '16px' }}>{getIcon()}</span>
      <span>{theme === 'system' ? `Auto (${effectiveTheme})` : theme}</span>
    </button>
  )
}