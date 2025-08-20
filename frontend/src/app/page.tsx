import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, CheckIcon, DocumentTextIcon, CameraIcon, MapIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image 
                src="/images/logo.png" 
                alt="ValuerPro Logo" 
                width={40} 
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-foreground">ValuerPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/auth/login"
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                Sign In
              </Link>
              <Button asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-20">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                  AI-Powered
                  <span className="block text-blue-600 dark:text-blue-400">
                    Valuation Reports
                  </span>
                  <span className="block text-2xl md:text-3xl font-normal text-muted-foreground mt-2">
                    70% faster than manual
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Generate professional SLVS/IVS compliant reports with OCR extraction, Google Maps integration, and automated field mapping. Used by 500+ certified valuers.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link href="/auth/register" className="inline-flex items-center">
                    Create Your First Report
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Watch 60-sec Demo
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>SLVS/IVS Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>DOCX/PDF Export</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Google Maps Built-in</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>OCR v1.5</span>
                </div>
              </div>
            </div>

            {/* Right Visuals */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <Image 
                        src="/images/ai tech.png" 
                        alt="AI Technology" 
                        width={200} 
                        height={200}
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="mt-3 text-center">
                        <h3 className="font-semibold text-sm">AI-Powered Engine</h3>
                        <p className="text-xs text-muted-foreground mt-1">Smart field detection</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-white dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <Image 
                        src="/images/time.png" 
                        alt="Time Savings" 
                        width={200} 
                        height={200}
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="mt-3 text-center">
                        <h3 className="font-semibold text-sm">70% Time Savings</h3>
                        <p className="text-xs text-muted-foreground mt-1">Minutes not hours</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4 mt-8">
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-white dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <Image 
                        src="/images/ocr.png" 
                        alt="OCR Technology" 
                        width={200} 
                        height={200}
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="mt-3 text-center">
                        <h3 className="font-semibold text-sm">Smart OCR</h3>
                        <p className="text-xs text-muted-foreground mt-1">Extract any document</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-orange-50 to-white dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <Image 
                        src="/images/map using.png" 
                        alt="Maps Integration" 
                        width={200} 
                        height={200}
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="mt-3 text-center">
                        <h3 className="font-semibold text-sm">Maps Integration</h3>
                        <p className="text-xs text-muted-foreground mt-1">Automatic location pins</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How ValuerPro Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to professional valuation reports
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                <CameraIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Upload Documents</h3>
              <p className="text-muted-foreground">
                Drag & drop survey plans, deeds, or any property documents
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                <DocumentTextIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">AI Suggests Fields</h3>
              <p className="text-muted-foreground">
                Our AI extracts key data and maps to the correct report fields
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <ArrowRightIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Review & Export</h3>
              <p className="text-muted-foreground">
                Quick review, then export to DOCX or PDF formats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Report Templates
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose from professional templates for any valuation type
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Residential Property", subtitle: "Single family homes", color: "blue" },
              { title: "Bank Refinance", subtitle: "Mortgage valuations", color: "green" },
              { title: "Land Valuation", subtitle: "Vacant lots & plots", color: "purple" },
              { title: "Commercial Building", subtitle: "Office & retail", color: "orange" }
            ].map((template, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-${template.color}-100 dark:bg-${template.color}-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <DocumentTextIcon className={`h-6 w-6 text-${template.color}-600 dark:text-${template.color}-400`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{template.subtitle}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Sample PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Proof */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Proven Results
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">70% Faster</div>
                    <div className="text-muted-foreground">Average time savings per report</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">&lt;18 Minutes</div>
                    <div className="text-muted-foreground">Average completion time</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <StarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">30% Fewer</div>
                    <div className="text-muted-foreground">Revisions needed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-white dark:bg-slate-800 border-l-4 border-l-blue-500">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">
                      JD
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        "ValuerPro cut our report prep time by more than half. The OCR accuracy is incredible."
                      </p>
                      <div className="text-sm font-medium">John Davidson</div>
                      <div className="text-sm text-muted-foreground">Senior Valuer, Property Solutions Ltd</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white dark:bg-slate-800 border-l-4 border-l-green-500">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">
                      SM
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        "The Google Maps integration alone saves us hours. Everything just works seamlessly."
                      </p>
                      <div className="text-sm font-medium">Sarah Mitchell</div>
                      <div className="text-sm text-muted-foreground">Licensed Valuer, Mitchell & Associates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Valuation Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 500+ professional valuers already saving hours per report
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/auth/register" className="inline-flex items-center">
                Start Your Free Trial
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image 
                  src="/images/logo.png" 
                  alt="ValuerPro Logo" 
                  width={32} 
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">ValuerPro</span>
              </div>
              <p className="text-slate-400 mb-4">
                AI-powered valuation platform for certified professionals
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/changelog" className="hover:text-white transition-colors">What's New</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 ValuerPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}