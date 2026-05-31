import type { Phrase, StyleType } from '../types'

export function defaultPhrase(styleType: StyleType): Phrase {
  const content: Record<StyleType, Record<string, unknown>> = {
    statement: {
      label: 'Introducción',
      mainText: 'Tu frase principal aquí',
      keyword: '',
      subtitle: '',
    },
    quote: {
      text: 'Escribe tu cita aquí...',
      emphasis: '',
      author: 'Autor',
    },
    'alert-red': {
      badge: '⚡ Atención',
      title: 'Título de la alerta',
      body: 'Descripción del punto importante.',
      useCodeStyle: false,
      highlight: '',
    },
    'alert-amber': {
      badge: '💡 Tip',
      title: 'Título del tip',
      body: 'Descripción del punto clave.',
      useCodeStyle: false,
      highlight: '',
    },
    'list-items': {
      intro: 'Incluye',
      items: [
        { emoji: '🔥', text: 'Primer ítem', variant: 'purple' },
        { emoji: '⚡', text: 'Segundo ítem', variant: 'cyan' },
      ],
    },
    'big-number': {
      badge: '',
      label: 'Subtítulo',
      title: 'Descripción del número',
      subtitle: 'Contexto adicional',
      number: '100',
      unit: 'unidades',
    },
    chain: {
      intro: 'El proceso es simple:',
      items: [
        { step: '01', text: 'Primer paso' },
        { step: '02', text: 'Segundo paso' },
        { step: '03', text: 'El resultado' },
      ],
    },
    checklist: {
      intro: 'Lo que obtienes',
      items: [
        { text: 'Primer beneficio', emphasis: 'Primer' },
        { text: 'Segundo beneficio', emphasis: '' },
      ],
    },
    comparison: {
      label: 'La diferencia',
      yes: { icon: '🎯', tag: 'Con esto', title: 'El camino correcto', desc: 'Descripción positiva.' },
      no:  { icon: '🎲', tag: 'Sin esto', title: 'El problema',        desc: 'Descripción negativa.' },
      verdict: 'El resultado habla solo.',
    },
  }

  return {
    id: crypto.randomUUID(),
    styleType,
    duration: 7500,
    content: content[styleType],
  }
}
