'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useReportWizardStore } from '@/stores/report-wizard'

const photoCategories = [
  { value: 'exterior', label: 'Exterior Views', subType: 'front' },
  { value: 'exterior', label: 'Exterior - Back View', subType: 'back' },
  { value: 'exterior', label: 'Exterior - Side Views', subType: 'sides' },
  { value: 'interior', label: 'Interior - Living Areas', subType: 'living' },
  { value: 'interior', label: 'Interior - Bedrooms', subType: 'bedrooms' },
  { value: 'interior', label: 'Interior - Kitchen', subType: 'kitchen' },
  { value: 'interior', label: 'Interior - Bathrooms', subType: 'bathrooms' },
  { value: 'other', label: 'Special Features', subType: 'features' },
  { value: 'other', label: 'Condition/Damage', subType: 'condition' },
  { value: 'other', label: 'Surroundings/Neighborhood', subType: 'surroundings' },
  { value: 'document', label: 'Document Photos', subType: 'documents' },
  { value: 'other', label: 'Other', subType: 'other' },
]

const qualityLevels = [
  { value: 'excellent', label: 'Excellent', color: 'green' },
  { value: 'good', label: 'Good', color: 'blue' },
  { value: 'fair', label: 'Fair', color: 'yellow' },
  { value: 'poor', label: 'Poor', color: 'red' },
]

export function PhotosMediaStep() {
  const { formData, updateFormData } = useReportWizardStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('exterior')

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return
    
    setUploading(true)
    const newPhotos = Array.from(files).map((file, index) => {
      return {
        file_url: URL.createObjectURL(file),
        filename: file.name,
        caption: '',
        description: '',
        type: selectedCategory as 'exterior' | 'interior' | 'document' | 'other',
        sequence_order: (formData.photos?.length || 0) + index,
      }
    })

    updateFormData('photos', [
      ...(formData.photos || []),
      ...newPhotos
    ])
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false)
    }, 1500)
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

  const handlePhotoUpdate = (filename: string, updates: any) => {
    const updatedPhotos = (formData.photos || []).map(photo =>
      photo.filename === filename ? { ...photo, ...updates } : photo
    )
    
    updateFormData('photos', updatedPhotos)
  }

  const handleRemovePhoto = (filename: string) => {
    const updatedPhotos = (formData.photos || []).filter(photo => photo.filename !== filename)
    updateFormData('photos', updatedPhotos)
  }

  const getPhotosCountByCategory = () => {
    const photos = formData.photos || []
    return photoCategories.reduce((acc, category) => {
      const key = `${category.value}_${category.subType}`
      acc[key] = photos.filter(p => p.type === category.value).length
      return acc
    }, {} as Record<string, number>)
  }

  const photoCounts = getPhotosCountByCategory()
  const totalPhotos = formData.photos?.length || 0

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📷</span>
            Upload Photos & Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Photo Category
            </label>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {photoCategories.map((category) => {
                const key = `${category.value}_${category.subType}`
                return (
                  <option key={key} value={category.value}>
                    {category.label} {photoCounts[key] > 0 && `(${photoCounts[key]})`}
                  </option>
                )
              })}
            </Select>
          </div>

          {/* Upload Area */}
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
            {uploading ? (
              <div className="space-y-3">
                <div className="text-4xl">⏳</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Processing Images...
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI analysis in progress
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-4xl">📷</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Drop photos here or click to upload
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upload photos for: {photoCategories.find(c => c.value === selectedCategory)?.label}
                </p>
                <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  🖼️ Choose Files
                </Button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Photos Grid */}
      {totalPhotos > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center">
                <span className="mr-2">🖼️</span>
                Uploaded Photos ({totalPhotos})
              </span>
              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                Click photos to edit details
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.photos?.map((photo) => {
                const category = photoCategories.find(c => c.value === photo.type)
                
                return (
                  <div key={photo.filename} className="group relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.file_url}
                        alt={photo.caption || 'Property photo'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Photo overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                        <Button size="sm" variant="outline" className="bg-white text-black hover:bg-gray-100">
                          ✏️ Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleRemovePhoto(photo.filename)}
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                    
                    {/* Photo info */}
                    <div className="p-2">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {category?.label}
                      </div>
                      
                      {/* Type indicator */}
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {photo.type}
                        </span>
                      </div>
                      
                      {/* Caption input */}
                      <Input
                        type="text"
                        placeholder="Add caption..."
                        value={photo.caption || ''}
                        onChange={(e) => handlePhotoUpdate(photo.filename, { caption: e.target.value })}
                        className="mt-2 text-xs"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photo Requirements & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📈</span>
            Photo Coverage Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {photoCategories.map((category) => {
              const key = `${category.value}_${category.subType}`
              const count = photoCounts[key]
              const isComplete = count > 0
              
              return (
                <div
                  key={key}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isComplete
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {isComplete ? '✅' : '🔲'}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {category.label}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    isComplete ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                  }`}>
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400 text-lg">📷</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              AI-Powered Photo Analysis
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p className="mb-2">Our advanced AI automatically:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Categorizes photos by room type and area</li>
                <li>Assesses photo quality and composition</li>
                <li>Detects property features and conditions</li>
                <li>Identifies potential issues or damage</li>
                <li>Generates detailed property insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}