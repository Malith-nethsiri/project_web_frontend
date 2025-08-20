import React from 'react'
import clsx from 'clsx'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Component>
  )
}