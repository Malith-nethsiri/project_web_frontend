import React from 'react'
import { clsx } from 'clsx'

interface Step {
  id: string
  name: string
  description?: string
  status: 'upcoming' | 'current' | 'complete'
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
  className?: string
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="md:flex-1">
            {step.status === 'complete' ? (
              <button
                onClick={() => onStepClick?.(stepIdx)}
                className="group flex w-full flex-col border-l-4 border-primary-600 py-2 pl-4 hover:border-primary-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 transition-colors"
              >
                <span className="text-sm font-medium text-primary-600 group-hover:text-primary-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            ) : step.status === 'current' ? (
              <div
                className="flex flex-col border-l-4 border-primary-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-primary-600">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <button
                onClick={() => onStepClick?.(stepIdx)}
                className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 transition-colors"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {step.name}
                </span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

interface StepperNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSave?: () => void
  isNextDisabled?: boolean
  isLastStep?: boolean
  isSaving?: boolean
  nextLabel?: string
  previousLabel?: string
}

export function StepperNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  isNextDisabled = false,
  isLastStep = false,
  isSaving = false,
  nextLabel,
  previousLabel = 'Previous',
}: StepperNavigationProps) {
  const getNextLabel = () => {
    if (nextLabel) return nextLabel
    if (isLastStep) return isSaving ? 'Creating Report...' : 'Create Report'
    return 'Next'
  }

  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={onPrevious}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            ← {previousLabel}
          </button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            💾 Save Draft
          </button>
        )}
        
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled || isSaving}
          className={clsx(
            'inline-flex items-center px-6 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',
            isLastStep
              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              : 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
          )}
        >
          {getNextLabel()} {!isLastStep && '→'}
        </button>
      </div>
    </div>
  )
}