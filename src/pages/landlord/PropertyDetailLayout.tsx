import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { mockProperties } from '../../data/mock'
import { cn, formatCurrency } from '../../lib/utils'
import { StatusDot } from '../../components/ui/Status'

const tabs = [
  { to: '', label: 'Overview', end: true },
  { to: 'listing', label: 'Listing' },
  { to: 'tenants', label: 'Tenants' },
  { to: 'maintenance', label: 'Maintenance' },
  { to: 'compliance', label: 'Compliance' },
  { to: 'financials', label: 'Financials' },
  { to: 'screening', label: 'Screening' },
  { to: 'agreement', label: 'Agreement' },
]

export function PropertyDetailLayout() {
  const { id } = useParams()
  const property = mockProperties.find((p) => p.id === id)

  if (!property) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-muted mb-4">Property not found.</p>
        <Link to="/properties" className="text-primary text-sm">
          ← Back to properties
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/properties"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Properties
      </Link>

      <div className="flex flex-wrap gap-6 items-start">
        <img
          src={property.image_url}
          alt=""
          className="h-28 w-40 rounded-[var(--radius-card)] object-cover border border-hairline"
        />
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-1">
            {property.address}
          </h1>
          <p className="text-sm text-ink-muted mb-3">
            {property.suburb}, {property.city} · {property.bedrooms} bed · {property.bathrooms}{' '}
            bath
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <StatusDot status={property.status} label={property.status.replace('-', ' ')} />
            <span className="text-sm tabular-nums font-medium" data-currency>
              {formatCurrency(property.rent_weekly)}/wk
            </span>
            <span className="text-sm text-ink-faint">
              Healthy Homes {property.healthy_homes_score}%
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-hairline overflow-x-auto">
        <nav className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <NavLink
              key={tab.label}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                cn(
                  'relative px-3 py-3 text-sm whitespace-nowrap transition-colors',
                  isActive ? 'text-ink' : 'text-ink-faint hover:text-ink-muted',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <Outlet context={{ property }} />
    </div>
  )
}
