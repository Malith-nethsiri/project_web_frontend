'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

// Mock data for demonstration
const mockReports = [
  {
    id: '1',
    title: 'Residential Property Valuation - Colombo 07',
    reference_number: 'VPR-001-2025',
    purpose: 'mortgage',
    status: 'completed',
    created_at: '2025-01-20T10:30:00Z',
    valuation_date: '2025-01-18',
    total_value: 15000000,
  },
  {
    id: '2',
    title: 'Commercial Property - Kandy Road',
    reference_number: 'VPR-002-2025',
    purpose: 'sale',
    status: 'in_progress',
    created_at: '2025-01-19T14:15:00Z',
    valuation_date: '2025-01-17',
    total_value: 25000000,
  },
  {
    id: '3',
    title: 'Land Valuation - Gampaha District',
    reference_number: 'VPR-003-2025',
    purpose: 'insurance',
    status: 'draft',
    created_at: '2025-01-18T09:45:00Z',
    valuation_date: '2025-01-16',
    total_value: 8500000,
  },
  {
    id: '4',
    title: 'Apartment Complex - Moratuwa',
    reference_number: 'VPR-004-2025',
    purpose: 'legal',
    status: 'completed',
    created_at: '2025-01-17T16:20:00Z',
    valuation_date: '2025-01-15',
    total_value: 32000000,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'in_progress':
      return 'default'
    case 'draft':
      return 'warning'
    default:
      return 'secondary'
  }
}

const getPurposeLabel = (purpose: string) => {
  const labels = {
    mortgage: 'Mortgage',
    sale: 'Sale/Purchase',
    insurance: 'Insurance',
    taxation: 'Taxation',
    legal: 'Legal',
    other: 'Other',
  }
  return labels[purpose as keyof typeof labels] || purpose
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [purposeFilter, setPurposeFilter] = useState('all')

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reference_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter
    const matchesPurpose = purposeFilter === 'all' || report.purpose === purposeFilter
    
    return matchesSearch && matchesStatus && matchesPurpose
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Valuation Reports
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your property valuation reports and create new ones
          </p>
        </div>
        <Link href="/reports/create">
          <Button size="lg" className="w-full sm:w-auto">
            ✨ Create New Report
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Reports
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Search by title or reference number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <Select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </div>
            
            <div>
              <label htmlFor="purpose-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Purpose
              </label>
              <Select
                id="purpose-filter"
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value)}
              >
                <option value="all">All Purposes</option>
                <option value="mortgage">Mortgage</option>
                <option value="sale">Sale/Purchase</option>
                <option value="insurance">Insurance</option>
                <option value="legal">Legal</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {mockReports.length === 0 ? 'No Reports Yet' : 'No Reports Found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {mockReports.length === 0 
                ? 'Get started by creating your first valuation report'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            <Link href="/reports/create">
              <Button>Create Your First Report</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {report.title}
                      </h3>
                      <Badge variant={getStatusColor(report.status) as any}>
                        {report.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">Reference:</span>
                        <br />
                        {report.reference_number}
                      </div>
                      <div>
                        <span className="font-medium">Purpose:</span>
                        <br />
                        {getPurposeLabel(report.purpose)}
                      </div>
                      <div>
                        <span className="font-medium">Valuation Date:</span>
                        <br />
                        {new Date(report.valuation_date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Total Value:</span>
                        <br />
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          LKR {report.total_value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-4">
                    {report.status === 'draft' && (
                      <Link href={`/reports/${report.id}/edit`}>
                        <Button variant="outline" size="sm">
                          ✏️ Edit
                        </Button>
                      </Link>
                    )}
                    
                    <Link href={`/reports/${report.id}`}>
                      <Button variant="outline" size="sm">
                        👁️ Preview
                      </Button>
                    </Link>
                    
                    {report.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        📥 Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {mockReports.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Reports
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockReports.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {mockReports.filter(r => r.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              In Progress
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {mockReports.filter(r => r.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Drafts
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}