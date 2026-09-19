import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Bell,
  Building2,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  Settings,
  Wrench,
  Wallet,
} from 'lucide-react'
import { Logo } from '../brand/Logo'
import { AiAssistantFab } from '../ai/AiAssistantFab'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'

const landlordNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/properties', label: 'Properties', icon: Building2 },
  { to: '/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/messages', label: 'Messages', icon: MessagesSquare },
  { to: '/compliance', label: 'Compliance', icon: ClipboardCheck },
  { to: '/financials', label: 'Financials', icon: Wallet },
]

const mobileNav = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/properties', label: 'Properties', icon: Building2 },
  { to: '/maintenance', label: 'Jobs', icon: Wrench },
  { to: '/compliance', label: 'Homes', icon: ClipboardCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function LandlordShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-porcelain flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-basalt text-basalt-ink sticky top-0 h-dvh">
        <div className="h-20 px-5 flex items-center border-b border-basalt-hairline">
          <Logo invert />
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {landlordNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'relative flex items-center gap-3 px-3 h-11 rounded-[var(--radius-ui)] text-sm transition-colors',
                  isActive
                    ? 'text-basalt-ink bg-basalt-raised'
                    : 'text-basalt-ink/55 hover:text-basalt-ink hover:bg-basalt-raised/60',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-0.5 bg-accent" />
                  )}
                  <Icon className="h-4 w-4" />
                  {label}
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                'relative flex items-center gap-3 px-3 h-11 rounded-[var(--radius-ui)] text-sm transition-colors',
                isActive
                  ? 'text-basalt-ink bg-basalt-raised'
                  : 'text-basalt-ink/55 hover:text-basalt-ink hover:bg-basalt-raised/60',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-0.5 bg-accent" />
                )}
                <Settings className="h-4 w-4" />
                Settings
              </>
            )}
          </NavLink>
        </nav>
        <div className="p-4 border-t border-basalt-hairline">
          <p className="text-sm font-medium truncate">{user?.full_name}</p>
          <p className="text-xs text-basalt-ink/45 truncate mb-3">{user?.email}</p>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="flex items-center gap-2 text-sm text-basalt-ink/55 hover:text-basalt-ink"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col pb-20 md:pb-0">
        <header className="sticky top-0 z-30 h-20 bg-surface/90 backdrop-blur border-b border-hairline px-4 md:px-8 flex items-center justify-between">
          <div className="md:hidden">
            <Logo size="sm" />
          </div>
          <p className="hidden md:block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            Everything in hand
          </p>
          <button
            type="button"
            className="relative p-2 rounded-[var(--radius-ui)] hover:bg-sunken text-ink-muted"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
        </header>
        <main className="flex-1 px-4 md:px-8 py-6 max-w-[1200px] w-full mx-auto animate-settle">
          <Outlet />
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-surface border-t border-hairline pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 h-16">
          {mobileNav.map(({ to, label, icon: Icon }) => (
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
