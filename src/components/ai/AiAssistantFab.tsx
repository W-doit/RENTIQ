import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

const replies = [
  'A 14-day arrears notice for 4B Hawker is drafted with the balance owing. Ready for your sign-off.',
  'Healthy Homes heating for Hawker Street is due 2 Apr. I can book SafeHome Checks this week if you want.',
  'Tane Williams scores 91/100 with a clear Centrix check. I can queue the tenancy agreement next.',
  'Rent collected this week: $1,810 of $1,810 expected, excluding the overdue Hawker payment.',
  'Open maintenance in one line: one high-priority heat pump, one medium dishwasher leak awaiting plumber OK.',
]

interface Msg {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export function AiAssistantFab() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Kia ora — I’m Iris. Ask about rent, compliance, maintenance or applicants. I state the facts and recommend one action. Nothing sends without your sign-off.',
    },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send() {
    if (!input.trim()) return
    const userMsg: Msg = { id: crypto.randomUUID(), role: 'user', text: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)]
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', text: reply }])
    }, 700)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'fixed z-40 bottom-24 right-4 md:bottom-8 md:right-8 h-14 w-14 rounded-[var(--radius-card)] bg-primary text-primary-ink shadow-[var(--shadow-overlay)] flex items-center justify-center hover:bg-primary-hover transition-colors',
          open && 'hidden',
        )}
        aria-label="Open Iris assistant"
      >
        <Sparkles className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed z-50 bottom-24 right-4 md:bottom-8 md:right-8 w-[min(100vw-2rem,380px)] h-[min(70vh,520px)] bg-surface border border-hairline rounded-[var(--radius-card)] shadow-[var(--shadow-overlay)] flex flex-col animate-settle overflow-hidden">
          <div className="flex items-center justify-between px-4 h-14 border-b border-hairline">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-display font-semibold text-sm">Iris · AI assistant</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 text-ink-muted hover:text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'max-w-[88%] text-sm leading-relaxed px-3 py-2 rounded-[var(--radius-ui)]',
                  m.role === 'assistant'
                    ? 'bg-sunken text-ink'
                    : 'bg-primary text-primary-ink ml-auto',
                )}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-hairline flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask Iris…"
              className="flex-1 h-10 px-3 rounded-[var(--radius-ui)] border border-hairline bg-porcelain text-sm outline-none focus:border-primary"
            />
            <Button size="sm" onClick={send} aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export function TenantChatBubble() {
  return (
    <div className="flex items-start gap-2 text-ink-muted text-sm">
      <MessageCircle className="h-4 w-4 mt-0.5 shrink-0" />
      <span>Iris is available any hour for maintenance tips and lease questions.</span>
    </div>
  )
}
