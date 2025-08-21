'use client'

import { useState } from 'react'
import { useReportWizardStore } from '@/stores/report-wizard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function ApplicantInformationStep() {
  const { formData, updateFormData, errors, clearError } = useReportWizardStore()

  const handleInputChange = (field: string, value: string) => {
    updateFormData('applicant', { [field]: value })
    clearError(`applicant.${field}`)
  }

  const handleContactNumberChange = (index: number, value: string) => {
    const newContactNumbers = [...formData.applicant.contact_numbers]
    newContactNumbers[index] = value
    updateFormData('applicant', { contact_numbers: newContactNumbers })
  }

  const addContactNumber = () => {
    const newContactNumbers = [...formData.applicant.contact_numbers, '']
    updateFormData('applicant', { contact_numbers: newContactNumbers })
  }

  const removeContactNumber = (index: number) => {
    if (formData.applicant.contact_numbers.length > 1) {
      const newContactNumbers = formData.applicant.contact_numbers.filter((_, i) => i !== index)
      updateFormData('applicant', { contact_numbers: newContactNumbers })
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Suggestion Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-purple-500 text-xl">🤖</span>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
              AI-Powered Data Extraction Available
            </h3>
            <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
              Upload applicant documents and let our AI automatically extract and populate the form fields below.
            </p>
            <div className="mt-3">
              <Button variant="outline" size="sm" className="text-purple-700 border-purple-300 hover:bg-purple-50">
                📄 Upload Documents for Auto-Fill
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">👤</span>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="applicant_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <Input
                  id="applicant_name"
                  type="text"
                  value={formData.applicant.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter applicant's full name"
                  className={errors['applicant.name'] ? 'border-red-500' : ''}
                />
                {errors['applicant.name'] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['applicant.name']}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="applicant_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="applicant_email"
                  type="email"
                  value={formData.applicant.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="applicant@example.com"
                />
              </div>

              {/* NIC Number */}
              <div>
                <label htmlFor="applicant_nic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  NIC Number
                </label>
                <Input
                  id="applicant_nic"
                  type="text"
                  value={formData.applicant.nic_number}
                  onChange={(e) => handleInputChange('nic_number', e.target.value)}
                  placeholder="e.g., 123456789V or 123456789012"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">📞</span>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Address */}
              <div>
                <label htmlFor="applicant_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <Textarea
                  id="applicant_address"
                  value={formData.applicant.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address with postal code"
                  rows={3}
                  className={errors['applicant.address'] ? 'border-red-500' : ''}
                />
                {errors['applicant.address'] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['applicant.address']}</p>
                )}
              </div>

              {/* Contact Numbers */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contact Numbers
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addContactNumber}
                  >
                    + Add Number
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.applicant.contact_numbers.map((number, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="tel"
                        value={number}
                        onChange={(e) => handleContactNumberChange(index, e.target.value)}
                        placeholder={index === 0 ? "Primary contact number" : "Additional contact number"}
                        className="flex-1"
                      />
                      {formData.applicant.contact_numbers.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeContactNumber(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          ✕
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Information */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">🏢</span>
                Business Information (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Business Name */}
                <div>
                  <label htmlFor="business_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Name
                  </label>
                  <Input
                    id="business_name"
                    type="text"
                    value={formData.applicant.business_name}
                    onChange={(e) => handleInputChange('business_name', e.target.value)}
                    placeholder="Enter business/company name"
                  />
                </div>

                {/* Business Registration */}
                <div>
                  <label htmlFor="business_registration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Registration Number
                  </label>
                  <Input
                    id="business_registration"
                    type="text"
                    value={formData.applicant.business_registration}
                    onChange={(e) => handleInputChange('business_registration', e.target.value)}
                    placeholder="BR/PV/XXX/XXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-green-400 text-lg">✅</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              Data Collection Tips
            </h3>
            <div className="mt-2 text-sm text-green-700 dark:text-green-300">
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure the applicant&apos;s name matches official documents</li>
                <li>Add multiple contact numbers for better communication</li>
                <li>Complete address is essential for correspondence</li>
                <li>Business information is only required for corporate applicants</li>
                <li>AI document processing can auto-fill most fields from uploaded documents</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}