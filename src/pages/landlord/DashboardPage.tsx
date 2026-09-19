import { Link } from 'react-router-dom'
import { ArrowRight, Plus, Sparkles, Wrench } from 'lucide-react'
import { Metric } from '../../components/ui/Metric'
import { Button } from '../../components/ui/Button'
import {
  aiInsights,
  mockProperties,
  mockTickets,
  mockTransactions,
} from '../../data/mock'
import { formatCurrency } from '../../lib/utils'

export function DashboardPage() {
  const occupied = mockProperties.filter((p) => p.status === 'occupied').length
  const occupancy = Math.round((occupied / mockProperties.length) * 100)
  const rentCollected = mockTransactions
    .filter((t) => t.type === 'rent' && t.status === 'paid')
    .reduce((s, t) => s + t.amount, 0)
  const openMaint = mockTickets.filter((t) => t.status !== 'complete').length
  const insight = aiInsights[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-label uppercase text-ink-faint tracking-[0.12em] mb-1">Overview</p>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.025em]">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/properties">
            <Button variant="secondary" size="sm">
              <Plus className="h-4 w-4" />
              Add property
            </Button>
          </Link>
          <Link to="/maintenance">
            <Button size="sm">
              <Wrench className="h-4 w-4" />
              Maintenance
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-basalt text-basalt-ink px-5 py-4 flex gap-3 items-start">
        <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase text-accent tracking-[0.14em] mb-1">Iris insight</p>
          <p className="text-sm text-basalt-ink/90 leading-relaxed">{insight}</p>
        </div>
        <Link to="/financials" className="text-sm text-accent font-medium shrink-0 hidden sm:inline-flex items-center gap-1 no-underline">
          Review <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline rounded-[var(--radius-card)] overflow-hidden">
        {[
          { label: 'Properties', node: <Metric value={mockProperties.length} /> },
          { label: 'Occupancy', node: <Metric value={occupancy} suffix="%" /> },
          {
            label: 'Rent collected',
            node: <span className="metric text-metric" data-currency>{formatCurrency(rentCollected)}</span>,
          },
          { label: 'Maintenance open', node: <Metric value={openMaint} /> },
        ].map((kpi, i) => (
          <div key={kpi.label} className="bg-surface p-5 animate-settle" style={{ animationDelay: `${i * 40}ms` }}>
            <p className="font-mono text-label uppercase text-ink-faint tracking-[0.12em] mb-3">{kpi.label}</p>
            {kpi.node}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Properties</h2>
            <Link to="/properties" className="text-sm text-ink-muted hover:text-ink">
              View all
            </Link>
          </div>
          <div className="border border-hairline rounded-[var(--radius-card)] overflow-hidden bg-surface">
            {mockProperties.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to={`/properties/${p.id}`}
                className="relative flex items-center gap-4 px-4 py-3.5 border-b border-hairline last:border-0 hover:bg-sunken/40 transition-colors"
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
                <img src={p.image_url} alt="" className="h-12 w-12 rounded-[10px] object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{p.address}</p>
                  <p className="text-xs text-ink-faint capitalize">{p.status.replace('-', ' ')}</p>
                </div>
                <span className="text-sm tabular-nums text-ink-muted" data-currency>
                  {formatCurrency(p.rent_weekly)}/wk
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Open maintenance</h2>
            <Link to="/maintenance" className="text-sm text-ink-muted hover:text-ink">
              Board
            </Link>
          </div>
          <div className="border border-hairline rounded-[var(--radius-card)] overflow-hidden bg-surface">
            {mockTickets
              .filter((t) => t.status !== 'complete')
              .map((t) => (
                <div
                  key={t.id}
                  className="relative px-4 py-3.5 border-b border-hairline last:border-0"
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                      t.severity === 'high' || t.severity === 'critical'
                        ? 'bg-critical'
                        : t.severity === 'medium'
                          ? 'bg-caution'
                          : 'bg-positive'
                    }`}
                  />
                  <div className="pl-2">
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-ink-faint">
                      {t.property_address} · {t.severity} · {t.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
