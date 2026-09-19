import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'

interface MetricProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  animate?: boolean
}

export function Metric({ value, prefix = '', suffix = '', className, animate = true }: MetricProps) {
  const [display, setDisplay] = useState(animate ? 0 : value)

  useEffect(() => {
    if (!animate) {
      setDisplay(value)
      return
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    const start = performance.now()
    const duration = 600
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(value * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, animate])

  return (
    <span className={cn('metric text-metric tabular-nums', className ?? 'text-ink')} data-currency>
      {prefix}
      {display.toLocaleString('en-NZ')}
      {suffix}
    </span>
  )
}
