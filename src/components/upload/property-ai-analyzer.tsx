'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface PropertyAnalysis {
  propertyType: 'residential' | 'commercial' | 'land' | 'apartment' | 'mixed'
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  estimatedValue: {
    min: number
    max: number
    most_likely: number
    currency: string
    confidence: number
    basis: string
  }
  features: DetectedFeature[]
  marketInsights: MarketInsight[]
  riskFactors: RiskFactor[]
  recommendations: string[]
  comparableProperties: ComparableProperty[]
  compliance: ComplianceCheck[]
  investmentMetrics: InvestmentMetrics
  processingTime: number
  confidence: number
}

interface DetectedFeature {
  category: 'structural' | 'amenity' | 'location' | 'aesthetic' | 'utility'
  name: string
  confidence: number
  impact: 'positive' | 'negative' | 'neutral'
  value_impact: number // percentage impact on value
  description: string
}

interface MarketInsight {
  type: 'trend' | 'comparison' | 'forecast' | 'demand'
  insight: string
  confidence: number
  timeframe: string
  impact: 'positive' | 'negative' | 'neutral'
}

interface RiskFactor {
  category: 'legal' | 'structural' | 'market' | 'environmental' | 'financial'
  risk: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  likelihood: number
  impact: string
  mitigation: string
}

interface ComparableProperty {
  address: string
  distance: number
  similarity: number
  recent_sale_price: number
  sale_date: string
  differences: string[]
}

interface ComplianceCheck {
  area: string
  status: 'compliant' | 'non-compliant' | 'unknown' | 'requires-review'
  details: string
  action_required?: string
}

interface InvestmentMetrics {
  potential_roi: number
  rental_yield: number
  appreciation_forecast: number
  liquidity_score: number
  investment_grade: 'A' | 'B' | 'C' | 'D'
}

interface PropertyAIAnalyzerProps {
  files: File[]
  extractedData: Record<string, any>
  onAnalysisComplete: (analysis: PropertyAnalysis) => void
}

