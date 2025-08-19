import Link from 'next/link'
import { ArrowRightIcon, DocumentTextIcon, CameraIcon, MapIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ValuerPro
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-secondary-600 hover:text-secondary-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-secondary-900 mb-6">
              AI-Powered 
              <span className="bg-gradient-primary bg-clip-text text-transparent block sm:inline">
                {' '}Valuation Reports
              </span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Generate professional valuation reports 70% faster with our AI-powered platform. 
              OCR extraction, smart field mapping, and automated report generation for certified valuers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center"
              >
                Start Creating Reports
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#demo"
                className="btn-secondary text-lg px-8 py-3"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Streamline Your Valuation Process
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              From document upload to professional report generation, our platform handles the technical complexity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Smart OCR Extraction
              </h3>
              <p className="text-secondary-600">
                Upload survey plans and deeds. Our AI extracts lot numbers, boundaries, and property details automatically.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Maps Integration
              </h3>
              <p className="text-secondary-600">
                Automatic Google Maps integration with location pins, static images, and AI-generated access directions.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Professional Reports
              </h3>
              <p className="text-secondary-600">
                Generate compliant SLVS/IVS reports with your profile auto-inserted. Export to DOCX and PDF formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Valuation Workflow?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join professional valuers already saving hours per report.
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-primary-600 hover:bg-primary-50 font-bold py-3 px-8 rounded-lg text-lg inline-flex items-center transition-colors duration-200"
          >
            Get Started Free
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">ValuerPro</h3>
            <p className="text-secondary-400 mb-6">
              Professional AI-powered valuation platform for certified valuers
            </p>
            <p className="text-secondary-500 text-sm">
              © 2024 ValuerPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}