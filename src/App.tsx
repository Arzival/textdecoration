import { useState } from 'react'
import { BgPicker } from './components/editor/BgPicker'
import { FormatPicker } from './components/editor/FormatPicker'
import { PhraseList } from './components/editor/PhraseList'
import { PreviewPanel } from './components/preview/PreviewPanel'

export default function App() {
  const [tab, setTab] = useState<'editor' | 'preview'>('editor')

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-base font-bold tracking-tight">🎬 TextDecoration</span>
          <span className="text-xs text-white/25 uppercase tracking-widest hidden lg:block">
            Generador de animaciones
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <BgPicker />
          <FormatPicker />
        </div>
      </header>

      {/* Split layout — desktop */}
      <div className="flex-1 hidden md:flex overflow-hidden min-h-0">
        <div className="w-1/2 border-r border-white/10 flex flex-col overflow-hidden">
          <PhraseList />
        </div>
        <div className="w-1/2 flex flex-col overflow-hidden">
          <PreviewPanel />
        </div>
      </div>

      {/* Tab layout — mobile */}
      <div className="flex-1 flex flex-col md:hidden overflow-hidden min-h-0">
        <div className="flex-1 overflow-hidden min-h-0">
          {tab === 'editor' ? <PhraseList /> : <PreviewPanel />}
        </div>
        <div className="flex border-t border-white/10 flex-shrink-0 bg-gray-950">
          <button
            onClick={() => setTab('editor')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === 'editor'
                ? 'text-white border-t-2 border-violet-500'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            ✏️ Editor
          </button>
          <button
            onClick={() => setTab('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === 'preview'
                ? 'text-white border-t-2 border-violet-500'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            👁 Preview
          </button>
        </div>
      </div>
    </div>
  )
}
