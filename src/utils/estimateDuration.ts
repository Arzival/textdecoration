import type { Phrase } from '../types'

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function extractText(val: unknown): string {
  if (typeof val === 'string') return val
  if (Array.isArray(val)) return val.map(extractText).join(' ')
  if (val && typeof val === 'object') return Object.values(val).map(extractText).join(' ')
  return ''
}

export function estimateDuration(phrase: Phrase): number {
  const words = countWords(extractText(phrase.content))
  const base  = Math.max(4000, words * 280)

  if (['list-items', 'checklist', 'chain'].includes(phrase.styleType)) {
    const items = phrase.content.items as unknown[]
    const count = Array.isArray(items) ? items.length : 0
    return base + count * 600
  }

  if (phrase.styleType === 'comparison') return base + 2000

  return base
}
