'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { apiClient } from '@/lib/api/client'

export default function CreateReportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    purpose: 'mortgage' as 'mortgage' | 'sale' | 'insurance' | 'taxation' | 'legal' | 'other',
    bank_name: '',
    bank_branch: '',
    bank_reference: '',
    inspection_date: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!formData.title) {
      setErrors({ title: 'Report title is required' })
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await apiClient.createReport({
        ...formData,
        inspection_date: formData.inspection_date ? new Date(formData.inspection_date).toISOString() : null
      })

      const reportId = response.data.id
      router.push(`/reports/${reportId}/edit`)
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.detail || 'Failed to create report. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="ml-6">
              <h1 className="text-xl font-semibold text-secondary-900">Create New Report</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              <div>
                <h2 className="text-xl font-semibold text-secondary-900">Report Details</h2>
                <p className="text-secondary-600">Provide basic information about the valuation report.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {errors.general}
                </div>
              )}

              <Input
                label="Report Title *"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="e.g., Property Valuation - 123 Main Street"
                required
              />

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Purpose of Valuation *
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                  className="form-input w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="mortgage">Mortgage</option>
                  <option value="sale">Sale</option>
                  <option value="insurance">Insurance</option>
                  <option value="taxation">Taxation</option>
                  <option value="legal">Legal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Bank Name"
                  value={formData.bank_name}
                  onChange={(e) => handleInputChange('bank_name', e.target.value)}
                  placeholder="e.g., Commercial Bank"
                />

                <Input
                  label="Bank Branch"
                  value={formData.bank_branch}
                  onChange={(e) => handleInputChange('bank_branch', e.target.value)}
                  placeholder="e.g., Colombo Branch"
                />
              </div>

              <Input
                label="Bank Reference"
                value={formData.bank_reference}
                onChange={(e) => handleInputChange('bank_reference', e.target.value)}
                placeholder="e.g., REF/2024/001"
              />

              <Input
                type="date"
                label="Inspection Date"
                value={formData.inspection_date}
                onChange={(e) => handleInputChange('inspection_date', e.target.value)}
                helperText="Optional - can be updated later"
              />

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!formData.title}
                >
                  Create Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Next Steps Info */}
        <Card className="mt-6">
          <CardContent>
            <h3 className="text-lg font-medium text-secondary-900 mb-3">What happens next?</h3>
            <div className="space-y-2 text-secondary-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>You'll be taken to the report editor</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>Upload and process documents with OCR</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>Add property details, photos, and valuations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>Generate professional DOCX and PDF reports</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}