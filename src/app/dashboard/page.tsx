'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { apiClient } from '@/lib/api/client'

interface Report {
  id: number
  reference_number: string
  title: string
  status: 'draft' | 'in_progress' | 'completed' | 'exported'
  purpose: string
  created_at: string
  updated_at?: string
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  exported: 'bg-purple-100 text-purple-800'
}

const statusIcons = {
  draft: ClockIcon,
  in_progress: ClockIcon,
  completed: CheckCircleIcon,
  exported: CheckCircleIcon
}

export default function DashboardPage() {
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    completed: 0,
    thisMonth: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Load user data
      const userResponse = await apiClient.getCurrentUser()
      setUser(userResponse.data)

      // Load reports
      const reportsResponse = await apiClient.getReports()
      const reportsData = reportsResponse.data
      setReports(reportsData)

      // Calculate stats
      const now = new Date()
      const thisMonth = reportsData.filter((report: Report) => {
        const reportDate = new Date(report.created_at)
        return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear()
      })

      setStats({
        total: reportsData.length,
        draft: reportsData.filter((r: Report) => r.status === 'draft').length,
        completed: reportsData.filter((r: Report) => r.status === 'completed').length,
        thisMonth: thisMonth.length
      })

    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateReport = () => {
    router.push('/reports/create')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status: keyof typeof statusIcons) => {
    const Icon = statusIcons[status]
    return <Icon className="h-4 w-4" />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ValuerPro
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-secondary-600">
                Welcome, {user?.email}
              </span>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('access_token')
                  router.push('/')
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">Dashboard</h2>
          <p className="text-secondary-600">
            Manage your valuation reports and track your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Total Reports</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
                </div>
                <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Draft Reports</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.draft}</p>
                </div>
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Completed</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.completed}</p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">This Month</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.thisMonth}</p>
                </div>
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-secondary-900">Quick Actions</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={handleCreateReport}
                  className="flex items-center justify-center space-x-2"
                  size="lg"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>New Report</span>
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={() => router.push('/profile')}
                  size="lg"
                >
                  Update Profile
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => router.push('/reports')}
                  size="lg"
                >
                  View All Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">Recent Reports</h3>
              <Link
                href="/reports"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-8">
                <DocumentTextIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-secondary-900 mb-2">No reports yet</h4>
                <p className="text-secondary-600 mb-4">
                  Get started by creating your first valuation report.
                </p>
                <Button onClick={handleCreateReport}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Report
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <DocumentTextIcon className="h-8 w-8 text-secondary-400" />
                      <div>
                        <h4 className="font-medium text-secondary-900">{report.title}</h4>
                        <p className="text-sm text-secondary-600">
                          Ref: {report.reference_number} • Created {formatDate(report.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(report.status)}
                          <span className="capitalize">{report.status.replace('_', ' ')}</span>
                        </div>
                      </span>
                      <Link
                        href={`/reports/${report.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}