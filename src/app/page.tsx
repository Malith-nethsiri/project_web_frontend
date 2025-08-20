'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon, 
  CheckIcon, 
  DocumentTextIcon, 
  MapPinIcon, 
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  PlayIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
    description: "Extract text and data from property documents with 99.9% accuracy using state-of-the-art AI."
  },
  {
    icon: MapPinIcon,
    title: "Smart Location Intelligence",
    description: "Automatic GPS coordinates and satellite imagery powered by Google Maps API."
  },
  {
    icon: BoltIcon,
    title: "Lightning Fast Processing",
    description: "Generate comprehensive reports in under 60 seconds, faster than any manual process."
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Security",
    description: "Bank-grade encryption with secure cloud storage. Your data is always protected."
  }
]

const steps = [
  {
    number: "01",
    title: "Upload Documents",
    description: "Drag and drop your property documents. Supports all major formats.",
    icon: CloudArrowUpIcon
  },
  {
    number: "02", 
    title: "AI Processing",
    description: "Our AI extracts key information and digitizes all text content automatically.",
    icon: CpuChipIcon
  },
  {
    number: "03",
    title: "Generate Report",
    description: "Download your complete valuation report in DOCX or PDF format.",
    icon: ChartBarIcon
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Property Valuer",
    company: "PropertyFirst Ltd",
    avatar: "SC",
    rating: 5,
    quote: "ValuerPro has transformed our workflow completely. What used to take 3-4 hours now takes 30 minutes."
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Surveyor", 
    company: "Urban Valuations",
    avatar: "MR",
    rating: 5,
    quote: "The Google Maps integration is a game-changer. Property locations are pinpointed perfectly."
  },
  {
    name: "David Kim",
    role: "Principal Valuer",
    company: "Metro Property Group",
    avatar: "DK", 
    rating: 5,
    quote: "The AI analysis catches details we might miss. It's like having a senior valuer on every report."
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <Section className="pt-20">
        <Container>
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <motion.h1 
                className="text-4xl font-semibold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Property Valuations Made{' '}
                <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                  Intelligent
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Transform property documents into professional valuation reports in seconds. 
                Advanced OCR, AI processing, and Google Maps integration.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link href="/auth/register">
                  <Button size="lg" className="text-base px-8">
                    Start Free Trial
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="text-base px-8">
                  <PlayIcon className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </motion.div>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Image 
                src="/images/ai tech.png"
                alt="AI-powered property valuation"
                width={600}
                height={400}
                className="rounded-2xl shadow-large"
                priority
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Social Proof */}
      <Section>
        <Container>
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground mb-8">Trusted by valuers worldwide</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section id="how" className="bg-muted/30">
        <Container>
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">How ValuerPro Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From document upload to professional report - our streamlined process makes property valuation effortless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-brand text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <step.icon className="h-8 w-8 text-brand mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section id="features">
        <Container>
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">Powerful Features for Modern Valuers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional property valuation reports faster and more accurately.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-2xl p-8 border shadow-soft hover:shadow-medium transition-all duration-300"
                variants={fadeInUp}
              >
                <feature.icon className="h-12 w-12 text-brand mb-4" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="reviews" className="bg-muted/30">
        <Container>
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">Trusted by Property Professionals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how ValuerPro is transforming workflows for valuers and property professionals worldwide.
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
                className="bg-card rounded-2xl p-8 border shadow-soft hover:shadow-medium transition-all duration-300"
                variants={fadeInUp}
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand to-accent flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <Container>
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for your valuation business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="bg-card rounded-2xl p-8 border shadow-soft"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
              <div className="text-3xl font-bold mb-4">$0<span className="text-lg text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>5 reports per month</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>Basic OCR processing</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>Email support</span>
                </li>
              </ul>
              <Link href="/auth/register">
                <Button variant="secondary" className="w-full">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              className="bg-card rounded-2xl p-8 border-2 border-brand shadow-large relative"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-4">$49<span className="text-lg text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground mb-6">For professional valuers</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited reports</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>Advanced AI processing</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>Google Maps integration</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>Custom templates</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/auth/register">
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-r from-brand to-accent text-white">
        <Container>
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Valuations?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of property professionals who&apos;ve streamlined their workflow with ValuerPro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button variant="secondary" size="lg" className="text-base px-8">
                  Start Free Trial
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="text-base px-8 text-white border-white hover:bg-white/10">
                Book Demo
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}