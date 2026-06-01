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
    'title-card': {
      eyebrow: 'Capítulo 1',
      title: 'Tu Título\nAquí',
      tagline: 'El tagline descriptivo en una sola línea.',
    },
    steps: {
      intro: 'Cómo funciona',
      items: [
        { text: 'Primer paso', detail: 'Descripción del paso' },
        { text: 'Segundo paso', detail: '' },
        { text: 'El resultado', detail: '' },
      ],
    },
    'stat-row': {
      label: 'Los números hablan',
      items: [
        { icon: '🚀', value: '10x', metric: 'Más rápido',    detail: 'que antes' },
        { icon: '📈', value: '98%', metric: 'Satisfacción',  detail: 'de usuarios' },
        { icon: '💰', value: '$0',  metric: 'Costo inicial', detail: 'para empezar' },
      ],
    },
    question: {
      question: '¿Por qué esto cambia todo?',
      answer: 'Porque por primera vez, la herramienta trabaja para ti.',
      note: '',
    },
    'myth-fact': {
      label: 'La verdad es otra',
      myth: { icon: '❌', title: 'Es muy complicado', desc: 'La mayoría lo abandona antes de empezar.' },
      fact: { icon: '✅', title: 'Es sorprendentemente simple', desc: 'Puedes tenerlo funcionando en menos de una hora.' },
    },
    'pill-tags': {
      title: 'Tech Stack',
      subtitle: 'Las herramientas que usamos',
      items: [
        { text: 'React', variant: 'cyan' },
        { text: 'TypeScript', variant: 'purple' },
        { text: 'Tailwind', variant: 'amber' },
        { text: 'Node.js', variant: 'green' },
        { text: 'Postgres', variant: 'rose' },
      ],
    },
    timeline: {
      intro: 'Así fue el camino',
      items: [
        { date: 'Enero 2023', title: 'La idea nació', desc: 'Un problema sin solución.' },
        { date: 'Junio 2023', title: 'Primer prototipo', desc: 'Ugly pero funcional.' },
        { date: 'Hoy',        title: 'Producto real', desc: '' },
      ],
    },
    callout: {
      icon: '💡',
      label: 'Clave',
      text: 'La consistencia supera al talento',
      keyword: 'consistencia',
      note: 'Aplica en cualquier área de tu vida.',
    },
    versus: {
      label: 'La diferencia real',
      left:  { name: 'Con esto', heading: 'Resultado claro', desc: 'Proceso definido\nResultados predecibles\nEquipo alineado' },
      right: { name: 'Sin esto', heading: 'Caos total', desc: 'Improvisación constante\nResultados inconsistentes\nFrustración' },
    },
  }

  return {
    id: crypto.randomUUID(),
    styleType,
    duration: 7500,
    content: content[styleType],
  }
}
