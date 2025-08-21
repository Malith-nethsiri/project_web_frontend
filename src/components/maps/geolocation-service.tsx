'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

interface GeolocationData {
  coordinates: {
    latitude: number
    longitude: number
    accuracy: number
    altitude?: number
    altitudeAccuracy?: number
    heading?: number
    speed?: number
  }
  timestamp: number
  address?: GeocodedAddress
}

interface GeocodedAddress {
  streetNumber?: string
  streetName?: string
  city: string
  district?: string
  province: string
  postalCode?: string
  country: string
  formattedAddress: string
}

interface LocationSearchResult {
  place_id: string
  name: string
  address: string
  coordinates: [number, number]
  type: 'address' | 'landmark' | 'business'
  confidence: number
}

interface GeolocationServiceProps {
  onLocationSelected?: (location: GeolocationData) => void
  showSearch?: boolean
  showCurrentLocation?: boolean
}

export function GeolocationService({ 
  onLocationSelected, 
  showSearch = true, 
  showCurrentLocation = true 
}: GeolocationServiceProps) {
  const [currentLocation, setCurrentLocation] = useState<GeolocationData | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser')
      return
    }

    setIsGettingLocation(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationData: GeolocationData = {
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude || undefined,
            altitudeAccuracy: position.coords.altitudeAccuracy || undefined,
            heading: position.coords.heading || undefined,
            speed: position.coords.speed || undefined,
          },
          timestamp: position.timestamp,
        }

        setCurrentLocation(locationData)
        
        // Reverse geocode to get address
        await reverseGeocode(locationData)
        
        setIsGettingLocation(false)
        onLocationSelected?.(locationData)
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
        }
        setLocationError(errorMessage)
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  const reverseGeocode = async (location: GeolocationData) => {
    setIsGeocoding(true)
    try {
      // Simulate reverse geocoding API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockAddress: GeocodedAddress = {
        streetNumber: '123',
        streetName: 'Galle Road',
        city: 'Colombo',
        district: 'Colombo 03',
        province: 'Western Province',
        postalCode: '00300',
        country: 'Sri Lanka',
        formattedAddress: '123 Galle Road, Colombo 03, Western Province, Sri Lanka'
      }

      const updatedLocation = {
        ...location,
        address: mockAddress
      }

      setCurrentLocation(updatedLocation)
      setIsGeocoding(false)
    } catch (error) {
      setIsGeocoding(false)
      console.error('Reverse geocoding failed:', error)
    }
  }

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      // Simulate location search API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockResults: LocationSearchResult[] = [
        {
          place_id: '1',
          name: 'Liberty Plaza',
          address: 'R.A. De Mel Mawatha, Colombo 03, Sri Lanka',
          coordinates: [6.9180, 79.8580] as [number, number],
          type: 'landmark' as const,
          confidence: 95
        },
        {
          place_id: '2', 
          name: 'Galle Face Green',
          address: 'Galle Face Green, Colombo 03, Sri Lanka',
          coordinates: [6.9235, 79.8472] as [number, number],
          type: 'landmark' as const,
          confidence: 92
        },
        {
          place_id: '3',
          name: 'Colombo Fort Railway Station',
          address: 'Fort, Colombo 01, Sri Lanka', 
          coordinates: [6.9344, 79.8428] as [number, number],
          type: 'business' as const,
          confidence: 89
        },
        {
          place_id: '4',
          name: '456 Galle Road',
          address: '456 Galle Road, Colombo 03, Sri Lanka',
          coordinates: [6.9150, 79.8550] as [number, number],
          type: 'address' as const,
          confidence: 87
        }
      ].filter(result => 
        result.name.toLowerCase().includes(query.toLowerCase()) ||
        result.address.toLowerCase().includes(query.toLowerCase())
      )

      setSearchResults(mockResults)
      setIsSearching(false)
    } catch (error) {
      setIsSearching(false)
      console.error('Location search failed:', error)
    }
  }

  const selectSearchResult = async (result: LocationSearchResult) => {
    const locationData: GeolocationData = {
      coordinates: {
        latitude: result.coordinates[0],
        longitude: result.coordinates[1],
        accuracy: 10 // Assumed high accuracy for searched locations
      },
      timestamp: Date.now(),
      address: {
        city: 'Colombo', // Extract from result.address if available
        province: 'Western Province',
        country: 'Sri Lanka',
        formattedAddress: result.address
      }
    }

    setCurrentLocation(locationData)
    setSearchQuery(result.name)
    setSearchResults([])
    onLocationSelected?.(locationData)
  }

  const getAccuracyDescription = (accuracy: number) => {
    if (accuracy <= 5) return 'Very High'
    if (accuracy <= 10) return 'High'
    if (accuracy <= 50) return 'Medium'
    if (accuracy <= 100) return 'Low'
    return 'Very Low'
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy <= 5) return 'text-green-600'
    if (accuracy <= 10) return 'text-blue-600'
    if (accuracy <= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatCoordinate = (coord: number, decimals = 6) => {
    return coord.toFixed(decimals)
  }

  return (
    <div className="space-y-6">
      {/* Current Location */}
      {showCurrentLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">📍</span>
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!currentLocation && !locationError && (
              <div className="text-center py-6">
                <div className="text-4xl mb-4">🌍</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get your current location for precise property mapping
                </p>
                <Button 
                  onClick={getCurrentLocation} 
                  disabled={isGettingLocation}
                  size="lg"
                >
                  {isGettingLocation ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">🔄</span>
                      Getting Location...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">📍</span>
                      Get My Location
                    </span>
                  )}
                </Button>
              </div>
            )}

            {locationError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-lg mr-3">⚠️</span>
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-200">Location Error</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">{locationError}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    onClick={getCurrentLocation}
                    variant="outline" 
                    size="sm"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {currentLocation && (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-green-800 dark:text-green-200">Location Acquired</h4>
                    <Badge 
                      variant="secondary" 
                      className={getAccuracyColor(currentLocation.coordinates.accuracy)}
                    >
                      {getAccuracyDescription(currentLocation.coordinates.accuracy)} Accuracy
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-600 dark:text-green-400 font-medium">Latitude:</span>
                      <div className="font-mono">{formatCoordinate(currentLocation.coordinates.latitude)}°</div>
                    </div>
                    <div>
                      <span className="text-green-600 dark:text-green-400 font-medium">Longitude:</span>
                      <div className="font-mono">{formatCoordinate(currentLocation.coordinates.longitude)}°</div>
                    </div>
                    <div>
                      <span className="text-green-600 dark:text-green-400 font-medium">Accuracy:</span>
                      <div>±{currentLocation.coordinates.accuracy.toFixed(1)}m</div>
                    </div>
                    <div>
                      <span className="text-green-600 dark:text-green-400 font-medium">Timestamp:</span>
                      <div>{new Date(currentLocation.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>

                  {currentLocation.address && (
                    <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                      <span className="text-green-600 dark:text-green-400 font-medium">Address:</span>
                      {isGeocoding ? (
                        <div className="flex items-center mt-1">
                          <span className="animate-spin mr-2">🔄</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Resolving address...</span>
                        </div>
                      ) : (
                        <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                          {currentLocation.address.formattedAddress}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Additional Location Details */}
                {(currentLocation.coordinates.altitude !== undefined || 
                  currentLocation.coordinates.heading !== undefined ||
                  currentLocation.coordinates.speed !== undefined) && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Additional Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {currentLocation.coordinates.altitude !== undefined && (
                        <div>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">Altitude:</span>
                          <div>{currentLocation.coordinates.altitude.toFixed(1)}m</div>
                        </div>
                      )}
                      {currentLocation.coordinates.heading !== undefined && (
                        <div>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">Heading:</span>
                          <div>{currentLocation.coordinates.heading.toFixed(0)}°</div>
                        </div>
                      )}
                      {currentLocation.coordinates.speed !== undefined && (
                        <div>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">Speed:</span>
                          <div>{(currentLocation.coordinates.speed * 3.6).toFixed(1)} km/h</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button 
                    onClick={getCurrentLocation} 
                    variant="outline" 
                    size="sm"
                    disabled={isGettingLocation}
                  >
                    🔄 Refresh Location
                  </Button>
                  <Button variant="outline" size="sm">
                    📋 Copy Coordinates
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Location Search */}
      {showSearch && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">🔍</span>
              Search Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for places, addresses, or landmarks..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    searchLocation(e.target.value)
                  }}
                  className="w-full"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="animate-spin">🔄</span>
                  </div>
                )}
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-64 overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.place_id}
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                      onClick={() => selectSearchResult(result)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {result.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {result.address}
                          </p>
                        </div>
                        <div className="ml-3 flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {result.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {result.confidence}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && !isSearching && searchResults.length === 0 && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  <span className="text-2xl mb-2 block">🔍</span>
                  No locations found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location Services Info */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-purple-400 text-lg">🌐</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Geolocation Services
            </h3>
            <div className="mt-2 text-sm text-purple-700 dark:text-purple-300">
              <p className="mb-2">Our location services provide:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>High-accuracy GPS positioning with error margins</li>
                <li>Reverse geocoding for address resolution</li>
                <li>Intelligent location search with confidence scoring</li>
                <li>Real-time location tracking and updates</li>
                <li>Privacy-focused location handling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}