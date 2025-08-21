'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface Property {
  id: string
  address: string
  coordinates: [number, number] // [lat, lng]
  type: 'residential' | 'commercial' | 'land'
  status: 'active' | 'sold' | 'pending'
  price: number
  area: number
  features: string[]
  distance?: number
  walkScore?: number
  transitScore?: number
}

interface POI {
  id: string
  name: string
  type: 'school' | 'hospital' | 'shopping' | 'transport' | 'bank' | 'restaurant' | 'park'
  coordinates: [number, number]
  distance: number
  rating?: number
  description: string
}

interface LocationAnalysis {
  walkability: number
  transitAccess: number
  schoolRating: number
  crimeIndex: number
  noiseLevel: number
  airQuality: number
  demographics: {
    averageAge: number
    householdIncome: number
    educationLevel: string
    populationDensity: number
  }
  marketTrends: {
    priceGrowth12M: number
    averageDaysOnMarket: number
    inventoryLevel: string
    demandIndex: number
  }
}

const mockProperties: Property[] = [
  {
    id: '1',
    address: 'No. 123 Galle Road, Colombo 03',
    coordinates: [6.9271, 79.8612],
    type: 'residential',
    status: 'active',
    price: 18500000,
    area: 1250,
    features: ['3 bed', '2 bath', 'garage', 'garden'],
    walkScore: 85,
    transitScore: 78
  },
  {
    id: '2', 
    address: 'No. 456 Bauddhaloka Mawatha, Colombo 04',
    coordinates: [6.8890, 79.8570],
    type: 'residential',
    status: 'sold',
    price: 22000000,
    area: 1450,
    features: ['4 bed', '3 bath', 'pool', 'security'],
    walkScore: 92,
    transitScore: 88
  },
  {
    id: '3',
    address: 'No. 789 R.A. De Mel Mawatha, Colombo 05',
    coordinates: [6.8950, 79.8500],
    type: 'commercial',
    status: 'active',
    price: 35000000,
    area: 2500,
    features: ['office space', 'parking', 'central AC'],
    walkScore: 95,
    transitScore: 85
  }
]

const mockPOIs: POI[] = [
  {
    id: '1',
    name: 'Royal College',
    type: 'school',
    coordinates: [6.9100, 79.8600],
    distance: 0.8,
    rating: 4.8,
    description: 'Premier educational institution'
  },
  {
    id: '2',
    name: 'National Hospital',
    type: 'hospital',
    coordinates: [6.9200, 79.8650],
    distance: 1.2,
    rating: 4.5,
    description: 'Main government hospital'
  },
  {
    id: '3',
    name: 'Liberty Plaza',
    type: 'shopping',
    coordinates: [6.9180, 79.8580],
    distance: 0.5,
    rating: 4.2,
    description: 'Popular shopping complex'
  },
  {
    id: '4',
    name: 'Fort Railway Station',
    type: 'transport',
    coordinates: [6.9344, 79.8428],
    distance: 2.1,
    rating: 3.8,
    description: 'Main railway terminus'
  },
  {
    id: '5',
    name: 'Viharamahadevi Park',
    type: 'park',
    coordinates: [6.9120, 79.8610],
    distance: 0.7,
    rating: 4.6,
    description: 'Large public park and recreation area'
  }
]

