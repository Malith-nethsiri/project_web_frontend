'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface AIAnalysis {
  documentType: string
  confidence: number
  extractedData: Record<string, any>
  insights: string[]
  recommendations: string[]
  riskFactors: string[]
  completenessScore: number
  qualityScore: number
  processingSteps: {
    step: string
    status: 'completed' | 'processing' | 'pending'
    duration?: number
  }[]
}

interface AIAnalysisPanelProps {
  fileName: string
  fileType: string
  fileSize: number
  analysis: AIAnalysis | null
  isProcessing: boolean
}

export function AIAnalysisPanel({ 
  fileName, 
  fileType, 
  fileSize, 
  analysis, 
  isProcessing 
}: AIAnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'insights' | 'raw'>('overview')

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20'
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20'
    return 'bg-red-50 dark:bg-red-900/20'
  }

  if (isProcessing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🤖</span>
            AI Processing: {fileName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                File: {formatFileSize(fileSize)} • {fileType}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Processing...
              </span>
            </div>

            {analysis?.processingSteps && (
              <div className="space-y-2">
                {analysis.processingSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'processing' ? 'bg-blue-500 text-white animate-pulse' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? '✓' : 
                       step.status === 'processing' ? '⚙' : 
                       index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {step.step}
                      </div>
                      {step.duration && step.status === 'completed' && (
                        <div className="text-xs text-gray-500">
                          Completed in {step.duration}ms
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ready for AI Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Upload a document to see AI-powered insights and data extraction
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <span className="mr-2">🤖</span>
            AI Analysis: {fileName}
          </span>
          <Badge variant={analysis.confidence >= 90 ? 'success' : analysis.confidence >= 70 ? 'default' : 'warning'}>
            {analysis.confidence}% Confidence
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* File Info */}
        <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">
            {formatFileSize(fileSize)} • {fileType}
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {analysis.documentType}
          </span>
        </div>

        {/* Quality Scores */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${getScoreBackground(analysis.completenessScore)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Completeness
              </span>
              <span className={`text-lg font-bold ${getScoreColor(analysis.completenessScore)}`}>
                {analysis.completenessScore}%
              </span>
            </div>
            <Progress value={analysis.completenessScore} className="h-2" />
          </div>
          
          <div className={`p-4 rounded-lg ${getScoreBackground(analysis.qualityScore)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quality
              </span>
              <span className={`text-lg font-bold ${getScoreColor(analysis.qualityScore)}`}>
                {analysis.qualityScore}%
              </span>
            </div>
            <Progress value={analysis.qualityScore} className="h-2" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'data', label: 'Extracted Data', icon: '📋' },
            { key: 'insights', label: 'AI Insights', icon: '💡' },
            { key: 'raw', label: 'Raw Text', icon: '📝' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Risk Factors */}
              {analysis.riskFactors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Risk Factors Identified
                  </h4>
                  <ul className="space-y-1">
                    {analysis.riskFactors.map((risk, index) => (
                      <li key={index} className="text-sm text-red-700 dark:text-red-300 flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Processing Summary */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Processing Summary
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">Document Type:</span>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {analysis.documentType}
                    </div>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">Processing Time:</span>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {analysis.processingSteps?.reduce((total, step) => total + (step.duration || 0), 0) || 0}ms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Extracted Information
              </h4>
              {Object.entries(analysis.extractedData).map(([key, value]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 ml-4 text-right">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <span className="mr-2">💡</span>
                  AI Insights
                </h4>
                <ul className="space-y-2">
                  {analysis.insights.map((insight, index) => (
                    <li key={index} className="flex items-start bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <span className="text-green-500 mr-3 mt-1 text-sm">✓</span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <span className="text-blue-500 mr-3 mt-1 text-sm">→</span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'raw' && (
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                Raw Extracted Text
              </h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono">
                  {analysis.extractedData.rawText || 'No raw text available'}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm">
            📊 Add to Report
          </Button>
          <Button variant="outline" size="sm">
            💾 Save Analysis
          </Button>
          <Button variant="outline" size="sm">
            🔗 Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}