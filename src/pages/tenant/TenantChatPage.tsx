import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/utils'

const canned = [
  'Your next rent of $680 is due Friday 21 March. You can pay to the account on your lease.',
  'For a dishwasher leak: turn off the inlet tap behind the kick panel on the right, mop standing water, and submit a photo via Maintenance.',
  'Your bond of $2,720 is lodged with Tenancy Services. You’ll get it back (minus lawful deductions) when you move out.',
  'Quiet hours aren’t in your agreement, but Wellington City noise rules apply after 10pm weekdays / midnight weekends.',
  'I’ve noted that — want me to draft a maintenance request for your landlord to approve?',
]

interface Msg {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export function TenantChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Kia ora — I’m Skip, available 24/7. Ask about rent, your lease, or how to fix something while we wait for a tradesperson.',
    },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send() {
    if (!input.trim()) return
    const text = input.trim()
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: canned[Math.floor(Math.random() * canned.length)],
        },
      ])
    }, 600)
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-11rem)]">
      <div className="mb-4">
        <h1 className="font-display text-2xl font-semibold mb-1">Chat with Skip</h1>
        <p className="text-sm text-ink-muted">24/7 AI help · mock responses</p>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'max-w-[90%] text-sm leading-relaxed px-3 py-2 rounded-[var(--radius-ui)]',
              m.role === 'assistant' ? 'bg-sunken text-ink' : 'bg-primary text-primary-ink ml-auto',
            )}
          >
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about rent, lease, maintenance…"
          className="flex-1 h-11 px-3 rounded-[var(--radius-ui)] border border-hairline bg-surface text-sm outline-none focus:border-primary"
        />
        <Button onClick={send} aria-label="Send">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