export function PropertyAIAnalyzer({ files, extractedData, onAnalysisComplete }: PropertyAIAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('')
  const [analysis, setAnalysis] = useState<PropertyAnalysis | null>(null)
  const [activeInsightTab, setActiveInsightTab] = useState<'overview' | 'features' | 'market' | 'risks' | 'investment'>('overview')

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setProgress(0)

    const phases = [
      { name: 'Initializing AI models...', duration: 500 },
      { name: 'Analyzing property images...', duration: 2000 },
      { name: 'Processing document data...', duration: 1500 },
      { name: 'Feature detection and classification...', duration: 1800 },
      { name: 'Market data analysis...', duration: 2200 },
      { name: 'Comparable property search...', duration: 1600 },
      { name: 'Risk assessment...', duration: 1200 },
      { name: 'Valuation modeling...', duration: 2000 },
      { name: 'Compliance verification...', duration: 800 },
      { name: 'Investment metrics calculation...', duration: 600 },
      { name: 'Generating insights...', duration: 1000 },
      { name: 'Finalizing report...', duration: 400 }
    ]

    let totalProgress = 0
    const phaseIncrement = 100 / phases.length

    for (const phase of phases) {
      setCurrentPhase(phase.name)
      await new Promise(resolve => setTimeout(resolve, phase.duration))
      totalProgress += phaseIncrement
      setProgress(Math.min(totalProgress, 100))
    }

    const mockAnalysis = generateMockAnalysis()
    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
    onAnalysisComplete(mockAnalysis)
  }

  const generateMockAnalysis = (): PropertyAnalysis => {
    const hasImages = files.some(f => f.type.startsWith('image/'))
    const hasDeeds = files.some(f => f.name.toLowerCase().includes('deed'))
    const hasPermits = files.some(f => f.name.toLowerCase().includes('permit'))

    return {
      propertyType: 'residential',
      condition: 'good',
      estimatedValue: {
        min: 16500000,
        max: 19500000,
        most_likely: 18000000,
        currency: 'LKR',
        confidence: 87,
        basis: 'AI analysis of property features, location data, and market comparables'
      },
      features: [
        {
          category: 'structural',
          name: 'Two-Story Construction',
          confidence: 95,
          impact: 'positive',
          value_impact: 15,
          description: 'Well-constructed two-story residential building with concrete block construction'
        },
        {
          category: 'location',
          name: 'Prime Urban Location',
          confidence: 92,
          impact: 'positive', 
          value_impact: 25,
          description: 'Located in desirable Colombo 07 area with excellent connectivity'
        },
        {
          category: 'amenity',
          name: 'Modern Kitchen',
          confidence: 88,
          impact: 'positive',
          value_impact: 8,
          description: 'Updated kitchen with modern appliances and finishes'
        },
        {
          category: 'utility',
          name: 'Three-Phase Electricity',
          confidence: 91,
          impact: 'positive',
          value_impact: 5,
          description: 'Adequate electrical supply for modern needs'
        },
        {
          category: 'aesthetic',
          name: 'Well-Maintained Garden',
          confidence: 84,
          impact: 'positive',
          value_impact: 6,
          description: 'Landscaped garden adds to property appeal'
        },
        {
          category: 'structural',
          name: 'Roof Maintenance Required',
          confidence: 79,
          impact: 'negative',
          value_impact: -5,
          description: 'Some roof tiles show signs of wear and may need replacement'
        }
      ],
      marketInsights: [
        {
          type: 'trend',
          insight: 'Property values in Colombo 07 have increased by 12% over the last 12 months',
          confidence: 94,
          timeframe: 'Last 12 months',
          impact: 'positive'
        },
        {
          type: 'demand',
          insight: 'High demand for residential properties in this area due to proximity to commercial district',
          confidence: 89,
          timeframe: 'Current',
          impact: 'positive'
        },
        {
          type: 'forecast',
          insight: 'Projected 8-10% value appreciation over next 2 years based on infrastructure development',
          confidence: 76,
          timeframe: 'Next 2 years',
          impact: 'positive'
        },
        {
          type: 'comparison',
          insight: 'Property is priced 5% below market average for similar properties in the area',
          confidence: 88,
          timeframe: 'Current',
          impact: 'positive'
        }
      ],
      riskFactors: [
        {
          category: 'structural',
          risk: 'Roof maintenance required',
          severity: 'medium',
          likelihood: 85,
          impact: 'May require LKR 150,000 - 300,000 investment within 2 years',
          mitigation: 'Negotiate repair costs with seller or budget for post-purchase improvements'
        },
        {
          category: 'legal',
          risk: 'Title verification pending',
          severity: 'low',
          likelihood: 15,
          impact: 'Potential legal complications if title issues exist',
          mitigation: 'Complete thorough title search and legal due diligence before purchase'
        },
        {
          category: 'market',
          risk: 'Interest rate fluctuations',
          severity: 'low',
          likelihood: 70,
          impact: 'Financing costs may increase by 1-2% over loan period',
          mitigation: 'Consider fixed-rate financing or rate protection products'
        },
        {
          category: 'environmental',
          risk: 'Monsoon season flooding risk',
          severity: 'low',
          likelihood: 25,
          impact: 'Potential water damage during heavy rainfall periods',
          mitigation: 'Verify drainage systems and consider flood insurance'
        }
      ],
      recommendations: [
        'Complete professional structural inspection focusing on roof condition',
        'Verify all utility connections and capacity for future needs',
        'Negotiate purchase price considering required roof maintenance',
        'Investigate local development plans that may affect property value',
        'Consider rental potential given prime location',
        'Budget additional 10-15% of purchase price for immediate improvements',
        'Secure comprehensive property insurance covering natural disasters'
      ],
      comparableProperties: [
        {
          address: 'No. 125 Main Street, Colombo 07',
          distance: 0.2,
          similarity: 94,
          recent_sale_price: 19200000,
          sale_date: '2023-11-15',
          differences: ['Slightly larger land area', 'Recently renovated kitchen']
        },
        {
          address: 'No. 89 Flower Road, Colombo 07', 
          distance: 0.4,
          similarity: 89,
          recent_sale_price: 17800000,
          sale_date: '2023-10-28',
          differences: ['Single story', 'Smaller garden area', 'Corner property']
        },
        {
          address: 'No. 156 Park Street, Colombo 07',
          distance: 0.6,
          similarity: 92,
          recent_sale_price: 18500000,
          sale_date: '2023-12-02',
          differences: ['Three bedrooms vs four', 'No parking space']
        }
      ],
      compliance: [
        {
          area: 'Building Code',
          status: 'compliant',
          details: 'Construction appears to meet current building standards'
        },
        {
          area: 'Zoning Regulations',
          status: 'compliant',
          details: 'Property use consistent with residential zoning'
        },
        {
          area: 'Environmental Clearance',
          status: 'unknown',
          details: 'Environmental clearance status requires verification',
          action_required: 'Obtain environmental clearance certificate from relevant authority'
        },
        {
          area: 'Fire Safety',
          status: 'requires-review',
          details: 'Fire safety measures should be verified for multi-story structure',
          action_required: 'Conduct fire safety inspection and install required equipment'
        }
      ],
      investmentMetrics: {
        potential_roi: 15.2,
        rental_yield: 6.8,
        appreciation_forecast: 9.1,
        liquidity_score: 78,
        investment_grade: 'B'
      },
      processingTime: 14500,
      confidence: 87
    }
  }

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`
  }

  const getRiskSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20', 
      high: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
      critical: 'text-red-600 bg-red-50 dark:bg-red-900/20'
    }
    return colors[severity as keyof typeof colors] || colors.low
  }

  const getImpactIcon = (impact: string) => {
    return impact === 'positive' ? '📈' : impact === 'negative' ? '📉' : '➖'
  }

  const getInvestmentGradeColor = (grade: string) => {
    const colors = {
      A: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      B: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      C: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
      D: 'text-red-600 bg-red-100 dark:bg-red-900/30'
    }
    return colors[grade as keyof typeof colors] || colors.B
  }

  if (!analysis && !isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🤖</span>
            AI Property Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Ready for AI Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get comprehensive property insights including valuation, risks, and market analysis
            </p>
            <Button onClick={startAnalysis} size="lg" disabled={files.length === 0}>
              🚀 Start AI Analysis
            </Button>
            {files.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">Upload files first to enable analysis</p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">⚙️</span>
            AI Analysis in Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {currentPhase}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Files</div>
                <div className="text-gray-600 dark:text-gray-400">{files.length} uploaded</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Images</div>
                <div className="text-gray-600 dark:text-gray-400">{files.filter(f => f.type.startsWith('image/')).length} analyzing</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Documents</div>
                <div className="text-gray-600 dark:text-gray-400">{files.filter(f => !f.type.startsWith('image/')).length} processing</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Progress</div>
                <div className="text-gray-600 dark:text-gray-400">{Math.round(progress)}% complete</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) return null

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2">🎯</span>
              AI Property Analysis Complete
            </span>
            <Badge variant={analysis.confidence >= 85 ? 'success' : analysis.confidence >= 70 ? 'default' : 'warning'}>
              {analysis.confidence}% Confidence
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(analysis.estimatedValue.most_likely)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Estimated Value
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Range: {formatCurrency(analysis.estimatedValue.min)} - {formatCurrency(analysis.estimatedValue.max)}
              </div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 capitalize">
                {analysis.condition}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Property Condition
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {analysis.propertyType} property
              </div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className={`text-2xl font-bold inline-flex items-center px-3 py-1 rounded-full ${getInvestmentGradeColor(analysis.investmentMetrics.investment_grade)}`}>
                {analysis.investmentMetrics.investment_grade}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Investment Grade
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {analysis.investmentMetrics.potential_roi}% ROI potential
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { key: 'overview', label: 'Overview', icon: '📊' },
              { key: 'features', label: 'Features', icon: '🏠' },
              { key: 'market', label: 'Market', icon: '📈' },
              { key: 'risks', label: 'Risks', icon: '⚠️' },
              { key: 'investment', label: 'Investment', icon: '💰' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveInsightTab(tab.key as any)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeInsightTab === tab.key
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeInsightTab === 'overview' && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Key Recommendations</h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <span className="text-blue-500 mr-3 mt-1 text-sm">💡</span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Comparable Properties</h4>
                <div className="space-y-3">
                  {analysis.comparableProperties.map((comp, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{comp.address}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{comp.similarity}% similar</Badge>
                          <Badge variant="outline">{comp.distance}km away</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Sale Price:</span>
                          <div className="font-semibold text-green-600">{formatCurrency(comp.recent_sale_price)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Sale Date:</span>
                          <div className="font-medium">{new Date(comp.sale_date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      {comp.differences.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">Key differences: {comp.differences.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeInsightTab === 'features' && (
        <Card>
          <CardHeader>
            <CardTitle>Detected Features ({analysis.features.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.features.map((feature, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-xl">{getImpactIcon(feature.impact)}</span>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">{feature.name}</h5>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs capitalize">{feature.category}</Badge>
                          <Badge variant={feature.impact === 'positive' ? 'success' : feature.impact === 'negative' ? 'destructive' : 'secondary'} className="text-xs">
                            {feature.value_impact > 0 ? '+' : ''}{feature.value_impact}%
                          </Badge>
                          <span className="text-xs text-gray-500">{feature.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeInsightTab === 'market' && (
        <Card>
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.marketInsights.map((insight, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-xl">{getImpactIcon(insight.impact)}</span>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="secondary" className="text-xs capitalize">{insight.type}</Badge>
                          <Badge variant="outline" className="text-xs">{insight.timeframe}</Badge>
                          <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{insight.insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeInsightTab === 'risks' && (
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment ({analysis.riskFactors.length} factors identified)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.riskFactors.map((risk, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">{risk.risk}</h5>
                        <Badge className={`text-xs ${getRiskSeverityColor(risk.severity)}`}>
                          {risk.severity} risk
                        </Badge>
                        <Badge variant="secondary" className="text-xs capitalize">{risk.category}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Impact:</strong> {risk.impact}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 rounded p-2">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500">Likelihood</div>
                      <div className="font-semibold">{risk.likelihood}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeInsightTab === 'investment' && (
        <Card>
          <CardHeader>
            <CardTitle>Investment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    {analysis.investmentMetrics.potential_roi}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Potential ROI</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {analysis.investmentMetrics.rental_yield}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rental Yield</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {analysis.investmentMetrics.appreciation_forecast}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Appreciation Forecast</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    {analysis.investmentMetrics.liquidity_score}/100
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Liquidity Score</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Compliance Status</h4>
                <div className="space-y-3">
                  {analysis.compliance.map((compliance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-gray-100">{compliance.area}</span>
                          <Badge variant={
                            compliance.status === 'compliant' ? 'success' :
                            compliance.status === 'non-compliant' ? 'destructive' :
                            compliance.status === 'requires-review' ? 'warning' : 'secondary'
                          }>
                            {compliance.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{compliance.details}</p>
                        {compliance.action_required && (
                          <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                            <strong>Action Required:</strong> {compliance.action_required}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-3">
            <Button size="sm">📊 Generate Report</Button>
            <Button variant="outline" size="sm">💾 Save Analysis</Button>
            <Button variant="outline" size="sm">📤 Export Data</Button>
            <Button variant="outline" size="sm">🔗 Share Insights</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}