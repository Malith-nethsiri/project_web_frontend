'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ReportActionsProps {
  report: any
  onExport: (format: string, options: any) => void
  isExporting: boolean
}

export function ReportActions({ report, onExport, isExporting }: ReportActionsProps) {
  const router = useRouter()
  const [isSharing, setIsSharing] = useState(false)
  const [shareOptions, setShareOptions] = useState({
    email: '',
    message: '',
    expiration: '30',
    allowComments: false,
  })

  const quickExportOptions = [
    { format: 'pdf', label: 'PDF', icon: '📄', color: 'bg-red-100 text-red-800' },
    { format: 'docx', label: 'Word', icon: '📝', color: 'bg-blue-100 text-blue-800' },
    { format: 'html', label: 'Web', icon: '🌐', color: 'bg-green-100 text-green-800' },
  ]

  const handleQuickExport = (format: string) => {
    const defaultOptions = {
      format,
      includePhotos: true,
      includeComparables: true,
      includeLegalDocuments: true,
      includeCoverPage: true,
      includeExecutiveSummary: true,
      watermark: false,
      password: '',
      customTemplate: 'standard',
      paperSize: 'letter',
      orientation: 'portrait',
      quality: 'high',
      compression: false,
    }
    onExport(format, defaultOptions)
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      // Mock share functionality
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Report shared successfully!')
    } catch (error) {
      console.error('Failed to share report:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEdit = () => {
    router.push(`/reports/create?edit=${report.id}`)
  }

  const handleDuplicate = () => {
    router.push(`/reports/create?duplicate=${report.id}`)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      in_review: 'bg-blue-100 text-blue-800 border-blue-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="space-y-6">
      {/* Report Info Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Report Information</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
              {report.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Created</span>
            <span className="text-gray-900">
              {new Date(report.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Updated</span>
            <span className="text-gray-900">
              {new Date(report.updated_at).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pages</span>
            <span className="text-gray-900">{report.metadata.pages}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Photos</span>
            <span className="text-gray-900">{report.metadata.photos}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Valuation</span>
            <span className="text-gray-900 font-semibold">
              {new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD',
                maximumFractionDigits: 0 
              }).format(report.valuation)}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Export */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Export</h3>
        <div className="space-y-3">
          {quickExportOptions.map((option) => (
            <button
              key={option.format}
              onClick={() => handleQuickExport(option.format)}
              disabled={isExporting}
              className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${option.color}`}>
                  <span className="text-sm">{option.icon}</span>
                </div>
                <span className="font-medium text-gray-900">Export as {option.label}</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
        <div className="space-y-3">
          <button
            onClick={handleEdit}
            className="w-full flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
          >
            <span className="text-blue-600">✏️</span>
            <span className="font-medium text-gray-900">Edit Report</span>
          </button>
          
          <button
            onClick={handleDuplicate}
            className="w-full flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
          >
            <span className="text-green-600">📋</span>
            <span className="font-medium text-gray-900">Duplicate Report</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="w-full flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
          >
            <span className="text-gray-600">🖨️</span>
            <span className="font-medium text-gray-900">Print Report</span>
          </button>
          
          <button
            onClick={() => setIsSharing(!isSharing)}
            className="w-full flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
          >
            <span className="text-purple-600">📤</span>
            <span className="font-medium text-gray-900">Share Report</span>
          </button>
        </div>
      </div>

      {/* Share Options */}
      {isSharing && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Share Report</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={shareOptions.email}
                onChange={(e) => setShareOptions(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                value={shareOptions.message}
                onChange={(e) => setShareOptions(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Add a message..."
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Expiration
              </label>
              <select
                value={shareOptions.expiration}
                onChange={(e) => setShareOptions(prev => ({ ...prev, expiration: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="never">Never expires</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allowComments"
                checked={shareOptions.allowComments}
                onChange={(e) => setShareOptions(prev => ({ ...prev, allowComments: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="allowComments" className="text-sm font-medium text-gray-700">
                Allow comments
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleShare}
                disabled={isSharing || !shareOptions.email}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSharing ? 'Sharing...' : 'Share Report'}
              </button>
              <button
                onClick={() => setIsSharing(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Statistics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Report Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Sections</span>
            <span className="font-medium">{report.metadata.sections}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Documents</span>
            <span className="font-medium">{report.metadata.documents}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Confidence Level</span>
            <span className="font-medium">{report.data.market_analysis.confidence_level}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Price per Sq Ft</span>
            <span className="font-medium">${report.data.market_analysis.price_per_sqft}</span>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-blue-800 text-sm mb-4">
          Having trouble with exports or sharing? Check our documentation or contact support.
        </p>
        <div className="flex space-x-3">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            📚 Documentation
          </button>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            💬 Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}