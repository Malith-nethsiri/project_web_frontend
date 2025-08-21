'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useReportWizardStore } from '@/stores/report-wizard'

const documentTypes = [
  { value: 'deed', label: 'Title Deed' },
  { value: 'survey', label: 'Survey Plan' },
  { value: 'permit', label: 'Building Permit' },
  { value: 'approval', label: 'Planning Approval' },
  { value: 'clearance', label: 'Tax Clearance' },
  { value: 'other', label: 'Other Legal Document' },
]

export function LegalAspectsStep() {
  const { formData, updateFormData } = useReportWizardStore()
  const [newDocument, setNewDocument] = useState({
    type: '',
    description: '',
    reference: '',
    issued_by: '',
    issue_date: '',
    expiry_date: '',
    status: 'verified',
  })

  const handleAddDocument = () => {
    if (!newDocument.type || !newDocument.description) return
    
    const updatedDocuments = [...(formData.legal_aspects || []), {
      ...newDocument,
      document_number: newDocument.reference || Date.now().toString(),
    }]
    
    updateFormData('legal_aspects', updatedDocuments)
    
    setNewDocument({
      type: '',
      description: '',
      reference: '',
      issued_by: '',
      issue_date: '',
      expiry_date: '',
      status: 'verified',
    })
  }

  const handleRemoveDocument = (id: string) => {
    const updatedDocuments = (formData.legal_aspects || []).filter(doc => doc.document_number !== id)
    updateFormData('legal_aspects', updatedDocuments)
  }

  const handleLegalStatusChange = (field: string, value: string) => {
    updateFormData('legal_aspects', {
      ...formData.legal_aspects,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      {/* Legal Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">⚖️</span>
            Legal Status & Ownership
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ownership_status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ownership Status
              </label>
              <Select
                id="ownership_status"
                value={''}
                onChange={(e) => handleLegalStatusChange('ownership_status', e.target.value)}
              >
                <option value="">Select ownership status</option>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="joint">Joint Ownership</option>
                <option value="trust">Trust Property</option>
                <option value="company">Company Owned</option>
              </Select>
            </div>
            
            <div>
              <label htmlFor="legal_status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Legal Status
              </label>
              <Select
                id="legal_status"
                value={''}
                onChange={(e) => handleLegalStatusChange('legal_status', e.target.value)}
              >
                <option value="">Select legal status</option>
                <option value="clear">Clear Title</option>
                <option value="encumbered">Encumbered</option>
                <option value="disputed">Under Dispute</option>
                <option value="pending">Pending Clearance</option>
              </Select>
            </div>
            
            <div>
              <label htmlFor="zoning" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Zoning Classification
              </label>
              <Input
                id="zoning"
                type="text"
                placeholder="e.g., Residential, Commercial, Mixed Use"
                value={''}
                onChange={(e) => handleLegalStatusChange('zoning', e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="land_use" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Permitted Land Use
              </label>
              <Input
                id="land_use"
                type="text"
                placeholder="e.g., Single Family, Multi-family, Office"
                value={''}
                onChange={(e) => handleLegalStatusChange('land_use', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Legal Restrictions / Covenants
            </label>
            <textarea
              id="restrictions"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Describe any legal restrictions, covenants, or easements..."
              value={''}
              onChange={(e) => handleLegalStatusChange('restrictions', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Legal Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📄</span>
            Legal Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add New Document Form */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Add Legal Document</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Type
                </label>
                <Select
                  value={newDocument.type}
                  onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                >
                  <option value="">Select document type</option>
                  {documentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <Input
                  type="text"
                  placeholder="Document description"
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reference Number
                </label>
                <Input
                  type="text"
                  placeholder="Reference/Registration No."
                  value={newDocument.reference}
                  onChange={(e) => setNewDocument({ ...newDocument, reference: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issued By
                </label>
                <Input
                  type="text"
                  placeholder="Issuing authority"
                  value={newDocument.issued_by}
                  onChange={(e) => setNewDocument({ ...newDocument, issued_by: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issue Date
                </label>
                <Input
                  type="date"
                  value={newDocument.issue_date}
                  onChange={(e) => setNewDocument({ ...newDocument, issue_date: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <Input
                  type="date"
                  value={newDocument.expiry_date}
                  onChange={(e) => setNewDocument({ ...newDocument, expiry_date: e.target.value })}
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleAddDocument}
                  className="w-full"
                  disabled={!newDocument.type || !newDocument.description}
                >
                  📄 Add Document
                </Button>
              </div>
            </div>
          </div>

          {/* Documents List */}
          {formData.legal_aspects && formData.legal_aspects.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Uploaded Documents</h4>
              {formData.legal_aspects.map((doc) => {
                const docType = documentTypes.find(t => t.value === doc.document_type)
                return (
                  <div key={doc.document_number} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">📄</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {docType?.label || doc.document_type}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            doc.title_clear 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {doc.title_clear ? '✅ Clear' : '⏳ Issues'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{doc.remarks}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-500 space-x-4">
                          <span>No: {doc.document_number}</span>
                          <span>By: {doc.issuing_authority}</span>
                          <span>Date: {new Date(doc.document_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveDocument(doc.document_number)}
                        className="text-red-600 hover:text-red-700"
                      >
                        🗑️ Remove
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <span className="text-4xl mb-2 block">📄</span>
              <p>No legal documents added yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-amber-400 text-lg">⚖️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Legal Verification System
            </h3>
            <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
              <p className="mb-2">Our AI system automatically:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Classifies document types and extracts key information</li>
                <li>Validates ownership chains and title history</li>
                <li>Identifies encumbrances, liens, and legal restrictions</li>
                <li>Assesses legal risks and compliance issues</li>
                <li>Cross-references with government databases</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}