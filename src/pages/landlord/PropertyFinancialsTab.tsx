import { useOutletContext } from 'react-router-dom'
import type { Property } from '../../types/database'
import { mockTransactions } from '../../data/mock'
import { formatCurrency, formatDate } from '../../lib/utils'
import { StatusDot } from '../../components/ui/Status'

export function PropertyFinancialsTab() {
  const { property } = useOutletContext<{ property: Property }>()
  const txs = mockTransactions.filter((t) => t.property_id === property.id)

  return (
    <div className="border border-hairline rounded-[var(--radius-card)] bg-surface overflow-hidden">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 text-label uppercase text-ink-faint tracking-[0.08em] border-b border-hairline bg-sunken/40">
        <span>Description</span>
        <span>Date</span>
        <span>Status</span>
        <span className="text-right">Amount</span>
      </div>
      {txs.map((tx) => (
        <div
          key={tx.id}
          className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3.5 border-b border-hairline last:border-0 text-sm items-center"
        >
          <span className="truncate">{tx.description}</span>
          <span className="text-ink-faint text-xs">{formatDate(tx.date)}</span>
          <StatusDot status={tx.status} />
          <span className="tabular-nums text-right" data-currency>
            {formatCurrency(tx.amount)}
          </span>
        </div>
      ))}
      {txs.length === 0 && (
        <p className="p-5 text-sm text-ink-muted">No transactions yet.</p>
      )}
    </div>
  )
}
