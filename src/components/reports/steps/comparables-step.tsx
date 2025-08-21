'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useReportWizardStore } from '@/stores/report-wizard'

const mockComparables = [
  {
    id: '1',
    address: '123 Main Street, Colombo 07',
    type: 'residential',
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    sale_price: 18500000,
    sale_date: '2024-11-15',
    distance: 0.3,
    similarity_score: 92,
    adjustments: {
      location: 5,
      condition: -8,
      size: 3,
      features: 2,
    },
    adjusted_value: 18870000,
  },
  {
    id: '2',
    address: '456 Oak Avenue, Colombo 07',
    type: 'residential',
    bedrooms: 4,
    bathrooms: 3,
    area: 1450,
    sale_price: 22000000,
    sale_date: '2024-10-28',
    distance: 0.5,
    similarity_score: 87,
    adjustments: {
      location: 0,
      condition: -5,
      size: -15,
      features: -3,
    },
    adjusted_value: 18640000,
  },
  {
    id: '3',
    address: '789 Park Road, Colombo 05',
    type: 'residential',
    bedrooms: 3,
    bathrooms: 2,
    area: 1150,
    sale_price: 17200000,
    sale_date: '2024-12-02',
    distance: 1.2,
    similarity_score: 84,
    adjustments: {
      location: 8,
      condition: 0,
      size: 5,
      features: 4,
    },
    adjusted_value: 18824000,
  },
]

const adjustmentCategories = [
  { key: 'location', label: 'Location', description: 'Proximity to amenities, schools, transport' },
  { key: 'condition', label: 'Condition', description: 'Property condition and maintenance' },
  { key: 'size', label: 'Size', description: 'Floor area and room count differences' },
  { key: 'features', label: 'Features', description: 'Special features and amenities' },
  { key: 'age', label: 'Age/Vintage', description: 'Property age and architectural style' },
  { key: 'view', label: 'View/Orientation', description: 'Views and property orientation' },
]