export default function MapsPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.9271, 79.8612])
  const [mapZoom, setMapZoom] = useState(13)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'residential' | 'commercial' | 'land'>('all')
  const [showPOIs, setShowPOIs] = useState(true)
  const [locationAnalysis, setLocationAnalysis] = useState<LocationAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  const filteredProperties = mockProperties.filter(property => {
    const matchesType = filterType === 'all' || property.type === filterType
    const matchesSearch = property.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const handlePropertyClick = async (property: Property) => {
    setSelectedProperty(property)
    setMapCenter(property.coordinates)
    setMapZoom(16)
    
    // Start location analysis
    setIsAnalyzing(true)
    await analyzeLocation(property.coordinates)
  }

  const analyzeLocation = async (coordinates: [number, number]) => {
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockAnalysis: LocationAnalysis = {
      walkability: Math.floor(Math.random() * 30) + 70,
      transitAccess: Math.floor(Math.random() * 25) + 75,
      schoolRating: Math.floor(Math.random() * 20) + 80,
      crimeIndex: Math.floor(Math.random() * 40) + 10, // Lower is better
      noiseLevel: Math.floor(Math.random() * 30) + 30, // dB
      airQuality: Math.floor(Math.random() * 25) + 75, // Higher is better
      demographics: {
        averageAge: Math.floor(Math.random() * 20) + 35,
        householdIncome: Math.floor(Math.random() * 500000) + 750000,
        educationLevel: 'University Graduate',
        populationDensity: Math.floor(Math.random() * 5000) + 8000
      },
      marketTrends: {
        priceGrowth12M: (Math.random() * 20) + 5,
        averageDaysOnMarket: Math.floor(Math.random() * 60) + 30,
        inventoryLevel: 'Low',
        demandIndex: Math.floor(Math.random() * 30) + 70
      }
    }
    
    setLocationAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  const getPropertyTypeIcon = (type: string) => {
    const icons = {
      residential: '🏠',
      commercial: '🏢',
      land: '🌿'
    }
    return icons[type as keyof typeof icons] || '📍'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      sold: 'text-gray-600 bg-gray-50 dark:bg-gray-900/20',
      pending: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
    }
    return colors[status as keyof typeof colors] || colors.active
  }

  const getPOIIcon = (type: string) => {
    const icons = {
      school: '🏫',
      hospital: '🏥',
      shopping: '🛒',
      transport: '🚇',
      bank: '🏦',
      restaurant: '🍽️',
      park: '🌳'
    }
    return icons[type as keyof typeof icons] || '📍'
  }

  const getScoreColor = (score: number, reverse = false) => {
    if (reverse) {
      // For metrics where lower is better (crime, noise)
      if (score <= 30) return 'text-green-600'
      if (score <= 60) return 'text-yellow-600'
      return 'text-red-600'
    } else {
      // For metrics where higher is better
      if (score >= 80) return 'text-green-600'
      if (score >= 60) return 'text-yellow-600'
      return 'text-red-600'
    }
  }

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Maps & Location Intelligence
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Explore properties with advanced location analysis and neighborhood insights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Controls & Search */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search & Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">🔍</span>
                Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
                  <Input
                    type="text"
                    placeholder="Search by address or area..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showPOIs}
                    onChange={(e) => setShowPOIs(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show Points of Interest</span>
                </label>
                <Badge variant="secondary">
                  {filteredProperties.length} properties found
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Map */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <span className="mr-2">🗺️</span>
                  Interactive Map
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">📍 My Location</Button>
                  <Button variant="outline" size="sm">🔄 Reset View</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={mapRef}
                className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg relative overflow-hidden"
              >
                {/* Mock Map Interface */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🗺️</div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Interactive Map View
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Center: {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)} • Zoom: {mapZoom}x
                    </p>
                  </div>
                </div>

                {/* Property Markers */}
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                      selectedProperty?.id === property.id 
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200 z-10' 
                        : 'bg-white text-gray-700 shadow-lg border-2 border-gray-300'
                    }`}
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${30 + Math.floor(index / 4) * 25}%`
                    }}
                    onClick={() => handlePropertyClick(property)}
                    title={property.address}
                  >
                    <span className="text-sm">{getPropertyTypeIcon(property.type)}</span>
                  </div>
                ))}

                {/* POI Markers */}
                {showPOIs && mockPOIs.map((poi, index) => (
                  <div
                    key={poi.id}
                    className="absolute w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110"
                    style={{
                      left: `${60 + (index % 3) * 15}%`,
                      top: `${20 + Math.floor(index / 3) * 30}%`
                    }}
                    title={poi.name}
                  >
                    <span className="text-xs">{getPOIIcon(poi.type)}</span>
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-8 h-8 p-0"
                    onClick={() => setMapZoom(Math.min(mapZoom + 1, 18))}
                  >
                    +
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-8 h-8 p-0"
                    onClick={() => setMapZoom(Math.max(mapZoom - 1, 8))}
                  >
                    -
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 bg-blue-600 rounded-full"></span>
                      <span className="text-gray-600 dark:text-gray-400">Selected Property</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></span>
                      <span className="text-gray-600 dark:text-gray-400">Available Properties</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
                      <span className="text-gray-600 dark:text-gray-400">Points of Interest</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property List & Details */}
        <div className="space-y-6">
          {/* Property List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">📋</span>
                Properties ({filteredProperties.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProperty?.id === property.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getPropertyTypeIcon(property.type)}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(property.status)}`}>
                          {property.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(property.price)}
                        </div>
                        <div className="text-xs text-gray-500">{property.area} sqft</div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 text-sm">
                      {property.address}
                    </h4>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {property.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{property.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {property.walkScore && (
                      <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                        <div>Walk: {property.walkScore}/100</div>
                        {property.transitScore && <div>Transit: {property.transitScore}/100</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Points of Interest */}
          {showPOIs && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <span className="mr-2">📍</span>
                  Nearby Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {mockPOIs.map((poi) => (
                    <div key={poi.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                      <span className="text-lg">{getPOIIcon(poi.type)}</span>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                          {poi.name}
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {poi.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                          {poi.distance}km
                        </div>
                        {poi.rating && (
                          <div className="text-xs text-yellow-600">
                            ⭐ {poi.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Location Analysis */}
      {selectedProperty && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center">
                <span className="mr-2">📊</span>
                Location Analysis: {selectedProperty.address}
              </span>
              {isAnalyzing && <Badge variant="secondary">Analyzing...</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin text-4xl mb-4">🔄</div>
                <p className="text-gray-600 dark:text-gray-400">
                  Analyzing location data and neighborhood metrics...
                </p>
              </div>
            ) : locationAnalysis ? (
              <div className="space-y-6">
                {/* Livability Scores */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Livability Scores</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(locationAnalysis.walkability)}`}>
                        {locationAnalysis.walkability}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Walkability</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(locationAnalysis.transitAccess)}`}>
                        {locationAnalysis.transitAccess}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Transit Access</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(locationAnalysis.schoolRating)}`}>
                        {locationAnalysis.schoolRating}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">School Rating</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(locationAnalysis.crimeIndex, true)}`}>
                        {locationAnalysis.crimeIndex}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Crime Index</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(locationAnalysis.noiseLevel, true)}`}>
                        {locationAnalysis.noiseLevel}dB
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Noise Level</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(locationAnalysis.airQuality)}`}>
                        {locationAnalysis.airQuality}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Air Quality</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Demographics */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Demographics</h4>
                    <div className="space-y-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Average Age:</span>
                        <span className="font-medium">{locationAnalysis.demographics.averageAge} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Household Income:</span>
                        <span className="font-medium">{formatCurrency(locationAnalysis.demographics.householdIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Education Level:</span>
                        <span className="font-medium">{locationAnalysis.demographics.educationLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Population Density:</span>
                        <span className="font-medium">{locationAnalysis.demographics.populationDensity}/km²</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Trends */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Market Trends</h4>
                    <div className="space-y-3 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Price Growth (12M):</span>
                        <span className="font-medium text-green-600">+{locationAnalysis.marketTrends.priceGrowth12M.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Days on Market:</span>
                        <span className="font-medium">{locationAnalysis.marketTrends.averageDaysOnMarket} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Inventory Level:</span>
                        <span className="font-medium">{locationAnalysis.marketTrends.inventoryLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Demand Index:</span>
                        <span className="font-medium">{locationAnalysis.marketTrends.demandIndex}/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button size="sm">📊 Generate Location Report</Button>
                  <Button variant="outline" size="sm">💾 Save Analysis</Button>
                  <Button variant="outline" size="sm">📤 Share Location Data</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📍</div>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a property to view detailed location analysis
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Map Features Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400 text-lg">🗺️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Advanced Location Intelligence
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p className="mb-2">Our mapping system provides:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Real-time property visualization with detailed markers</li>
                <li>Comprehensive neighborhood analysis and scoring</li>
                <li>Points of interest mapping (schools, hospitals, shopping)</li>
                <li>Walkability and transit accessibility scores</li>
                <li>Market trend analysis and demographic insights</li>
                <li>Environmental factors (noise, air quality, safety)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}