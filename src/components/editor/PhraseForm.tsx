import { STYLE_SCHEMAS } from '../../data/styleSchemas'
import type { Phrase } from '../../types'

function getPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return undefined
  }, obj)
}

function setPath(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const [head, ...tail] = path.split('.')
  if (!tail.length) return { ...obj, [head]: value }
  return {
    ...obj,
    [head]: setPath((obj[head] as Record<string, unknown>) ?? {}, tail.join('.'), value),
  }
}

interface Props {
  phrase: Phrase
  onChange: (content: Record<string, unknown>) => void
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors'
const labelCls = 'block text-xs text-white/40 mb-1.5'

export function PhraseForm({ phrase, onChange }: Props) {
  const schema  = STYLE_SCHEMAS[phrase.styleType]
  const content = phrase.content

  const set = (key: string, val: unknown) => onChange(setPath(content, key, val))

  return (
    <div className="space-y-4">
      {schema.map((field) => {
        const val = getPath(content, field.key)

        if (field.type === 'text') return (
          <div key={field.key}>
            <label className={labelCls}>{field.label}</label>
            <input
              type="text"
              value={String(val ?? '')}
              placeholder={field.placeholder}
              onChange={(e) => set(field.key, e.target.value)}
              className={inputCls}
            />
          </div>
        )

        if (field.type === 'textarea') return (
          <div key={field.key}>
            <label className={labelCls}>{field.label}</label>
            <textarea
              value={String(val ?? '')}
              placeholder={field.placeholder}
              onChange={(e) => set(field.key, e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>
        )

        if (field.type === 'checkbox') return (
          <div key={field.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(val)}
              onChange={(e) => set(field.key, e.target.checked)}
              className="w-4 h-4 accent-violet-500"
            />
            <label className="text-xs text-white/40">{field.label}</label>
          </div>
        )

        if (field.type === 'list-items') return (
          <ListItemsEditor
            key={field.key}
            items={(val as ItemRow[]) ?? []}
            onChange={(items) => set(field.key, items)}
          />
        )

        if (field.type === 'list-chain') return (
          <ListChainEditor
            key={field.key}
            items={(val as ChainRow[]) ?? []}
            onChange={(items) => set(field.key, items)}
          />
        )

        if (field.type === 'list-check') return (
          <ListCheckEditor
            key={field.key}
            items={(val as CheckRow[]) ?? []}
            onChange={(items) => set(field.key, items)}
          />
        )

        if (field.type === 'list-steps') return (
          <ListStepsEditor
            key={field.key}
            items={(val as StepRow[]) ?? []}
            onChange={(items) => set(field.key, items)}
          />
        )

        if (field.type === 'list-stats') return (
          <ListStatsEditor
            key={field.key}
            items={(val as StatRow[]) ?? []}
            onChange={(items) => set(field.key, items)}
          />
        )

        if (field.type === 'list-pills') return (
          <ListPillsEditor
            key={field.key}
            items={(val as PillRow[]) ?? []}
            onChange={(items) => set(field.key, items)}
          />
        )

        if (field.type === 'list-timeline') return (
          <ListTimelineEditor
            key={field.key}
            items={(val as TimelineRow[]) ?? []}
            onChange={(items) => set(field.key, items)}
          />
        )

        return null
      })}
    </div>
  )
}

/* ── LIST EDITORS ───────────────────────────────────── */

type ItemRow     = { emoji: string; text: string; variant: string }
type ChainRow    = { step: string; text: string }
type CheckRow    = { text: string; emphasis?: string }
type StepRow     = { text: string; detail: string }
type StatRow     = { icon: string; value: string; metric: string; detail: string }
type PillRow     = { text: string; variant: string }
type TimelineRow = { date: string; title: string; desc: string }

const VARIANTS = ['purple', 'cyan', 'amber', 'green'] as const

function ListItemsEditor({ items, onChange }: { items: ItemRow[]; onChange: (v: ItemRow[]) => void }) {
  const add    = () => onChange([...items, { emoji: '🔥', text: '', variant: 'purple' }])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<ItemRow>) =>
    onChange(items.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls}>Ítems de lista</span>
        <button onClick={add} className="text-xs text-violet-400 hover:text-violet-300">+ Agregar</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="text" value={item.emoji} onChange={(e) => update(i, { emoji: e.target.value })}
              className="w-12 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-center text-white" />
            <input type="text" value={item.text} placeholder="Texto" onChange={(e) => update(i, { text: e.target.value })}
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
            <select value={item.variant} onChange={(e) => update(i, { variant: e.target.value })}
              className="bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/70">
              {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400 text-sm">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ListChainEditor({ items, onChange }: { items: ChainRow[]; onChange: (v: ChainRow[]) => void }) {
  const add    = () => onChange([...items, { step: String(items.length + 1).padStart(2, '0'), text: '' }])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i: number, text: string) =>
    onChange(items.map((r, idx) => (idx === i ? { ...r, text } : r)))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls}>Pasos (máx 4)</span>
        {items.length < 4 && <button onClick={add} className="text-xs text-violet-400 hover:text-violet-300">+ Agregar</button>}
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-xs text-white/20 w-6 flex-shrink-0">{item.step}</span>
            <input type="text" value={item.text} placeholder={`Paso ${i + 1}...`}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
            <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400 text-sm">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ListCheckEditor({ items, onChange }: { items: CheckRow[]; onChange: (v: CheckRow[]) => void }) {
  const add    = () => onChange([...items, { text: '', emphasis: '' }])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<CheckRow>) =>
    onChange(items.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls}>Ítems checklist (máx 4)</span>
        {items.length < 4 && <button onClick={add} className="text-xs text-violet-400 hover:text-violet-300">+ Agregar</button>}
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex gap-2 items-center">
              <input type="text" value={item.text} placeholder="Texto del ítem"
                onChange={(e) => update(i, { text: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
              <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400 text-sm">✕</button>
            </div>
            <input type="text" value={item.emphasis ?? ''} placeholder="Frase a destacar (verde)"
              onChange={(e) => update(i, { emphasis: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/60 placeholder-white/20 focus:outline-none focus:border-violet-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ListStepsEditor({ items, onChange }: { items: StepRow[]; onChange: (v: StepRow[]) => void }) {
  const add    = () => onChange([...items, { text: '', detail: '' }])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<StepRow>) =>
    onChange(items.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls}>Pasos (máx 4)</span>
        {items.length < 4 && <button onClick={add} className="text-xs text-violet-400 hover:text-violet-300">+ Agregar</button>}
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex gap-2 items-center">
              <span className="text-xs text-white/30 w-4 flex-shrink-0 font-bold text-center">{i + 1}</span>
              <input type="text" value={item.text} placeholder="Título del paso"
                onChange={(e) => update(i, { text: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
              <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400 text-sm">✕</button>
            </div>
            <input type="text" value={item.detail} placeholder="Descripción (opcional)"
              onChange={(e) => update(i, { detail: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/60 placeholder-white/20 focus:outline-none focus:border-violet-500 ml-6" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ListStatsEditor({ items, onChange }: { items: StatRow[]; onChange: (v: StatRow[]) => void }) {
  const add    = () => onChange([...items, { icon: '📊', value: '0', metric: 'Métrica', detail: '' }])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<StatRow>) =>
    onChange(items.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls}>Stats (máx 3)</span>
        {items.length < 3 && <button onClick={add} className="text-xs text-violet-400 hover:text-violet-300">+ Agregar</button>}
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white/[0.02] rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/30">Stat {i + 1}</span>
              <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400 text-xs">✕</button>
            </div>
            <div className="flex gap-2">
              <input type="text" value={item.icon} onChange={(e) => update(i, { icon: e.target.value })}
                className="w-12 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-center text-white" />
              <input type="text" value={item.value} placeholder="Valor (ej: 10x)"
                onChange={(e) => update(i, { value: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
            </div>
            <input type="text" value={item.metric} placeholder="Etiqueta"
              onChange={(e) => update(i, { metric: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
            <input type="text" value={item.detail} placeholder="Detalle (opcional)"
              onChange={(e) => update(i, { detail: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/60 placeholder-white/20 focus:outline-none focus:border-violet-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

const PILL_VARIANTS = ['purple', 'cyan', 'amber', 'green', 'rose'] as const

function ListPillsEditor({ items, onChange }: { items: PillRow[]; onChange: (v: PillRow[]) => void }) {
  const add    = () => onChange([...items, { text: '', variant: 'purple' }])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<PillRow>) =>
    onChange(items.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls}>Tags (máx 8)</span>
        {items.length < 8 && <button onClick={add} className="text-xs text-violet-400 hover:text-violet-300">+ Agregar</button>}
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="text" value={item.text} placeholder="Tag"
              onChange={(e) => update(i, { text: e.target.value })}
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
            <select value={item.variant} onChange={(e) => update(i, { variant: e.target.value })}
              className="bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/70">
              {PILL_VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400 text-sm">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ListTimelineEditor({ items, onChange }: { items: TimelineRow[]; onChange: (v: TimelineRow[]) => void }) {
  const add    = () => onChange([...items, { date: '', title: '', desc: '' }])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<TimelineRow>) =>
    onChange(items.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls}>Eventos (máx 4)</span>
        {items.length < 4 && <button onClick={add} className="text-xs text-violet-400 hover:text-violet-300">+ Agregar</button>}
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white/[0.02] rounded-lg p-3 space-y-2">
            <div className="flex gap-2 items-center">
              <input type="text" value={item.date} placeholder="Fecha o etapa"
                onChange={(e) => update(i, { date: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
              <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400 text-xs">✕</button>
            </div>
            <input type="text" value={item.title} placeholder="Título del evento"
              onChange={(e) => update(i, { title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500" />
            <input type="text" value={item.desc} placeholder="Descripción (opcional)"
              onChange={(e) => update(i, { desc: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/60 placeholder-white/20 focus:outline-none focus:border-violet-500" />
          </div>
        ))}
      </div>
    </div>
  )
}
