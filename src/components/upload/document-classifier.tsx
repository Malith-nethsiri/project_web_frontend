'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface ClassificationResult {
  documentType: string
  confidence: number
  category: string
  subtype?: string
  language: string
  pageCount: number
  hasText: boolean
  hasImages: boolean
  quality: 'excellent' | 'good' | 'fair' | 'poor'
  suggestedActions: string[]
  metadata: {
    fileSize: number
    dimensions?: { width: number; height: number }
    createdDate?: string
    modifiedDate?: string
    author?: string
    title?: string
  }
}

interface DocumentClassifierProps {
  file: File
  onClassificationComplete: (result: ClassificationResult) => void
}

const documentTypes = {
  'title-deed': {
    name: 'Title Deed',
    category: 'legal',
    icon: '📜',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    description: 'Legal ownership document'
  },
  'survey-plan': {
    name: 'Survey Plan',
    category: 'technical',
    icon: '📐',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    description: 'Property measurement and boundary plan'
  },
  'building-permit': {
    name: 'Building Permit',
    category: 'regulatory',
    icon: '🏗️',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    description: 'Construction authorization document'
  },
  'property-photo': {
    name: 'Property Photo',
    category: 'media',
    icon: '📷',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    description: 'Visual documentation of property'
  },
  'financial-statement': {
    name: 'Financial Statement',
    category: 'financial',
    icon: '💰',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    description: 'Financial record or bank statement'
  },
  'legal-agreement': {
    name: 'Legal Agreement',
    category: 'legal',
    icon: '⚖️',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    description: 'Contract or legal agreement'
  },
  'tax-document': {
    name: 'Tax Document',
    category: 'financial',
    icon: '🧾',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    description: 'Tax assessment or payment record'
  },
  'insurance-policy': {
    name: 'Insurance Policy',
    category: 'insurance',
    icon: '🛡️',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    description: 'Insurance coverage document'
  },
  'utility-bill': {
    name: 'Utility Bill',
    category: 'utility',
    icon: '⚡',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    description: 'Electricity, water, or gas bill'
  },
  'unknown': {
    name: 'Unknown Document',
    category: 'other',
    icon: '❓',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20',
    description: 'Unidentified document type'
  }
}

