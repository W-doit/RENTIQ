import { Link } from 'react-router-dom'
import {
  CalendarClock,
  FileText,
  MessagesSquare,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { mockTickets, tenantHome } from '../../data/mock'
import { formatCurrency, formatDate } from '../../lib/utils'
import { Button } from '../../components/ui/Button'

export function TenantDashboardPage() {
  const { tenant, property, landlordName, nextRentDue, paymentRef } = tenantHome
  const open = mockTickets.filter(
    (t) => t.property_id === property.id && t.status !== 'complete',
  )

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-hairline">
        <img src={property.image_url} alt="" className="h-40 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-basalt/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-basalt-ink">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent mb-1">
            Your home
          </p>
          <h1 className="font-display text-2xl font-extrabold tracking-[-0.02em]">
            {property.address}
          </h1>
          <p className="text-sm text-basalt-ink/75">
            {property.suburb}, {property.city} · {property.bedrooms} bed · {property.bathrooms} bath
          </p>
        </div>
      </div>

      <div className="panel p-5 space-y-4">
        <div className="flex items-start gap-3">
          <CalendarClock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-1">
              Next rent due
            </p>
            <p className="font-display font-extrabold text-3xl tracking-[-0.02em]" data-currency>
              {formatCurrency(tenant.rent_weekly)}
            </p>
            <p className="text-sm text-ink-muted mt-1">
              {formatDate(nextRentDue)} · weekly · ref {paymentRef}
            </p>
          </div>
        </div>
        <div className="border-t border-hairline pt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-ink-faint text-xs mb-0.5">Lease ends</p>
            <p>{formatDate(tenant.lease_end)}</p>
          </div>
          <div>
            <p className="text-ink-faint text-xs mb-0.5">Bond</p>
            <p className="capitalize flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-positive" />
              {tenant.bond_status}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-ink-faint text-xs mb-0.5">Landlord</p>
            <p>{landlordName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/tenant/messages" className="no-underline">
          <Button variant="secondary" className="w-full">
            <MessagesSquare className="h-4 w-4" />
            Message
          </Button>
        </Link>
        <Link to="/tenant/maintenance" className="no-underline">
          <Button className="w-full">
            <Wrench className="h-4 w-4" />
            Report issue
          </Button>
        </Link>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-extrabold text-lg">Open repairs</h2>
          <Link to="/tenant/maintenance" className="text-sm text-primary no-underline">
            All
          </Link>
        </div>
        {open.length === 0 ? (
          <p className="text-sm text-ink-muted panel p-4">Nothing open on this property.</p>
        ) : (
          <div className="space-y-2">
            {open.map((t) => (
              <div key={t.id} className="relative panel px-4 py-3">
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-l-[12px] ${
                    t.severity === 'high' ? 'bg-critical' : 'bg-caution'
                  }`}
                />
                <div className="pl-1">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-ink-faint capitalize">
                    {t.status}
                    {t.tradesperson ? ` · ${t.tradesperson}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Link to="/tenant/documents" className="no-underline block">
        <Button variant="ghost" className="w-full justify-start text-ink-muted">
          <FileText className="h-4 w-4" />
          Lease, inspections & water bills
        </Button>
      </Link>
    </div>
  )
}
