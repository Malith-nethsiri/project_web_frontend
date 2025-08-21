'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AuthGuard } from '@/components/auth/auth-guard'
import { ReportPreview } from '@/components/reports/report-preview'
import { ExportOptions } from '@/components/reports/export-options'
import { ReportActions } from '@/components/reports/report-actions'

interface Report {
  id: string
  title: string
  property_address: string
  property_type: string
  created_at: string
  updated_at: string
  status: 'draft' | 'in_review' | 'approved' | 'completed'
  valuation: number
  data: any
  metadata: {
    pages: number
    sections: number
    photos: number
    documents: number
  }
}

export default function ReportViewPage() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<'preview' | 'export'>('preview')
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    loadReport()
  }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadReport = async () => {
    setLoading(true)
    try {
      // Mock report data - replace with actual API call
      const mockReport: Report = {
        id: params.id as string,
        title: `Property Valuation Report #${params.id}`,
        property_address: '123 Oak Street, Springfield, IL 62701',
        property_type: 'Single Family Home',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-20T14:45:00Z',
        status: 'approved',
        valuation: 285000,
        data: {
          property_info: {
            address: '123 Oak Street, Springfield, IL 62701',
            property_type: 'Single Family Home',
            year_built: 1985,
            lot_size: 0.25,
            square_feet: 1800,
            bedrooms: 3,
            bathrooms: 2,
            garage: '2-car attached',
          },
          market_analysis: {
            market_trend: 'stable',
            neighborhood_score: 85,
            market_value_estimate: 285000,
            confidence_level: 92,
            price_per_sqft: 158,
          },
          comparables: [
            {
              address: '125 Oak Street',
              sale_price: 280000,
              sale_date: '2023-12-15',
              similarity_score: 95,
              adjusted_value: 282000,
            },
            {
              address: '456 Maple Ave',
              sale_price: 290000,
              sale_date: '2024-01-05',
              similarity_score: 88,
              adjusted_value: 287500,
            }
          ],
          photos: Array.from({ length: 8 }, (_, i) => ({
            id: `photo_${i}`,
            category: ['exterior', 'interior', 'kitchen', 'bathroom'][i % 4],
            caption: `Property photo ${i + 1}`,
          })),
          legal_aspects: {
            status: 'clear',
            documents: [
              { type: 'deed', description: 'Property deed', verified: true },
              { type: 'title', description: 'Title insurance', verified: true },
            ]
          }
        },
        metadata: {
          pages: 12,
          sections: 8,
          photos: 8,
          documents: 2,
        }
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      setReport(mockReport)
    } catch (error) {
      console.error('Failed to load report:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (format: string, options: any) => {
    setIsExporting(true)
    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create download link based on format
      const filename = `${report?.title?.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`
      const blob = new Blob(['Mock report content'], { type: getMimeType(format) })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const getMimeType = (format: string) => {
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      html: 'text/html',
      json: 'application/json',
    }
    return mimeTypes[format] || 'application/octet-stream'
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading report...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (!report) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600">Report not found</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <button
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-gray-800 mb-2"
                >
                  ← Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
                <p className="text-gray-600">{report.property_address}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveView('preview')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeView === 'preview'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📄 Preview
                  </button>
                  <button
                    onClick={() => setActiveView('export')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeView === 'export'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📤 Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeView === 'preview' ? (
                <ReportPreview report={report} />
              ) : (
                <ExportOptions 
                  report={report}
                  onExport={handleExport}
                  isExporting={isExporting}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ReportActions 
                report={report}
                onExport={handleExport}
                isExporting={isExporting}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}