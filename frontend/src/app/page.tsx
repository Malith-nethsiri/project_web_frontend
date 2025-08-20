import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, CheckIcon, DocumentTextIcon, CameraIcon, MapIcon, ClockIcon, StarIcon, CloudArrowUpIcon, CpuChipIcon, MapPinIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-lg py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl sticky top-0 z-50 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="ValuerPro Logo" 
            width={48}
            height={48}
            className="h-12 w-auto mr-4 rounded-lg shadow-sm" 
          />
          <span className="text-3xl font-extrabold text-blue-800 dark:text-blue-400 tracking-tight">ValuerPro</span>
        </div>
        <nav className="hidden md:flex space-x-10">
          <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300 text-lg">Features</a>
          <a href="#why-choose-us" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300 text-lg">Why Choose Us</a>
          <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300 text-lg">How It Works</a>
          <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 font-semibold transition duration-300 text-lg">Testimonials</a>
        </nav>
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
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24 px-6 md:px-16 flex flex-col items-center justify-center text-center rounded-xl mx-4 mt-8 shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-down">
              Unlock Efficiency with <span className="text-cyan-300 drop-shadow-lg">AI-Powered Reports</span>
            </h1>
            <p className="text-lg md:text-2xl mb-10 opacity-90 animate-fade-in-up">
              Transform property documents into professional reports using advanced OCR, GPT-4o AI processing, Google Maps integration, and secure AWS cloud storage.
            </p>
            <Link 
              href="/auth/register" 
              className="inline-block bg-cyan-600 text-white font-extrabold py-4 px-10 rounded-full shadow-xl hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 ease-in-out text-xl"
            >
              Create Your First Report <ArrowRightIcon className="inline ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 md:px-16 bg-white dark:bg-slate-800 rounded-xl mx-4 mt-12 shadow-2xl">
          <h2 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">How ValuerPro Transforms Your Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center flex flex-col items-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
              <Image 
                src="/images/ocr.png" 
                alt="Advanced OCR" 
                width={160} 
                height={160}
                className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600"
              />
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Advanced OCR</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Extract text and data from any property document with state-of-the-art optical character recognition technology.</p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center flex flex-col items-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
              <Image 
                src="/images/time.png" 
                alt="Time Savings" 
                width={160} 
                height={160}
                className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600"
              />
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Lightning Fast</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Generate comprehensive reports in minutes instead of hours, maximizing your productivity and efficiency.</p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center flex flex-col items-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
              <Image 
                src="/images/map using.png" 
                alt="Google Maps Integration" 
                width={160} 
                height={160}
                className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600"
              />
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Maps Integration</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Visualize property locations with interactive Google Maps, satellite views, and location-based analytics.</p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-2xl shadow-xl text-center flex flex-col items-center border border-gray-200 dark:border-slate-600 hover:transform hover:-translate-y-2 transition-all duration-300">
              <Image 
                src="/images/ai tech.png" 
                alt="GPT-4o AI Processing" 
                width={160} 
                height={160}
                className="h-40 w-auto mb-6 object-contain rounded-xl shadow-md border-2 border-white dark:border-slate-600"
              />
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">AI-Powered Analytics</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Leverage GPT-4o artificial intelligence for deep document analysis and intelligent report generation.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-us" className="py-20 px-6 md:px-16 bg-gray-100 dark:bg-slate-700 rounded-xl mx-4 mt-12 shadow-2xl">
          <h2 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">Why ValuerPro Stands Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-blue-600 p-5 rounded-full shadow-lg">
                <CpuChipIcon className="text-white h-8 w-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">Seamless Automation</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Our GPT-4o platform automates complex data extraction and reporting, turning hours of manual work into mere minutes.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-green-600 p-5 rounded-full shadow-lg">
                <MapPinIcon className="text-white h-8 w-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">Geographic Insights</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Google Maps integration provides location context and geographic analysis for comprehensive property evaluation.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-purple-600 p-5 rounded-full shadow-lg">
                <CloudArrowUpIcon className="text-white h-8 w-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">Enterprise Security</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">AWS S3 cloud storage with enterprise-grade encryption ensures your sensitive documents are always secure.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-cyan-600 p-5 rounded-full shadow-lg">
                <DocumentIcon className="text-white h-8 w-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-3">Professional Results</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Generate accurate, professional reports that meet industry standards with PostgreSQL data reliability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-6 md:px-16 bg-white dark:bg-slate-800 rounded-xl mx-4 mt-12 shadow-2xl">
          <h2 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                <CloudArrowUpIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Upload Documents</h3>
              <p className="text-gray-600 dark:text-gray-400">Securely upload property documents to AWS S3 cloud storage</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                <CpuChipIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">AI Processing</h3>
              <p className="text-gray-600 dark:text-gray-400">GPT-4o analyzes documents using advanced OCR technology</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <MapPinIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Map Integration</h3>
              <p className="text-gray-600 dark:text-gray-400">Google Maps identifies locations and adds geographic context</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto">
                <DocumentIcon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold">Generate Report</h3>
              <p className="text-gray-600 dark:text-gray-400">Professional valuation reports created instantly</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-6 md:px-16 bg-gray-100 dark:bg-slate-700 rounded-xl mx-4 mt-12 shadow-2xl">
          <h2 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600 flex flex-col h-full">
              <div className="text-cyan-400 text-3xl mb-4">"</div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">"ValuerPro's OCR technology extracted data from our complex property documents perfectly. The GPT-4o analysis provided insights we never imagined possible."</p>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">JD</div>
                <div>
                  <p className="font-bold text-blue-800 dark:text-blue-400 text-lg">Jane Doe</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">CEO, Property Solutions Ltd</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600 flex flex-col h-full">
              <div className="text-cyan-400 text-3xl mb-4">"</div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">"The Google Maps integration is incredible. Property locations are pinpointed accurately, and the visual power enhances our geographical analysis significantly."</p>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl mr-4">MS</div>
                <div>
                  <p className="font-bold text-blue-800 dark:text-blue-400 text-lg">Mark Smith</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Lead Analyst, GeoSolutions</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600 flex flex-col h-full">
              <div className="text-cyan-400 text-3xl mb-4">"</div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">"Thanks to ValuerPro's AI and secure AWS storage, we're making smarter decisions faster than ever. It's truly an intelligent partner for our data needs."</p>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4">AR</div>
                <div>
                  <p className="font-bold text-blue-800 dark:text-blue-400 text-lg">Anna Roberts</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Operations Director, DataFlow Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center rounded-xl mx-4 my-12 shadow-2xl">
          <h2 className="text-5xl font-extrabold mb-8">Ready to Transform Your Reports?</h2>
          <p className="text-2xl mb-12 opacity-90">Experience the power of GPT-4o AI, Google Maps integration, and enterprise-grade AWS security.</p>
          <Link 
            href="/auth/register"
            className="inline-block bg-cyan-600 text-white font-extrabold py-4 px-10 rounded-full shadow-xl hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 ease-in-out text-xl"
          >
            Start Your AI-Powered Reports <ArrowRightIcon className="inline ml-2 h-5 w-5" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6 md:px-12 text-center rounded-t-xl mx-4 mb-4 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image 
              src="/images/logo.png" 
              alt="ValuerPro Logo" 
              width={32}
              height={32}
              className="w-8 h-8 rounded"
            />
            <span className="text-xl font-bold">ValuerPro</span>
          </div>
          <p className="text-md text-gray-400 mb-6">&copy; 2024 ValuerPro. All rights reserved.</p>
          <div className="flex justify-center space-x-8 mb-6">
            <Link href="#" className="text-gray-400 hover:text-white transition duration-300 text-lg">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition duration-300 text-lg">Terms of Service</Link>
            <Link href="/auth/login" className="text-gray-400 hover:text-white transition duration-300 text-lg">Dashboard</Link>
          </div>
          <div className="text-sm text-gray-500">
            <p>Powered by OpenAI GPT-4o • Google Maps API • AWS S3 • PostgreSQL</p>
          </div>
        </div>
      </footer>
    </div>
  )
}