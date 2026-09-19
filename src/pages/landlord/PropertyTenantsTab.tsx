import { useOutletContext } from 'react-router-dom'
import type { Property } from '../../types/database'
import { mockTenants } from '../../data/mock'
import { formatCurrency, formatDate } from '../../lib/utils'
import { StatusDot } from '../../components/ui/Status'

export function PropertyTenantsTab() {
  const { property } = useOutletContext<{ property: Property }>()
  const tenants = mockTenants.filter((t) => t.property_id === property.id)

  if (tenants.length === 0) {
    return <p className="text-sm text-ink-muted">No active tenants — property is vacant.</p>
  }

  return (
    <div className="border border-hairline rounded-[var(--radius-card)] bg-surface divide-y divide-hairline">
      {tenants.map((t) => (
        <div key={t.id} className="p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="font-display font-semibold text-lg mb-1">{t.full_name}</p>
            <p className="text-sm text-ink-muted">{t.email}</p>
            <p className="text-sm text-ink-muted">{t.phone}</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-faint">Lease</span>
              <span>
                {formatDate(t.lease_start)} – {formatDate(t.lease_end)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-faint">Rent</span>
              <span data-currency>{formatCurrency(t.rent_weekly)}/wk</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ink-faint">Bond</span>
              <StatusDot status={t.bond_status} label={`${formatCurrency(t.bond_amount)} · ${t.bond_status}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
