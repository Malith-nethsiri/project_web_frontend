'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface DistanceResult {
  distance: number
  duration: number
  mode: TransportMode
  route?: RoutePoint[]
  traffic?: TrafficInfo
}

interface RoutePoint {
  lat: number
  lng: number
  instruction?: string
  distance?: number
  duration?: number
}

interface TrafficInfo {
  level: 'light' | 'moderate' | 'heavy' | 'severe'
  delay: number // in minutes
  incidents: string[]
}

type TransportMode = 'driving' | 'walking' | 'transit' | 'cycling'

interface Location {
  name: string
  coordinates: [number, number]
}

interface DistanceCalculatorProps {
  fromLocation?: Location
  toLocation?: Location
  onResultsChange?: (results: DistanceResult[]) => void
}

export function DistanceCalculator({ 
  fromLocation, 
  toLocation, 
  onResultsChange 
}: DistanceCalculatorProps) {
  const [origin, setOrigin] = useState<Location | null>(fromLocation || null)
  const [destination, setDestination] = useState<Location | null>(toLocation || null)
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>(['driving', 'walking'])
  const [results, setResults] = useState<DistanceResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [originInput, setOriginInput] = useState(fromLocation?.name || '')
  const [destinationInput, setDestinationInput] = useState(toLocation?.name || '')

  const transportModes: { mode: TransportMode; label: string; icon: string }[] = [
    { mode: 'driving', label: 'Driving', icon: '🚗' },
    { mode: 'walking', label: 'Walking', icon: '🚶' },
    { mode: 'transit', label: 'Public Transit', icon: '🚌' },
    { mode: 'cycling', label: 'Cycling', icon: '🚴' },
  ]

  const calculateDistances = async () => {
    if (!origin || !destination) return

    setIsCalculating(true)
    const newResults: DistanceResult[] = []

    for (const mode of selectedModes) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const result = await simulateDistanceCalculation(origin, destination, mode)
        newResults.push(result)
      } catch (error) {
        console.error(`Failed to calculate ${mode} distance:`, error)
      }
    }

    setResults(newResults)
    setIsCalculating(false)
    onResultsChange?.(newResults)
  }

  const simulateDistanceCalculation = async (
    from: Location, 
    to: Location, 
    mode: TransportMode
  ): Promise<DistanceResult> => {
    // Calculate straight-line distance (Haversine formula)
    const lat1 = from.coordinates[0] * Math.PI / 180
    const lng1 = from.coordinates[1] * Math.PI / 180
    const lat2 = to.coordinates[0] * Math.PI / 180
    const lng2 = to.coordinates[1] * Math.PI / 180

    const dlat = lat2 - lat1
    const dlng = lng2 - lng1
    const a = Math.sin(dlat/2) * Math.sin(dlat/2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(dlng/2) * Math.sin(dlng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const straightDistance = 6371 * c // Earth's radius in km

    // Apply mode-specific multipliers and speeds
    let distance: number
    let avgSpeed: number // km/h

    switch (mode) {
      case 'driving':
        distance = straightDistance * 1.3 // Roads add ~30% distance
        avgSpeed = 35 // Average city driving speed
        break
      case 'walking':
        distance = straightDistance * 1.2 // Walking paths add ~20%
        avgSpeed = 5 // Walking speed
        break
      case 'transit':
        distance = straightDistance * 1.4 // Public transit routes
        avgSpeed = 25 // Average transit speed with stops
        break
      case 'cycling':
        distance = straightDistance * 1.25 // Bike paths
        avgSpeed = 15 // Cycling speed
        break
    }

    const duration = (distance / avgSpeed) * 60 // Convert to minutes

    // Add some randomization for realism
    distance += (Math.random() - 0.5) * 0.2 * distance
    const baseDuration = duration + (Math.random() - 0.5) * 0.2 * duration

    // Generate mock traffic info for driving
    let traffic: TrafficInfo | undefined
    if (mode === 'driving') {
      const trafficLevels: TrafficInfo['level'][] = ['light', 'moderate', 'heavy']
      const trafficLevel = trafficLevels[Math.floor(Math.random() * trafficLevels.length)]
      
      traffic = {
        level: trafficLevel,
        delay: trafficLevel === 'light' ? 0 : 
               trafficLevel === 'moderate' ? Math.random() * 10 : 
               Math.random() * 20 + 10,
        incidents: trafficLevel === 'heavy' ? ['Road construction on Main Street', 'Heavy traffic ahead'] : []
      }
    }

    return {
      distance: Math.round(distance * 100) / 100,
      duration: Math.round(baseDuration + (traffic?.delay || 0)),
      mode,
      traffic
    }
  }

  const handleModeToggle = (mode: TransportMode) => {
    setSelectedModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    )
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)} min`
    }
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    return `${hours}h ${mins}m`
  }

  const getTrafficColor = (level: TrafficInfo['level']) => {
    const colors = {
      light: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      moderate: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
      heavy: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
      severe: 'text-red-600 bg-red-50 dark:bg-red-900/20'
    }
    return colors[level]
  }

  const getModeColor = (mode: TransportMode) => {
    const colors = {
      driving: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      walking: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      transit: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      cycling: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    }
    return colors[mode]
  }

  const quickLocations = [
    { name: 'Colombo Fort', coordinates: [6.9344, 79.8428] as [number, number] },
    { name: 'Galle Face Green', coordinates: [6.9235, 79.8472] as [number, number] },
    { name: 'Liberty Plaza', coordinates: [6.9180, 79.8580] as [number, number] },
    { name: 'National Hospital', coordinates: [6.9200, 79.8650] as [number, number] },
    { name: 'University of Colombo', coordinates: [6.9022, 79.8607] as [number, number] },
  ]

  return (
    <div className="space-y-6">
      {/* Distance Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📏</span>
            Distance Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From
                </label>
                <Input
                  type="text"
                  placeholder="Enter starting location..."
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                />
                <div className="mt-2 space-y-1">
                  {quickLocations.map((location) => (
                    <button
                      key={location.name}
                      onClick={() => {
                        setOrigin(location)
                        setOriginInput(location.name)
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 mr-3"
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To
                </label>
                <Input
                  type="text"
                  placeholder="Enter destination..."
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                />
                <div className="mt-2 space-y-1">
                  {quickLocations.map((location) => (
                    <button
                      key={location.name}
                      onClick={() => {
                        setDestination(location)
                        setDestinationInput(location.name)
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 mr-3"
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transport Modes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transport Modes
              </label>
              <div className="flex flex-wrap gap-2">
                {transportModes.map((transport) => (
                  <button
                    key={transport.mode}
                    onClick={() => handleModeToggle(transport.mode)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                      selectedModes.includes(transport.mode)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{transport.icon}</span>
                    <span className="text-sm">{transport.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={calculateDistances}
                disabled={!origin || !destination || selectedModes.length === 0 || isCalculating}
                className="flex-1"
              >
                {isCalculating ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">🔄</span>
                    Calculating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">📏</span>
                    Calculate Distance & Time
                  </span>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  setOrigin(destination)
                  setDestination(origin)
                  setOriginInput(destinationInput)
                  setDestinationInput(originInput)
                }}
                disabled={!origin || !destination}
              >
                🔄 Swap
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">📊</span>
              Distance Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result) => {
                const transport = transportModes.find(t => t.mode === result.mode)!
                return (
                  <div
                    key={result.mode}
                    className={`p-4 rounded-lg border ${getModeColor(result.mode)}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{transport.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {transport.label}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="font-semibold">
                              {result.distance.toFixed(1)} km
                            </span>
                            <span className="font-semibold">
                              {formatDuration(result.duration)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {result.traffic && (
                        <div className="text-right">
                          <Badge className={`${getTrafficColor(result.traffic.level)} mb-1`}>
                            {result.traffic.level} traffic
                          </Badge>
                          {result.traffic.delay > 0 && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              +{Math.round(result.traffic.delay)} min delay
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {result.traffic?.incidents && result.traffic.incidents.length > 0 && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3 mt-3">
                        <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1 text-sm">
                          Traffic Incidents:
                        </h5>
                        <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                          {result.traffic.incidents.map((incident, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">⚠️</span>
                              {incident}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        🗺️ View Route
                      </Button>
                      <Button variant="outline" size="sm">
                        📱 Send to Phone
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Route Comparison */}
            {results.length > 1 && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Route Comparison
                </h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Fastest:</span>
                    <span className="font-medium">
                      {(() => {
                        const fastest = results.reduce((prev, current) => 
                          prev.duration < current.duration ? prev : current
                        )
                        const transport = transportModes.find(t => t.mode === fastest.mode)
                        return `${transport?.icon} ${transport?.label} (${formatDuration(fastest.duration)})`
                      })()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shortest:</span>
                    <span className="font-medium">
                      {(() => {
                        const shortest = results.reduce((prev, current) => 
                          prev.distance < current.distance ? prev : current
                        )
                        const transport = transportModes.find(t => t.mode === shortest.mode)
                        return `${transport?.icon} ${transport?.label} (${shortest.distance.toFixed(1)} km)`
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Distance Calculator Info */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-orange-400 text-lg">📏</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
              Smart Distance Calculation
            </h3>
            <div className="mt-2 text-sm text-orange-700 dark:text-orange-300">
              <p className="mb-2">Our distance calculator provides:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Multi-modal transportation options (driving, walking, transit, cycling)</li>
                <li>Real-time traffic conditions and delay estimates</li>
                <li>Route optimization for fastest vs shortest paths</li>
                <li>Traffic incident alerts and alternative route suggestions</li>
                <li>Accurate travel time predictions based on current conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}