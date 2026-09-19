import { useState, type FormEvent } from 'react'
import { Camera, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input, Label, Textarea } from '../../components/ui/Input'
import { mockTickets } from '../../data/mock'
import { cn, formatDate } from '../../lib/utils'
import type { Severity, TicketStatus } from '../../types/database'

const timeline: TicketStatus[] = ['new', 'triaged', 'assigned', 'complete']

export function TenantMaintenancePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const [estimate, setEstimate] = useState<Severity | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const mine = mockTickets.filter((t) => t.property_id === 'prop-1')

  function estimateSeverity() {
    const text = `${title} ${description}`.toLowerCase()
    if (text.includes('leak') || text.includes('flood') || text.includes('gas')) {
      setEstimate('high')
    } else if (text.includes('heat') || text.includes('alarm') || text.includes('power')) {
      setEstimate('medium')
    } else {
      setEstimate('low')
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTitle('')
    setDescription('')
    setPhoto('')
    setEstimate(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold mb-1">Maintenance</h1>
        <p className="text-sm text-ink-muted">Submit a request — Skip estimates severity.</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="border border-hairline rounded-[var(--radius-card)] bg-surface p-5 space-y-4"
      >
        <div>
          <Label>What’s wrong?</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Dishwasher leak"
            required
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="When did it start? Any safety risk?"
            required
          />
        </div>
        <div>
          <Label>Photo URL (mock upload)</Label>
          <div className="flex gap-2">
            <Input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Paste image URL"
            />
            <Button type="button" variant="secondary" size="sm" aria-label="Upload">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {estimate && (
          <div className="flex items-center gap-2 text-sm bg-primary-tint rounded-[var(--radius-ui)] px-3 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>
              AI severity estimate:{' '}
              <strong className="capitalize">{estimate}</strong>
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={estimateSeverity} disabled={!title}>
            <Sparkles className="h-4 w-4" />
            Estimate
          </Button>
          <Button type="submit" className="flex-1">
            Submit request
          </Button>
        </div>
        {submitted && (
          <p className="text-sm text-positive">Request received — your landlord will see it shortly.</p>
        )}
      </form>

      <section>
        <h2 className="font-display font-semibold mb-3">Your requests</h2>
        <div className="space-y-4">
          {mine.map((t) => (
            <div
              key={t.id}
              className="border border-hairline rounded-[var(--radius-card)] bg-surface p-4"
            >
              <p className="font-medium text-sm mb-1">{t.title}</p>
              <p className="text-xs text-ink-faint mb-3">
                {formatDate(t.created_at)} · {t.severity}
              </p>
              <div className="flex items-center gap-1">
                {timeline.map((step, idx) => {
                  const current = timeline.indexOf(t.status)
                  const done = idx <= current
                  return (
                    <div key={step} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={cn(
                          'h-1.5 w-full rounded-full',
                          done ? 'bg-primary' : 'bg-sunken',
                          idx === current && 'bg-accent',
                        )}
                      />
                      <span className="text-[9px] uppercase tracking-wide text-ink-faint capitalize">
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
