'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useReportWizardStore } from '@/stores/report-wizard'

const sectionValidation = [
  { 
    key: 'metadata', 
    title: 'Report Metadata', 
    icon: '📄',
    required: ['title', 'purpose', 'valuation_date'],
  },
  { 
    key: 'applicant_info', 
    title: 'Applicant Information', 
    icon: '👤',
    required: ['name', 'email'],
  },
  { 
    key: 'property_details', 
    title: 'Property Details', 
    icon: '🏠',
    required: ['legal_description', 'location'],
  },
  { 
    key: 'valuation_details', 
    title: 'Valuation Details', 
    icon: '💰',
    required: ['methodology', 'final_value'],
  },
  { 
    key: 'legal_aspects', 
    title: 'Legal Aspects', 
    icon: '⚖️',
    required: [],
    optional: true,
  },
  { 
    key: 'photos_media', 
    title: 'Photos & Media', 
    icon: '📷',
    required: [],
    optional: true,
  },
  { 
    key: 'comparables', 
    title: 'Comparables Analysis', 
    icon: '📊',
    required: [],
    optional: true,
  },
]

export function ReviewSubmitStep() {
  const { data, submitReport } = useReportWizardStore()
  const [generating, setGenerating] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validateSection = (section: typeof sectionValidation[0]) => {
    const sectionData = data[section.key as keyof typeof data]
    if (!sectionData && section.optional) return { valid: true, missing: [] }
    
    const missing = section.required.filter(field => {
      if (!sectionData || typeof sectionData !== 'object') return true
      return !(field in sectionData) || !sectionData[field as keyof typeof sectionData]
    })
    
    return { valid: missing.length === 0, missing }
  }

  const getOverallValidation = () => {
    let totalSections = 0
    let validSections = 0
    let criticalMissing = []
    
    for (const section of sectionValidation) {
      totalSections++
      const validation = validateSection(section)
      if (validation.valid) {
        validSections++
      } else if (!section.optional) {
        criticalMissing.push({ section: section.title, missing: validation.missing })
      }
    }
    
    return { 
      completeness: Math.round((validSections / totalSections) * 100),
      canSubmit: criticalMissing.length === 0,
      criticalMissing,
    }
  }

  const validation = getOverallValidation()

  const handleGenerateReport = async () => {
    setGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false)
    }, 3000)
  }

  const handleSubmitReport = async () => {
    if (!validation.canSubmit) return
    
    setSubmitting(true)
    try {
      await submitReport()
      // Redirect would happen here
      alert('Report submitted successfully! You will be redirected to the reports dashboard.')
    } catch (error) {
      console.error('Submission failed:', error)
      alert('Failed to submit report. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getDataSummary = () => {
    const summary = {
      photos: data.photos_media?.photos?.length || 0,
      documents: data.legal_aspects?.documents?.length || 0,
      comparables: data.comparables?.properties?.length || 0,
      finalValue: data.valuation_details?.final_value || 0,
    }
    return summary
  }

  const summary = getDataSummary()

  return (
    <div className="space-y-6">
      {/* Validation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2">📋</span>
              Report Completion Status
            </span>
            <Badge variant={validation.completeness === 100 ? 'success' : validation.completeness >= 70 ? 'default' : 'warning'}>
              {validation.completeness}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sectionValidation.map((section) => {
              const sectionValidation = validateSection(section)
              return (
                <div key={section.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{section.icon}</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {section.title}
                      </span>
                      {section.optional && (
                        <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">(Optional)</span>
                      )}
                      {!sectionValidation.valid && sectionValidation.missing.length > 0 && (
                        <div className="text-xs text-red-600 dark:text-red-400">
                          Missing: {sectionValidation.missing.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {sectionValidation.valid ? (
                      <Badge variant="success">✓ Complete</Badge>
                    ) : section.optional ? (
                      <Badge variant="secondary">Optional</Badge>
                    ) : (
                      <Badge variant="warning">Incomplete</Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          {!validation.canSubmit && validation.criticalMissing.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start">
                <span className="text-red-400 text-lg mr-3">⚠️</span>
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                    Required Information Missing
                  </h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    {validation.criticalMissing.map((item, index) => (
                      <li key={index}>
                        <strong>{item.section}:</strong> {item.missing.join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📊</span>
            Report Data Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {summary.photos}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Photos Uploaded</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {summary.documents}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Legal Documents</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {summary.comparables}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Comparable Properties</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {summary.finalValue ? `LKR ${summary.finalValue.toLocaleString()}` : 'Not Set'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Final Valuation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Information Review */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🔍</span>
            Key Information Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Report Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Title:</span>
                  <span className="font-medium">{data.metadata?.title || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Purpose:</span>
                  <span className="font-medium">{data.metadata?.purpose || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Valuation Date:</span>
                  <span className="font-medium">
                    {data.metadata?.valuation_date 
                      ? new Date(data.metadata.valuation_date).toLocaleDateString() 
                      : 'Not specified'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Bank/Institution:</span>
                  <span className="font-medium">{data.metadata?.bank_institution || 'Not specified'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Applicant & Property</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Applicant:</span>
                  <span className="font-medium">{data.applicant_info?.name || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Property Type:</span>
                  <span className="font-medium">{data.property_details?.property_type || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Methodology:</span>
                  <span className="font-medium">{data.valuation_details?.methodology || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Final Value:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {data.valuation_details?.final_value 
                      ? `LKR ${data.valuation_details.final_value.toLocaleString()}`
                      : 'Not specified'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">✨</span>
            Final Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGenerateReport}
                disabled={generating}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                {generating ? (
                  <span className="flex items-center">
                    <span className="mr-2">⏳</span>
                    Generating Report...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">📋</span>
                    Generate Preview
                  </span>
                )}
              </Button>
              
              <Button 
                onClick={handleSubmitReport}
                disabled={!validation.canSubmit || submitting}
                size="lg"
                className="flex-1"
              >
                {submitting ? (
                  <span className="flex items-center">
                    <span className="mr-2">⏳</span>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">🚀</span>
                    Submit Report
                  </span>
                )}
              </Button>
            </div>
            
            {!validation.canSubmit && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                Please complete all required sections before submitting.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-purple-400 text-lg">📋</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Report Generation & Delivery
            </h3>
            <div className="mt-2 text-sm text-purple-700 dark:text-purple-300">
              <p className="mb-2">Upon submission, your report will be:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Processed through our AI quality assurance system</li>
                <li>Formatted into professional PDF and Word documents</li>
                <li>Digitally signed and certified</li>
                <li>Delivered to your email within 2-4 hours</li>
                <li>Made available in your dashboard for future access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}