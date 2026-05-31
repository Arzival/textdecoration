import { useState } from 'react'
import type { Phrase, StyleType } from '../../types'
import { useProjectStore } from '../../store/useProjectStore'
import { STYLE_ICONS, STYLE_LABELS } from '../../data/styleSchemas'
import { defaultPhrase } from '../../data/defaultPhrase'
import { estimateDuration } from '../../utils/estimateDuration'
import { StylePicker } from './StylePicker'
import { PhraseForm } from './PhraseForm'

interface Props {
  phrase: Phrase
  index: number
  isActive: boolean
}

function previewText(phrase: Phrase): string {
  const c = phrase.content as Record<string, unknown>
  const text = String(c.mainText ?? c.text ?? c.body ?? c.title ?? c.number ?? '')
  return text.replace(/\n/g, ' ').slice(0, 60) || '(sin texto)'
}

export function PhraseCard({ phrase, index, isActive }: Props) {
  const { updatePhrase, removePhrase, setActivePhrase } = useProjectStore()
  const [showStyles, setShowStyles] = useState(false)

  const toggleActive = () => setActivePhrase(isActive ? null : phrase.id)

  const handleStyleChange = (styleType: StyleType) => {
    const fresh = defaultPhrase(styleType)
    updatePhrase(phrase.id, { styleType, content: fresh.content, duration: fresh.duration })
    setShowStyles(false)
  }

  const handleContentChange = (content: Record<string, unknown>) => {
    updatePhrase(phrase.id, {
      content,
      duration: estimateDuration({ ...phrase, content }),
    })
  }

  return (
    <div className={`border rounded-xl transition-all ${
      isActive
        ? 'border-violet-500/50 bg-violet-500/5'
        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={toggleActive}
      >
        <span className="text-white/25 text-xs font-mono w-4 flex-shrink-0">{index + 1}</span>
        <span className="text-base flex-shrink-0">{STYLE_ICONS[phrase.styleType]}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/35 mb-0.5">{STYLE_LABELS[phrase.styleType]}</p>
          <p className="text-sm text-white/70 truncate">{previewText(phrase)}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); setActivePhrase(phrase.id); setShowStyles((v) => !v) }}
            className="p-1.5 text-white/30 hover:text-violet-400 rounded transition-colors"
            title="Cambiar estilo"
          >🎨</button>
          <button
            onClick={(e) => { e.stopPropagation(); removePhrase(phrase.id) }}
            className="p-1.5 text-white/20 hover:text-red-400 rounded transition-colors"
            title="Eliminar"
          >✕</button>
          <span className={`text-white/25 text-xs transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </div>

      {/* Body */}
      {isActive && (
        <div className="px-4 pb-4 border-t border-white/5">
          {showStyles ? (
            <div className="pt-4">
              <p className="text-xs text-white/35 mb-3">Elige un estilo visual</p>
              <StylePicker value={phrase.styleType} onChange={handleStyleChange} />
              <button
                onClick={() => setShowStyles(false)}
                className="mt-3 text-xs text-white/30 hover:text-white/60"
              >← Volver al formulario</button>
            </div>
          ) : (
            <div className="pt-4">
              <PhraseForm phrase={phrase} onChange={handleContentChange} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
