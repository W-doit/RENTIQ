import { cn, statusBarColor } from '../../lib/utils'

export function StatusDot({ status, label }: { status: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
      <span className={cn('h-2 w-2 rounded-full shrink-0', statusBarColor(status))} />
      {label ?? status}
    </span>
  )
}

export function StatusBar({ status }: { status: string }) {
  return <span className={cn('absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[14px]', statusBarColor(status))} />
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('h-1.5 w-full rounded-full bg-sunken overflow-hidden', className)}>
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
