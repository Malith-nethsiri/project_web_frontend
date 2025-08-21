'use client'

import { useState } from 'react'
import { AuthGuard } from '@/components/auth/auth-guard'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { NotificationContainer } from '@/components/ui/notification'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthGuard>
      <div className="h-screen flex">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onSidebarOpen={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
        
        <NotificationContainer />
      </div>
    </AuthGuard>
  )
}