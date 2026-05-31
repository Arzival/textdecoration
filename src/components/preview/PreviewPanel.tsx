import { useMemo, useState } from 'react'
import { useProjectStore } from '../../store/useProjectStore'
import { buildHtml } from '../../generator/buildHtml'
import { downloadHtml } from '../../utils/downloadBlob'
import { useDebounce } from '../../hooks/useDebounce'
import { PreviewFrame } from './PreviewFrame'

export function PreviewPanel() {
  const { format, bgTheme, phrases, activePhraseId } = useProjectStore()
  const [showFull, setShowFull] = useState(false)

  // HTML de la frase activa (preview en tiempo real)
  const activeHtml = useMemo(() => {
    const active = phrases.find((p) => p.id === activePhraseId)
    if (!active) return ''
    return buildHtml({ format, bgTheme, phrases: [active] })
  }, [format, bgTheme, phrases, activePhraseId])

  // HTML de la animación completa
  const fullHtml = useMemo(() => {
    if (phrases.length === 0) return ''
    return buildHtml({ format, bgTheme, phrases })
  }, [format, bgTheme, phrases])

  const debouncedActive = useDebounce(activeHtml, 400)
  const previewHtml     = showFull ? fullHtml : debouncedActive

  const hasActive = Boolean(activePhraseId && phrases.find((p) => p.id === activePhraseId))

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-sm font-semibold text-white/60">Preview</h2>
          <p className="text-xs text-white/25">
            {showFull ? 'Animación completa' : hasActive ? 'Frase activa' : 'Selecciona una frase'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFull((v) => !v)}
            disabled={phrases.length === 0}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              showFull
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {showFull ? '▶ Ver frase' : '▶ Ver todo'}
          </button>
          <button
            onClick={() => downloadHtml(fullHtml)}
            disabled={phrases.length === 0}
            className="flex items-center gap-2 px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            ⬇ Descargar
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        {phrases.length === 0 ? (
          <div className="text-center">
            <span className="text-5xl block mb-4 opacity-30">👁</span>
            <p className="text-white/30 text-sm">El preview aparece aquí.</p>
            <p className="text-white/20 text-xs mt-1">Agrega frases para empezar.</p>
          </div>
        ) : !hasActive && !showFull ? (
          <div className="text-center">
            <span className="text-4xl block mb-3 opacity-30">👆</span>
            <p className="text-white/30 text-sm">Selecciona una frase para previsualizar.</p>
            <p className="text-white/20 text-xs mt-1">O pulsa "Ver todo" para la animación completa.</p>
          </div>
        ) : (
          <PreviewFrame html={previewHtml} format={format} />
        )}
      </div>
    </div>
  )
}
