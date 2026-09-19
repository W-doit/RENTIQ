import { cn } from '../../lib/utils'
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from 'react'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full h-11 px-3 rounded-[var(--radius-ui)] border border-hairline bg-surface text-ink placeholder:text-ink-faint text-sm focus:border-primary outline-none transition-colors',
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full min-h-28 px-3 py-2.5 rounded-[var(--radius-ui)] border border-hairline bg-surface text-ink placeholder:text-ink-faint text-sm focus:border-primary outline-none transition-colors resize-y',
        className,
      )}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full h-11 px-3 rounded-[var(--radius-ui)] border border-hairline bg-surface text-ink text-sm focus:border-primary outline-none transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function Label({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <label
      className={cn(
        'block text-label uppercase text-ink-faint font-medium mb-1.5 tracking-[0.08em]',
        className,
      )}
    >
      {children}
    </label>
  )
}
