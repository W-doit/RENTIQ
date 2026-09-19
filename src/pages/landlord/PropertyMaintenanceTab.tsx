import { useOutletContext } from 'react-router-dom'
import type { Property } from '../../types/database'
import { mockTickets } from '../../data/mock'
import { formatDate } from '../../lib/utils'

export function PropertyMaintenanceTab() {
  const { property } = useOutletContext<{ property: Property }>()
  const tickets = mockTickets.filter((t) => t.property_id === property.id)

  return (
    <div className="border border-hairline rounded-[var(--radius-card)] bg-surface divide-y divide-hairline">
      {tickets.map((t) => (
        <div key={t.id} className="relative px-5 py-4">
          <span
            className={`absolute left-0 top-0 bottom-0 w-[3px] ${
              t.severity === 'high' || t.severity === 'critical'
                ? 'bg-critical'
                : t.severity === 'medium'
                  ? 'bg-caution'
                  : 'bg-positive'
            }`}
          />
          <div className="pl-2 flex flex-wrap justify-between gap-2">
            <div>
              <p className="font-medium text-sm">{t.title}</p>
              <p className="text-xs text-ink-faint capitalize">
                {t.severity} · {t.status}
                {t.tradesperson ? ` · ${t.tradesperson}` : ''}
              </p>
              <p className="text-sm text-ink-muted mt-1">{t.description}</p>
            </div>
            <p className="text-xs text-ink-faint">{formatDate(t.created_at)}</p>
          </div>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="p-5 text-sm text-ink-muted">No maintenance history for this property.</p>
      )}
    </div>
  )
}
