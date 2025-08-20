'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { DashboardShell } from '../../components/layout/DashboardShell'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card'

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
  draft: 'bg-muted text-muted-foreground',
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

// Mock data for now
const mockReports: Report[] = [
  {
    id: 1,
    reference_number: 'VR-2024-001',
    title: 'Residential Property Valuation - 123 Main St',
    status: 'completed',
    purpose: 'Mortgage',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    reference_number: 'VR-2024-002', 
    title: 'Commercial Building Assessment',
    status: 'in_progress',
    purpose: 'Insurance',
    created_at: '2024-01-18T14:30:00Z',
  },
  {
    id: 3,
    reference_number: 'VR-2024-003',
    title: 'Land Valuation - Rural Property',
    status: 'draft',
    purpose: 'Sale',
    created_at: '2024-01-20T09:15:00Z',
  }
]

export default function DashboardPage() {
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    completed: 0,
    thisMonth: 0
  })

  useEffect(() => {
    // Calculate stats from mock data
    const now = new Date()
    const thisMonth = reports.filter((report: Report) => {
      const reportDate = new Date(report.created_at)
      return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear()
    })

    setStats({
      total: reports.length,
      draft: reports.filter((r: Report) => r.status === 'draft').length,
      completed: reports.filter((r: Report) => r.status === 'completed').length,
      thisMonth: thisMonth.length
    })
  }, [reports])

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
      <DashboardShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your valuation reports and track your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Reports</CardTitle>
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draft}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Finished reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisMonth}</div>
              <p className="text-xs text-muted-foreground">Created this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts to get work done faster.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button
                onClick={handleCreateReport}
                className="flex items-center justify-center space-x-2"
                size="lg"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Create Report</span>
              </Button>
              
              <Button
                variant="outline"
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

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your latest valuation reports</CardDescription>
              </div>
              <Link
                href="/reports"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-8">
                <DocumentTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No reports yet</h3>
                <p className="text-muted-foreground mb-4">
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
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <DocumentTextIcon className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">
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
                        className="text-sm font-medium text-primary hover:underline"
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
    </DashboardShell>
  )
}