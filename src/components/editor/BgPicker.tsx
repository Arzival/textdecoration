import type { BgTheme } from '../../types'
import { useProjectStore } from '../../store/useProjectStore'

const THEMES: { id: BgTheme; label: string; swatch: string }[] = [
  {
    id: 'nebula',
    label: 'Nebula',
    swatch: 'linear-gradient(135deg,#6d28d9,#06b6d4)',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    swatch: 'linear-gradient(135deg,#312e81,#1d4ed8)',
  },
  {
    id: 'ember',
    label: 'Ember',
    swatch: 'linear-gradient(135deg,#9f1239,#c2410c)',
  },
  {
    id: 'forest',
    label: 'Forest',
    swatch: 'linear-gradient(135deg,#064e3b,#134e4a)',
  },
  {
    id: 'ice',
    label: 'Ice',
    swatch: 'linear-gradient(135deg,#075985,#1e3a8a)',
  },
]

export function BgPicker() {
  const { bgTheme, setBgTheme } = useProjectStore()

  return (
    <div className="flex items-center gap-1.5">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setBgTheme(t.id)}
          title={t.label}
          className={`w-6 h-6 rounded-full transition-all ${
            bgTheme === t.id
              ? 'ring-2 ring-white ring-offset-1 ring-offset-gray-950 scale-110'
              : 'opacity-50 hover:opacity-80'
          }`}
          style={{ background: t.swatch }}
        />
      ))}
    </div>
  )
}
