'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon, 
  CheckIcon, 
  DocumentTextIcon, 
  CameraIcon, 
  MapIcon, 
  ClockIcon, 
  StarIcon, 
  CloudArrowUpIcon, 
  CpuChipIcon, 
  MapPinIcon, 
  DocumentIcon,
  PlayIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { ThemeToggle } from '../components/ui/ThemeToggle'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const features = [
  {
    icon: DocumentTextIcon,
    title: "Advanced OCR Technology",
    description: "Extract text and data from any property document with 99.9% accuracy using state-of-the-art AI vision models.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: BoltIcon,
    title: "Lightning Fast Processing",
    description: "Generate comprehensive reports in under 60 seconds. From upload to final PDF - faster than any manual process.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: MapPinIcon,
    title: "Smart Location Intelligence",
    description: "Automatic GPS coordinates, satellite imagery, and location-based analytics powered by Google Maps API.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: CpuChipIcon,
    title: "GPT-4o AI Processing",
    description: "Advanced language models analyze property documents and generate intelligent insights automatically.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Security",
    description: "Bank-grade encryption with AWS S3 storage. Your sensitive property data is always protected.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: ChartBarIcon,
    title: "Professional Reports",
    description: "Generate DOCX and PDF reports that meet industry standards with customizable templates.",
    gradient: "from-teal-500 to-green-500"
  }
]

const steps = [
  {
    number: "01",
    title: "Upload Documents",
    description: "Drag and drop your property documents - survey plans, deeds, or photos. Supports all major formats.",
    icon: CloudArrowUpIcon
  },
  {
    number: "02", 
    title: "AI Processing",
    description: "Our GPT-4o engine extracts key information while OCR technology digitizes all text content.",
    icon: CpuChipIcon
  },
  {
    number: "03",
    title: "Smart Analysis",
    description: "Location data is automatically geocoded and property details are intelligently categorized.",
    icon: MapIcon
  },
  {
    number: "04",
    title: "Professional Output",
    description: "Download your complete valuation report in DOCX or PDF format, ready for clients.",
    icon: DocumentIcon
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Property Valuer",
    company: "PropertyFirst Ltd",
    avatar: "SC",
    rating: 5,
    quote: "ValuerPro has transformed our workflow completely. What used to take 3-4 hours now takes 30 minutes. The OCR accuracy is incredible.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Surveyor", 
    company: "Urban Valuations",
    avatar: "MR",
    rating: 5,
    quote: "The Google Maps integration is a game-changer. Property locations are pinpointed perfectly, and the satellite imagery adds real value.",
    gradient: "from-green-500 to-teal-500"
  },
  {
    name: "David Kim",
    role: "Principal Valuer",
    company: "Metro Property Group",
    avatar: "DK", 
    rating: 5,
    quote: "The AI analysis catches details we might miss. It's like having a senior valuer reviewing every report before it goes out.",
    gradient: "from-purple-500 to-pink-500"
  }
]

const stats = [
  { number: "10,000+", label: "Reports Generated" },
  { number: "99.9%", label: "OCR Accuracy" },
  { number: "60s", label: "Average Processing Time" },
  { number: "500+", label: "Happy Valuers" }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Premium Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="text-2xl font-bold text-neutral-800">ValuerPro</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-600 hover:text-primary font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-neutral-600 hover:text-primary font-medium transition-colors">How it Works</a>
              <a href="#testimonials" className="text-neutral-600 hover:text-primary font-medium transition-colors">Reviews</a>
              <a href="#pricing" className="text-neutral-600 hover:text-primary font-medium transition-colors">Pricing</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/login" className="text-neutral-600 hover:text-primary font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Get Started
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container-custom relative">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="heading-xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Property Valuations Made{' '}
              <span className="text-gradient">Intelligent</span>
            </motion.h1>
            
            <motion.p 
              className="text-large mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform property documents into professional valuation reports in seconds. 
              Advanced OCR, GPT-4o AI, and Google Maps integration - all in one platform.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 group">
                <PlayIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            className="mt-16 relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-large p-6 border border-neutral-200">
                <div className="aspect-video bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl relative overflow-hidden">
                  {/* Mock Dashboard Interface */}
                  <div className="absolute inset-0 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-xs text-neutral-500 font-mono">ValuerPro Dashboard</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <DocumentTextIcon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-neutral-300 rounded w-3/4 mb-1"></div>
                          <div className="h-1.5 bg-neutral-200 rounded w-1/2"></div>
                        </div>
                        <div className="w-12 h-6 bg-success rounded-full flex items-center justify-center">
                          <div className="text-xs text-white font-medium">✓</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                          <CameraIcon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-neutral-300 rounded w-2/3 mb-1"></div>
                          <div className="h-1.5 bg-neutral-200 rounded w-1/3"></div>
                        </div>
                        <div className="w-12 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                          <MapIcon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-neutral-300 rounded w-4/5 mb-1"></div>
                          <div className="h-1.5 bg-neutral-200 rounded w-2/5"></div>
                        </div>
                        <div className="w-12 h-6 bg-neutral-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-2 -right-2 bg-success text-white p-2 rounded-lg shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckIcon className="h-4 w-4" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-2 -left-2 bg-accent text-white p-2 rounded-lg shadow-lg"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <BoltIcon className="h-4 w-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-4">Powerful Features for Modern Valuers</h2>
            <p className="text-large max-w-2xl mx-auto">
              Everything you need to create professional property valuation reports faster and more accurately than ever.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="card-feature group"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="heading-sm mb-4 text-xl">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-4">How ValuerPro Works</h2>
            <p className="text-large max-w-2xl mx-auto">
              From document upload to professional report - our streamlined process makes property valuation effortless.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col lg:flex-row items-center mb-16 last:mb-0"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step Number */}
                <div className="flex-shrink-0 mb-8 lg:mb-0 lg:mr-12">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent text-white text-2xl font-bold flex items-center justify-center shadow-large">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <step.icon className="h-8 w-8 text-primary mr-3" />
                    <h3 className="heading-sm text-2xl">{step.title}</h3>
                  </div>
                  <p className="text-body max-w-lg">{step.description}</p>
                </div>

                {/* Visual */}
                <div className="flex-shrink-0 mt-8 lg:mt-0 lg:ml-12">
                  <div className="w-48 h-32 bg-white rounded-xl shadow-card border border-neutral-200 p-4">
                    <div className="h-full bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-neutral-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-4">Trusted by Property Professionals</h2>
            <p className="text-large max-w-2xl mx-auto">
              See how ValuerPro is transforming workflows for valuers, surveyors, and property professionals worldwide.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="card-premium p-8"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-neutral-700 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.role}</div>
                    <div className="text-sm text-neutral-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animated opacity-10"></div>
        <div className="container-custom relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Valuations?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of property professionals who&apos;ve already streamlined their workflow with ValuerPro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register" className="btn-accent text-lg px-8 py-4">
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/demo" className="btn-secondary text-lg px-8 py-4 !text-white !border-white hover:!bg-white hover:!text-primary">
                Book Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">VP</span>
                </div>
                <span className="text-2xl font-bold text-white">ValuerPro</span>
              </div>
              <p className="text-neutral-400 max-w-md mb-6">
                The most advanced AI-powered property valuation platform. Transform your workflow with intelligent automation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <GlobeAltIcon className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/demo" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="/integrations" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-neutral-500 text-sm">
              © 2024 ValuerPro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-neutral-500 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="/terms" className="text-neutral-500 hover:text-white text-sm transition-colors">Terms</a>
              <a href="/security" className="text-neutral-500 hover:text-white text-sm transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}