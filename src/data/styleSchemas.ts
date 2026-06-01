import type { StyleType } from '../types'

export interface FieldDef {
  key: string
  label: string
  type: 'text' | 'textarea' | 'checkbox' | 'list-items' | 'list-chain' | 'list-check' | 'list-steps' | 'list-stats' | 'list-pills' | 'list-timeline'
  placeholder?: string
}

export const STYLE_SCHEMAS: Record<StyleType, FieldDef[]> = {
  statement: [
    { key: 'label',    label: 'Label superior',           type: 'text',     placeholder: 'Ej: Introducción' },
    { key: 'mainText', label: 'Texto principal',           type: 'textarea', placeholder: 'Texto grande centrado...' },
    { key: 'keyword',  label: 'Palabra clave (gradiente)', type: 'text',     placeholder: 'Palabra que lleva el gradiente' },
    { key: 'subtitle', label: 'Subtexto',                  type: 'text',     placeholder: 'Texto pequeño debajo (opcional)' },
  ],
  quote: [
    { key: 'text',     label: 'Cita',                          type: 'textarea', placeholder: 'Texto de la cita...' },
    { key: 'emphasis', label: 'Frase a destacar (violeta)',     type: 'text',     placeholder: 'Parte del texto a resaltar' },
    { key: 'author',   label: 'Pie de cita',                   type: 'text',     placeholder: 'Autor o contexto' },
  ],
  'alert-red': [
    { key: 'badge',        label: 'Badge',                          type: 'text',     placeholder: '⚡ Atención' },
    { key: 'title',        label: 'Título',                         type: 'text',     placeholder: 'Título del alert' },
    { key: 'body',         label: 'Cuerpo',                         type: 'textarea', placeholder: 'Contenido...' },
    { key: 'useCodeStyle', label: 'Estilo código (monospace)',       type: 'checkbox' },
    { key: 'highlight',    label: 'Highlight final (opcional)',      type: 'text',     placeholder: '' },
  ],
  'alert-amber': [
    { key: 'badge',        label: 'Badge',                          type: 'text',     placeholder: '💡 Tip' },
    { key: 'title',        label: 'Título',                         type: 'text',     placeholder: 'Título del tip' },
    { key: 'body',         label: 'Cuerpo',                         type: 'textarea', placeholder: 'Contenido...' },
    { key: 'useCodeStyle', label: 'Estilo código (monospace)',       type: 'checkbox' },
    { key: 'highlight',    label: 'Highlight final (opcional)',      type: 'text',     placeholder: '' },
  ],
  'list-items': [
    { key: 'intro', label: 'Intro', type: 'text',       placeholder: 'La uso para' },
    { key: 'items', label: 'Ítems', type: 'list-items' },
  ],
  'big-number': [
    { key: 'badge',    label: 'Badge (opcional)',  type: 'text',     placeholder: '🚀 Acceso anticipado' },
    { key: 'label',    label: 'Label',             type: 'text',     placeholder: 'Próxima sesión' },
    { key: 'title',    label: 'Título',            type: 'textarea', placeholder: 'El contexto ya va a estar ahí' },
    { key: 'subtitle', label: 'Subtítulo',         type: 'text',     placeholder: 'Descripción corta' },
    { key: 'number',   label: 'Número',            type: 'text',     placeholder: '100' },
    { key: 'unit',     label: 'Unidad',            type: 'text',     placeholder: 'personas' },
  ],
  chain: [
    { key: 'intro', label: 'Intro',            type: 'text',       placeholder: 'Se había vuelto...' },
    { key: 'items', label: 'Pasos (máx 4)',    type: 'list-chain' },
  ],
  checklist: [
    { key: 'intro', label: 'Intro',            type: 'text',       placeholder: 'Por qué funciona mejor' },
    { key: 'items', label: 'Ítems (máx 4)',    type: 'list-check' },
  ],
  comparison: [
    { key: 'label',    label: 'Label',              type: 'text',     placeholder: 'La diferencia real' },
    { key: 'yes.icon', label: 'Ícono (sí)',          type: 'text',     placeholder: '🎯' },
    { key: 'yes.tag',  label: 'Tag (sí)',            type: 'text',     placeholder: 'Proceso ordenado' },
    { key: 'yes.title',label: 'Título (sí)',         type: 'text',     placeholder: 'El camino correcto' },
    { key: 'yes.desc', label: 'Descripción (sí)',    type: 'textarea', placeholder: '...' },
    { key: 'no.icon',  label: 'Ícono (no)',          type: 'text',     placeholder: '🎲' },
    { key: 'no.tag',   label: 'Tag (no)',            type: 'text',     placeholder: 'Sin proceso' },
    { key: 'no.title', label: 'Título (no)',         type: 'text',     placeholder: 'El problema' },
    { key: 'no.desc',  label: 'Descripción (no)',    type: 'textarea', placeholder: '...' },
    { key: 'verdict',  label: 'Veredicto final',     type: 'text',     placeholder: 'El resultado habla solo.' },
  ],
  'title-card': [
    { key: 'eyebrow', label: 'Supratítulo',   type: 'text',     placeholder: 'Capítulo 1' },
    { key: 'title',   label: 'Título',        type: 'textarea', placeholder: 'El gran título aquí...' },
    { key: 'tagline', label: 'Tagline',       type: 'text',     placeholder: 'La idea en una línea' },
  ],
  steps: [
    { key: 'intro', label: 'Título intro',   type: 'text',       placeholder: 'Cómo funciona' },
    { key: 'items', label: 'Pasos (máx 4)', type: 'list-steps' },
  ],
  'stat-row': [
    { key: 'label', label: 'Título',          type: 'text',      placeholder: 'Los números hablan' },
    { key: 'items', label: 'Stats (máx 3)',  type: 'list-stats' },
  ],
  question: [
    { key: 'question', label: 'Pregunta',          type: 'textarea', placeholder: '¿Por qué...?' },
    { key: 'answer',   label: 'Respuesta',         type: 'textarea', placeholder: 'Porque...' },
    { key: 'note',     label: 'Nota extra (abajo)',type: 'text',     placeholder: 'Contexto adicional' },
  ],
  'myth-fact': [
    { key: 'label',       label: 'Label superior',      type: 'text',     placeholder: 'La verdad es otra' },
    { key: 'myth.icon',   label: 'Ícono (mito)',        type: 'text',     placeholder: '❌' },
    { key: 'myth.title',  label: 'Título del mito',     type: 'text',     placeholder: 'Ej: Es muy complicado' },
    { key: 'myth.desc',   label: 'Descripción (mito)',  type: 'textarea', placeholder: 'El malentendido...' },
    { key: 'fact.icon',   label: 'Ícono (realidad)',    type: 'text',     placeholder: '✅' },
    { key: 'fact.title',  label: 'Título real',         type: 'text',     placeholder: 'Ej: Es más simple de lo que piensas' },
    { key: 'fact.desc',   label: 'Descripción (real)',  type: 'textarea', placeholder: 'La realidad...' },
  ],
  'pill-tags': [
    { key: 'title',    label: 'Título',        type: 'text',      placeholder: 'Tech Stack' },
    { key: 'subtitle', label: 'Subtítulo',     type: 'text',      placeholder: 'Lo que usamos' },
    { key: 'items',    label: 'Tags (máx 8)', type: 'list-pills' },
  ],
  timeline: [
    { key: 'intro', label: 'Intro',              type: 'text',          placeholder: 'Así fue el camino' },
    { key: 'items', label: 'Eventos (máx 4)', type: 'list-timeline' },
  ],
  callout: [
    { key: 'icon',    label: 'Ícono',             type: 'text',     placeholder: '💡' },
    { key: 'label',   label: 'Label (CLAVE etc)', type: 'text',     placeholder: 'Clave' },
    { key: 'text',    label: 'Texto principal',   type: 'textarea', placeholder: 'Tu insight aquí...' },
    { key: 'keyword', label: 'Palabra gradiente', type: 'text',     placeholder: 'Palabra a resaltar' },
    { key: 'note',    label: 'Nota inferior',     type: 'text',     placeholder: 'Texto de apoyo' },
  ],
  versus: [
    { key: 'label',        label: 'Label',              type: 'text',     placeholder: 'La diferencia real' },
    { key: 'left.name',    label: 'Nombre izquierda',   type: 'text',     placeholder: 'Con esto' },
    { key: 'left.heading', label: 'Título izquierda',   type: 'text',     placeholder: 'Resultado claro' },
    { key: 'left.desc',    label: 'Puntos izquierda',   type: 'textarea', placeholder: 'Una por línea...' },
    { key: 'right.name',   label: 'Nombre derecha',     type: 'text',     placeholder: 'Sin esto' },
    { key: 'right.heading',label: 'Título derecha',     type: 'text',     placeholder: 'Caos total' },
    { key: 'right.desc',   label: 'Puntos derecha',     type: 'textarea', placeholder: 'Una por línea...' },
  ],
}

