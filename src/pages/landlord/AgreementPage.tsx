import { useOutletContext } from 'react-router-dom'
import { FileSignature, Landmark } from 'lucide-react'
import type { Property } from '../../types/database'
import { mockTenants } from '../../data/mock'
import { formatCurrency, formatDate } from '../../lib/utils'
import { Button } from '../../components/ui/Button'
import { StatusDot } from '../../components/ui/Status'

export function AgreementPage() {
  const { property } = useOutletContext<{ property: Property }>()
  const tenant = mockTenants.find((t) => t.property_id === property.id)

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-4">
        <h2 className="font-display text-xl font-semibold">NZ tenancy agreement</h2>
        <div className="border border-hairline rounded-[var(--radius-card)] bg-surface p-6 font-mono text-xs leading-relaxed text-ink-muted max-h-[520px] overflow-y-auto">
          <p className="font-display text-base text-ink font-semibold mb-4 font-sans">
            Residential Tenancy Agreement
          </p>
          <p className="mb-3">Under the Residential Tenancies Act 1986 (New Zealand)</p>
          <p className="mb-2">
            <strong className="text-ink">Property:</strong> {property.address}, {property.suburb},{' '}
            {property.city}
          </p>
          <p className="mb-2">
            <strong className="text-ink">Landlord:</strong> Sam Aroha
          </p>
          <p className="mb-2">
            <strong className="text-ink">Tenant:</strong>{' '}
            {tenant?.full_name ?? '— (awaiting approved applicant)'}
          </p>
          <p className="mb-2">
            <strong className="text-ink">Rent:</strong>{' '}
            {formatCurrency(tenant?.rent_weekly ?? property.rent_weekly)} per week
          </p>
          <p className="mb-2">
            <strong className="text-ink">Bond:</strong>{' '}
            {formatCurrency(tenant?.bond_amount ?? property.rent_weekly * 4)} (max 4 weeks)
          </p>
          <p className="mb-4">
            <strong className="text-ink">Term:</strong>{' '}
            {tenant
              ? `${formatDate(tenant.lease_start)} to ${formatDate(tenant.lease_end)}`
              : 'Fixed term TBA'}
          </p>
          <hr className="border-hairline my-4" />
          <p className="mb-2">1. The tenant agrees to pay rent weekly in advance.</p>
          <p className="mb-2">
            2. The landlord will maintain the premises to Healthy Homes Standards.
          </p>
          <p className="mb-2">3. Bond will be lodged with Tenancy Services (MBIE) within 23 working days.</p>
          <p className="mb-2">4. Either party may end the tenancy in accordance with the Act.</p>
          <p className="mt-6 text-ink-faint">— End of preview —</p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="border border-hairline rounded-[var(--radius-card)] bg-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileSignature className="h-4 w-4 text-primary" />
            <h3 className="font-display font-semibold">DocuSign</h3>
          </div>
          <StatusDot status={tenant ? 'pending' : 'vacant'} label={tenant ? 'Awaiting signatures' : 'No tenant yet'} />
          <p className="text-sm text-ink-muted mt-3 mb-4">
            {tenant
              ? `Envelope sent to ${tenant.email}. Landlord signed. Tenant pending.`
              : 'Approve an applicant to generate and send the envelope.'}
          </p>
          <Button size="sm" variant="secondary" className="w-full" disabled={!tenant}>
            Open DocuSign
          </Button>
        </div>

        <div className="border border-hairline rounded-[var(--radius-card)] bg-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="h-4 w-4 text-primary" />
            <h3 className="font-display font-semibold">MBIE bond lodgement</h3>
          </div>
          <StatusDot
            status={tenant?.bond_status ?? 'pending'}
            label={tenant ? `Bond ${tenant.bond_status}` : 'Not started'}
          />
          <p className="text-sm text-ink-muted mt-3 mb-4">
            {tenant?.bond_status === 'lodged'
              ? `$${tenant.bond_amount} lodged with Tenancy Services. Ref TS-2025-88421.`
              : 'Bond lodgement drafts once the agreement is fully signed.'}
          </p>
          <Button size="sm" className="w-full" disabled={!tenant}>
            View Tenancy Services
          </Button>
        </div>
      </div>
    </div>
  )
}
