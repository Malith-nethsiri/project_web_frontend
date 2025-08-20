'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ui/ThemeToggle'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'How it Works', href: '#how' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-background/70">
      <nav className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-foreground">
          ValuerPro
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}