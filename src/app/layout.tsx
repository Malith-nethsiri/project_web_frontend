import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ValuerPro - Professional Property Valuation Platform',
  description: 'Advanced property valuation platform with AI-powered document processing, automated report generation, and comprehensive analysis tools.',
  keywords: 'property valuation, real estate, AI processing, OCR, reports, Sri Lanka',
  authors: [{ name: 'ValuerPro Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ValuerPro',
  },
  openGraph: {
    title: 'ValuerPro - Professional Property Valuation Platform',
    description: 'Advanced property valuation platform with AI-powered document processing',
    type: 'website',
    locale: 'en_US',
  },
  other: {
    'msapplication-TileColor': '#0ea5e9',
    'msapplication-TileImage': '/icons/icon-144x144.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ValuerPro" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}