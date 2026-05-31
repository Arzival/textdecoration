import { useState } from 'react'
import type { StyleType } from '../../types'
import { useProjectStore } from '../../store/useProjectStore'
import { StylePicker } from './StylePicker'
import { PhraseCard } from './PhraseCard'

export function PhraseList() {
  const { phrases, activePhraseId, addPhrase } = useProjectStore()
  const [showPicker, setShowPicker] = useState(false)

  const handleAdd = (styleType: StyleType) => {
    addPhrase(styleType)
    setShowPicker(false)
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between flex-shrink-0">
        <h2 className="text-sm font-semibold text-white/60">
          Frases <span className="text-white/25">({phrases.length})</span>
        </h2>
        <button
          onClick={() => setShowPicker((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Agregar
        </button>
      </div>

      {/* Style picker (inline) */}
      {showPicker && (
        <div className="px-4 py-4 border-b border-white/10 bg-white/[0.02] flex-shrink-0">
          <p className="text-xs text-white/35 mb-3">¿Qué estilo tiene esta frase?</p>
          <StylePicker value="statement" onChange={handleAdd} />
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {phrases.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-3 opacity-40">🎬</span>
            <p className="text-white/30 text-sm">Sin frases aún.</p>
            <p className="text-white/20 text-xs mt-1">Agrega tu primera escena arriba.</p>
          </div>
        ) : (
          phrases.map((phrase, index) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              index={index}
              isActive={phrase.id === activePhraseId}
            />
          ))
        )}
      </div>
    </div>
  )
}
