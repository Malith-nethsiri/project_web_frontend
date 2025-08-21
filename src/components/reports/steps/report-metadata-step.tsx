'use client'

import { useReportWizardStore } from '@/stores/report-wizard'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function ReportMetadataStep() {
  const { formData, updateFormData, errors, clearError } = useReportWizardStore()

  const handleInputChange = (field: string, value: string) => {
    updateFormData('title' as any, { [field]: value })
    clearError(field)
  }

  const handleDirectChange = (field: string, value: string) => {
    updateFormData(field as any, value)
    clearError(field)
  }

  const purposeOptions = [
    { value: 'mortgage', label: 'Mortgage Valuation' },
    { value: 'sale', label: 'Sale/Purchase' },
    { value: 'insurance', label: 'Insurance Valuation' },
    { value: 'taxation', label: 'Taxation Assessment' },
    { value: 'legal', label: 'Legal Proceedings' },
    { value: 'other', label: 'Other Purpose' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Report Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Report Title *
          </label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleDirectChange('title', e.target.value)}
            placeholder="e.g., Residential Property Valuation - Colombo 07"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Reference Number */}
        <div>
          <label htmlFor="reference_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reference Number
          </label>
          <Input
            id="reference_number"
            type="text"
            value={formData.reference_number}
            onChange={(e) => handleDirectChange('reference_number', e.target.value)}
            placeholder="Auto-generated"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Leave empty for auto-generation
          </p>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Purpose of Valuation *
          </label>
          <Select
            value={formData.purpose}
            onChange={(e) => handleDirectChange('purpose', e.target.value)}
            className={errors.purpose ? 'border-red-500' : ''}
          >
            <option value="">Select purpose...</option>
            {purposeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.purpose && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.purpose}</p>
          )}
        </div>

        {/* Bank Details */}
        <div>
          <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bank Name
          </label>
          <Input
            id="bank_name"
            type="text"
            value={formData.bank_name}
            onChange={(e) => handleDirectChange('bank_name', e.target.value)}
            placeholder="e.g., Commercial Bank of Ceylon"
          />
        </div>

        <div>
          <label htmlFor="bank_branch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bank Branch
          </label>
          <Input
            id="bank_branch"
            type="text"
            value={formData.bank_branch}
            onChange={(e) => handleDirectChange('bank_branch', e.target.value)}
            placeholder="e.g., Colombo Fort Branch"
          />
        </div>

        {/* Dates */}
        <div>
          <label htmlFor="inspection_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Inspection Date *
          </label>
          <Input
            id="inspection_date"
            type="date"
            value={formData.inspection_date}
            onChange={(e) => handleDirectChange('inspection_date', e.target.value)}
            className={errors.inspection_date ? 'border-red-500' : ''}
          />
          {errors.inspection_date && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.inspection_date}</p>
          )}
        </div>

        <div>
          <label htmlFor="valuation_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Valuation Date *
          </label>
          <Input
            id="valuation_date"
            type="date"
            value={formData.valuation_date}
            onChange={(e) => handleDirectChange('valuation_date', e.target.value)}
            className={errors.valuation_date ? 'border-red-500' : ''}
          />
          {errors.valuation_date && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.valuation_date}</p>
          )}
        </div>

        <div>
          <label htmlFor="report_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Report Date
          </label>
          <Input
            id="report_date"
            type="date"
            value={formData.report_date}
            onChange={(e) => handleDirectChange('report_date', e.target.value)}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400 text-lg">💡</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Report Metadata Guidelines
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <ul className="list-disc pl-5 space-y-1">
                <li>Choose a descriptive title that clearly identifies the property and location</li>
                <li>Reference number will be auto-generated if left empty</li>
                <li>Select the appropriate purpose as it affects the valuation methodology</li>
                <li>Bank details are required for mortgage valuations</li>
                <li>Ensure all dates are accurate as they impact the report validity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}