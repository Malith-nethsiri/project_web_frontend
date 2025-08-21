'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'

interface OCRResult {
  success: boolean
  text: string
  confidence: number
  languageDetected: string
  pageCount: number
  processingTime: number
  wordCount: number
  characterCount: number
  blocks: OCRBlock[]
  entities: ExtractedEntity[]
  corrections: TextCorrection[]
}

interface OCRBlock {
  id: string
  text: string
  confidence: number
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
  type: 'paragraph' | 'line' | 'word' | 'character'
}

interface ExtractedEntity {
  type: 'date' | 'amount' | 'name' | 'address' | 'phone' | 'email' | 'reference'
  value: string
  confidence: number
  context: string
}

interface TextCorrection {
  original: string
  suggested: string
  confidence: number
  reason: string
}

interface OCRProcessorProps {
  file: File
  onProcessingComplete: (result: OCRResult) => void
}

export function OCRProcessor({ file, onProcessingComplete }: OCRProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [result, setResult] = useState<OCRResult | null>(null)
  const [showRawText, setShowRawText] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null)

  const startOCRProcessing = async () => {
    setIsProcessing(true)
    setProgress(0)

    const steps = [
      { name: 'Loading document...', duration: 300 },
      { name: 'Converting to images...', duration: 800 },
      { name: 'Detecting text regions...', duration: 1000 },
      { name: 'Running OCR engine...', duration: 2000 },
      { name: 'Language detection...', duration: 400 },
      { name: 'Text enhancement...', duration: 600 },
      { name: 'Entity extraction...', duration: 800 },
      { name: 'Quality validation...', duration: 500 },
      { name: 'Finalizing results...', duration: 200 }
    ]

    let totalProgress = 0
    const stepIncrement = 100 / steps.length

    for (const step of steps) {
      setCurrentStep(step.name)
      await new Promise(resolve => setTimeout(resolve, step.duration))
      totalProgress += stepIncrement
      setProgress(Math.min(totalProgress, 100))
    }

    const mockResult = generateMockOCRResult(file)
    setResult(mockResult)
    setIsProcessing(false)
    onProcessingComplete(mockResult)
  }

  const generateMockOCRResult = (file: File): OCRResult => {
    const fileName = file.name.toLowerCase()
    let mockText = ''
    let entities: ExtractedEntity[] = []

    // Generate different mock text based on file name/type
    if (fileName.includes('deed') || fileName.includes('title')) {
      mockText = `TITLE DEED

This is to certify that JOHN MALCOLM DOE, of No. 123 Main Street, Colombo 07, is the lawful owner of the land described herein:

Land Description:
All that piece or parcel of land containing in extent Fifteen Perches and Thirty-five Decimal Places (15.35P) more or less, situate at Galle Road, Colombo 07, in the District of Colombo, Western Province.

Survey Plan No: SP/2020/1234
Title No: TN/567890
Registration Date: 15th January 2020

Boundaries:
North: 50 feet - John Street
South: 50 feet - Property of A.B. Silva  
East: 25 feet - Galle Road
West: 25 feet - Property of C.D. Fernando

Registered at the Land Registry on the 15th day of January 2020.

Registrar of Lands
(Signature and Seal)`

      entities = [
        { type: 'name', value: 'JOHN MALCOLM DOE', confidence: 98, context: 'Property owner' },
        { type: 'address', value: 'No. 123 Main Street, Colombo 07', confidence: 95, context: 'Owner address' },
        { type: 'address', value: 'Galle Road, Colombo 07', confidence: 97, context: 'Property location' },
        { type: 'reference', value: 'SP/2020/1234', confidence: 99, context: 'Survey plan number' },
        { type: 'reference', value: 'TN/567890', confidence: 99, context: 'Title number' },
        { type: 'date', value: '15th January 2020', confidence: 96, context: 'Registration date' },
        { type: 'amount', value: '15.35P', confidence: 94, context: 'Land extent' }
      ]
    } else if (fileName.includes('permit') || fileName.includes('building')) {
      mockText = `BUILDING PERMIT

Permit No: BP/2023/5678
Issued Date: 15th August 2023
Valid Until: 15th August 2025

Applicant: JANE MARY SMITH
Address: No. 456 Oak Avenue, Colombo 05
Phone: +94 77 123 4567
Email: jane.smith@email.com

Project Details:
Construction of Two Story Residential Building
Plot No: 789
Location: Oak Avenue, Colombo 05
Total Floor Area: 2,500 square feet
Estimated Cost: LKR 8,500,000

Approved Plans:
Ground Floor: 1,250 sqft
First Floor: 1,250 sqft
Parking: 2 vehicles
Bedrooms: 4
Bathrooms: 3

This permit is valid for construction work only as per approved plans.

Municipal Council of Colombo
Building Department
(Official Stamp and Signature)`

      entities = [
        { type: 'reference', value: 'BP/2023/5678', confidence: 99, context: 'Permit number' },
        { type: 'date', value: '15th August 2023', confidence: 97, context: 'Issue date' },
        { type: 'date', value: '15th August 2025', confidence: 97, context: 'Expiry date' },
        { type: 'name', value: 'JANE MARY SMITH', confidence: 98, context: 'Applicant name' },
        { type: 'address', value: 'No. 456 Oak Avenue, Colombo 05', confidence: 96, context: 'Applicant address' },
        { type: 'phone', value: '+94 77 123 4567', confidence: 95, context: 'Contact number' },
        { type: 'email', value: 'jane.smith@email.com', confidence: 94, context: 'Email address' },
        { type: 'amount', value: 'LKR 8,500,000', confidence: 93, context: 'Estimated cost' }
      ]
    } else if (fileName.includes('survey')) {
      mockText = `SURVEY PLAN

Plan No: SP/2023/9876
Survey Date: 1st December 2023
Surveyor: ABC Licensed Surveyors (Pvt) Ltd
License No: LS/2019/0123

Property Owner: ROBERT WILLIAM JONES
Location: Park Road, Colombo 03

Total Area: 1,250 square feet (0.029 acres)

Measurements:
North Boundary: 50.00 feet (bordering Park Road)
South Boundary: 50.00 feet (bordering property of K.L. Perera)
East Boundary: 25.00 feet (bordering property of M.N. Dias)  
West Boundary: 25.00 feet (bordering Grove Lane)

All measurements are accurate within ±2 inches.
Survey conducted using GPS and traditional instruments.

Prepared by:
P.Q. Surveyor (Licensed Surveyor)
Date: 5th December 2023

This plan is certified accurate and complete.`

      entities = [
        { type: 'reference', value: 'SP/2023/9876', confidence: 99, context: 'Survey plan number' },
        { type: 'date', value: '1st December 2023', confidence: 97, context: 'Survey date' },
        { type: 'date', value: '5th December 2023', confidence: 96, context: 'Plan preparation date' },
        { type: 'name', value: 'ROBERT WILLIAM JONES', confidence: 98, context: 'Property owner' },
        { type: 'address', value: 'Park Road, Colombo 03', confidence: 97, context: 'Property location' },
        { type: 'reference', value: 'LS/2019/0123', confidence: 95, context: 'Surveyor license' }
      ]
    } else {
      mockText = `DOCUMENT CONTENT

This document contains important information regarding property valuation and related matters. The content has been successfully extracted using advanced OCR technology.

Key details identified in this document include dates, amounts, names, and reference numbers that are relevant for property valuation purposes.

Please review the extracted entities and make any necessary corrections before proceeding with the analysis.`

      entities = [
        { type: 'date', value: new Date().toLocaleDateString(), confidence: 85, context: 'Document processing date' }
      ]
    }

    // Generate mock text blocks
    const paragraphs = mockText.split('\n\n')
    const blocks: OCRBlock[] = paragraphs.map((paragraph, index) => ({
      id: `block_${index}`,
      text: paragraph,
      confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
      boundingBox: {
        x: 50 + (index % 2) * 300,
        y: 100 + Math.floor(index / 2) * 150,
        width: 400,
        height: 100
      },
      type: 'paragraph'
    }))

    const corrections: TextCorrection[] = [
      {
        original: 'Registrd',
        suggested: 'Registered',
        confidence: 95,
        reason: 'Spelling correction'
      },
      {
        original: '15tli',
        suggested: '15th',
        confidence: 92,
        reason: 'OCR character recognition error'
      }
    ]

    return {
      success: true,
      text: mockText,
      confidence: Math.floor(Math.random() * 10) + 90, // 90-100%
      languageDetected: 'English',
      pageCount: 1,
      processingTime: Math.floor(Math.random() * 3000) + 2000, // 2-5 seconds
      wordCount: mockText.split(' ').length,
      characterCount: mockText.length,
      blocks,
      entities,
      corrections
    }
  }

  const formatProcessingTime = (ms: number) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`
  }

  const getEntityTypeIcon = (type: string) => {
    const icons = {
      date: '📅',
      amount: '💰',
      name: '👤',
      address: '📍',
      phone: '📞',
      email: '📧',
      reference: '🔗'
    }
    return icons[type as keyof typeof icons] || '📄'
  }

  const getEntityTypeColor = (type: string) => {
    const colors = {
      date: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      amount: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      name: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      address: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
      phone: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20',
      email: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20',
      reference: 'text-red-600 bg-red-50 dark:bg-red-900/20'
    }
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
  }

  if (!result && !isProcessing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🔤</span>
            OCR Text Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Ready for Text Extraction
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Extract text and structured data from scanned documents and images
            </p>
            <Button onClick={startOCRProcessing} size="lg">
              🚀 Start OCR Processing
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isProcessing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">⚙️</span>
            Processing OCR: {file.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {currentStep}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            <div className="flex items-center space-x-2">
              <div className="animate-spin text-blue-500">⚙️</div>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                AI-powered text recognition in progress...
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) return null

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2">✅</span>
              OCR Processing Complete
            </span>
            <Badge variant={result.confidence >= 95 ? 'success' : result.confidence >= 85 ? 'default' : 'warning'}>
              {result.confidence}% Accuracy
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {result.wordCount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Words Extracted</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {result.entities.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Entities Found</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {result.languageDetected}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Language</div>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {formatProcessingTime(result.processingTime)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Processing Time</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant={showRawText ? "default" : "outline"} 
              size="sm"
              onClick={() => setShowRawText(!showRawText)}
            >
              📝 {showRawText ? 'Hide' : 'Show'} Raw Text
            </Button>
            <Button variant="outline" size="sm">
              💾 Save Results
            </Button>
            <Button variant="outline" size="sm">
              📋 Copy Text
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Raw Text */}
      {showRawText && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">📝</span>
              Extracted Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono">
                {result.text}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Extracted Entities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🎯</span>
            Extracted Entities ({result.entities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.entities.map((entity, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-l-4 cursor-pointer transition-colors ${getEntityTypeColor(entity.type)} ${
                  selectedEntity === `${index}` ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedEntity(selectedEntity === `${index}` ? null : `${index}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-xl">{getEntityTypeIcon(entity.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {entity.type}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {entity.confidence}%
                        </Badge>
                      </div>
                      <div className="text-sm font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">
                        {entity.value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Context: {entity.context}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    ✏️ Edit
                  </Button>
                </div>
                
                {selectedEntity === `${index}` && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Extracted Value
                        </label>
                        <Input value={entity.value} className="font-mono" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Context
                        </label>
                        <Input value={entity.context} />
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">💾 Save Changes</Button>
                        <Button variant="outline" size="sm">❌ Remove Entity</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {result.entities.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <span className="text-4xl mb-2 block">🔍</span>
                <p>No structured entities detected in this document</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Text Corrections */}
      {result.corrections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">✨</span>
              Suggested Corrections ({result.corrections.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.corrections.map((correction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-mono bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                        {correction.original}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm font-mono bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                        {correction.suggested}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {correction.confidence}%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {correction.reason}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">✅ Accept</Button>
                    <Button variant="outline" size="sm">❌ Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}