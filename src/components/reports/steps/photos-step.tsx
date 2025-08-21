'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function PhotosStep() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">📸</span>
            Property Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Photo Upload & Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Upload exterior, interior, and document photos. Organize with captions, 
              descriptions, and automatic sequencing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg">
                📤 Upload Photos
              </Button>
              <Button variant="outline" size="lg">
                📱 Take Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-indigo-400 text-lg">📸</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              Photo Management Features
            </h3>
            <div className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
              <ul className="list-disc pl-5 space-y-1">
                <li>Drag-and-drop photo upload with progress tracking</li>
                <li>Automatic image compression and optimization</li>
                <li>Photo categorization (exterior, interior, documents)</li>
                <li>Caption and description management</li>
                <li>Reorder photos with drag-and-drop sequencing</li>
                <li>Thumbnail preview with full-size viewing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}