'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
  category: string
  extractedText?: string
  aiInsights?: {
    documentType: string
    confidence: number
    keyInformation: string[]
    suggestions: string[]
  }
  processingTime?: number
}

const documentCategories = [
  { value: 'deed', label: 'Title Deed', icon: '📜' },
  { value: 'survey', label: 'Survey Plan', icon: '📐' },
  { value: 'permit', label: 'Building Permit', icon: '🏗️' },
  { value: 'photos', label: 'Property Photos', icon: '📷' },
  { value: 'legal', label: 'Legal Documents', icon: '⚖️' },
  { value: 'financial', label: 'Financial Records', icon: '💰' },
  { value: 'other', label: 'Other Documents', icon: '📄' },
]

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('deed')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file, index) => ({
      id: `${Date.now()}_${index}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
      category: selectedCategory,
    }))

    setFiles(prev => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((fileObj) => {
      simulateFileProcessing(fileObj)
    })
  }

  const simulateFileProcessing = async (fileObj: UploadedFile) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, progress } : f
      ))
    }

    // Switch to processing
    setFiles(prev => prev.map(f => 
      f.id === fileObj.id ? { 
        ...f, 
        status: 'processing', 
        progress: 0 
      } : f
    ))

    // Simulate AI processing
    const processingSteps = [
      'OCR Text Extraction',
      'Document Classification', 
      'Information Extraction',
      'AI Analysis',
      'Generating Insights'
    ]

    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      const progress = ((i + 1) / processingSteps.length) * 100
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, progress } : f
      ))
    }

    // Complete processing with mock AI results
    const mockAIInsights = {
      documentType: getDocumentType(fileObj.name, fileObj.category),
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      keyInformation: generateMockKeyInfo(fileObj.category),
      suggestions: generateMockSuggestions(fileObj.category),
    }

    const mockExtractedText = generateMockExtractedText(fileObj.category)

    setFiles(prev => prev.map(f => 
      f.id === fileObj.id ? { 
        ...f, 
        status: 'completed',
        progress: 100,
        aiInsights: mockAIInsights,
        extractedText: mockExtractedText,
        processingTime: Math.floor(Math.random() * 45) + 15 // 15-60 seconds
      } : f
    ))
  }

  const getDocumentType = (fileName: string, category: string) => {
    const types = {
      deed: 'Title Deed',
      survey: 'Survey Plan',
      permit: 'Building Permit',
      photos: 'Property Photo',
      legal: 'Legal Document',
      financial: 'Financial Record',
      other: 'General Document'
    }
    return types[category as keyof typeof types] || 'Unknown Document'
  }

  const generateMockKeyInfo = (category: string): string[] => {
    const keyInfoByCategory = {
      deed: [
        'Property Owner: John Doe',
        'Land Area: 15 perches',
        'Survey Number: 1234/5',
        'Registration Date: 2020-01-15'
      ],
      survey: [
        'Survey Date: 2023-12-01',
        'Total Area: 1,250 sqft',
        'Boundaries Verified: Yes',
        'Surveyor: ABC Surveyors Ltd'
      ],
      permit: [
        'Permit Number: BP/2023/1234',
        'Construction Type: Residential',
        'Floors: 2 Story',
        'Approval Date: 2023-08-15'
      ],
      photos: [
        'Image Resolution: 4032x3024',
        'GPS Coordinates: Available',
        'Timestamp: 2024-01-20 14:30',
        'Quality Score: Excellent'
      ],
      legal: [
        'Document Type: Agreement',
        'Parties Involved: 2',
        'Execution Date: 2023-11-20',
        'Legal Status: Valid'
      ],
      financial: [
        'Document Date: 2023-12-31',
        'Currency: LKR',
        'Amount: 15,000,000',
        'Institution: Bank of Ceylon'
      ]
    }
    return keyInfoByCategory[category as keyof typeof keyInfoByCategory] || ['Information extracted successfully']
  }

  const generateMockSuggestions = (category: string): string[] => {
    const suggestionsByCategory = {
      deed: [
        'Verify property boundaries with survey plan',
        'Check for any encumbrances or liens',
        'Confirm registration with Land Registry'
      ],
      survey: [
        'Cross-reference with title deed measurements',
        'Verify boundary markers on-site',
        'Check survey validity period'
      ],
      permit: [
        'Ensure construction matches approved plans',
        'Check compliance with building codes',
        'Verify permit renewal requirements'
      ],
      photos: [
        'Capture additional angles of property',
        'Include neighboring properties for context',
        'Take interior photos if accessible'
      ],
      legal: [
        'Review document authenticity',
        'Verify signatory authority',
        'Check legal compliance requirements'
      ],
      financial: [
        'Verify financial institution legitimacy',
        'Cross-check amounts with other documents',
        'Confirm currency and exchange rates'
      ]
    }
    return suggestionsByCategory[category as keyof typeof suggestionsByCategory] || ['Review document for completeness']
  }

  const generateMockExtractedText = (category: string): string => {
    const textByCategory = {
      deed: 'TITLE DEED\n\nThis is to certify that John Doe is the lawful owner of the land described herein...\n\nLand Area: Fifteen (15) perches\nSurvey Plan No: 1234/5\nDistrict: Colombo\nDivisional Secretariat: Colombo\n\nRegistered on 15th January 2020...',
      survey: 'SURVEY PLAN\n\nPlan No: SP/2023/5678\nSurveyed by: ABC Licensed Surveyors\nDate of Survey: 1st December 2023\n\nTotal Area: 1,250 square feet\nBoundaries: North - 50ft, South - 50ft, East - 25ft, West - 25ft\n\nAll measurements verified and accurate...',
      permit: 'BUILDING PERMIT\n\nPermit No: BP/2023/1234\nIssued to: John Doe\nProperty Address: No. 123, Main Street, Colombo 07\n\nApproved for: Two story residential building\nTotal Floor Area: 2,500 sqft\nApproval Date: 15th August 2023\n\nValid until: 15th August 2025...',
      photos: '[Image Analysis]\n\nProperty Type: Two-story residential house\nCondition: Well-maintained\nArchitectural Style: Modern\nRoof Type: Tile roof\nWall Material: Concrete block\nWindows: Aluminum frame with glass\n\nGPS Location: 6.9271° N, 79.8612° E\nImage Quality: High resolution (4032x3024)\nTimestamp: 20th January 2024, 2:30 PM',
      legal: 'LEGAL AGREEMENT\n\nParties:\n1. First Party: John Doe (Vendor)\n2. Second Party: Jane Smith (Purchaser)\n\nSubject: Sale of residential property\nProperty Description: House and land at No. 123, Main Street\nConsideration: LKR 15,000,000\n\nExecution Date: 20th November 2023\nWitnesses: [Signed and witnessed]',
      financial: 'BANK STATEMENT\n\nBank of Ceylon\nAccount Holder: John Doe\nAccount Number: 1234567890\nStatement Period: 1st Nov 2023 - 30th Nov 2023\n\nOpening Balance: LKR 2,500,000\nDeposits: LKR 15,000,000 (Property Sale)\nWithdrawals: LKR 500,000\nClosing Balance: LKR 17,000,000\n\nTransaction Details:\n20/11/2023 - Property Sale Proceeds - LKR 15,000,000 CR'
    }
    return textByCategory[category as keyof typeof textByCategory] || 'Text extracted successfully from document.'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-500'
      case 'processing': return 'bg-yellow-500' 
      case 'completed': return 'bg-green-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return '⬆️'
      case 'processing': return '⚙️'
      case 'completed': return '✅'
      case 'error': return '❌'
      default: return '📄'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const completedFiles = files.filter(f => f.status === 'completed').length
  const totalFiles = files.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Upload & AI Processing
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Upload documents and photos for AI-powered analysis and data extraction
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary">
            {completedFiles}/{totalFiles} Processed
          </Badge>
        </div>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📤</span>
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Document Category
            </label>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {documentCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="space-y-3">
              <div className="text-4xl">
                {documentCategories.find(c => c.value === selectedCategory)?.icon || '📄'}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Drop files here or click to upload
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload {documentCategories.find(c => c.value === selectedCategory)?.label.toLowerCase()} for AI analysis
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Supports PDF, DOC, DOCX, JPG, PNG up to 10MB each
              </p>
              <Button 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                📁 Choose Files
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Processing Queue */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">⚙️</span>
              Processing Queue ({files.length} files)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-2xl">
                        {getStatusIcon(file.status)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {file.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatFileSize(file.size)} • {documentCategories.find(c => c.value === file.category)?.label}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        file.status === 'completed' ? 'success' :
                        file.status === 'error' ? 'destructive' :
                        'default'
                      }>
                        {file.status === 'uploading' && 'Uploading'}
                        {file.status === 'processing' && 'Processing'}
                        {file.status === 'completed' && 'Complete'}
                        {file.status === 'error' && 'Error'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {file.status !== 'completed' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          {file.status === 'uploading' ? 'Uploading...' : 'AI Processing...'}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {Math.round(file.progress)}%
                        </span>
                      </div>
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  )}

                  {/* AI Results */}
                  {file.status === 'completed' && file.aiInsights && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-3">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-green-800 dark:text-green-200">
                          🤖 AI Analysis Complete
                        </h5>
                        <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                          <span>Confidence: {file.aiInsights.confidence}%</span>
                          <span>•</span>
                          <span>⏱️ {file.processingTime}s</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            📋 Key Information
                          </h6>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {file.aiInsights.keyInformation.map((info, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                {info}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            💡 AI Suggestions
                          </h6>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {file.aiInsights.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">→</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-medium text-green-800 dark:text-green-200 hover:text-green-600 dark:hover:text-green-300">
                            🔍 View Extracted Text
                          </summary>
                          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border text-sm font-mono text-gray-700 dark:text-gray-300 max-h-32 overflow-y-auto">
                            {file.extractedText}
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Processing Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400 text-lg">🤖</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              AI-Powered Document Processing
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p className="mb-2">Our advanced AI system provides:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>OCR text extraction from scanned documents and images</li>
                <li>Intelligent document classification and categorization</li>
                <li>Key information extraction and structuring</li>
                <li>Property condition analysis from photos</li>
                <li>Smart suggestions for report improvement</li>
                <li>Compliance and completeness verification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}