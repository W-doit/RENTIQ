import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import type { Application, Property } from '../../types/database'
import { mockApplications } from '../../data/mock'
import { Button } from '../../components/ui/Button'
import { cn, formatCurrency } from '../../lib/utils'

export function ScreeningPage() {
  const { property } = useOutletContext<{ property: Property }>()
  const [apps, setApps] = useState(
    mockApplications.filter((a) => a.property_id === property.id),
  )

  function decide(id: string, status: 'approved' | 'rejected') {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Applicant screening</h2>
        <p className="text-sm text-ink-muted">
          AI score 1–100 · Centrix credit badge · you decide.
        </p>
      </div>

      {apps.length === 0 ? (
        <p className="text-sm text-ink-muted">No applicants for this property yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {apps.map((app, i) => (
            <ApplicantCard
              key={app.id}
              app={app}
              delay={i * 40}
              onApprove={() => decide(app.id, 'approved')}
              onReject={() => decide(app.id, 'rejected')}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ApplicantCard({
  app,
  delay,
  onApprove,
  onReject,
}: {
  app: Application
  delay: number
  onApprove: () => void
  onReject: () => void
}) {
  const scoreColor =
    app.ai_score >= 85 ? 'text-positive' : app.ai_score >= 70 ? 'text-caution' : 'text-critical'

  return (
    <div
      className="relative bg-surface border border-hairline rounded-[var(--radius-card)] p-5 hover:border-hairline-strong transition-colors animate-settle"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[14px]',
          app.status === 'approved'
            ? 'bg-positive'
            : app.status === 'rejected'
              ? 'bg-critical'
              : 'bg-caution',
        )}
      />
      <div className="flex justify-between items-start mb-3 pl-1">
        <div>
          <p className="font-medium">{app.applicant_name}</p>
          <p className="text-xs text-ink-faint">{app.employment}</p>
        </div>
        <div className="text-right">
          <p className={cn('metric text-2xl', scoreColor)}>{app.ai_score}</p>
          <p className="text-[10px] uppercase tracking-wider text-ink-faint">AI score</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 pl-1">
        <CentrixBadge status={app.credit_check} />
        <span className="text-xs text-ink-muted" data-currency>
          Income {formatCurrency(app.income_weekly)}/wk
        </span>
      </div>

      <p className="text-sm text-ink-muted mb-4 pl-1 leading-relaxed">{app.notes}</p>

      {app.status === 'pending' ? (
        <div className="flex gap-2 pl-1">
          <Button size="sm" className="flex-1" onClick={onApprove}>
            <Check className="h-4 w-4" />
            Approve
          </Button>
          <Button size="sm" variant="secondary" className="flex-1" onClick={onReject}>
            <X className="h-4 w-4" />
            Reject
          </Button>
        </div>
      ) : (
        <p className="text-sm capitalize text-ink-muted pl-1">Status: {app.status}</p>
      )}
    </div>
  )
}

function CentrixBadge({ status }: { status: Application['credit_check'] }) {
  const styles = {
    clear: 'bg-positive/10 text-positive border-positive/20',
    review: 'bg-caution/10 text-caution border-caution/20',
    pending: 'bg-sunken text-ink-muted border-hairline',
    failed: 'bg-critical/10 text-critical border-critical/20',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-[6px] border',
        styles[status],
      )}
    >
      Centrix · {status}
    </span>
  )
}
