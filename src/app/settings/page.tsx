'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface AppSettings {
  appearance: {
    theme: 'light' | 'dark' | 'system'
    compactMode: boolean
    animationsEnabled: boolean
    fontSize: 'small' | 'medium' | 'large'
    colorScheme: 'default' | 'blue' | 'green' | 'purple'
  }
  reports: {
    defaultTemplate: string
    autoSave: boolean
    saveInterval: number
    includePhotos: boolean
    watermarkReports: boolean
    reportFormat: 'pdf' | 'docx' | 'both'
    qualitySettings: 'standard' | 'high' | 'maximum'
  }
  data: {
    retentionPeriod: number
    backupFrequency: 'daily' | 'weekly' | 'monthly'
    cloudSync: boolean
    exportFormat: 'json' | 'csv' | 'excel'
    compressionEnabled: boolean
  }
  security: {
    sessionTimeout: number
    twoFactorEnabled: boolean
    loginNotifications: boolean
    deviceTracking: boolean
    apiKeyRotation: 'manual' | 'monthly' | 'quarterly'
    encryptionLevel: 'standard' | 'enhanced'
  }
  notifications: {
    desktop: boolean
    email: boolean
    mobile: boolean
    reportReminders: boolean
    systemUpdates: boolean
    marketingEmails: boolean
    weeklyDigest: boolean
  }
  integrations: {
    googleMaps: boolean
    googleDrive: boolean
    dropbox: boolean
    oneDrive: boolean
    zapier: boolean
    webhooks: boolean
  }
  developer: {
    apiAccess: boolean
    debugMode: boolean
    betaFeatures: boolean
    webhookUrl: string
    apiRateLimit: number
  }
}

