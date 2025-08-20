'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  effectiveTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme)
    } else {
      setThemeState('system')
    }

    // Set initial effective theme
    const initialEffective = savedTheme === 'system' || !savedTheme ? systemTheme : savedTheme as 'light' | 'dark'
    setEffectiveTheme(initialEffective)
    
    // Apply theme to document immediately to prevent FOUC
    document.documentElement.setAttribute('data-theme', initialEffective)
    document.body.setAttribute('data-theme', initialEffective)
    console.log('Initial theme applied:', initialEffective)
    
    setMounted(true)
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newEffective = e.matches ? 'dark' : 'light'
        setEffectiveTheme(newEffective)
        document.documentElement.setAttribute('data-theme', newEffective)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Update effective theme when theme changes
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    let newEffective: 'light' | 'dark'

    if (theme === 'system') {
      newEffective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      newEffective = theme
    }

    setEffectiveTheme(newEffective)
    document.documentElement.setAttribute('data-theme', newEffective)
    document.body.setAttribute('data-theme', newEffective)
    console.log('Theme changed to:', newEffective)
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // During SSR or if provider is missing, return safe fallback
    console.warn('useTheme called outside of ThemeProvider, using fallback')
    return {
      theme: 'light' as Theme,
      effectiveTheme: 'light' as 'light' | 'dark',
      setTheme: () => {},
      toggleTheme: () => {}
    }
  }
  return context
}