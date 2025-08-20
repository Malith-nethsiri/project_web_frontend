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
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#333',
            backgroundColor: '#fff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            WebkitTextFillColor: '#333',
            WebkitAppearance: 'none',
            opacity: 1,
            visibility: 'visible',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#0070f3'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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