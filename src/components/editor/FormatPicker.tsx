import { useProjectStore } from '../../store/useProjectStore'

export function FormatPicker() {
  const { format, setFormat } = useProjectStore()

  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
      {(['youtube', 'tiktok'] as const).map((f) => (
        <button
          key={f}
          onClick={() => setFormat(f)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
            format === f
              ? 'bg-violet-600 text-white'
              : 'text-white/50 hover:text-white'
          }`}
        >
          {f === 'youtube' ? 'YouTube 16:9' : 'TikTok 9:16'}
        </button>
      ))}
    </div>
  )
}
