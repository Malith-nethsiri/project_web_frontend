import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ValuerPro - AI-Powered Valuation Reports',
  description: 'Professional valuation report generation platform for certified valuers',
  keywords: ['valuation', 'property', 'AI', 'OCR', 'reports'],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: 'red', color: 'white' }}>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(45deg, blue, green)' }}>
          {children}
        </div>
      </body>
    </html>
  )
}