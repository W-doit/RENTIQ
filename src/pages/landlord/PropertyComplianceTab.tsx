import { useOutletContext } from 'react-router-dom'
import type { Property } from '../../types/database'
import { mockCompliance } from '../../data/mock'
import { ProgressBar } from '../../components/ui/Status'
import { formatDate } from '../../lib/utils'

const standards = [
  { key: 'heating', label: 'Heating' },
  { key: 'insulation', label: 'Insulation' },
  { key: 'ventilation', label: 'Ventilation' },
  { key: 'moisture', label: 'Moisture' },
  { key: 'draught', label: 'Draught' },
] as const

export function PropertyComplianceTab() {
  const { property } = useOutletContext<{ property: Property }>()
  const record = mockCompliance.find((c) => c.property_id === property.id)

  if (!record) return <p className="text-sm text-ink-muted">No compliance data.</p>

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <p className="metric text-3xl mb-1">{record.overall}%</p>
        <p className="text-sm text-ink-muted">
          Overall Healthy Homes · next review {formatDate(record.next_review)}
        </p>
      </div>
      <div className="space-y-5">
        {standards.map((s) => (
          <div key={s.key}>
            <div className="flex justify-between text-sm mb-1.5">
              <span>{s.label}</span>
              <span className="tabular-nums text-ink-muted">{record[s.key]}%</span>
            </div>
            <ProgressBar value={record[s.key]} />
          </div>
        ))}
      </div>
    </div>
  )
}
