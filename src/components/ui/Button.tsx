import { cn } from '../../lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-180 disabled:opacity-50 disabled:pointer-events-none rounded-[var(--radius-ui)]',
        size === 'sm' && 'h-9 px-3 text-sm',
        size === 'md' && 'h-11 px-4 text-sm',
        size === 'lg' && 'h-12 px-5 text-base',
        variant === 'primary' && 'bg-primary text-primary-ink hover:bg-primary-hover',
        variant === 'secondary' &&
          'bg-surface text-ink border border-hairline hover:border-hairline-strong',
        variant === 'ghost' && 'text-ink-muted hover:text-ink hover:bg-sunken',
        variant === 'danger' && 'bg-critical text-white hover:opacity-90',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
