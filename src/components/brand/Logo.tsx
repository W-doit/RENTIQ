import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

function TeaHouseMark({ size, invert }: { size: number; invert?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn('shrink-0', invert ? 'text-basalt-ink' : 'text-ink')}
    >
      {/* Vessel / A-frame — no tile background */}
      <path
        d="M16 7.2 L24.8 13.8 L21.6 23.6 L10.4 23.6 L7.2 13.8 Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 13.8 Q16 16.4 24.8 13.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M24.2 15.6 C27.4 16.5 27.6 20.2 22.4 20.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 16.6 L16 19"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <rect
        x="14.2"
        y="19"
        width="3.6"
        height="4.6"
        rx="0.6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M6.4 26.4 Q16 27.8 25.6 26.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <g
        className="animate-steam origin-center"
        stroke="hsl(37 96% 55%)"
        strokeWidth="1.45"
        strokeLinecap="round"
      >
        <path d="M14.4 5.6 C13.2 4.6 15.2 3.6 14 2.5" />
        <path d="M18.2 5.4 C19.4 4.4 17.4 3.4 18.6 2.3" />
      </g>
    </svg>
  )
}

export function Logo({
  size = 'md',
  invert = false,
}: {
  size?: 'sm' | 'md' | 'lg'
  invert?: boolean
}) {
  const text = size === 'lg' ? 'text-5xl' : size === 'sm' ? 'text-2xl' : 'text-3xl'
  const mark = size === 'lg' ? 72 : size === 'sm' ? 44 : 56
  const handle = size === 'lg' ? 'w-4 h-4 -right-2' : size === 'sm' ? 'w-3 h-3 -right-1.5' : 'w-3.5 h-3.5 -right-2'

  return (
    <Link to="/" className="inline-flex items-center gap-3 group" aria-label="RentIQ home">
      <TeaHouseMark size={mark} invert={invert} />
      <span
        className={cn(
          'font-display font-extrabold tracking-[-0.03em] leading-none',
          text,
          invert ? 'text-basalt-ink' : 'text-ink',
        )}
      >
        Rent
        <span className={cn('relative inline-block', invert ? 'text-accent' : 'text-primary')}>
          IQ
          <svg
            className={cn('absolute top-[55%] opacity-80', handle)}
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 3 C6 3.5 7 6.5 3.5 7.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </span>
    </Link>
  )
}
