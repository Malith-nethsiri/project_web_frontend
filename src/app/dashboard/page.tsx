'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
// Using emoji icons instead of Heroicons to avoid dependency issues
const icons = {
  DocumentTextIcon: '📄',
  ClockIcon: '⏰',
  CheckCircleIcon: '✅',
  ExclamationTriangleIcon: '⚠️',
  PlusIcon: '➕',
  ArrowTrendingUpIcon: '📈',
}

// Mock data - replace with actual API calls
const mockStats = {
  totalReports: 47,
  inProgress: 12,
  completed: 30,
  pending: 5,
}

const mockRecentReports = [
  {
    id: '1',
    title: 'Residential Property Valuation - Colombo 07',
    status: 'completed',
    created_at: '2025-01-20T10:30:00Z',
    purpose: 'mortgage',
  },
  {
    id: '2',
    title: 'Commercial Property - Kandy Road',
    status: 'in_progress',
    created_at: '2025-01-19T14:15:00Z',
    purpose: 'sale',
  },
  {
    id: '3',
    title: 'Land Valuation - Gampaha District',
    status: 'pending',
    created_at: '2025-01-18T09:45:00Z',
    purpose: 'insurance',
  },
  {
    id: '4',
    title: 'Apartment Complex - Moratuwa',
    status: 'completed',
    created_at: '2025-01-17T16:20:00Z',
    purpose: 'legal',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'in_progress':
      return 'default'
    case 'pending':
      return 'warning'
    default:
      return 'secondary'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return icons.CheckCircleIcon
    case 'in_progress':
      return icons.ClockIcon
    case 'pending':
      return icons.ExclamationTriangleIcon
    default:
      return icons.DocumentTextIcon
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState(mockStats)
  const [recentReports, setRecentReports] = useState(mockRecentReports)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here&apos;s an overview of your valuation reports and activities.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link href="/reports/create">
            <Button className="flex items-center">
              <span className="mr-2">➕</span>
              New Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <span className="text-lg text-gray-600 dark:text-gray-400">{icons.DocumentTextIcon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <span className="text-lg text-blue-600">{icons.ClockIcon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Currently being worked on
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <span className="text-lg text-green-600">{icons.CheckCircleIcon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Ready for delivery
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <span className="text-lg text-yellow-600">{icons.ExclamationTriangleIcon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Awaiting your attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="text-xl mr-2">{icons.ArrowTrendingUpIcon}</span>
            Recent Reports
          </CardTitle>
          <CardDescription>
            Your most recent valuation reports and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => {
              const StatusIcon = getStatusIcon(report.status)
              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl text-gray-400">{StatusIcon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(report.created_at).toLocaleDateString()} • {report.purpose}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(report.status) as any}>
                      {report.status.replace('_', ' ')}
                    </Badge>
                    <Link href={`/reports/${report.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/reports">
              <Button variant="outline">View All Reports</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you work more efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/reports/create">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <span className="text-xl mb-2">➕</span>
                  New Report
                </Button>
              </Link>
              <Link href="/upload">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <span className="text-xl mb-2">📤</span>
                  Upload Documents
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of processing services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">OCR Processing</span>
                <Badge variant="success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Analysis</span>
                <Badge variant="success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Map Services</span>
                <Badge variant="success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Report Generation</span>
                <Badge variant="success">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}