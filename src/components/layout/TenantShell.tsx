import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Bell,
  FileText,
  Home,
  LogOut,
  MessageCircle,
  MessagesSquare,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { Logo } from '../brand/Logo'
import { useAuth } from '../../context/AuthContext'
import { mockTenantNotifications, tenantHome } from '../../data/mock'
import { cn, formatDate } from '../../lib/utils'

const nav = [
  { to: '/tenant/dashboard', label: 'Home', icon: Home },
  { to: '/tenant/maintenance', label: 'Repairs', icon: Wrench },
  { to: '/tenant/messages', label: 'Messages', icon: MessagesSquare },
  { to: '/tenant/documents', label: 'Docs', icon: FileText },
  { to: '/tenant/chat', label: 'Iris', icon: Sparkles },
]

export function TenantShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showNotifs, setShowNotifs] = useState(false)
  const unread = mockTenantNotifications.filter((n) => n.unread).length
  const { property } = tenantHome

  return (
    <div className="min-h-dvh bg-porcelain flex flex-col pb-20">
      <header className="sticky top-0 z-30 bg-surface border-b border-hairline">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Logo size="sm" />
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.14em] text-accent bg-accent-tint px-2 py-0.5 rounded-[4px]">
              Tenant
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="relative p-2 text-ink-muted"
              aria-label="Notifications"
              onClick={() => setShowNotifs((v) => !v)}
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
              )}
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
        </div>
        <div className="px-4 pb-3 flex items-center gap-3">
          <img
            src={property.image_url}
            alt=""
            className="h-10 w-10 rounded-[8px] object-cover border border-hairline"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{property.address}</p>
            <p className="text-xs text-ink-faint truncate">
              {property.suburb}, {property.city} · Kia ora, {user?.full_name?.split(' ')[0]}
            </p>
          </div>
        </div>

        {showNotifs && (
          <div className="absolute right-3 top-[3.25rem] z-40 w-[min(100vw-1.5rem,320px)] panel shadow-[var(--shadow-overlay)] animate-settle overflow-hidden">
            <div className="flex items-center justify-between px-3 h-11 border-b border-hairline">
              <span className="text-sm font-medium">Notifications</span>
              <button type="button" onClick={() => setShowNotifs(false)} className="p-1 text-ink-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {mockTenantNotifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    'px-3 py-3 border-b border-hairline last:border-0',
                    n.unread && 'bg-primary-tint/40',
                  )}
                >
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-ink-muted">{n.body}</p>
                  <p className="text-[10px] text-ink-faint mt-1">{formatDate(n.at)}</p>
                </div>
              ))}
            </div>
            <NavLink
              to="/tenant/messages"
              onClick={() => setShowNotifs(false)}
              className="flex items-center justify-center gap-1.5 h-10 text-sm text-primary border-t border-hairline no-underline"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Open messages
            </NavLink>
          </div>
        )}
      </header>

      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full animate-settle">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-30 bg-surface border-t border-hairline pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center justify-center gap-0.5 text-[10px]',
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
    </div>
  )
}
