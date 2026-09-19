import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import type { Property } from '../../types/database'
import { Button } from '../../components/ui/Button'
import { Input, Label, Textarea, Select } from '../../components/ui/Input'
import { mockListings } from '../../data/mock'
import { formatCurrency } from '../../lib/utils'

export function ListingGeneratorPage() {
  const { property } = useOutletContext<{ property: Property }>()
  const existing = mockListings.find((l) => l.property_id === property.id)

  const [form, setForm] = useState({
    address: property.address,
    beds: property.bedrooms,
    baths: property.bathrooms,
    rent: property.rent_weekly,
    photos: existing?.photos.join('\n') ?? property.image_url,
  })
  const [preview, setPreview] = useState(existing?.description ?? '')
  const [platform, setPlatform] = useState<'trademe' | 'realestate'>('trademe')
  const [generating, setGenerating] = useState(false)

  function generate() {
    setGenerating(true)
    setTimeout(() => {
      setPreview(
        `Bright ${form.beds}-bedroom home at ${form.address}. ${form.baths} bathroom${form.baths > 1 ? 's' : ''}, heat pump, and Healthy Homes ready. Asking ${formatCurrency(form.rent)} per week. Walkable neighbourhood, tidy presentation, ideal for professionals or a small family. Available now — enquire via RentIQ.`,
      )
      setGenerating(false)
    }, 900)
  }

  const photoList = form.photos.split('\n').filter(Boolean)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold mb-1">AI listing generator</h2>
          <p className="text-sm text-ink-muted">
            Fill the basics — Skip drafts Trade Me / realestate.co.nz copy.
          </p>
        </div>
        <div>
          <Label>Address</Label>
          <Input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Beds</Label>
            <Input
              type="number"
              value={form.beds}
              onChange={(e) => setForm({ ...form, beds: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Baths</Label>
            <Input
              type="number"
              value={form.baths}
              onChange={(e) => setForm({ ...form, baths: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Rent / wk</Label>
            <Input
              type="number"
              value={form.rent}
              onChange={(e) => setForm({ ...form, rent: Number(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <Label>Photo URLs (one per line)</Label>
          <Textarea
            value={form.photos}
            onChange={(e) => setForm({ ...form, photos: e.target.value })}
          />
        </div>
        <Button onClick={generate} disabled={generating}>
          <Sparkles className="h-4 w-4" />
          {generating ? 'Drafting…' : 'Generate listing'}
        </Button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold">Preview</h3>
          <Select
            className="w-auto h-9 text-xs"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as 'trademe' | 'realestate')}
          >
            <option value="trademe">Trade Me Property</option>
            <option value="realestate">realestate.co.nz</option>
          </Select>
        </div>
        <div
          className={`border rounded-[var(--radius-card)] overflow-hidden bg-surface ${
            platform === 'trademe' ? 'border-[#ffeb00]' : 'border-[#e31c23]/40'
          }`}
        >
          <div
            className={`px-4 py-2 text-xs font-semibold ${
              platform === 'trademe' ? 'bg-[#ffeb00] text-ink' : 'bg-[#e31c23] text-white'
            }`}
          >
            {platform === 'trademe' ? 'Trade Me Property · Preview' : 'realestate.co.nz · Preview'}
          </div>
          {photoList[0] && (
            <img src={photoList[0]} alt="" className="h-48 w-full object-cover" />
          )}
          <div className="p-4 space-y-2">
            <p className="font-display font-semibold text-lg">
              {form.beds} bedroom house · {form.address}
            </p>
            <p className="metric text-xl text-primary" data-currency>
              {formatCurrency(form.rent)} per week
            </p>
            <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-wrap">
              {preview || 'Generate a listing to see the preview.'}
            </p>
            <div className="flex gap-2 pt-2 text-xs text-ink-faint">
              <span>{form.beds} beds</span>
              <span>·</span>
              <span>{form.baths} baths</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
