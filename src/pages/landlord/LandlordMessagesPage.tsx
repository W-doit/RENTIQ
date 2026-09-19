import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessagesSquare } from 'lucide-react'
import { mockMessageThreads } from '../../data/mock'
import { formatDate } from '../../lib/utils'

/** Landlord inbox — messages from tenants across the portfolio */
export function LandlordMessagesPage() {
  const [threads] = useState(mockMessageThreads)
  const unread = threads.reduce((s, t) => s + t.unread, 0)

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-label uppercase text-ink-faint tracking-[0.12em] mb-1">
          Inbox
        </p>
        <h1 className="font-display text-3xl font-extrabold">Messages</h1>
        <p className="text-sm text-ink-muted mt-1">
          Tenant threads and system alerts
          {unread > 0 ? ` · ${unread} need a reply` : ''}
        </p>
      </div>

      <div className="panel divide-y divide-hairline overflow-hidden">
        {threads.map((t) => (
          <div key={t.id} className="relative px-5 py-4 hover:bg-sunken/40">
            {t.unread > 0 && (
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
            )}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">{t.subject}</p>
                <p className="text-xs text-ink-faint mb-1">{t.participants}</p>
                <p className="text-sm text-ink-muted truncate">
                  {t.messages[t.messages.length - 1]?.body}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-ink-faint">{formatDate(t.updatedAt)}</p>
                {t.unread > 0 && (
                  <span className="inline-block mt-1 text-[10px] font-semibold text-accent-ink bg-accent px-1.5 py-0.5 rounded-[4px]">
                    {t.unread} new
                  </span>
                )}
              </div>
            </div>
            <Link
              to={`/properties/${t.property_id}`}
              className="inline-flex items-center gap-1 text-xs text-primary mt-2 no-underline"
            >
              <MessagesSquare className="h-3 w-3" />
              View property
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
