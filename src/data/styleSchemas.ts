import type { StyleType } from '../types'

export interface FieldDef {
  key: string
  label: string
  type: 'text' | 'textarea' | 'checkbox' | 'list-items' | 'list-chain' | 'list-check'
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
}
