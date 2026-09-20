import { Download } from 'lucide-react'
import { Button } from '../ui/Button'
import { usePwaInstall } from '../../hooks/usePwaInstall'

export function InstallButton({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { install, showButton, ready, isIos } = usePwaInstall()

  if (!showButton) return null

  return (
    <Button
      type="button"
      variant="secondary"
      size={size}
      onClick={() => void install()}
      title={
        ready
          ? 'Install RentIQ as an app'
          : isIos
            ? 'Add RentIQ to your Home Screen'
            : 'Install RentIQ (available in supported browsers after first visit)'
      }
    >
      <Download className="h-4 w-4" />
      Install
    </Button>
  )
}
