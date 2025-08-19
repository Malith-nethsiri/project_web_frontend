'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  DocumentTextIcon, 
  CloudArrowUpIcon,
  CameraIcon,
  MapIcon,
  CalculatorIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { apiClient } from '@/lib/api/client'

interface ReportData {
  report: any
  applicant: any
  property: any
  valuation: any
  legal_aspects: any[]
  comparables: any[]
}

export default function EditReportPage() {
  const router = useRouter()
  const params = useParams()
  const reportId = parseInt(params.id as string)

  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (reportId) {
      loadReportData()
    }
  }, [reportId])

  const loadReportData = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.getReport(reportId)
      setReportData(response.data)
    } catch (error) {
      console.error('Failed to load report:', error)
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Auto-save logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate save
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleGenerateDocx = async () => {
    try {
      const response = await apiClient.generateReportDocx(reportId)
      
      // Create download link
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Report_${reportData?.report.reference_number}.docx`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to generate DOCX:', error)
    }
  }

  const handleGeneratePdf = async () => {
    try {
      const response = await apiClient.generateReportPdf(reportId)
      
      // Create download link
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Report_${reportData?.report.reference_number}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to generate PDF:', error)
    }
  }

  if (isLoading || !reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading report...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: DocumentTextIcon },
    { id: 'documents', name: 'Documents', icon: CloudArrowUpIcon },
    { id: 'property', name: 'Property', icon: CameraIcon },
    { id: 'location', name: 'Location', icon: MapIcon },
    { id: 'valuation', name: 'Valuation', icon: CalculatorIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <div className="border-l border-secondary-300 pl-4">
                <h1 className="text-xl font-semibold text-secondary-900">
                  {reportData.report.title}
                </h1>
                <p className="text-sm text-secondary-600">
                  Ref: {reportData.report.reference_number}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleSave}
                isLoading={isSaving}
                size="sm"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  onClick={handleGenerateDocx}
                  size="sm"
                >
                  <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                  DOCX
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleGeneratePdf}
                  size="sm"
                >
                  <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                reportData.report.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : reportData.report.status === 'in_progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {reportData.report.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Report Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Report Information</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-secondary-700">Title</label>
                      <p className="mt-1 text-secondary-900">{reportData.report.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-secondary-700">Purpose</label>
                      <p className="mt-1 text-secondary-900 capitalize">{reportData.report.purpose}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-secondary-700">Bank Name</label>
                      <p className="mt-1 text-secondary-900">{reportData.report.bank_name || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-secondary-700">Bank Reference</label>
                      <p className="mt-1 text-secondary-900">{reportData.report.bank_reference || 'Not specified'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Progress</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-600">Documents</span>
                      <span className="text-sm font-medium">0/3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-600">Property Details</span>
                      <span className="text-sm font-medium">{reportData.property ? '✓' : '○'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-600">Valuation</span>
                      <span className="text-sm font-medium">{reportData.valuation ? '✓' : '○'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'documents' && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Document Upload & Processing</h3>
                <p className="text-secondary-600">Upload survey plans, deeds, and other documents for AI processing</p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                  <CloudArrowUpIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-secondary-900 mb-2">Upload Documents</h4>
                  <p className="text-secondary-600 mb-4">
                    Drag and drop files here, or click to select
                  </p>
                  <Button>Choose Files</Button>
                  <p className="text-xs text-secondary-500 mt-2">
                    Supported formats: JPG, PNG, PDF • Max file size: 10MB
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'property' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Property Identification</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Lot Number</label>
                      <input
                        type="text"
                        className="form-input w-full"
                        placeholder="Enter lot number"
                        value={reportData.property?.lot_number || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Plan Number</label>
                      <input
                        type="text"
                        className="form-input w-full"
                        placeholder="Enter plan number"
                        value={reportData.property?.plan_number || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Total Extent</label>
                      <input
                        type="text"
                        className="form-input w-full"
                        placeholder="e.g., 2A-1R-15.5P"
                        value={reportData.property?.total_extent || ''}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Property Description</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Address</label>
                      <textarea
                        className="form-input w-full"
                        rows={3}
                        placeholder="Enter property address"
                        value={reportData.property?.address || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Land Shape</label>
                      <select className="form-input w-full">
                        <option value="">Select shape</option>
                        <option value="regular">Regular</option>
                        <option value="irregular">Irregular</option>
                        <option value="corner">Corner</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'location' && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Location & Access</h3>
                <p className="text-secondary-600">Add coordinates and generate access directions</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Latitude</label>
                      <input
                        type="number"
                        step="any"
                        className="form-input w-full"
                        placeholder="7.8731"
                        value={reportData.property?.latitude || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Longitude</label>
                      <input
                        type="number"
                        step="any"
                        className="form-input w-full"
                        placeholder="80.7718"
                        value={reportData.property?.longitude || ''}
                      />
                    </div>
                    <Button variant="outline" className="w-full">
                      <MapIcon className="h-4 w-4 mr-2" />
                      Generate Map & Directions
                    </Button>
                  </div>
                  <div className="bg-secondary-100 rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center text-secondary-600">
                      <MapIcon className="h-12 w-12 mx-auto mb-2" />
                      <p>Map will appear here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'valuation' && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Valuation Summary</h3>
                <p className="text-secondary-600">Enter valuation details and calculations</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Valuation Method */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Valuation Method</label>
                    <select className="form-input w-full">
                      <option value="market">Market Approach</option>
                      <option value="cost">Cost Approach</option>
                      <option value="income">Income Approach</option>
                    </select>
                  </div>

                  {/* Valuation Table */}
                  <div className="border border-secondary-300 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-secondary-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-secondary-900">Component</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-secondary-900">Extent/Area</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-secondary-900">Rate</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-secondary-900">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary-200">
                        <tr>
                          <td className="px-4 py-3">Land</td>
                          <td className="px-4 py-3">
                            <input type="text" className="form-input" placeholder="perches" />
                          </td>
                          <td className="px-4 py-3">
                            <input type="number" className="form-input" placeholder="LKR" />
                          </td>
                          <td className="px-4 py-3">
                            <input type="number" className="form-input" placeholder="LKR" />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Building</td>
                          <td className="px-4 py-3">
                            <input type="text" className="form-input" placeholder="sq.ft" />
                          </td>
                          <td className="px-4 py-3">
                            <input type="number" className="form-input" placeholder="LKR" />
                          </td>
                          <td className="px-4 py-3">
                            <input type="number" className="form-input" placeholder="LKR" />
                          </td>
                        </tr>
                        <tr className="bg-secondary-50">
                          <td className="px-4 py-3 font-semibold">Total Market Value</td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3">
                            <input type="number" className="form-input font-semibold" placeholder="LKR" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}