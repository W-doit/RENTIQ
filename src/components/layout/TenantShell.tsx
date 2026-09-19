import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, FileText, Home, LogOut, MessageCircle, Wrench } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { AiAssistantFab } from '../ai/AiAssistantFab'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'

const nav = [
  { to: '/tenant/dashboard', label: 'Home', icon: Home },
  { to: '/tenant/maintenance', label: 'Jobs', icon: Wrench },
  { to: '/tenant/documents', label: 'Docs', icon: FileText },
  { to: '/tenant/chat', label: 'Skip', icon: MessageCircle },
]

export function TenantShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-porcelain flex flex-col pb-20">
      <header className="sticky top-0 z-30 h-16 bg-surface/90 backdrop-blur border-b border-hairline px-4 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <button type="button" className="relative p-2 text-ink-muted" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/tenant/login')
            }}
            className="p-2 text-ink-muted"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full animate-settle">
        <p className="text-sm text-ink-faint mb-4">Kia ora, {user?.full_name?.split(' ')[0]}</p>
        <Outlet />
      </main>
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-surface border-t border-hairline pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4 h-16 max-w-lg mx-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center justify-center gap-0.5 text-[11px]',
                  isActive ? 'text-ink' : 'text-ink-faint',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent" />
                  )}
                  <Icon className="h-5 w-5" />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      <AiAssistantFab />
    </div>
  )
}
