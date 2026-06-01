export type Format = 'youtube' | 'tiktok'

export type BgTheme = 'nebula' | 'midnight' | 'ember' | 'forest' | 'ice'

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
  | 'title-card'
  | 'steps'
  | 'stat-row'
  | 'question'
  | 'myth-fact'
  | 'pill-tags'
  | 'timeline'
  | 'callout'
  | 'versus'

export interface Phrase {
  id: string
  styleType: StyleType
  duration: number
  content: Record<string, unknown>
}

export interface Project {
  format: Format
  bgTheme: BgTheme
  phrases: Phrase[]
}