const defaultSettings: AppSettings = {
  appearance: {
    theme: 'system',
    compactMode: false,
    animationsEnabled: true,
    fontSize: 'medium',
    colorScheme: 'default'
  },
  reports: {
    defaultTemplate: 'standard',
    autoSave: true,
    saveInterval: 300, // 5 minutes
    includePhotos: true,
    watermarkReports: false,
    reportFormat: 'pdf',
    qualitySettings: 'high'
  },
  data: {
    retentionPeriod: 365, // days
    backupFrequency: 'weekly',
    cloudSync: true,
    exportFormat: 'json',
    compressionEnabled: true
  },
  security: {
    sessionTimeout: 480, // 8 hours
    twoFactorEnabled: false,
    loginNotifications: true,
    deviceTracking: true,
    apiKeyRotation: 'quarterly',
    encryptionLevel: 'standard'
  },
  notifications: {
    desktop: true,
    email: true,
    mobile: false,
    reportReminders: true,
    systemUpdates: true,
    marketingEmails: false,
    weeklyDigest: true
  },
  integrations: {
    googleMaps: true,
    googleDrive: false,
    dropbox: false,
    oneDrive: false,
    zapier: false,
    webhooks: false
  },
  developer: {
    apiAccess: false,
    debugMode: false,
    betaFeatures: false,
    webhookUrl: '',
    apiRateLimit: 1000
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState<keyof AppSettings>('appearance')
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const updateSetting = (category: keyof AppSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setHasChanges(false)
    // Show success toast
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    setHasChanges(false)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'valuerpro-settings.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { key: 'appearance', label: 'Appearance', icon: '🎨' },
    { key: 'reports', label: 'Reports', icon: '📄' },
    { key: 'data', label: 'Data & Storage', icon: '💾' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'integrations', label: 'Integrations', icon: '🔗' },
    { key: 'developer', label: 'Developer', icon: '⚙️' },
  ]

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Customize your ValuerPro experience and preferences
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <Badge variant="warning">Unsaved Changes</Badge>
          )}
          <Button variant="outline" onClick={handleExport}>
            📤 Export Settings
          </Button>
          {hasChanges && (
            <>
              <Button variant="outline" onClick={handleReset}>
                🔄 Reset
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? '💾 Saving...' : '💾 Save Changes'}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Settings Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as keyof AppSettings)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">{tabs.find(t => t.key === activeTab)?.icon}</span>
            {tabs.find(t => t.key === activeTab)?.label} Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                  <Select
                    value={settings.appearance.theme}
                    onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Choose your preferred color theme</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Size
                  </label>
                  <Select
                    value={settings.appearance.fontSize}
                    onChange={(e) => updateSetting('appearance', 'fontSize', e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Adjust text size for better readability</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color Scheme
                  </label>
                  <Select
                    value={settings.appearance.colorScheme}
                    onChange={(e) => updateSetting('appearance', 'colorScheme', e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Choose your preferred accent color</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Compact Mode</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use a more condensed layout with smaller spacing</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.appearance.compactMode}
                    onChange={(e) => updateSetting('appearance', 'compactMode', e.target.checked)}
                    className="rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Enable Animations</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Show smooth transitions and animations</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.appearance.animationsEnabled}
                    onChange={(e) => updateSetting('appearance', 'animationsEnabled', e.target.checked)}
                    className="rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Reports Settings */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Default Template
                  </label>
                  <Select
                    value={settings.reports.defaultTemplate}
                    onChange={(e) => updateSetting('reports', 'defaultTemplate', e.target.value)}
                  >
                    <option value="standard">Standard Report</option>
                    <option value="detailed">Detailed Analysis</option>
                    <option value="summary">Executive Summary</option>
                    <option value="residential">Residential Template</option>
                    <option value="commercial">Commercial Template</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Auto-save Interval (seconds)
                  </label>
                  <Select
                    value={settings.reports.saveInterval.toString()}
                    onChange={(e) => updateSetting('reports', 'saveInterval', parseInt(e.target.value))}
                  >
                    <option value="60">1 minute</option>
                    <option value="300">5 minutes</option>
                    <option value="600">10 minutes</option>
                    <option value="900">15 minutes</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Export Format
                  </label>
                  <Select
                    value={settings.reports.reportFormat}
                    onChange={(e) => updateSetting('reports', 'reportFormat', e.target.value)}
                  >
                    <option value="pdf">PDF Only</option>
                    <option value="docx">Word Document Only</option>
                    <option value="both">Both PDF & Word</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality Settings
                  </label>
                  <Select
                    value={settings.reports.qualitySettings}
                    onChange={(e) => updateSetting('reports', 'qualitySettings', e.target.value)}
                  >
                    <option value="standard">Standard (Faster)</option>
                    <option value="high">High Quality</option>
                    <option value="maximum">Maximum Quality (Slower)</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'autoSave', label: 'Auto-save Reports', desc: 'Automatically save report progress' },
                  { key: 'includePhotos', label: 'Include Photos', desc: 'Embed uploaded photos in reports by default' },
                  { key: 'watermarkReports', label: 'Watermark Reports', desc: 'Add company watermark to generated reports' }
                ].map((setting) => (
                  <label key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.reports[setting.key as keyof typeof settings.reports] as boolean}
                      onChange={(e) => updateSetting('reports', setting.key, e.target.checked)}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Data & Storage Settings */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Retention (days)
                  </label>
                  <Select
                    value={settings.data.retentionPeriod.toString()}
                    onChange={(e) => updateSetting('data', 'retentionPeriod', parseInt(e.target.value))}
                  >
                    <option value="90">3 months</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                    <option value="1825">5 years</option>
                    <option value="-1">Indefinite</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Backup Frequency
                  </label>
                  <Select
                    value={settings.data.backupFrequency}
                    onChange={(e) => updateSetting('data', 'backupFrequency', e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Export Format
                  </label>
                  <Select
                    value={settings.data.exportFormat}
                    onChange={(e) => updateSetting('data', 'exportFormat', e.target.value)}
                  >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'cloudSync', label: 'Cloud Synchronization', desc: 'Sync data across devices via cloud storage' },
                  { key: 'compressionEnabled', label: 'Data Compression', desc: 'Compress data to save storage space' }
                ].map((setting) => (
                  <label key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.data[setting.key as keyof typeof settings.data] as boolean}
                      onChange={(e) => updateSetting('data', setting.key, e.target.checked)}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Data Management</h4>
                <div className="space-y-3">
                  <Button variant="outline" size="sm">📤 Export All Data</Button>
                  <Button variant="outline" size="sm">🗑️ Clear Cache</Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    ⚠️ Delete All Data
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <Select
                    value={settings.security.sessionTimeout.toString()}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                    <option value="480">8 hours</option>
                    <option value="1440">24 hours</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Key Rotation
                  </label>
                  <Select
                    value={settings.security.apiKeyRotation}
                    onChange={(e) => updateSetting('security', 'apiKeyRotation', e.target.value)}
                  >
                    <option value="manual">Manual</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Encryption Level
                  </label>
                  <Select
                    value={settings.security.encryptionLevel}
                    onChange={(e) => updateSetting('security', 'encryptionLevel', e.target.value)}
                  >
                    <option value="standard">Standard (AES-256)</option>
                    <option value="enhanced">Enhanced (AES-256-GCM)</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'twoFactorEnabled', label: 'Two-Factor Authentication', desc: 'Require 2FA for account access', badge: 'Recommended' },
                  { key: 'loginNotifications', label: 'Login Notifications', desc: 'Get notified of new login attempts' },
                  { key: 'deviceTracking', label: 'Device Tracking', desc: 'Track and manage logged-in devices' }
                ].map((setting) => (
                  <label key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</span>
                        {setting.badge && <Badge variant="warning" className="text-xs">{setting.badge}</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.security[setting.key as keyof typeof settings.security] as boolean}
                      onChange={(e) => updateSetting('security', setting.key, e.target.checked)}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Security Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">🔑 Generate New API Key</Button>
                  <Button variant="outline" size="sm">📱 Setup 2FA</Button>
                  <Button variant="outline" size="sm">🔒 View Active Sessions</Button>
                  <Button variant="outline" size="sm">📋 Download Security Log</Button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'desktop', label: 'Desktop Notifications', desc: 'Show browser notifications' },
                  { key: 'email', label: 'Email Notifications', desc: 'Send notifications to your email' },
                  { key: 'mobile', label: 'Mobile Push Notifications', desc: 'Send notifications to your mobile device' },
                  { key: 'reportReminders', label: 'Report Reminders', desc: 'Remind you of pending reports and deadlines' },
                  { key: 'systemUpdates', label: 'System Updates', desc: 'Notify about system updates and maintenance' },
                  { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional emails and newsletters' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get weekly summary of your activity' }
                ].map((setting) => (
                  <label key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications[setting.key as keyof typeof settings.notifications]}
                      onChange={(e) => updateSetting('notifications', setting.key, e.target.checked)}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'googleMaps', label: 'Google Maps', desc: 'Enable Google Maps integration for location services', icon: '🗺️' },
                  { key: 'googleDrive', label: 'Google Drive', desc: 'Sync reports and files with Google Drive', icon: '☁️' },
                  { key: 'dropbox', label: 'Dropbox', desc: 'Store and sync files with Dropbox', icon: '📦' },
                  { key: 'oneDrive', label: 'Microsoft OneDrive', desc: 'Integrate with Microsoft OneDrive', icon: '☁️' },
                  { key: 'zapier', label: 'Zapier', desc: 'Connect with thousands of apps via Zapier', icon: '⚡' },
                  { key: 'webhooks', label: 'Webhooks', desc: 'Receive real-time notifications via webhooks', icon: '🔗' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{setting.icon}</span>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.integrations[setting.key as keyof typeof settings.integrations]}
                        onChange={(e) => updateSetting('integrations', setting.key, e.target.checked)}
                        className="rounded"
                      />
                      {settings.integrations[setting.key as keyof typeof settings.integrations] && (
                        <Button variant="outline" size="sm">Configure</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Developer Settings */}
          {activeTab === 'developer' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex">
                  <span className="text-yellow-400 text-lg mr-3">⚠️</span>
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Developer Settings</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      These settings are intended for developers and advanced users. Changing these settings may affect application functionality.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'apiAccess', label: 'API Access', desc: 'Enable programmatic access via REST API' },
                  { key: 'debugMode', label: 'Debug Mode', desc: 'Show detailed error messages and debug information' },
                  { key: 'betaFeatures', label: 'Beta Features', desc: 'Enable experimental features (may be unstable)' }
                ].map((setting) => (
                  <label key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.developer[setting.key as keyof typeof settings.developer] as boolean}
                      onChange={(e) => updateSetting('developer', setting.key, e.target.checked)}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Webhook URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com/webhook"
                    value={settings.developer.webhookUrl}
                    onChange={(e) => updateSetting('developer', 'webhookUrl', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Rate Limit (requests/hour)
                  </label>
                  <Input
                    type="number"
                    value={settings.developer.apiRateLimit}
                    onChange={(e) => updateSetting('developer', 'apiRateLimit', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Developer Tools</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">📋 View API Documentation</Button>
                  <Button variant="outline" size="sm">🔑 Manage API Keys</Button>
                  <Button variant="outline" size="sm">📊 View API Usage</Button>
                  <Button variant="outline" size="sm">🧪 Test Webhook</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings Info */}
      <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-gray-400 text-lg">⚙️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Settings Management
            </h3>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-2">Your settings are:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Automatically saved to your browser&apos;s local storage</li>
                <li>Synced across devices when cloud sync is enabled</li>
                <li>Backed up with your account data</li>
                <li>Exportable as JSON for backup or migration</li>
                <li>Resettable to default values at any time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}