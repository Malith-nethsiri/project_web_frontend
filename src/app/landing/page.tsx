'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const features = [
  {
    name: 'AI-Powered Document Processing',
    description: 'Automatically extract and parse property documents with advanced OCR and AI analysis.',
    icon: '🤖',
  },
  {
    name: 'Intelligent Report Generation',
    description: 'Create comprehensive valuation reports with automated data population and analysis.',
    icon: '📄',
  },
  {
    name: 'Advanced Mapping Integration',
    description: 'Utilize Google Maps integration for property location, directions, and boundary analysis.',
    icon: '🗺️',
  },
  {
    name: 'Multi-language Support',
    description: 'Process documents in Sinhala and English with intelligent translation capabilities.',
    icon: '🌐',
  },
  {
    name: 'Time-Saving Automation',
    description: 'Reduce report creation time from hours to minutes with intelligent automation.',
    icon: '⏱️',
  },
  {
    name: 'Secure & Compliant',
    description: 'Bank-grade security with comprehensive audit trails and data protection.',
    icon: '🔒',
  },
]

const benefits = [
  'Reduce report creation time by 80%',
  'Eliminate manual data entry errors',
  'Generate professional, consistent reports',
  'Streamline document processing workflow',
  'Access from anywhere, any device',
  'Comprehensive audit and compliance features',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="relative border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ValuerPro
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="animate-fade-in">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl md:text-6xl">
                  Professional{' '}
                  <span className="text-primary-600 dark:text-primary-400">
                    Property Valuation
                  </span>{' '}
                  Platform
                </h1>
                <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
                  Transform your property valuation workflow with AI-powered document processing, 
                  automated report generation, and comprehensive analysis tools designed for 
                  modern valuers.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Free Trial →
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="px-6 py-8">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-6xl">📄</span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Automated Report Generation
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Generate comprehensive valuation reports in minutes, not hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <div>
              <h2 className="text-base text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Everything you need for professional valuations
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Streamline your entire valuation process with our comprehensive suite of tools.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={feature.name}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">{feature.icon}</span>
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                  Why Choose ValuerPro?
                </h2>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                  Join thousands of professional valuers who have transformed their practice 
                  with our advanced platform.
                </p>
              </div>
              <div className="mt-8">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-6 w-6 text-green-500 flex-shrink-0 mr-3">✅</span>
                      <span className="text-base text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">80%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved</div>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">99%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center py-8 px-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reports Generated Daily</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Transform Your Valuation Practice?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of professionals who trust ValuerPro for their property valuations.
            </p>
            <div className="mt-8">
              <Link href="/auth/register">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  Start Your Free Trial →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">ValuerPro</h3>
            <p className="mt-2 text-gray-400">
              Professional Property Valuation Platform
            </p>
            <div className="mt-4 text-sm text-gray-500">
              © 2025 ValuerPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}