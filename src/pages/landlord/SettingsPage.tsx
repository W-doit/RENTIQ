import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { subscriptionTiers } from '../../data/mock'
import { Button } from '../../components/ui/Button'
import { Input, Label } from '../../components/ui/Input'
import { cn } from '../../lib/utils'
import type { SubscriptionTier } from '../../types/database'

export function SettingsPage() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.full_name ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [tier, setTier] = useState<SubscriptionTier>(user?.subscription_tier ?? 'gold')
  const [prefs, setPrefs] = useState(
    user?.notification_prefs ?? {
      email: true,
      push: true,
      sms: false,
      maintenance: true,
      rent: true,
      compliance: true,
    },
  )
  const [saved, setSaved] = useState(false)

  function save() {
    updateUser({
      full_name: name,
      phone,
      subscription_tier: tier,
      notification_prefs: prefs,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <p className="text-label uppercase text-ink-faint tracking-[0.08em] mb-1">Account</p>
        <h1 className="font-display text-3xl font-semibold">Settings</h1>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Profile</h2>
        <div>
          <Label>Full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={user?.email ?? ''} disabled />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Subscription</h2>
        <div className="grid gap-3">
          {subscriptionTiers.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTier(t.id)}
              className={cn(
                'relative text-left border rounded-[var(--radius-card)] p-4 transition-colors',
                tier === t.id
                  ? 'border-primary bg-primary-tint'
                  : 'border-hairline bg-surface hover:border-hairline-strong',
              )}
            >
              {tier === t.id && (
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent rounded-l-[14px]" />
              )}
              <div className="flex justify-between items-baseline mb-2 pl-1">
                <span className="font-display font-semibold">{t.name}</span>
                <span className="metric text-lg" data-currency>
                  ${t.price}
                  <span className="text-sm text-ink-faint font-sans font-normal">/mo</span>
                </span>
              </div>
              <ul className="text-sm text-ink-muted space-y-1 pl-1">
                {t.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Notifications</h2>
        {(
          [
            ['email', 'Email alerts'],
            ['push', 'Push notifications'],
            ['sms', 'SMS'],
            ['maintenance', 'Maintenance updates'],
            ['rent', 'Rent & arrears'],
            ['compliance', 'Healthy Homes reminders'],
          ] as const
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex items-center justify-between py-3 border-b border-hairline text-sm"
          >
            <span>{label}</span>
            <input
              type="checkbox"
              checked={prefs[key]}
              onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked })}
              className="h-4 w-4 accent-[hsl(201_88%_29%)]"
            />
          </label>
        ))}
      </section>

      <Button onClick={save}>{saved ? 'Saved' : 'Save changes'}</Button>
    </div>
  )
}
