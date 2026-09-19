import { useState } from 'react'
import { mockTickets } from '../../data/mock'
import type { MaintenanceTicket, TicketStatus } from '../../types/database'
import { cn, formatDate } from '../../lib/utils'
import { Select } from '../../components/ui/Input'

const columns: { id: TicketStatus; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'triaged', label: 'Triaged' },
  { id: 'assigned', label: 'Assigned' },
  { id: 'complete', label: 'Complete' },
]

const trades = ['Wellington Plumbing Co', 'Harbour Electrical', 'SafeHome Checks', 'RoofRight NZ']

export function MaintenancePage() {
  const [tickets, setTickets] = useState(mockTickets)

  function move(id: string, status: TicketStatus) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, updated_at: new Date().toISOString() } : t,
      ),
    )
  }

  function assign(id: string, tradesperson: string) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              tradesperson,
              status: t.status === 'new' || t.status === 'triaged' ? 'assigned' : t.status,
            }
          : t,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-1">Operations</p>
        <h1 className="font-display text-3xl font-semibold">Maintenance</h1>
        <p className="text-sm text-ink-muted mt-1">
          Kanban · AI severity · assign tradespeople
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {columns.map((col) => {
          const items = tickets.filter((t) => t.status === col.id)
          return (
            <div key={col.id} className="w-72 shrink-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="font-display font-semibold text-sm">{col.label}</h2>
                <span className="text-xs text-ink-faint tabular-nums">{items.length}</span>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {items.map((t) => (
                  <TicketCard
                    key={t.id}
                    ticket={t}
                    onMove={move}
                    onAssign={assign}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TicketCard({
  ticket,
  onMove,
  onAssign,
}: {
  ticket: MaintenanceTicket
  onMove: (id: string, status: TicketStatus) => void
  onAssign: (id: string, name: string) => void
}) {
  const sev =
    ticket.severity === 'high' || ticket.severity === 'critical'
      ? 'bg-critical/10 text-critical border-critical/20'
      : ticket.severity === 'medium'
        ? 'bg-caution/10 text-caution border-caution/20'
        : 'bg-positive/10 text-positive border-positive/20'

  return (
    <div className="relative bg-surface border border-hairline rounded-[var(--radius-card)] p-3.5 hover:border-hairline-strong transition-colors">
      <span
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[14px]',
          ticket.severity === 'high' || ticket.severity === 'critical'
            ? 'bg-critical'
            : ticket.severity === 'medium'
              ? 'bg-caution'
              : 'bg-positive',
        )}
      />
      <div className="pl-1.5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-medium leading-snug">{ticket.title}</p>
          <span className={cn('text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-[6px] border shrink-0', sev)}>
            {ticket.severity}
          </span>
        </div>
        <p className="text-xs text-ink-faint mb-2">{ticket.property_address}</p>
        <p className="text-xs text-ink-muted mb-3 leading-relaxed">{ticket.ai_severity_note}</p>
        {ticket.photo_url && (
          <img
            src={ticket.photo_url}
            alt=""
            className="h-20 w-full object-cover rounded-[8px] mb-3"
          />
        )}
        <Select
          className="h-8 text-xs mb-2"
          value={ticket.tradesperson ?? ''}
          onChange={(e) => e.target.value && onAssign(ticket.id, e.target.value)}
        >
          <option value="">Assign tradesperson…</option>
          {trades.map((tr) => (
            <option key={tr} value={tr}>
              {tr}
            </option>
          ))}
        </Select>
        <Select
          className="h-8 text-xs"
          value={ticket.status}
          onChange={(e) => onMove(ticket.id, e.target.value as TicketStatus)}
        >
          {columns.map((c) => (
            <option key={c.id} value={c.id}>
              Move to {c.label}
            </option>
          ))}
        </Select>
        <p className="text-[10px] text-ink-faint mt-2">{formatDate(ticket.updated_at)}</p>
      </div>
    </div>
  )
}
