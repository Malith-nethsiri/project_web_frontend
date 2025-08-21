'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface NeighborhoodData {
  location: {
    name: string
    coordinates: [number, number]
    radius: number // km
  }
  scores: {
    walkability: number
    transit: number
    safety: number
    schools: number
    shopping: number
    dining: number
    nightlife: number
    parks: number
    overall: number
  }
  demographics: {
    population: number
    medianAge: number
    householdIncome: number
    educationLevel: string
    employmentRate: number
    homeOwnership: number
  }
  amenities: NeighborhoodAmenity[]
  marketData: {
    medianPrice: number
    pricePerSqft: number
    priceGrowth1Y: number
    priceGrowth5Y: number
    daysOnMarket: number
    salesVolume: number
    rentPrices: {
      studio: number
      oneBed: number
      twoBed: number
      threeBed: number
    }
  }
  environment: {
    airQualityIndex: number
    noiseLevel: number
    greenSpacePercent: number
    trafficDensity: number
    floodRisk: 'low' | 'moderate' | 'high'
    crimeRate: number
  }
  insights: string[]
  comparisons: NeighborhoodComparison[]
}

interface NeighborhoodAmenity {
  type: 'school' | 'hospital' | 'shopping' | 'restaurant' | 'bank' | 'transport' | 'park' | 'gym'
  name: string
  rating: number
  distance: number
  address: string
}

interface NeighborhoodComparison {
  neighborhood: string
  distance: number
  scoreComparison: {
    category: string
    thisArea: number
    otherArea: number
    difference: number
  }[]
}

interface NeighborhoodAnalyzerProps {
  location?: { name: string; coordinates: [number, number] }
  onAnalysisComplete?: (data: NeighborhoodData) => void
}

