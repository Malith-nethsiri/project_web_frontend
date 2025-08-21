'use client'

import { useReportWizardStore } from '@/stores/report-wizard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ReviewConfirmationStep() {
  const { formData } = useReportWizardStore()

  const getSectionStatus = (sectionKey: string) => {
    switch (sectionKey) {
      case 'metadata':
        return formData.title && formData.purpose && formData.inspection_date && formData.valuation_date
      case 'applicant':
        return formData.applicant.name && formData.applicant.address
      case 'property':
        return formData.property.address && formData.property.district
      case 'valuation':
        return formData.valuation.total_market_value && formData.valuation.primary_method
      case 'legal':
        return formData.legal_aspects.length > 0
      case 'photos':
        return formData.photos.length > 0
      case 'comparables':
        return formData.comparables.length > 0
      default:
        return false
    }
  }

  const sections = [
    {
      key: 'metadata',
      title: 'Report Metadata',
      icon: '📋',
      items: [
        { label: 'Title', value: formData.title },
        { label: 'Reference', value: formData.reference_number },
        { label: 'Purpose', value: formData.purpose },
        { label: 'Inspection Date', value: formData.inspection_date },
      ]
    },
    {
      key: 'applicant',
      title: 'Applicant Information',
      icon: '👤',
      items: [
        { label: 'Name', value: formData.applicant.name },
        { label: 'Email', value: formData.applicant.email },
        { label: 'Contact Numbers', value: formData.applicant.contact_numbers.filter(n => n).join(', ') },
      ]
    },
    {
      key: 'property',
      title: 'Property Details',
      icon: '🏠',
      items: [
        { label: 'Address', value: formData.property.address },
        { label: 'District', value: formData.property.district },
        { label: 'Province', value: formData.property.province },
        { label: 'Property Type', value: formData.property.property_type },
      ]
    },
    {
      key: 'valuation',
      title: 'Valuation Details',
      icon: '💰',
      items: [
        { label: 'Primary Method', value: formData.valuation.primary_method },
        { label: 'Total Market Value', value: formData.valuation.total_market_value ? `LKR ${formData.valuation.total_market_value.toLocaleString()}` : '' },
        { label: 'Forced Sale Value', value: formData.valuation.forced_sale_value ? `LKR ${formData.valuation.forced_sale_value.toLocaleString()}` : 'Not specified' },
      ]
    },
    {
      key: 'legal',
      title: 'Legal Aspects',
      icon: '⚖️',
      items: [
        { label: 'Documents', value: `${formData.legal_aspects.length} legal documents` },
      ]
    },
    {
      key: 'photos',
      title: 'Photos',
      icon: '📸',
      items: [
        { label: 'Photos', value: `${formData.photos.length} photos uploaded` },
      ]
    },
    {
      key: 'comparables',
      title: 'Comparables',
      icon: '📊',
      items: [
        { label: 'Comparable Properties', value: `${formData.comparables.length} comparable sales` },
      ]
    },
  ]

  const completedSections = sections.filter(section => getSectionStatus(section.key)).length
  const completionPercentage = Math.round((completedSections / sections.length) * 100)

  return (
    <div className="space-y-6">
      {/* Completion Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2">📋</span>
              Report Review & Confirmation
            </span>
            <Badge variant={completionPercentage >= 80 ? 'success' : completionPercentage >= 60 ? 'warning' : 'destructive'}>
              {completionPercentage}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{completedSections} of {sections.length} sections completed</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          
          {completionPercentage < 80 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Recommendation:</strong> Complete at least 80% of sections for a comprehensive report.
                Missing information may affect report quality and acceptance.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section Review */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const isComplete = getSectionStatus(section.key)
          return (
            <Card key={section.key}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </span>
                  <Badge variant={isComplete ? 'success' : 'secondary'}>
                    {isComplete ? 'Complete' : 'Incomplete'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{item.label}:</span>
                      <span className={`font-medium ${item.value ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}`}>
                        {item.value || 'Not specified'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Final Confirmation */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Ready to Create Report
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please review all sections above. Once you click &quot;Create Report&quot;, 
              the system will generate your comprehensive valuation report.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-left">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                What happens next:
              </h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Professional report will be generated in PDF and DOCX formats</li>
                <li>• All data will be saved and can be edited later if needed</li>
                <li>• Report will be available in your dashboard for download</li>
                <li>• Email notification will be sent upon completion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}