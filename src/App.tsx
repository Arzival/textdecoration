import { FormatPicker } from './components/editor/FormatPicker'
import { PhraseList } from './components/editor/PhraseList'
import { PreviewPanel } from './components/preview/PreviewPanel'

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold tracking-tight">🎬 TextDecoration</span>
          <span className="text-xs text-white/25 uppercase tracking-widest hidden sm:block">
            Generador de animaciones
          </span>
        </div>
        <FormatPicker />
      </header>

      {/* Split layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Editor — izquierda */}
        <div className="w-1/2 border-r border-white/10 flex flex-col overflow-hidden">
          <PhraseList />
        </div>

        {/* Preview — derecha */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}
