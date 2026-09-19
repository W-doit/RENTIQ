import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Logo } from '../components/brand/Logo'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

/** Tenant-only sign-in — visually distinct from landlord login */
export function TenantLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('mahuta@email.nz')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res = await login(email, password, 'tenant')
    setBusy(false)
    if (res.error) {
      setError(res.error)
      return
    }
    navigate('/tenant/dashboard')
  }

  return (
    <div className="min-h-dvh bg-basalt text-basalt-ink flex flex-col">
      <header className="h-20 px-6 flex items-center justify-between border-b border-basalt-hairline">
        <Logo invert />
        <Link to="/login" className="text-sm text-basalt-ink/60 hover:text-basalt-ink no-underline">
          Landlord sign in
        </Link>
      </header>

      <div className="flex-1 grid place-items-center px-4 py-12">
        <div className="w-full max-w-md animate-settle">
          <div className="inline-flex items-center gap-2 rounded-[var(--radius-ui)] bg-basalt-raised px-3 py-1.5 mb-6">
            <Home className="h-3.5 w-3.5 text-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Tenant portal · free
            </span>
          </div>

          <h1 className="font-display text-4xl font-extrabold mb-2 tracking-[-0.025em]">
            Your tenancy, all in one place.
          </h1>
          <p className="text-basalt-ink/65 text-sm mb-6 max-w-[38ch]">
            One home. Rent dates, repairs, documents, and messages with your landlord — free,
            always.
          </p>

          <div className="mb-6 rounded-[var(--radius-card)] border border-basalt-hairline bg-basalt-raised p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-basalt-ink/45 mb-2">
              Demo · any password works
            </p>
            <p className="text-sm">
              Use{' '}
              <button
                type="button"
                className="text-accent font-medium underline-offset-2 hover:underline"
                onClick={() => {
                  setEmail('mahuta@email.nz')
                  setPassword('demo1234')
                }}
              >
                mahuta@email.nz
              </button>
              <span className="text-basalt-ink/45"> / </span>
              <span className="font-mono text-xs">demo1234</span>
            </p>
            <p className="text-xs text-basalt-ink/45 mt-2">
              Demo home: 12 Oriental Parade, Wellington
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 rounded-[var(--radius-card)] bg-surface text-ink p-6">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <p className="text-sm text-critical">{error}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? 'Signing in…' : 'Enter my tenancy'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-basalt-ink/45">
            <Link to="/" className="hover:text-basalt-ink no-underline">
              ← Back to RentIQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
