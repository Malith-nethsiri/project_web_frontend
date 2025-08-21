'use client'

import { useState } from 'react'

interface ExportOptionsProps {
  report: any
  onExport: (format: string, options: ExportSettings) => void
  isExporting: boolean
}

interface ExportSettings {
  format: string
  includePhotos: boolean
  includeComparables: boolean
  includeLegalDocuments: boolean
  includeCoverPage: boolean
  includeExecutiveSummary: boolean
  watermark: boolean
  password: string
  customTemplate: string
  paperSize: string
  orientation: string
  quality: string
  compression: boolean
}

export function ExportOptions({ report, onExport, isExporting }: ExportOptionsProps) {
  const [settings, setSettings] = useState<ExportSettings>({
    format: 'pdf',
    includePhotos: true,
    includeComparables: true,
    includeLegalDocuments: true,
    includeCoverPage: true,
    includeExecutiveSummary: true,
    watermark: false,
    password: '',
    customTemplate: 'standard',
    paperSize: 'letter',
    orientation: 'portrait',
    quality: 'high',
    compression: false,
  })

  const [activeTab, setActiveTab] = useState<'content' | 'format' | 'security'>('content')

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: '📄', description: 'Portable document format, ideal for sharing and printing' },
    { value: 'docx', label: 'Word Document', icon: '📝', description: 'Editable Microsoft Word format' },
    { value: 'html', label: 'Web Page', icon: '🌐', description: 'HTML format for web viewing' },
    { value: 'json', label: 'JSON Data', icon: '💾', description: 'Raw data export for developers' },
  ]

  const templateOptions = [
    { value: 'standard', label: 'Standard Report', description: 'Professional layout with all sections' },
    { value: 'summary', label: 'Executive Summary', description: 'Condensed version with key points' },
    { value: 'detailed', label: 'Detailed Analysis', description: 'Comprehensive report with extended analysis' },
    { value: 'presentation', label: 'Presentation Format', description: 'Slide-style layout for presentations' },
  ]

  const handleSettingChange = (key: keyof ExportSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleExport = () => {
    onExport(settings.format, settings)
  }

  const getEstimatedFileSize = () => {
    let baseSize = 2 // Base report size in MB
    if (settings.includePhotos) baseSize += 5
    if (settings.includeComparables) baseSize += 1
    if (settings.includeLegalDocuments) baseSize += 0.5
    if (settings.quality === 'high') baseSize *= 1.5
    if (settings.compression) baseSize *= 0.6
    return Math.round(baseSize * 10) / 10
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Export Report</h2>
        <p className="text-gray-600">Configure export settings and download your report</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {[
            { key: 'content', label: 'Content', icon: '📋' },
            { key: 'format', label: 'Format', icon: '🎨' },
            { key: 'security', label: 'Security', icon: '🔒' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'content' && (
          <ContentSettings settings={settings} onSettingChange={handleSettingChange} />
        )}
        {activeTab === 'format' && (
          <FormatSettings 
            settings={settings} 
            onSettingChange={handleSettingChange}
            formatOptions={formatOptions}
            templateOptions={templateOptions}
          />
        )}
        {activeTab === 'security' && (
          <SecuritySettings settings={settings} onSettingChange={handleSettingChange} />
        )}
      </div>

      {/* Export Summary & Action */}
      <div className="border-t bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Format: <strong className="text-gray-900">{settings.format.toUpperCase()}</strong></span>
              <span>•</span>
              <span>Estimated size: <strong className="text-gray-900">{getEstimatedFileSize()} MB</strong></span>
              <span>•</span>
              <span>Template: <strong className="text-gray-900 capitalize">{settings.customTemplate}</strong></span>
            </div>
          </div>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function ContentSettings({ settings, onSettingChange }: {
  settings: ExportSettings
  onSettingChange: (key: keyof ExportSettings, value: any) => void
}) {
  const contentOptions = [
    { key: 'includeCoverPage' as const, label: 'Cover Page', description: 'Title page with property overview' },
    { key: 'includeExecutiveSummary' as const, label: 'Executive Summary', description: 'Key findings and conclusions' },
    { key: 'includePhotos' as const, label: 'Property Photos', description: 'All uploaded property images' },
    { key: 'includeComparables' as const, label: 'Comparable Sales', description: 'Analysis of similar properties' },
    { key: 'includeLegalDocuments' as const, label: 'Legal Documentation', description: 'Title and legal information' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Include Sections</h3>
        <div className="space-y-4">
          {contentOptions.map((option) => (
            <div key={option.key} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={option.key}
                checked={settings[option.key]}
                onChange={(e) => onSettingChange(option.key, e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="flex-1">
                <label htmlFor={option.key} className="text-sm font-medium text-gray-900 cursor-pointer">
                  {option.label}
                </label>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Content Preview</h4>
        <div className="text-sm text-blue-800">
          <p>Your export will include:</p>
          <ul className="mt-2 space-y-1">
            {settings.includeCoverPage && <li>• Cover page with property details</li>}
            {settings.includeExecutiveSummary && <li>• Executive summary and key findings</li>}
            <li>• Property information and market analysis</li>
            {settings.includeComparables && <li>• Comparable sales analysis</li>}
            {settings.includePhotos && <li>• Property photos ({8} images)</li>}
            {settings.includeLegalDocuments && <li>• Legal aspects and documentation</li>}
            <li>• Valuation conclusion</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function FormatSettings({ settings, onSettingChange, formatOptions, templateOptions }: {
  settings: ExportSettings
  onSettingChange: (key: keyof ExportSettings, value: any) => void
  formatOptions: any[]
  templateOptions: any[]
}) {
  return (
    <div className="space-y-6">
      {/* File Format */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">File Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formatOptions.map((format) => (
            <div key={format.value} className="relative">
              <input
                type="radio"
                id={format.value}
                name="format"
                value={format.value}
                checked={settings.format === format.value}
                onChange={(e) => onSettingChange('format', e.target.value)}
                className="sr-only"
              />
              <label
                htmlFor={format.value}
                className={`block p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  settings.format === format.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{format.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{format.label}</p>
                    <p className="text-sm text-gray-500">{format.description}</p>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Report Template</h3>
        <div className="space-y-3">
          {templateOptions.map((template) => (
            <div key={template.value} className="relative">
              <input
                type="radio"
                id={template.value}
                name="template"
                value={template.value}
                checked={settings.customTemplate === template.value}
                onChange={(e) => onSettingChange('customTemplate', e.target.value)}
                className="sr-only"
              />
              <label
                htmlFor={template.value}
                className={`block p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  settings.customTemplate === template.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{template.label}</p>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    settings.customTemplate === template.value
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {settings.customTemplate === template.value && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* PDF-specific options */}
      {settings.format === 'pdf' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">PDF Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paper Size
              </label>
              <select
                value={settings.paperSize}
                onChange={(e) => onSettingChange('paperSize', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="letter">Letter (8.5&quot; × 11&quot;)</option>
                <option value="legal">Legal (8.5&quot; × 14&quot;)</option>
                <option value="a4">A4 (210mm × 297mm)</option>
                <option value="tabloid">Tabloid (11&quot; × 17&quot;)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orientation
              </label>
              <select
                value={settings.orientation}
                onChange={(e) => onSettingChange('orientation', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Quality & Compression */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Quality & Size</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Quality
            </label>
            <div className="flex space-x-4">
              {['low', 'medium', 'high'].map((quality) => (
                <label key={quality} className="flex items-center">
                  <input
                    type="radio"
                    name="quality"
                    value={quality}
                    checked={settings.quality === quality}
                    onChange={(e) => onSettingChange('quality', e.target.value)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm capitalize">{quality}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="compression"
              checked={settings.compression}
              onChange={(e) => onSettingChange('compression', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="compression" className="text-sm font-medium text-gray-700">
              Enable file compression (reduces file size)
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings({ settings, onSettingChange }: {
  settings: ExportSettings
  onSettingChange: (key: keyof ExportSettings, value: any) => void
}) {
  return (
    <div className="space-y-6">
      {/* Password Protection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Password Protection</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="password-enabled"
              checked={!!settings.password}
              onChange={(e) => {
                if (!e.target.checked) {
                  onSettingChange('password', '')
                }
              }}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="flex-1">
              <label htmlFor="password-enabled" className="text-sm font-medium text-gray-900 cursor-pointer">
                Protect document with password
              </label>
              <p className="text-sm text-gray-500">Require a password to open the exported document</p>
            </div>
          </div>
          
          {(settings.password !== undefined) && (
            <div className="ml-7">
              <input
                type="password"
                placeholder="Enter password"
                value={settings.password}
                onChange={(e) => onSettingChange('password', e.target.value)}
                className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Use a strong password with at least 8 characters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Watermark</h3>
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="watermark"
            checked={settings.watermark}
            onChange={(e) => onSettingChange('watermark', e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <label htmlFor="watermark" className="text-sm font-medium text-gray-900 cursor-pointer">
              Add watermark to document
            </label>
            <p className="text-sm text-gray-500">
              Adds &quot;ValuerPro - Confidential&quot; watermark to all pages
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">🔒 Security Notice</h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>
            This report contains confidential property valuation information. Please ensure 
            that the exported document is shared only with authorized parties.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use password protection for sensitive reports</li>
            <li>Consider adding watermarks for additional security</li>
            <li>Limit distribution to necessary stakeholders only</li>
            <li>Store exported files securely</li>
          </ul>
        </div>
      </div>
    </div>
  )
}