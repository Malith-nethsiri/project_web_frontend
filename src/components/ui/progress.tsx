import * as React from 'react'
import { clsx } from 'clsx'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showLabel = false, size = 'md', variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    }

    const variantClasses = {
      default: 'bg-primary-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      error: 'bg-red-600',
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className={clsx(
            'h-full flex-1 transition-all duration-300 ease-in-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
        {showLabel && (
          <span
            className={clsx(
              'absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-gray-100',
              size === 'sm' && 'text-[10px]'
            )}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }