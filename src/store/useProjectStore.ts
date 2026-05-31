import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BgTheme, Format, Phrase, StyleType } from '../types'
import { defaultPhrase } from '../data/defaultPhrase'

interface ProjectStore {
  format: Format
  bgTheme: BgTheme
  phrases: Phrase[]
  activePhraseId: string | null

  setFormat: (f: Format) => void
  setBgTheme: (t: BgTheme) => void
  setActivePhrase: (id: string | null) => void
  addPhrase: (styleType: StyleType) => void
  updatePhrase: (id: string, patch: Partial<Phrase>) => void
  removePhrase: (id: string) => void
  reorderPhrases: (phrases: Phrase[]) => void
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      format: 'youtube',
      bgTheme: 'nebula',
      phrases: [],
      activePhraseId: null,

      setFormat: (format) => set({ format }),
      setBgTheme: (bgTheme) => set({ bgTheme }),

      setActivePhrase: (activePhraseId) => set({ activePhraseId }),

      addPhrase: (styleType) =>
        set((s) => {
          const phrase = defaultPhrase(styleType)
          return { phrases: [...s.phrases, phrase], activePhraseId: phrase.id }
        }),

      updatePhrase: (id, patch) =>
        set((s) => ({
          phrases: s.phrases.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),

      removePhrase: (id) =>
        set((s) => ({
          phrases: s.phrases.filter((p) => p.id !== id),
          activePhraseId:
            s.activePhraseId === id
              ? (s.phrases.find((p) => p.id !== id)?.id ?? null)
              : s.activePhraseId,
        })),

      reorderPhrases: (phrases) => set({ phrases }),
    }),
    { name: 'textdecoration-project' }
  )
)
