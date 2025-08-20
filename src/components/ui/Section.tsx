import React from 'react'
import clsx from 'clsx'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section className={clsx('py-16 sm:py-20', className)} id={id}>
      {children}
    </section>
  )
}