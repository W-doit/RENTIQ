import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import { monthlyPnL, mockTransactions } from '../../data/mock'
import { formatCurrency, formatDate } from '../../lib/utils'
import { StatusDot } from '../../components/ui/Status'
import { Button } from '../../components/ui/Button'
import { Metric } from '../../components/ui/Metric'

export function FinancialsPage() {
  const synced = mockTransactions.filter((t) => t.xero_synced).length
  const income = mockTransactions
    .filter((t) => t.amount > 0 && t.status === 'paid')
    .reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-1">Money</p>
          <h1 className="font-display text-3xl font-semibold">Financials</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-positive">
            <CheckCircle2 className="h-4 w-4" />
            Xero · {synced}/{mockTransactions.length} synced
          </div>
          <Button size="sm" variant="secondary">
            <RefreshCw className="h-4 w-4" />
            Sync now
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-px bg-hairline border border-hairline rounded-[var(--radius-card)] overflow-hidden">
        <div className="bg-surface p-5">
          <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-3">
            Paid rent (period)
          </p>
          <span className="metric text-metric" data-currency>
            {formatCurrency(income)}
          </span>
        </div>
        <div className="bg-surface p-5">
          <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-3">
            Net · Mar (mock)
          </p>
          <Metric value={5260} prefix="$" />
        </div>
      </div>

      <section>
        <h2 className="font-display text-lg font-semibold mb-4">Monthly P&amp;L</h2>
        <div className="h-72 bg-surface border border-hairline rounded-[var(--radius-card)] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyPnL} barGap={4}>
              <CartesianGrid stroke="hsl(170 12% 90%)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: 'hsl(192 7% 58%)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'hsl(192 7% 58%)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid hsl(170 12% 88%)',
                  fontSize: 13,
                }}
              />
              <Legend />
              <Bar dataKey="income" name="Income" fill="hsl(201 88% 33%)" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="hsl(186 62% 38%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-4">Rent ledger</h2>
        <div className="border border-hairline rounded-[var(--radius-card)] bg-surface overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-label uppercase text-ink-faint tracking-[0.08em] border-b border-hairline bg-sunken/40">
                <th className="px-4 py-2.5 font-medium">Property</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
                <th className="px-4 py-2.5 font-medium">Date</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Xero</th>
                <th className="px-4 py-2.5 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-3.5 text-ink-muted whitespace-nowrap">
                    {tx.property_address}
                  </td>
                  <td className="px-4 py-3.5">{tx.description}</td>
                  <td className="px-4 py-3.5 text-ink-faint whitespace-nowrap">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusDot status={tx.status} />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-ink-faint">
                    {tx.xero_synced ? 'Synced' : 'Pending'}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums" data-currency>
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
