import { Download, FileText } from 'lucide-react'
import { formatDate } from '../../lib/utils'

const docs = [
  { id: '1', name: 'Tenancy agreement', type: 'PDF', date: '2025-02-01' },
  { id: '2', name: 'Move-in inspection report', type: 'PDF', date: '2025-02-01' },
  { id: '3', name: 'Healthy Homes statement', type: 'PDF', date: '2025-01-28' },
  { id: '4', name: 'Water bill · Feb 2026', type: 'PDF', date: '2026-03-05' },
  { id: '5', name: 'Water bill · Jan 2026', type: 'PDF', date: '2026-02-04' },
]

export function TenantDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold mb-1">Documents</h1>
        <p className="text-sm text-ink-muted">
          For your home at 12 Oriental Parade — lease, inspections, water bills.
        </p>
      </div>
      <div className="border border-hairline rounded-[var(--radius-card)] bg-surface divide-y divide-hairline">
        {docs.map((d) => (
          <div key={d.id} className="flex items-center gap-3 px-4 py-3.5">
            <FileText className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{d.name}</p>
              <p className="text-xs text-ink-faint">
                {d.type} · {formatDate(d.date)}
              </p>
            </div>
            <button
              type="button"
              className="p-2 text-ink-muted hover:text-ink"
              aria-label={`Download ${d.name}`}
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
