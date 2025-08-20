import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={inputId}
          style={{
            width: '100%',
            padding: '12px',
            border: '3px solid blue',
            borderRadius: '8px',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'yellow',
            fontWeight: 'bold'
          }}
          className={clsx(
            'form-input w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-offset-0 transition-colors',
            {
              'border-secondary-300 focus:border-primary-500 focus:ring-primary-500': !error,
              'border-red-300 focus:border-red-500 focus:ring-red-500': error,
            },
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'