'use client'

import { useReportWizardStore } from '@/stores/report-wizard'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function ValuationDetailsStep() {
  const { formData, updateFormData, errors, clearError } = useReportWizardStore()

  const handleInputChange = (field: string, value: string | number) => {
    updateFormData('valuation', { [field]: value })
    clearError(`valuation.${field}`)
  }

  const methodOptions = [
    { value: 'market', label: 'Market Approach' },
    { value: 'cost', label: 'Cost Approach' },
    { value: 'income', label: 'Income Approach' },
    { value: 'comparative', label: 'Comparative Analysis' },
  ]

  return (
    <div className="space-y-6">
      {/* Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🎯</span>
            Valuation Methodology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Valuation Method *
            </label>
            <Select
              value={formData.valuation.primary_method}
              onChange={(e) => handleInputChange('primary_method', e.target.value)}
              className={errors['valuation.primary_method'] ? 'border-red-500' : ''}
            >
              <option value="">Select primary method...</option>
              {methodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors['valuation.primary_method'] && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['valuation.primary_method']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Methodology Explanation
            </label>
            <Textarea
              value={formData.valuation.methodology_explanation}
              onChange={(e) => handleInputChange('methodology_explanation', e.target.value)}
              placeholder="Explain the chosen valuation methodology and approach..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Final Values */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">💰</span>
            Final Valuation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Market Value (LKR) *
              </label>
              <Input
                type="number"
                value={formData.valuation.total_market_value || ''}
                onChange={(e) => handleInputChange('total_market_value', parseFloat(e.target.value))}
                placeholder="0.00"
                className={errors['valuation.total_market_value'] ? 'border-red-500' : ''}
              />
              {errors['valuation.total_market_value'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['valuation.total_market_value']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Forced Sale Value (LKR)
              </label>
              <Input
                type="number"
                value={formData.valuation.forced_sale_value || ''}
                onChange={(e) => handleInputChange('forced_sale_value', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Insurance Value (LKR)
              </label>
              <Input
                type="number"
                value={formData.valuation.insurance_value || ''}
                onChange={(e) => handleInputChange('insurance_value', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rental Value (Monthly LKR)
              </label>
              <Input
                type="number"
                value={formData.valuation.rental_value_monthly || ''}
                onChange={(e) => handleInputChange('rental_value_monthly', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Assistance */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-green-500 text-xl">🤖</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              AI Valuation Assistant
            </h3>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              Our AI can suggest valuation methods based on property type, location, and market data.
              It can also help calculate depreciation and market adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}