export const STYLE_LABELS: Record<StyleType, string> = {
  statement:    'Statement',
  quote:        'Quote',
  'alert-red':  'Alert Rojo',
  'alert-amber':'Alert Ámbar',
  'list-items': 'Lista',
  'big-number': 'Número Grande',
  chain:        'Cadena',
  checklist:    'Checklist',
  comparison:   'Comparación',
  'title-card': 'Título',
  steps:        'Pasos',
  'stat-row':   'Stats',
  question:     'Pregunta',
  'myth-fact':  'Mito / Real',
  'pill-tags':  'Tags',
  timeline:     'Timeline',
  callout:      'Callout',
  versus:       'Versus',
}

export const STYLE_ICONS: Record<StyleType, string> = {
  statement:    '📢',
  quote:        '💬',
  'alert-red':  '🚨',
  'alert-amber':'💡',
  'list-items': '📋',
  'big-number': '🔢',
  chain:        '⛓️',
  checklist:    '✅',
  comparison:   '⚖️',
  'title-card': '🎬',
  steps:        '🪜',
  'stat-row':   '📊',
  question:     '❓',
  'myth-fact':  '🔍',
  'pill-tags':  '🏷️',
  timeline:     '📅',
  callout:      '✨',
  versus:       '⚔️',
}
