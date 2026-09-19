import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components/brand/Logo'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

/** Landlord-only sign-in */
export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('sam@rentiq.nz')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res = await login(email, password, 'landlord')
    setBusy(false)
    if (res.error) {
      setError(res.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-dvh survey-grid flex flex-col">
      <header className="h-20 px-6 flex items-center justify-between border-b border-hairline bg-porcelain/90 backdrop-blur">
        <Logo />
        <Link
          to="/tenant/login"
          className="text-sm text-ink-muted hover:text-ink no-underline"
        >
          Tenant portal →
        </Link>
      </header>
      <div className="flex-1 grid place-items-center px-4 py-12 relative">
        <div className="absolute inset-0 porcelain-wash pointer-events-none" />
        <div className="w-full max-w-md animate-settle relative">
          <div className="mb-6 panel p-4 border-l-2 border-l-accent">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-2">
              Landlord demo · any password works
            </p>
            <p className="text-sm text-ink">
              Use{' '}
              <button
                type="button"
                className="font-medium text-primary underline-offset-2 hover:underline"
                onClick={() => {
                  setEmail('sam@rentiq.nz')
                  setPassword('demo1234')
                }}
              >
                sam@rentiq.nz
              </button>
              <span className="text-ink-faint"> / </span>
              <span className="font-mono text-xs">demo1234</span>
            </p>
          </div>

          <p className="font-mono text-label uppercase text-ink-faint tracking-[0.12em] mb-2">
            Landlord · New Zealand
          </p>
          <h1 className="font-display text-4xl font-extrabold text-ink mb-2 tracking-[-0.025em]">
            Welcome back. Nothing slipped.
          </h1>
          <p className="text-ink-muted text-sm mb-8 max-w-[40ch]">
            Sign in for the current state of every property — rent, repairs, dates and anything
            waiting on you.
          </p>
          <form onSubmit={onSubmit} className="space-y-4 panel p-6">
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
