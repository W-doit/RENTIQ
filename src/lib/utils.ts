import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number) {
  const formatted = new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
  return amount < 0 ? `−${formatted}` : formatted
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export function statusBarColor(status: string) {
  if (['occupied', 'paid', 'complete', 'clear', 'approved', 'lodged'].includes(status)) {
    return 'bg-positive'
  }
  if (['vacant', 'pending', 'new', 'triaged', 'review'].includes(status)) {
    return 'bg-caution'
  }
  if (['compliance-due', 'overdue', 'critical', 'failed', 'rejected', 'high'].includes(status)) {
    return 'bg-critical'
  }
  return 'bg-ink-faint'
}
