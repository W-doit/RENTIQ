import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types/database'

export function ProtectedRoute({ role }: { role: UserRole }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-dvh grid place-items-center text-ink-muted text-sm">
        Loading…
      </div>
    )
  }

  if (!user) {
    return <Navigate to={role === 'tenant' ? '/tenant/login' : '/login'} replace />
  }

  if (user.role !== role) {
    return <Navigate to={user.role === 'tenant' ? '/tenant/dashboard' : '/dashboard'} replace />
  }

  return <Outlet />
}
