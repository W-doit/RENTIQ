import { Link } from 'react-router-dom'
import { CalendarClock, FileText, Wrench } from 'lucide-react'
import { mockTenants, mockTickets } from '../../data/mock'
import { formatCurrency, formatDate } from '../../lib/utils'
import { Button } from '../../components/ui/Button'

export function TenantDashboardPage() {
  const lease = mockTenants[0]
  const open = mockTickets.filter(
    (t) => t.property_id === lease.property_id && t.status !== 'complete',
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold mb-1">Your tenancy</h1>
        <p className="text-sm text-ink-muted">{lease.property_id === 'prop-1' ? '12 Oriental Parade' : ''}</p>
      </div>

      <div className="border border-hairline rounded-[var(--radius-card)] bg-surface p-5 space-y-4">
        <div className="flex items-start gap-3">
          <CalendarClock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-1">
              Next rent due
            </p>
            <p className="metric text-2xl" data-currency>
              {formatCurrency(lease.rent_weekly)}
            </p>
            <p className="text-sm text-ink-muted">Friday 21 Mar 2026 · weekly</p>
          </div>
        </div>
        <div className="border-t border-hairline pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-ink-faint">Lease ends</span>
            <span>{formatDate(lease.lease_end)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-faint">Bond</span>
            <span className="capitalize">{lease.bond_status}</span>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold">Open maintenance</h2>
          <Link to="/tenant/maintenance" className="text-sm text-primary">
            New request
          </Link>
        </div>
        {open.length === 0 ? (
          <p className="text-sm text-ink-muted">Nothing open right now.</p>
        ) : (
          <div className="space-y-2">
            {open.map((t) => (
              <div
                key={t.id}
                className="relative border border-hairline rounded-[var(--radius-card)] bg-surface px-4 py-3"
              >
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-caution rounded-l-[14px]" />
                <div className="pl-1 flex gap-2 items-start">
                  <Wrench className="h-4 w-4 text-ink-faint mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-ink-faint capitalize">
                      {t.status} · {t.severity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Link to="/tenant/documents">
        <Button variant="secondary" className="w-full">
          <FileText className="h-4 w-4" />
          View documents
        </Button>
      </Link>
    </div>
  )
}
