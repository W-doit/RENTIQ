import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AppUser, UserRole } from '../types/database'
import { mockLandlord, mockTenantUser } from '../data/mock'

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<{ error?: string }>
  logout: () => void
  updateUser: (patch: Partial<AppUser>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'rentiq_session'

function loadSession(): AppUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AppUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => loadSession())
  const [loading] = useState(false)

  const login = useCallback(async (email: string, _password: string, role: UserRole) => {
    await new Promise((r) => setTimeout(r, 450))
    const base = role === 'landlord' ? mockLandlord : mockTenantUser
    const next = { ...base, email: email || base.email }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setUser(next)
    return {}
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const updateUser = useCallback((patch: Partial<AppUser>) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...patch }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, logout, updateUser }),
    [user, loading, login, logout, updateUser],
  )

  return createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
