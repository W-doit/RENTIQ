import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import {
  mockMessageThreads,
  type MessageThread,
  type ThreadMessage,
} from '../../data/mock'
import { Button } from '../../components/ui/Button'
import { cn, formatDate } from '../../lib/utils'

export function TenantMessagesPage() {
  const [threads, setThreads] = useState(mockMessageThreads)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const active = threads.find((t) => t.id === activeId) ?? null
  const unreadTotal = threads.reduce((s, t) => s + t.unread, 0)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active?.messages.length, activeId])

  function openThread(id: string) {
    setActiveId(id)
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              unread: 0,
              messages: t.messages.map((m) => ({ ...m, read: true })),
            }
          : t,
      ),
    )
  }

  function send() {
    if (!draft.trim() || !active) return
    const msg: ThreadMessage = {
      id: crypto.randomUUID(),
      sender: 'tenant',
      senderName: 'You',
      body: draft.trim(),
      sentAt: new Date().toISOString(),
      read: true,
    }
    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? {
              ...t,
              updatedAt: msg.sentAt,
              messages: [...t.messages, msg],
            }
          : t,
      ),
    )
    setDraft('')
  }

  if (active) {
    return (
      <ThreadView
        thread={active}
        draft={draft}
        onDraft={setDraft}
        onSend={send}
        onBack={() => setActiveId(null)}
        endRef={endRef}
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold mb-1">Messages</h1>
        <p className="text-sm text-ink-muted">
          Chat with your landlord and get RentIQ alerts for this home.
          {unreadTotal > 0 ? ` · ${unreadTotal} unread` : ''}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          const id = crypto.randomUUID()
          const thread: MessageThread = {
            id,
            property_id: 'prop-1',
            subject: 'New message',
            participants: 'You · Sam Aroha',
            unread: 0,
            updatedAt: new Date().toISOString(),
            messages: [],
          }
          setThreads((t) => [thread, ...t])
          setActiveId(id)
        }}
        className="w-full h-11 rounded-[var(--radius-ui)] border border-dashed border-hairline-strong text-sm text-ink-muted hover:text-ink hover:border-primary transition-colors"
      >
        + Message your landlord
      </button>

      <div className="panel divide-y divide-hairline overflow-hidden">
        {threads.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => openThread(t.id)}
            className="w-full text-left px-4 py-3.5 hover:bg-sunken/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <p className={cn('text-sm', t.unread ? 'font-semibold text-ink' : 'font-medium')}>
                {t.subject}
              </p>
              {t.unread > 0 && (
                <span className="shrink-0 h-5 min-w-5 px-1.5 rounded-[4px] bg-accent text-accent-ink text-[10px] font-semibold flex items-center justify-center">
                  {t.unread}
                </span>
              )}
            </div>
            <p className="text-xs text-ink-faint mb-1">{t.participants}</p>
            <p className="text-sm text-ink-muted truncate">
              {t.messages[t.messages.length - 1]?.body ?? 'No messages yet'}
            </p>
            <p className="text-[10px] text-ink-faint mt-1">{formatDate(t.updatedAt)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function ThreadView({
  thread,
  draft,
  onDraft,
  onSend,
  onBack,
  endRef,
}: {
  thread: MessageThread
  draft: string
  onDraft: (v: string) => void
  onSend: () => void
  onBack: () => void
  endRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex flex-col h-[calc(100dvh-11rem)]">
      <div className="flex items-center gap-2 mb-4">
        <button type="button" onClick={onBack} className="p-2 -ml-2 text-ink-muted" aria-label="Back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="font-display font-extrabold text-lg truncate">{thread.subject}</h1>
          <p className="text-xs text-ink-faint truncate">{thread.participants}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
        {thread.messages.length === 0 && (
          <p className="text-sm text-ink-muted text-center py-8">
            Write your landlord below. They’ll get a notification.
          </p>
        )}
        {thread.messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'max-w-[88%] text-sm leading-relaxed px-3 py-2 rounded-[var(--radius-ui)]',
              m.sender === 'tenant' && 'bg-primary text-primary-ink ml-auto',
              m.sender === 'landlord' && 'bg-sunken text-ink',
              m.sender === 'system' &&
                'bg-accent-tint text-accent-ink border border-accent/20 mx-auto text-center text-xs max-w-[95%]',
            )}
          >
            {m.sender !== 'tenant' && m.sender !== 'system' && (
              <p className="text-[10px] uppercase tracking-wide text-ink-faint mb-1">
                {m.senderName}
              </p>
            )}
            {m.sender === 'system' && (
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] mb-1 opacity-70">
                Notification
              </p>
            )}
            <p>{m.body}</p>
            <p
              className={cn(
                'text-[10px] mt-1',
                m.sender === 'tenant' ? 'text-primary-ink/60' : 'text-ink-faint',
              )}
            >
              {formatDate(m.sentAt)}
            </p>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="Message your landlord…"
          className="flex-1 h-11 px-3 rounded-[var(--radius-ui)] border border-hairline bg-surface text-sm outline-none focus:border-primary"
        />
        <Button onClick={onSend} aria-label="Send">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
