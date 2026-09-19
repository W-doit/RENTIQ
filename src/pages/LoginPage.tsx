import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components/brand/Logo'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../types/database'

export function LoginPage({ role }: { role: UserRole }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(role === 'landlord' ? 'sam@rentiq.nz' : 'mahuta@email.nz')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res = await login(email, password, role)
    setBusy(false)
    if (res.error) {
      setError(res.error)
      return
    }
    navigate(role === 'tenant' ? '/tenant/dashboard' : '/dashboard')
  }

  return (
    <div className="min-h-dvh survey-grid flex flex-col">
      <header className="h-16 px-6 flex items-center justify-between border-b border-hairline bg-porcelain/90 backdrop-blur">
        <Logo />
        <Link
          to={role === 'landlord' ? '/tenant/login' : '/login'}
          className="text-sm text-ink-muted hover:text-ink no-underline"
        >
          {role === 'landlord' ? 'Tenant sign in' : 'Landlord sign in'}
        </Link>
      </header>
      <div className="flex-1 grid place-items-center px-4 py-12 relative">
        <div className="absolute inset-0 porcelain-wash pointer-events-none" />
        <div className="w-full max-w-md animate-settle relative">
          <p className="font-mono text-label uppercase text-ink-faint tracking-[0.12em] mb-2">
            {role === 'landlord' ? 'Landlord' : 'Tenant'} · New Zealand
          </p>
          <h1 className="font-display text-4xl font-extrabold text-ink mb-2 tracking-[-0.025em]">
            {role === 'landlord' ? 'Sign in. Breathe out.' : 'Your home, simplified.'}
          </h1>
          <p className="text-ink-muted text-sm mb-8 max-w-[36ch]">
            {role === 'landlord'
              ? 'Demo mode — any password works. Put the kettle on.'
              : 'Report issues, see rent dates, and talk to Skip anytime.'}
          </p>
          <form
            onSubmit={onSubmit}
            className="space-y-4 panel p-6"
          >
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
              {busy ? 'Signing in…' : 'Continue'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-ink-faint">
            <Link to="/" className="hover:text-ink">
              ← Back to RentIQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