export function DocumentClassifier({ file, onClassificationComplete }: DocumentClassifierProps) {
  const [isClassifying, setIsClassifying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('Analyzing file...')
  const [result, setResult] = useState<ClassificationResult | null>(null)

  useEffect(() => {
    classifyDocument()
  }, [file]) // eslint-disable-line react-hooks/exhaustive-deps

  const classifyDocument = async () => {
    const steps = [
      { name: 'Reading file metadata...', duration: 500 },
      { name: 'Analyzing content structure...', duration: 800 },
      { name: 'Extracting text features...', duration: 1200 },
      { name: 'Running AI classification...', duration: 1500 },
      { name: 'Generating insights...', duration: 700 },
      { name: 'Finalizing results...', duration: 300 }
    ]

    let totalProgress = 0
    const stepIncrement = 100 / steps.length

    for (const step of steps) {
      setCurrentStep(step.name)
      await new Promise(resolve => setTimeout(resolve, step.duration))
      totalProgress += stepIncrement
      setProgress(Math.min(totalProgress, 100))
    }

    // Simulate AI classification based on file name and type
    const mockResult = generateMockClassification(file)
    setResult(mockResult)
    setIsClassifying(false)
    onClassificationComplete(mockResult)
  }

  const generateMockClassification = (file: File): ClassificationResult => {
    const fileName = file.name.toLowerCase()
    const fileType = file.type
    
    let documentType = 'unknown'
    let confidence = 75

    // Simple rule-based classification (in production, this would use actual AI)
    if (fileName.includes('deed') || fileName.includes('title')) {
      documentType = 'title-deed'
      confidence = 92
    } else if (fileName.includes('survey') || fileName.includes('plan')) {
      documentType = 'survey-plan'
      confidence = 89
    } else if (fileName.includes('permit') || fileName.includes('building')) {
      documentType = 'building-permit'
      confidence = 85
    } else if (fileType.startsWith('image/')) {
      documentType = 'property-photo'
      confidence = 95
    } else if (fileName.includes('bank') || fileName.includes('statement') || fileName.includes('financial')) {
      documentType = 'financial-statement'
      confidence = 88
    } else if (fileName.includes('agreement') || fileName.includes('contract')) {
      documentType = 'legal-agreement'
      confidence = 86
    } else if (fileName.includes('tax')) {
      documentType = 'tax-document'
      confidence = 90
    } else if (fileName.includes('insurance')) {
      documentType = 'insurance-policy'
      confidence = 87
    } else if (fileName.includes('bill') || fileName.includes('utility')) {
      documentType = 'utility-bill'
      confidence = 83
    }

    const docInfo = documentTypes[documentType as keyof typeof documentTypes]
    
    return {
      documentType: docInfo.name,
      confidence,
      category: docInfo.category,
      subtype: documentType === 'property-photo' ? 'exterior' : undefined,
      language: 'English',
      pageCount: fileType === 'application/pdf' ? Math.floor(Math.random() * 5) + 1 : 1,
      hasText: !fileType.startsWith('image/'),
      hasImages: fileType.startsWith('image/') || Math.random() > 0.3,
      quality: confidence > 90 ? 'excellent' : confidence > 80 ? 'good' : confidence > 70 ? 'fair' : 'poor',
      suggestedActions: generateSuggestedActions(documentType, docInfo.category),
      metadata: {
        fileSize: file.size,
        dimensions: fileType.startsWith('image/') ? 
          { width: Math.floor(Math.random() * 2000) + 1000, height: Math.floor(Math.random() * 1500) + 800 } : 
          undefined,
        createdDate: new Date(file.lastModified).toISOString(),
        modifiedDate: new Date(file.lastModified).toISOString(),
        title: file.name.replace(/\.[^/.]+$/, ''),
      }
    }
  }

  const generateSuggestedActions = (documentType: string, category: string): string[] => {
    const actionsByType: Record<string, string[]> = {
      'title-deed': [
        'Verify property ownership details',
        'Check for encumbrances or liens',
        'Cross-reference with survey plan',
        'Validate registration information'
      ],
      'survey-plan': [
        'Compare measurements with deed',
        'Verify boundary markers',
        'Check survey date and validity',
        'Confirm surveyor credentials'
      ],
      'building-permit': [
        'Verify permit validity period',
        'Check compliance with approved plans',
        'Confirm permit renewal status',
        'Review construction specifications'
      ],
      'property-photo': [
        'Analyze property condition',
        'Identify structural elements',
        'Assess maintenance needs',
        'Document special features'
      ],
      'financial-statement': [
        'Extract financial data',
        'Verify account details',
        'Check transaction history',
        'Validate financial capacity'
      ],
      'legal-agreement': [
        'Review contract terms',
        'Verify party signatures',
        'Check legal compliance',
        'Identify key obligations'
      ]
    }

    return actionsByType[documentType] || [
      'Review document completeness',
      'Extract key information',
      'Verify document authenticity',
      'Add to property file'
    ]
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (isClassifying) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🔍</span>
            Document Classification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Analyzing: {file.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            <div className="flex items-center space-x-2">
              <div className="animate-spin text-blue-500">⚙️</div>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {currentStep}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) return null

  const docInfo = Object.values(documentTypes).find(type => type.name === result.documentType) || documentTypes.unknown

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <span className="mr-2">✅</span>
            Classification Complete
          </span>
          <Badge variant={result.confidence >= 90 ? 'success' : result.confidence >= 75 ? 'default' : 'warning'}>
            {result.confidence}% Confidence
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Document Type */}
          <div className={`p-4 rounded-lg ${docInfo.bgColor}`}>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{docInfo.icon}</span>
              <div>
                <h3 className={`font-semibold ${docInfo.color}`}>
                  {result.documentType}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {docInfo.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-500">Category</span>
                <div className="text-sm font-medium capitalize">{result.category}</div>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-500">Quality</span>
                <div className={`text-sm font-medium capitalize ${
                  result.quality === 'excellent' ? 'text-green-600' :
                  result.quality === 'good' ? 'text-blue-600' :
                  result.quality === 'fair' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {result.quality}
                </div>
              </div>
            </div>
          </div>

          {/* File Properties */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              File Properties
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Size:</span>
                <div className="font-medium">{formatFileSize(result.metadata.fileSize)}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Pages:</span>
                <div className="font-medium">{result.pageCount}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Language:</span>
                <div className="font-medium">{result.language}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Content:</span>
                <div className="font-medium">
                  {result.hasText && result.hasImages ? 'Text + Images' :
                   result.hasText ? 'Text Only' :
                   result.hasImages ? 'Images Only' : 'Unknown'}
                </div>
              </div>
              {result.metadata.dimensions && (
                <>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                    <div className="font-medium">
                      {result.metadata.dimensions.width} × {result.metadata.dimensions.height}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Suggested Actions */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
              <span className="mr-2">💡</span>
              Suggested Next Steps
            </h4>
            <ul className="space-y-2">
              {result.suggestedActions.map((action, index) => (
                <li key={index} className="flex items-start bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <span className="text-blue-500 mr-3 mt-1 text-sm">→</span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button size="sm" className="flex-1">
              🚀 Process with AI
            </Button>
            <Button variant="outline" size="sm">
              ✏️ Edit Classification
            </Button>
            <Button variant="outline" size="sm">
              💾 Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}