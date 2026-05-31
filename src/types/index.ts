export type Format = 'youtube' | 'tiktok'

export type StyleType =
  | 'statement'
  | 'quote'
  | 'alert-red'
  | 'alert-amber'
  | 'list-items'
  | 'big-number'
  | 'chain'
  | 'checklist'
  | 'comparison'

export interface Phrase {
  id: string
  styleType: StyleType
  duration: number
  content: Record<string, unknown>
}

export interface Project {
  format: Format
  phrases: Phrase[]
}
