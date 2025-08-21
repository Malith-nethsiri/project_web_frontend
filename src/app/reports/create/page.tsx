'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useReportWizardStore } from '@/stores/report-wizard'
import { Stepper, StepperNavigation } from '@/components/ui/stepper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useUIStore } from '@/stores/ui'

// Step Components
import { ReportMetadataStep } from '@/components/reports/steps/report-metadata-step'
import { ApplicantInformationStep } from '@/components/reports/steps/applicant-information-step'
import { PropertyDetailsStep } from '@/components/reports/steps/property-details-step'
import { ValuationDetailsStep } from '@/components/reports/steps/valuation-details-step'
import { LegalAspectsStep } from '@/components/reports/steps/legal-aspects-step'
import { PhotosStep } from '@/components/reports/steps/photos-step'
import { ComparablesStep } from '@/components/reports/steps/comparables-step'
import { ReviewConfirmationStep } from '@/components/reports/steps/review-confirmation-step'

type StepStatus = 'current' | 'upcoming' | 'complete'

const steps: { id: string; name: string; status: StepStatus }[] = [
  { id: 'Step 1', name: 'Report Metadata', status: 'current' },
  { id: 'Step 2', name: 'Applicant Information', status: 'upcoming' },
  { id: 'Step 3', name: 'Property Details', status: 'upcoming' },
  { id: 'Step 4', name: 'Valuation Details', status: 'upcoming' },
  { id: 'Step 5', name: 'Legal Aspects', status: 'upcoming' },
  { id: 'Step 6', name: 'Photos', status: 'upcoming' },
  { id: 'Step 7', name: 'Comparables', status: 'upcoming' },
  { id: 'Step 8', name: 'Review & Confirm', status: 'upcoming' },
]

const stepComponents = [
  ReportMetadataStep,
  ApplicantInformationStep,
  PropertyDetailsStep,
  ValuationDetailsStep,
  LegalAspectsStep,
  PhotosStep,
  ComparablesStep,
  ReviewConfirmationStep,
]

export default function CreateReportPage() {
  const router = useRouter()
  const { addNotification } = useUIStore()
  
  const {
    currentStep,
    formData,
    isSaving,
    setCurrentStep,
    validateStep,
    resetForm,
    setSaving,
  } = useReportWizardStore()

  const [localSteps, setLocalSteps] = useState(steps)

  // Update step status based on current step
  useEffect(() => {
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      status: index < currentStep ? 'complete' as const
        : index === currentStep ? 'current' as const
        : 'upcoming' as const
    }))
    setLocalSteps(updatedSteps)
  }, [currentStep])

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    } else {
      addNotification({
        type: 'error',
        message: 'Please complete all required fields before proceeding.',
      })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (step: number) => {
    // Allow going back to previous steps, but validate current step before going forward
    if (step <= currentStep || validateStep(currentStep)) {
      setCurrentStep(step)
    }
  }

  const handleSaveDraft = async () => {
    setSaving(true)
    try {
      // Simulate API call to save draft
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addNotification({
        type: 'success',
        message: 'Draft saved successfully!',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to save draft. Please try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      // Simulate API call to create report
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const reportId = `report_${Date.now()}`
      
      addNotification({
        type: 'success',
        message: 'Report created successfully!',
      })

      // Redirect to report view page
      router.push(`/reports/${reportId}`)
      resetForm()
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to create report. Please try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  const CurrentStepComponent = stepComponents[currentStep]
  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create New Valuation Report
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Complete all sections to generate a comprehensive property valuation report
        </p>
      </div>

      {/* Progress Stepper */}
      <Card>
        <CardContent className="p-6">
          <Stepper 
            steps={localSteps} 
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="text-primary-600 dark:text-primary-400 mr-2">
              {localSteps[currentStep].id}
            </span>
            {localSteps[currentStep].name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <CurrentStepComponent />
          
          {/* Navigation */}
          <StepperNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSave={handleSaveDraft}
            isNextDisabled={isSaving}
            isLastStep={isLastStep}
            isSaving={isSaving}
          />
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}