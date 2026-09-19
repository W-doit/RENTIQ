import { useOutletContext, Link } from 'react-router-dom'
import type { Property } from '../../types/database'
import {
  mockCompliance,
  mockTenants,
  mockTickets,
  mockTransactions,
} from '../../data/mock'
import { formatCurrency, formatDate } from '../../lib/utils'
import { ProgressBar } from '../../components/ui/Status'
import { Button } from '../../components/ui/Button'

export function PropertyOverviewTab() {
  const { property } = useOutletContext<{ property: Property }>()
  const tenants = mockTenants.filter((t) => t.property_id === property.id)
  const compliance = mockCompliance.find((c) => c.property_id === property.id)
  const tickets = mockTickets.filter(
    (t) => t.property_id === property.id && t.status !== 'complete',
  )
  const txs = mockTransactions.filter((t) => t.property_id === property.id).slice(0, 3)

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <section>
          <h2 className="font-display text-lg font-semibold mb-3">Tenants</h2>
          {tenants.length === 0 ? (
            <div className="border border-dashed border-hairline-strong rounded-[var(--radius-card)] p-6 text-sm text-ink-muted">
              Vacant —{' '}
              <Link to="listing" className="text-primary">
                generate a listing
              </Link>{' '}
              or{' '}
              <Link to="screening" className="text-primary">
                review applicants
              </Link>
              .
            </div>
          ) : (
            <div className="border border-hairline rounded-[var(--radius-card)] bg-surface divide-y divide-hairline">
              {tenants.map((t) => (
                <div key={t.id} className="px-4 py-4 flex flex-wrap justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{t.full_name}</p>
                    <p className="text-xs text-ink-faint">
                      Lease {formatDate(t.lease_start)} – {formatDate(t.lease_end)}
                    </p>
                  </div>
                  <p className="text-sm tabular-nums" data-currency>
                    {formatCurrency(t.rent_weekly)}/wk
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold mb-3">Open maintenance</h2>
          {tickets.length === 0 ? (
            <p className="text-sm text-ink-muted">Nothing open. Quiet is good.</p>
          ) : (
            <div className="border border-hairline rounded-[var(--radius-card)] bg-surface divide-y divide-hairline">
              {tickets.map((t) => (
                <div key={t.id} className="px-4 py-3">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-ink-faint capitalize">
                    {t.severity} · {t.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="space-y-6">
        {compliance && (
          <section className="border border-hairline rounded-[var(--radius-card)] bg-surface p-5">
            <h2 className="font-display text-lg font-semibold mb-1">Healthy Homes</h2>
            <p className="text-xs text-ink-faint mb-4">
              Next review {formatDate(compliance.next_review)}
            </p>
            <p className="metric text-2xl mb-3">{compliance.overall}%</p>
            <ProgressBar value={compliance.overall} className="mb-4" />
            <Link to="compliance">
              <Button variant="secondary" size="sm" className="w-full">
                View checklist
              </Button>
            </Link>
          </section>
        )}

        <section>
          <h2 className="font-display text-lg font-semibold mb-3">Recent ledger</h2>
          <div className="space-y-0 border-t border-hairline">
            {txs.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between py-3 border-b border-hairline text-sm"
              >
                <span className="text-ink-muted truncate pr-2">{tx.description}</span>
                <span
                  className={`tabular-nums shrink-0 ${tx.amount < 0 ? 'text-ink-muted' : 'text-ink'}`}
                  data-currency
                >
                  {formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
