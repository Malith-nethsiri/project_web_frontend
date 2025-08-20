'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { ThemeToggle } from '../../../components/ui/ThemeToggle'
import { apiClient } from '@/lib/api/client'
import { ArrowRightIcon, EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      await apiClient.register(formData.email, formData.password)
      
      // Auto-login after successful registration
      await apiClient.login(formData.email, formData.password)
      router.push('/dashboard')
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.detail || 'Registration failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-success/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      
      {/* Theme toggle positioned at top right */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      
      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">VP</span>
            </div>
            <span className="text-3xl font-bold text-neutral-800">ValuerPro</span>
          </motion.div>
          <motion.p 
            className="text-neutral-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of property professionals
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="card-premium p-8 border-0 shadow-large">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <motion.div 
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {errors.general}
                </motion.div>
              )}

              <div className="space-y-4">
                <Input
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  autoComplete="email"
                  className="rounded-xl border-neutral-300 focus:border-primary focus:ring-primary"
                />

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password || "Minimum 6 characters"}
                    required
                    autoComplete="new-password"
                    className="rounded-xl border-neutral-300 focus:border-primary focus:ring-primary pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-neutral-500 hover:text-neutral-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    required
                    autoComplete="new-password"
                    className="rounded-xl border-neutral-300 focus:border-primary focus:ring-primary pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-neutral-500 hover:text-neutral-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-lg py-4 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.email || !formData.password || !formData.confirmPassword || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              
              {/* Benefits */}
              <div className="bg-neutral-50 rounded-xl p-4 mt-6">
                <h4 className="font-semibold text-neutral-800 mb-3">What you get:</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-neutral-600">
                    <CheckIcon className="h-4 w-4 text-success mr-2" />
                    <span>Advanced OCR & AI processing</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <CheckIcon className="h-4 w-4 text-success mr-2" />
                    <span>Professional report templates</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <CheckIcon className="h-4 w-4 text-success mr-2" />
                    <span>Google Maps integration</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <CheckIcon className="h-4 w-4 text-success mr-2" />
                    <span>Secure cloud storage</span>
                  </div>
                </div>
              </div>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-neutral-600">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary/80 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}