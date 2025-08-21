'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/auth'

interface UserProfile {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    nationality: string
    avatar?: string
  }
  professional: {
    title: string
    company: string
    license: string
    experience: number
    specializations: string[]
    certifications: string[]
    bio: string
  }
  preferences: {
    language: string
    timezone: string
    currency: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
      reports: boolean
      marketing: boolean
    }
    privacy: {
      profileVisible: boolean
      showExperience: boolean
      showCertifications: boolean
    }
  }
  statistics: {
    reportsCompleted: number
    totalValuation: number
    avgReportTime: number
    clientSatisfaction: number
    joinDate: string
    lastActive: string
  }
}

const mockProfile: UserProfile = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@valuerpro.com',
    phone: '+94 77 123 4567',
    dateOfBirth: '1985-06-15',
    nationality: 'Sri Lankan',
  },
  professional: {
    title: 'Senior Property Valuer',
    company: 'ValuerPro Consultancy',
    license: 'LIC/VAL/2019/0123',
    experience: 8,
    specializations: ['Residential Properties', 'Commercial Real Estate', 'Land Valuation'],
    certifications: ['RICS Qualified', 'Certified Property Valuer', 'Real Estate Appraiser'],
    bio: 'Experienced property valuer with 8+ years of expertise in residential and commercial property assessment. Specialized in complex valuations and market analysis across Western Province.'
  },
  preferences: {
    language: 'en',
    timezone: 'Asia/Colombo',
    currency: 'LKR',
    notifications: {
      email: true,
      sms: false,
      push: true,
      reports: true,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      showExperience: true,
      showCertifications: true
    }
  },
  statistics: {
    reportsCompleted: 247,
    totalValuation: 4850000000,
    avgReportTime: 3.2,
    clientSatisfaction: 4.8,
    joinDate: '2019-03-15',
    lastActive: new Date().toISOString()
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'preferences' | 'statistics'>('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useAuthStore()

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setProfile(mockProfile) // Reset to original data
    setIsEditing(false)
  }

  const updateProfile = (section: keyof UserProfile, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateNestedField = (section: keyof UserProfile, nested: string, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nested]: {
          ...(prev[section] as any)[nested],
          [field]: value
        }
      }
    }))
  }

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`
  }

  const formatDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.personalInfo.firstName[0]}{profile.personalInfo.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {profile.personalInfo.firstName} {profile.personalInfo.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.professional.title} • {profile.professional.company}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">{profile.professional.experience} years experience</Badge>
                  <Badge variant="success">⭐ {profile.statistics.clientSatisfaction}/5.0</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    ❌ Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? '💾 Saving...' : '💾 Save Changes'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {profile.statistics.reportsCompleted}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reports Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(profile.statistics.totalValuation)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Valuation</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {profile.statistics.avgReportTime} days
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Report Time</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {formatDaysAgo(profile.statistics.joinDate)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Member Since</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Tabs */}
      <Card>
        <CardHeader>
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { key: 'personal', label: 'Personal Info', icon: '👤' },
              { key: 'professional', label: 'Professional', icon: '💼' },
              { key: 'preferences', label: 'Preferences', icon: '⚙️' },
              { key: 'statistics', label: 'Statistics', icon: '📊' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    value={profile.personalInfo.firstName}
                    onChange={(e) => updateProfile('personalInfo', 'firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    value={profile.personalInfo.lastName}
                    onChange={(e) => updateProfile('personalInfo', 'lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={profile.personalInfo.email}
                    onChange={(e) => updateProfile('personalInfo', 'email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={profile.personalInfo.phone}
                    onChange={(e) => updateProfile('personalInfo', 'phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={profile.personalInfo.dateOfBirth}
                    onChange={(e) => updateProfile('personalInfo', 'dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nationality
                  </label>
                  <Select
                    value={profile.personalInfo.nationality}
                    onChange={(e) => updateProfile('personalInfo', 'nationality', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Sri Lankan">Sri Lankan</option>
                    <option value="Indian">Indian</option>
                    <option value="British">British</option>
                    <option value="American">American</option>
                    <option value="Australian">Australian</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>
              </div>

              {isEditing && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Profile Photo
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {profile.personalInfo.firstName[0]}{profile.personalInfo.lastName[0]}
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">📤 Upload Photo</Button>
                      <Button variant="outline" size="sm">🗑️ Remove</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Professional Information Tab */}
          {activeTab === 'professional' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Title
                  </label>
                  <Input
                    type="text"
                    value={profile.professional.title}
                    onChange={(e) => updateProfile('professional', 'title', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <Input
                    type="text"
                    value={profile.professional.company}
                    onChange={(e) => updateProfile('professional', 'company', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    License Number
                  </label>
                  <Input
                    type="text"
                    value={profile.professional.license}
                    onChange={(e) => updateProfile('professional', 'license', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience
                  </label>
                  <Input
                    type="number"
                    value={profile.professional.experience}
                    onChange={(e) => updateProfile('professional', 'experience', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Bio
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100 disabled:bg-gray-50 disabled:text-gray-500"
                  value={profile.professional.bio}
                  onChange={(e) => updateProfile('professional', 'bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Describe your professional background and expertise..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specializations
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.professional.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{spec}</span>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newSpecs = profile.professional.specializations.filter((_, i) => i !== index)
                            updateProfile('professional', 'specializations', newSpecs)
                          }}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Add specialization..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          updateProfile('professional', 'specializations', 
                            [...profile.professional.specializations, e.currentTarget.value.trim()]
                          )
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Certifications
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.professional.certifications.map((cert, index) => (
                    <Badge key={index} variant="success" className="flex items-center space-x-1">
                      <span>✓ {cert}</span>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newCerts = profile.professional.certifications.filter((_, i) => i !== index)
                            updateProfile('professional', 'certifications', newCerts)
                          }}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Add certification..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          updateProfile('professional', 'certifications', 
                            [...profile.professional.certifications, e.currentTarget.value.trim()]
                          )
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {/* General Preferences */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">General Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <Select
                      value={profile.preferences.language}
                      onChange={(e) => updateProfile('preferences', 'language', e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="en">English</option>
                      <option value="si">Sinhala</option>
                      <option value="ta">Tamil</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <Select
                      value={profile.preferences.timezone}
                      onChange={(e) => updateProfile('preferences', 'timezone', e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
                      <option value="Asia/Dubai">Asia/Dubai (UTC+4:00)</option>
                      <option value="Europe/London">Europe/London (UTC+0:00)</option>
                      <option value="America/New_York">America/New_York (UTC-5:00)</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <Select
                      value={profile.preferences.currency}
                      onChange={(e) => updateProfile('preferences', 'currency', e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="LKR">Sri Lankan Rupee (LKR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  {Object.entries(profile.preferences.notifications).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()} Notifications
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'email' && 'Receive notifications via email'}
                          {key === 'sms' && 'Receive notifications via SMS'}
                          {key === 'push' && 'Receive push notifications in browser'}
                          {key === 'reports' && 'Get notified about report updates'}
                          {key === 'marketing' && 'Receive marketing and promotional messages'}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateNestedField('preferences', 'notifications', key, e.target.checked)}
                        disabled={!isEditing}
                        className="rounded"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Preferences */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Privacy Settings</h4>
                <div className="space-y-3">
                  {Object.entries(profile.preferences.privacy).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'profileVisible' && 'Make your profile visible to other users'}
                          {key === 'showExperience' && 'Display your years of experience publicly'}
                          {key === 'showCertifications' && 'Show your certifications on your profile'}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateNestedField('preferences', 'privacy', key, e.target.checked)}
                        disabled={!isEditing}
                        className="rounded"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Performance Metrics */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600 dark:text-blue-400">Reports Completed:</span>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">{profile.statistics.reportsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600 dark:text-blue-400">Average Report Time:</span>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">{profile.statistics.avgReportTime} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600 dark:text-blue-400">Client Satisfaction:</span>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">{profile.statistics.clientSatisfaction}/5.0 ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600 dark:text-blue-400">Total Valuation:</span>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">{formatCurrency(profile.statistics.totalValuation)}</span>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-4">Account Information</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 dark:text-green-400">Member Since:</span>
                      <span className="font-semibold text-green-800 dark:text-green-200">
                        {new Date(profile.statistics.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 dark:text-green-400">Last Active:</span>
                      <span className="font-semibold text-green-800 dark:text-green-200">
                        {formatDaysAgo(profile.statistics.lastActive)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 dark:text-green-400">Account Status:</span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 dark:text-green-400">Subscription:</span>
                      <Badge variant="default">Professional</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Completed valuation report for Property #VPR-247</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-blue-500">📄</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Created new report VPR-248 for Colombo property</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Received 5-star rating from client</span>
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-purple-500">🏆</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">Completed 250th report milestone</span>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">🔒 Change Password</Button>
            <Button variant="outline" size="sm">📧 Update Email</Button>
            <Button variant="outline" size="sm">📱 Two-Factor Authentication</Button>
            <Button variant="outline" size="sm">📊 Export Data</Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              🗑️ Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-yellow-400 text-lg">💡</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Profile Optimization Tips
            </h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              <ul className="list-disc pl-5 space-y-1">
                <li>Complete your professional bio to attract more clients</li>
                <li>Add all your certifications and specializations</li>
                <li>Upload a professional profile photo</li>
                <li>Keep your contact information up to date</li>
                <li>Enable relevant notifications to stay informed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}