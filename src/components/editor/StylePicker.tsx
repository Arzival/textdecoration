import type { StyleType } from '../../types'
import { STYLE_ICONS, STYLE_LABELS } from '../../data/styleSchemas'

const ALL_STYLES: StyleType[] = [
  'statement', 'quote', 'alert-red', 'alert-amber',
  'list-items', 'big-number', 'chain', 'checklist', 'comparison',
  'title-card', 'steps', 'stat-row', 'question', 'myth-fact',
  'pill-tags', 'timeline', 'callout', 'versus',
]

interface Props {
  value: StyleType
  onChange: (style: StyleType) => void
}

export function StylePicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {ALL_STYLES.map((style) => (
        <button
          key={style}
          onClick={() => onChange(style)}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs font-medium transition-all ${
            value === style
              ? 'border-violet-500 bg-violet-500/20 text-violet-300'
              : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white'
          }`}
        >
          <span className="text-xl">{STYLE_ICONS[style]}</span>
          <span>{STYLE_LABELS[style]}</span>
        </button>
      ))}
    </div>
  )
}