export function NeighborhoodAnalyzer({ location, onAnalysisComplete }: NeighborhoodAnalyzerProps) {
  const [analysisData, setAnalysisData] = useState<NeighborhoodData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [selectedTab, setSelectedTab] = useState<'overview' | 'amenities' | 'market' | 'environment' | 'compare'>('overview')

  const startAnalysis = async () => {
    if (!location) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const steps = [
      { name: 'Collecting location data...', duration: 800 },
      { name: 'Analyzing walkability...', duration: 1000 },
      { name: 'Evaluating transit options...', duration: 900 },
      { name: 'Assessing safety metrics...', duration: 700 },
      { name: 'Mapping amenities...', duration: 1200 },
      { name: 'Gathering market data...', duration: 1100 },
      { name: 'Environmental analysis...', duration: 800 },
      { name: 'Generating insights...', duration: 600 },
      { name: 'Creating comparisons...', duration: 500 },
    ]

    let totalProgress = 0
    const stepIncrement = 100 / steps.length

    for (const step of steps) {
      setCurrentStep(step.name)
      await new Promise(resolve => setTimeout(resolve, step.duration))
      totalProgress += stepIncrement
      setAnalysisProgress(Math.min(totalProgress, 100))
    }

    const mockData = generateMockNeighborhoodData(location)
    setAnalysisData(mockData)
    setIsAnalyzing(false)
    onAnalysisComplete?.(mockData)
  }

  const generateMockNeighborhoodData = (loc: { name: string; coordinates: [number, number] }): NeighborhoodData => {
    return {
      location: {
        name: loc.name,
        coordinates: loc.coordinates,
        radius: 1.0
      },
      scores: {
        walkability: Math.floor(Math.random() * 30) + 70,
        transit: Math.floor(Math.random() * 25) + 75,
        safety: Math.floor(Math.random() * 20) + 80,
        schools: Math.floor(Math.random() * 25) + 70,
        shopping: Math.floor(Math.random() * 30) + 65,
        dining: Math.floor(Math.random() * 35) + 60,
        nightlife: Math.floor(Math.random() * 40) + 50,
        parks: Math.floor(Math.random() * 25) + 75,
        overall: Math.floor(Math.random() * 20) + 75,
      },
      demographics: {
        population: Math.floor(Math.random() * 50000) + 25000,
        medianAge: Math.floor(Math.random() * 20) + 35,
        householdIncome: Math.floor(Math.random() * 500000) + 750000,
        educationLevel: 'University Graduate',
        employmentRate: Math.floor(Math.random() * 10) + 85,
        homeOwnership: Math.floor(Math.random() * 30) + 60,
      },
      amenities: [
        {
          type: 'school',
          name: 'Royal College',
          rating: 4.8,
          distance: 0.5,
          address: 'Rajakeeya Mawatha, Colombo 07'
        },
        {
          type: 'hospital',
          name: 'National Hospital',
          rating: 4.2,
          distance: 1.2,
          address: 'Regent Street, Colombo 08'
        },
        {
          type: 'shopping',
          name: 'Liberty Plaza',
          rating: 4.1,
          distance: 0.3,
          address: 'R.A. De Mel Mawatha, Colombo 03'
        },
        {
          type: 'transport',
          name: 'Fort Railway Station',
          rating: 3.8,
          distance: 2.1,
          address: 'Fort, Colombo 01'
        },
        {
          type: 'park',
          name: 'Viharamahadevi Park',
          rating: 4.5,
          distance: 0.8,
          address: 'Ananda Coomaraswamy Mawatha, Colombo 07'
        }
      ],
      marketData: {
        medianPrice: Math.floor(Math.random() * 5000000) + 15000000,
        pricePerSqft: Math.floor(Math.random() * 2000) + 8000,
        priceGrowth1Y: (Math.random() * 15) + 5,
        priceGrowth5Y: (Math.random() * 50) + 30,
        daysOnMarket: Math.floor(Math.random() * 60) + 30,
        salesVolume: Math.floor(Math.random() * 200) + 50,
        rentPrices: {
          studio: Math.floor(Math.random() * 20000) + 35000,
          oneBed: Math.floor(Math.random() * 25000) + 45000,
          twoBed: Math.floor(Math.random() * 35000) + 65000,
          threeBed: Math.floor(Math.random() * 45000) + 85000,
        }
      },
      environment: {
        airQualityIndex: Math.floor(Math.random() * 30) + 70,
        noiseLevel: Math.floor(Math.random() * 20) + 45,
        greenSpacePercent: Math.floor(Math.random() * 25) + 15,
        trafficDensity: Math.floor(Math.random() * 40) + 30,
        floodRisk: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)] as any,
        crimeRate: Math.floor(Math.random() * 30) + 10,
      },
      insights: [
        'This neighborhood offers excellent walkability with most amenities within walking distance',
        'Strong public transportation connectivity with multiple bus routes and train access',
        'High-quality educational institutions make this area popular with families',
        'Property values have shown consistent growth over the past 5 years',
        'Low crime rates and good street lighting contribute to high safety scores',
        'Limited parking availability may be a consideration for car owners',
        'Growing food and dining scene with new restaurants opening regularly'
      ],
      comparisons: [
        {
          neighborhood: 'Colombo 05',
          distance: 2.3,
          scoreComparison: [
            { category: 'Walkability', thisArea: 85, otherArea: 78, difference: 7 },
            { category: 'Transit', thisArea: 82, otherArea: 88, difference: -6 },
            { category: 'Safety', thisArea: 88, otherArea: 85, difference: 3 },
            { category: 'Schools', thisArea: 92, otherArea: 85, difference: 7 },
          ]
        },
        {
          neighborhood: 'Colombo 04',
          distance: 1.8,
          scoreComparison: [
            { category: 'Walkability', thisArea: 85, otherArea: 82, difference: 3 },
            { category: 'Shopping', thisArea: 78, otherArea: 85, difference: -7 },
            { category: 'Dining', thisArea: 75, otherArea: 80, difference: -5 },
            { category: 'Parks', thisArea: 88, otherArea: 75, difference: 13 },
          ]
        }
      ]
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400'
    if (score >= 70) return 'text-blue-600 dark:text-blue-400'
    if (score >= 55) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 85) return 'bg-green-50 dark:bg-green-900/20'
    if (score >= 70) return 'bg-blue-50 dark:bg-blue-900/20'
    if (score >= 55) return 'bg-yellow-50 dark:bg-yellow-900/20'
    return 'bg-red-50 dark:bg-red-900/20'
  }

  const getAmenityIcon = (type: string) => {
    const icons = {
      school: '🏫',
      hospital: '🏥',
      shopping: '🛒',
      restaurant: '🍽️',
      bank: '🏦',
      transport: '🚇',
      park: '🌳',
      gym: '💪'
    }
    return icons[type as keyof typeof icons] || '📍'
  }

  const getRiskColor = (risk: string) => {
    const colors = {
      low: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      moderate: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
      high: 'text-red-600 bg-red-50 dark:bg-red-900/20'
    }
    return colors[risk as keyof typeof colors] || colors.low
  }

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`
  }

  if (!location && !analysisData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🏘️</span>
            Neighborhood Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏘️</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Select a Location
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a location on the map to get detailed neighborhood insights
            </p>
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
            <span className="mr-2">🔍</span>
            Analyzing {location?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {currentStep}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {Math.round(analysisProgress)}%
              </span>
            </div>
            
            <Progress value={analysisProgress} className="h-3" />
            
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Gathering comprehensive neighborhood data and insights...
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysisData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🏘️</span>
            Neighborhood Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Ready for Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Analyze neighborhood quality, amenities, and market data for {location?.name}
            </p>
            <Button onClick={startAnalysis} size="lg">
              🔍 Start Neighborhood Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2">🏘️</span>
              {analysisData.location.name} Analysis
            </span>
            <Badge variant="success" className="text-lg px-3 py-1">
              {analysisData.scores.overall}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Overall Scores Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(analysisData.scores).filter(([key]) => key !== 'overall').map(([key, score]) => (
              <div key={key} className={`p-3 rounded-lg ${getScoreBackground(score)}`}>
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {key === 'transit' ? 'Transit' : key}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { key: 'overview', label: 'Overview', icon: '📊' },
              { key: 'amenities', label: 'Amenities', icon: '🏪' },
              { key: 'market', label: 'Market', icon: '💰' },
              { key: 'environment', label: 'Environment', icon: '🌱' },
              { key: 'compare', label: 'Compare', icon: '⚖️' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedTab === tab.key
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
      {selectedTab === 'overview' && (
        <Card>
          <CardHeader>
            <CardTitle>Neighborhood Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Demographics */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Demographics</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {analysisData.demographics.population.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Population</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {analysisData.demographics.medianAge}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Median Age</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(analysisData.demographics.householdIncome)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Median Income</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {analysisData.demographics.employmentRate}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Employment Rate</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {analysisData.demographics.homeOwnership}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Home Ownership</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {analysisData.demographics.educationLevel}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Education Level</div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Key Insights</h4>
                <ul className="space-y-2">
                  {analysisData.insights.map((insight, index) => (
                    <li key={index} className="flex items-start bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <span className="text-green-500 mr-3 mt-1 text-sm">💡</span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'amenities' && (
        <Card>
          <CardHeader>
            <CardTitle>Nearby Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getAmenityIcon(amenity.type)}</span>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-gray-100">{amenity.name}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{amenity.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{amenity.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {amenity.distance} km away
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'market' && (
        <Card>
          <CardHeader>
            <CardTitle>Real Estate Market Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Market Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(analysisData.marketData.medianPrice)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Median Price</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(analysisData.marketData.pricePerSqft)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Per Sqft</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    +{analysisData.marketData.priceGrowth1Y.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">1Y Growth</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    {analysisData.marketData.daysOnMarket}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Days on Market</div>
                </div>
              </div>

              {/* Rental Prices */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Average Rental Prices</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(analysisData.marketData.rentPrices).map(([type, price]) => (
                    <div key={type} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(price)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {type.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'environment' && (
        <Card>
          <CardHeader>
            <CardTitle>Environmental Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Environmental Scores */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {analysisData.environment.airQualityIndex}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Air Quality Index</div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {analysisData.environment.noiseLevel}dB
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Noise Level</div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {analysisData.environment.greenSpacePercent}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Green Space</div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {analysisData.environment.trafficDensity}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Traffic Density</div>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {analysisData.environment.crimeRate}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Crime Rate</div>
                </div>
                <div className={`p-4 rounded-lg ${getRiskColor(analysisData.environment.floodRisk)}`}>
                  <div className="text-lg font-bold capitalize">
                    {analysisData.environment.floodRisk}
                  </div>
                  <div className="text-sm">Flood Risk</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'compare' && (
        <Card>
          <CardHeader>
            <CardTitle>Neighborhood Comparisons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analysisData.comparisons.map((comparison, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      vs {comparison.neighborhood}
                    </h4>
                    <Badge variant="secondary">
                      {comparison.distance} km away
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {comparison.scoreComparison.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.category}:
                        </span>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{item.thisArea}</span>
                            <span className="text-xs text-gray-500">vs</span>
                            <span className="text-sm font-medium">{item.otherArea}</span>
                          </div>
                          <Badge
                            variant={item.difference > 0 ? 'success' : item.difference < 0 ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {item.difference > 0 ? '+' : ''}{item.difference}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-3">
            <Button size="sm">📊 Generate Neighborhood Report</Button>
            <Button variant="outline" size="sm">💾 Save Analysis</Button>
            <Button variant="outline" size="sm">📤 Share Data</Button>
            <Button variant="outline" size="sm" onClick={startAnalysis}>
              🔄 Refresh Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}