import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, List, Plus } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { StatusDot } from '../../components/ui/Status'
import { mockProperties } from '../../data/mock'
import { cn, formatCurrency } from '../../lib/utils'
import type { PropertyStatus } from '../../types/database'

export function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<PropertyStatus | 'all'>('all')

  const filtered =
    filter === 'all' ? mockProperties : mockProperties.filter((p) => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-1">Portfolio</p>
          <h1 className="font-display text-3xl font-semibold">Properties</h1>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add property
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 p-1 bg-sunken rounded-[var(--radius-ui)]">
          {(['all', 'occupied', 'vacant', 'compliance-due'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'relative px-3 h-8 text-xs rounded-[8px] capitalize transition-colors',
                filter === f ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted',
              )}
            >
              {filter === f && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full" />
              )}
              {f === 'all' ? 'All' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setView('grid')}
            className={cn('p-2 rounded-[8px]', view === 'grid' ? 'bg-sunken text-ink' : 'text-ink-faint')}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={cn('p-2 rounded-[8px]', view === 'list' ? 'bg-sunken text-ink' : 'text-ink-faint')}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              to={`/properties/${p.id}`}
              className="group relative bg-surface border border-hairline rounded-[var(--radius-card)] overflow-hidden hover:border-hairline-strong hover:-translate-y-px transition-all animate-settle"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] z-10 ${
                  p.status === 'occupied'
                    ? 'bg-positive'
                    : p.status === 'vacant'
                      ? 'bg-caution'
                      : 'bg-critical'
                }`}
              />
              <img src={p.image_url} alt="" className="h-40 w-full object-cover" />
              <div className="p-4">
                <p className="font-medium text-sm mb-1">{p.address}</p>
                <p className="text-xs text-ink-faint mb-3">
                  {p.suburb}, {p.city} · {p.bedrooms} bed · {p.bathrooms} bath
                </p>
                <div className="flex items-center justify-between">
                  <StatusDot status={p.status} label={p.status.replace('-', ' ')} />
                  <span className="text-sm tabular-nums font-medium" data-currency>
                    {formatCurrency(p.rent_weekly)}/wk
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-hairline rounded-[var(--radius-card)] overflow-hidden bg-surface">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/properties/${p.id}`}
              className="relative flex items-center gap-4 px-4 py-3.5 border-b border-hairline last:border-0 hover:bg-sunken/40"
            >
              <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                  p.status === 'occupied'
                    ? 'bg-positive'
                    : p.status === 'vacant'
                      ? 'bg-caution'
                      : 'bg-critical'
                }`}
              />
              <img src={p.image_url} alt="" className="h-12 w-16 rounded-[8px] object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.address}</p>
                <p className="text-xs text-ink-faint">
                  {p.suburb} · {p.bedrooms}bd
                </p>
              </div>
              <StatusDot status={p.status} label={p.status.replace('-', ' ')} />
              <span className="text-sm tabular-nums hidden sm:block" data-currency>
                {formatCurrency(p.rent_weekly)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
