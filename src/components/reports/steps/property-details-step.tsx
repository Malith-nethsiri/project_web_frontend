'use client'

import { useReportWizardStore } from '@/stores/report-wizard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function PropertyDetailsStep() {
  const { formData, updateFormData, errors, clearError } = useReportWizardStore()

  const handleInputChange = (field: string, value: string | number | boolean) => {
    updateFormData('property', { [field]: value })
    clearError(`property.${field}`)
  }

  return (
    <div className="space-y-6">
      {/* Legal Identification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📋</span>
            Legal Identification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lot Number
              </label>
              <Input
                value={formData.property.lot_number}
                onChange={(e) => handleInputChange('lot_number', e.target.value)}
                placeholder="Enter lot number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plan Number
              </label>
              <Input
                value={formData.property.plan_number}
                onChange={(e) => handleInputChange('plan_number', e.target.value)}
                placeholder="Enter plan number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plan Date
              </label>
              <Input
                type="date"
                value={formData.property.plan_date}
                onChange={(e) => handleInputChange('plan_date', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Surveyor Name
              </label>
              <Input
                value={formData.property.surveyor_name}
                onChange={(e) => handleInputChange('surveyor_name', e.target.value)}
                placeholder="Licensed surveyor name"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📍</span>
            Location Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Property Address *
            </label>
            <Textarea
              value={formData.property.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Complete property address"
              rows={3}
              className={errors['property.address'] ? 'border-red-500' : ''}
            />
            {errors['property.address'] && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['property.address']}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                District *
              </label>
              <Input
                value={formData.property.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="e.g., Colombo"
                className={errors['property.district'] ? 'border-red-500' : ''}
              />
              {errors['property.district'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['property.district']}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Province
              </label>
              <Input
                value={formData.property.province}
                onChange={(e) => handleInputChange('province', e.target.value)}
                placeholder="e.g., Western Province"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Integration Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🗺️</span>
            Map Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Interactive Map Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Google Maps integration will allow you to search addresses, set coordinates,
              and generate directions automatically.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400 text-lg">💡</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Property Details Guidelines
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <ul className="list-disc pl-5 space-y-1">
                <li>Legal identification details should match survey plans exactly</li>
                <li>Provide complete property address for accurate location mapping</li>
                <li>Map integration will auto-populate coordinates and directions</li>
                <li>All legal documents should be referenced accurately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}