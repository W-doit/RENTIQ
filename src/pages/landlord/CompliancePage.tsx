import { mockCompliance } from '../../data/mock'
import { ProgressBar } from '../../components/ui/Status'
import { formatDate } from '../../lib/utils'
import { Link } from 'react-router-dom'

const standards = [
  { key: 'heating', label: 'H', full: 'Heating' },
  { key: 'insulation', label: 'I', full: 'Insulation' },
  { key: 'ventilation', label: 'V', full: 'Ventilation' },
  { key: 'moisture', label: 'M', full: 'Moisture' },
  { key: 'draught', label: 'D', full: 'Draught' },
] as const

export function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-1">Healthy Homes</p>
        <h1 className="font-display text-3xl font-semibold">Compliance</h1>
        <p className="text-sm text-ink-muted mt-1">
          Heating · insulation · ventilation · moisture · draught — per property.
        </p>
      </div>

      <div className="space-y-4">
        {mockCompliance.map((c, i) => (
          <Link
            key={c.id}
            to={`/properties/${c.property_id}/compliance`}
            className="block bg-surface border border-hairline rounded-[var(--radius-card)] p-5 hover:border-hairline-strong transition-colors animate-settle"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <p className="font-medium">{c.property_address}</p>
                <p className="text-xs text-ink-faint">
                  Next review {formatDate(c.next_review)}
                </p>
              </div>
              <p
                className={`metric text-2xl ${
                  c.overall >= 90 ? 'text-positive' : c.overall >= 80 ? 'text-ink' : 'text-caution'
                }`}
              >
                {c.overall}%
              </p>
            </div>
            <ProgressBar value={c.overall} className="mb-4" />
            <div className="grid grid-cols-5 gap-3">
              {standards.map((s) => (
                <div key={s.key} className="text-center">
                  <p
                    className="text-xs font-medium mb-1"
                    title={s.full}
                  >
                    {s.label}
                  </p>
                  <p className="text-sm tabular-nums text-ink-muted">{c[s.key]}%</p>
                  <ProgressBar value={c[s.key]} className="mt-1.5" />
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
      <p className="text-xs text-ink-faint">
        H heating · I insulation · V ventilation · M moisture · D draught
      </p>
    </div>
  )
}
