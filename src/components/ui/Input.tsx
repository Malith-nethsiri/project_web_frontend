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
      <div style={{ width: '100%' }}>
        {label && (
          <label 
            htmlFor={inputId} 
            style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: 'black',
              marginBottom: '4px' 
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={inputId}
          style={{ width: '100%' }}
          {...props}
        />
        {error && (
          <p style={{ marginTop: '4px', fontSize: '14px', color: 'red' }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p style={{ marginTop: '4px', fontSize: '14px', color: 'gray' }}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'