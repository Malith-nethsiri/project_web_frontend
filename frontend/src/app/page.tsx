import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, CheckIcon, DocumentTextIcon, CameraIcon, MapIcon, ClockIcon, StarIcon, CloudArrowUpIcon, CpuChipIcon, MapPinIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-800 shadow-lg py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <Image 
            src="/images/logo.png" 
            alt="ValuerPro Logo" 
            width={48} 
            height={48}
            className="h-12 w-auto rounded-lg shadow-sm"
          />
          <span className="text-3xl font-extrabold text-blue-800 dark:text-blue-400 tracking-tight">ValuerPro</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300 text-lg">Features</a>
          <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300 text-lg">How It Works</a>
          <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300 text-lg">Testimonials</a>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition duration-300 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24 px-6 md:px-16 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Transform Documents into <span className="text-cyan-300 drop-shadow-lg">Smart Reports</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 opacity-90">
            Upload any property document and watch our AI extract data, integrate Google Maps, and generate professional valuation reports in minutes. Powered by GPT-4o and advanced OCR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/auth/register"
              className="bg-cyan-600 text-white font-extrabold py-4 px-10 rounded-full shadow-xl hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 ease-in-out text-xl inline-flex items-center"
            >
              Create Your First Report
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-cyan-300" />
              <span className="font-semibold">GPT-4o AI Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-cyan-300" />
              <span className="font-semibold">Google Maps Integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-cyan-300" />
              <span className="font-semibold">Advanced OCR</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-cyan-300" />
              <span className="font-semibold">AWS Cloud Storage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-16 bg-white dark:bg-slate-800 mx-4 mt-12 rounded-xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">Core Features That Power Your Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
            <Image 
              src="/images/ocr.png" 
              alt="Advanced OCR" 
              width={160} 
              height={160}
              className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600 mx-auto"
            />
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Advanced OCR</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Extract text and data from any property document with state-of-the-art optical character recognition technology.</p>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
            <Image 
              src="/images/ai tech.png" 
              alt="GPT-4o AI Processing" 
              width={160} 
              height={160}
              className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600 mx-auto"
            />
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">GPT-4o AI Processing</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Leverage OpenAI's most advanced model to analyze documents and generate intelligent insights automatically.</p>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
            <Image 
              src="/images/map using.png" 
              alt="Google Maps Integration" 
              width={160} 
              height={160}
              className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600 mx-auto"
            />
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Google Maps Integration</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Automatically visualize property locations with interactive maps, satellite views, and location-based analytics.</p>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
            <Image 
              src="/images/time.png" 
              alt="Cloud Storage" 
              width={160} 
              height={160}
              className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600 mx-auto"
            />
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Secure Cloud Storage</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">All documents safely stored on AWS S3 with enterprise-grade security and instant global access.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 md:px-16 bg-gray-100 dark:bg-slate-700 mx-4 mt-12 rounded-xl shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-4">
              How ValuerPro Transforms Your Workflow
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Four simple steps from document upload to professional report generation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CloudArrowUpIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">1. Upload Documents</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Securely upload any property document to AWS S3 cloud storage with enterprise-grade encryption.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CpuChipIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">2. AI Processing</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GPT-4o analyzes your documents using advanced OCR to extract key property data and insights.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MapPinIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">3. Map Integration</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Google Maps automatically identifies property locations and adds interactive mapping features.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <DocumentIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">4. Generate Report</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Professional valuation reports generated instantly with all data, maps, and analysis compiled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ValuerPro */}
      <section className="py-20 px-6 md:px-16 bg-white dark:bg-slate-800 mx-4 mt-12 rounded-xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">Why ValuerPro Stands Out</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 bg-blue-600 p-5 rounded-full shadow-lg">
              <CpuChipIcon className="text-white text-3xl h-8 w-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">AI-Powered Automation</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Our GPT-4o integration automatically processes documents, extracts key data, and generates intelligent insights, turning hours of manual work into minutes.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 bg-green-600 p-5 rounded-full shadow-lg">
              <MapPinIcon className="text-white text-3xl h-8 w-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">Seamless Maps Integration</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Google Maps API automatically identifies property locations, provides satellite imagery, and enhances reports with geographical context.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 bg-purple-600 p-5 rounded-full shadow-lg">
              <CloudArrowUpIcon className="text-white text-3xl h-8 w-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">Enterprise Security</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">AWS S3 cloud storage with enterprise-grade encryption ensures your sensitive documents are always secure and accessible.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 bg-cyan-600 p-5 rounded-full shadow-lg">
              <DocumentIcon className="text-white text-3xl h-8 w-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">Professional Results</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Generate comprehensive, professional valuation reports that meet industry standards with accurate data extraction and formatting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 md:px-16 bg-gray-100 dark:bg-slate-700 mx-4 mt-12 rounded-xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600">
            <div className="text-cyan-400 text-3xl mb-4">"</div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">
              "ValuerPro's OCR technology extracted data from our oldest property deeds perfectly. The GPT-4o analysis provided insights we never thought possible."
            </p>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div className="ml-4">
                <p className="font-bold text-blue-800 dark:text-blue-400 text-lg">John Davidson</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Senior Property Valuer</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600">
            <div className="text-cyan-400 text-3xl mb-4">"</div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">
              "The Google Maps integration is seamless. Property locations are pinpointed accurately, and the satellite views add tremendous value to our reports."
            </p>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                SM
              </div>
              <div className="ml-4">
                <p className="font-bold text-blue-800 dark:text-blue-400 text-lg">Sarah Mitchell</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Lead Real Estate Analyst</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600">
            <div className="text-cyan-400 text-3xl mb-4">"</div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">
              "Security was our main concern, but AWS S3 storage with enterprise encryption gives us complete confidence in document safety."
            </p>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl">
                AR
              </div>
              <div className="ml-4">
                <p className="font-bold text-blue-800 dark:text-blue-400 text-lg">Anna Roberts</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Operations Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center mx-4 my-12 rounded-xl shadow-2xl">
        <h2 className="text-5xl font-extrabold mb-8">Ready to Revolutionize Your Reports?</h2>
        <p className="text-2xl mb-12 opacity-90">Experience the power of AI-driven document processing with GPT-4o, Google Maps integration, and secure cloud storage.</p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <Link 
            href="/auth/register"
            className="bg-cyan-600 text-white font-extrabold py-4 px-10 rounded-full shadow-xl hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 ease-in-out text-xl inline-flex items-center justify-center"
          >
            Start Processing Documents Now
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/auth/login"
            className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-800 transition duration-300 text-xl"
          >
            Sign In to Dashboard
          </Link>
        </div>
        
        <div className="text-blue-200 text-sm">
          <p>✓ Secure AWS S3 Storage • ✓ GPT-4o AI Processing • ✓ Google Maps Integration</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6 md:px-12 text-center mx-4 mb-4 rounded-t-xl shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image 
              src="/images/logo.png" 
              alt="ValuerPro Logo" 
              width={40} 
              height={40}
              className="h-10 w-10 rounded-lg"
            />
            <span className="text-2xl font-bold">ValuerPro</span>
          </div>
          
          <p className="text-lg text-gray-300 mb-6">
            AI-powered document processing with GPT-4o, Google Maps, and AWS cloud storage
          </p>
          
          <div className="flex justify-center space-x-8 mb-6 text-gray-400">
            <Link href="#" className="hover:text-white transition duration-300 text-lg">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition duration-300 text-lg">Terms of Service</Link>
            <Link href="/auth/login" className="hover:text-white transition duration-300 text-lg">Dashboard</Link>
          </div>
          
          <p className="text-md text-gray-400 mb-4">
            © 2024 ValuerPro. All rights reserved.
          </p>
          
          <div className="text-sm text-gray-500">
            <p>Powered by OpenAI GPT-4o • Google Maps API • AWS S3 • PostgreSQL</p>
          </div>
        </div>
      </footer>
    </div>
  )
}