export function ComparablesStep() {
  const { formData, updateFormData } = useReportWizardStore()
  const [searchCriteria, setSearchCriteria] = useState({
    radius: '2',
    property_type: 'residential',
    min_bedrooms: '',
    max_bedrooms: '',
    min_area: '',
    max_area: '',
    sale_period: '12',
  })
  const [searching, setSearching] = useState(false)
  const [comparables, setComparables] = useState(mockComparables)

  const handleSearch = async () => {
    setSearching(true)
    // Simulate API search
    setTimeout(() => {
      setComparables(mockComparables)
      updateFormData('comparables', {
        ...formData.comparables,
        properties: mockComparables,
        search_criteria: searchCriteria,
        analysis_date: new Date().toISOString(),
      })
      setSearching(false)
    }, 2000)
  }

  const handleAdjustmentChange = (compId: string, category: string, value: number) => {
    const updatedComparables = comparables.map(comp => {
      if (comp.id === compId) {
        const newAdjustments = { ...comp.adjustments, [category]: value }
        const totalAdjustment = Object.values(newAdjustments).reduce((sum, adj) => sum + adj, 0)
        const adjustedValue = comp.sale_price * (1 + totalAdjustment / 100)
        return {
          ...comp,
          adjustments: newAdjustments,
          adjusted_value: Math.round(adjustedValue),
        }
      }
      return comp
    })
    
    setComparables(updatedComparables)
    updateFormData('comparables', {
      ...formData.comparables,
      properties: updatedComparables,
    })
  }

  const getAverageAdjustedValue = () => {
    if (comparables.length === 0) return 0
    const total = comparables.reduce((sum, comp) => sum + comp.adjusted_value, 0)
    return Math.round(total / comparables.length)
  }

  const getConfidenceLevel = () => {
    if (comparables.length === 0) return 0
    const avgSimilarity = comparables.reduce((sum, comp) => sum + comp.similarity_score, 0) / comparables.length
    return Math.round(avgSimilarity)
  }

  return (
    <div className="space-y-6">
      {/* Search Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🔍</span>
            Search Comparable Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Radius (km)
              </label>
              <Select
                value={searchCriteria.radius}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, radius: e.target.value })}
              >
                <option value="1">1 km</option>
                <option value="2">2 km</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <Select
                value={searchCriteria.property_type}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, property_type: e.target.value })}
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
                <option value="apartment">Apartment</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sale Period (months)
              </label>
              <Select
                value={searchCriteria.sale_period}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, sale_period: e.target.value })}
              >
                <option value="6">Last 6 months</option>
                <option value="12">Last 12 months</option>
                <option value="24">Last 2 years</option>
                <option value="36">Last 3 years</option>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Min Bedrooms
              </label>
              <Input
                type="number"
                placeholder="Any"
                value={searchCriteria.min_bedrooms}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, min_bedrooms: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Bedrooms
              </label>
              <Input
                type="number"
                placeholder="Any"
                value={searchCriteria.max_bedrooms}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, max_bedrooms: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Min Area (sqft)
              </label>
              <Input
                type="number"
                placeholder="Any"
                value={searchCriteria.min_area}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, min_area: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Area (sqft)
              </label>
              <Input
                type="number"
                placeholder="Any"
                value={searchCriteria.max_area}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, max_area: e.target.value })}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSearch} 
            disabled={searching}
            className="w-full md:w-auto"
          >
            {searching ? '🔍 Searching...' : '🏠 Search Comparables'}
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {comparables.length > 0 && (
        <>
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">📊</span>
                Comparables Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {comparables.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Comparables Found</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    LKR {getAverageAdjustedValue().toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Adjusted Value</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {getConfidenceLevel()}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Confidence Level</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.max(...comparables.map(c => c.distance)).toFixed(1)} km
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max Distance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparable Properties */}
          <div className="space-y-4">
            {comparables.map((comparable, index) => (
              <Card key={comparable.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="mr-2">🏠</span>
                      Comparable #{index + 1} - {comparable.address}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={comparable.similarity_score >= 90 ? 'success' : comparable.similarity_score >= 80 ? 'default' : 'warning'}>
                        {comparable.similarity_score}% Match
                      </Badge>
                      <Badge variant="secondary">
                        {comparable.distance} km away
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Property Details */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Property Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Bedrooms:</span>
                          <br />{comparable.bedrooms}
                        </div>
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Bathrooms:</span>
                          <br />{comparable.bathrooms}
                        </div>
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Area:</span>
                          <br />{comparable.area.toLocaleString()} sqft
                        </div>
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Sale Date:</span>
                          <br />{new Date(comparable.sale_date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Sale Price:</span>
                          <br /><span className="text-blue-600 dark:text-blue-400 font-semibold">LKR {comparable.sale_price.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Adjusted Value:</span>
                          <br /><span className="text-green-600 dark:text-green-400 font-semibold">LKR {comparable.adjusted_value.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Adjustments */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Adjustments</h4>
                      <div className="space-y-2">
                        {adjustmentCategories.map((category) => {
                          const adjustment = comparable.adjustments[category.key as keyof typeof comparable.adjustments] || 0
                          return (
                            <div key={category.key} className="flex items-center justify-between">
                              <div className="flex-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {category.label}
                                </span>
                                <br />
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {category.description}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  value={adjustment}
                                  onChange={(e) => handleAdjustmentChange(
                                    comparable.id, 
                                    category.key, 
                                    parseFloat(e.target.value) || 0
                                  )}
                                  className="w-20 text-center text-sm"
                                  step="0.1"
                                />
                                <span className="text-sm text-gray-500 dark:text-gray-500 w-8">%</span>
                                <span className={`text-sm font-semibold w-16 text-right ${
                                  adjustment > 0 ? 'text-green-600 dark:text-green-400' :
                                  adjustment < 0 ? 'text-red-600 dark:text-red-400' :
                                  'text-gray-600 dark:text-gray-400'
                                }`}>
                                  {adjustment > 0 ? '+' : ''}{adjustment}%
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-green-400 text-lg">🔍</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              AI-Powered Comparable Analysis
            </h3>
            <div className="mt-2 text-sm text-green-700 dark:text-green-300">
              <p className="mb-2">Our system automatically:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Searches multiple property databases and MLS systems</li>
                <li>Applies sophisticated matching algorithms for similarity scoring</li>
                <li>Suggests market-based adjustments for key differences</li>
                <li>Calculates confidence levels based on data quality and recency</li>
                <li>Provides market trend insights and valuation ranges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}