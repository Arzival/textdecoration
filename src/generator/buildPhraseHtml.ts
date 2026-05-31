import type { Phrase } from '../types'

function esc(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escBr(str: unknown): string {
  return esc(str).replace(/\n/g, '<br>')
}

function highlightKw(text: string, kw: string): string {
  if (!kw) return escBr(text)
  const escaped = escBr(text)
  const escapedKw = esc(kw)
  return escaped.replace(escapedKw, `<span class="st-kw">${escapedKw}</span>`)
}

function highlightEm(text: string, em: string): string {
  if (!em) return escBr(text)
  return escBr(text).replace(esc(em), `<em>${esc(em)}</em>`)
}

export function buildPhraseHtml(phrase: Phrase, index: number): string {
  const id = `p${index + 1}`
  const c  = phrase.content as Record<string, unknown>

  switch (phrase.styleType) {
    case 'statement':
      return statement(id, c)
    case 'quote':
      return quote(id, c)
    case 'alert-red':
      return alertRed(id, c)
    case 'alert-amber':
      return alertAmber(id, c)
    case 'list-items':
      return listItems(id, c)
    case 'big-number':
      return bigNumber(id, c)
    case 'chain':
      return chain(id, c)
    case 'checklist':
      return checklist(id, c)
    case 'comparison':
      return comparison(id, c)
    default:
      return ''
  }
}

function statement(id: string, c: Record<string, unknown>) {
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:center;text-align:center;">
      <div class="pi" style="max-width:1050px;width:100%;">
        ${c.label ? `<p class="st-label">${esc(c.label)}</p>` : ''}
        <h1 class="st-main">${highlightKw(String(c.mainText ?? ''), String(c.keyword ?? ''))}</h1>
        ${c.subtitle ? `<p class="st-sub">${esc(c.subtitle)}</p>` : ''}
      </div>
    </div>`
}

function quote(id: string, c: Record<string, unknown>) {
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:center;">
      <div class="pi" style="max-width:870px;width:100%;">
        <span class="q-mark">&ldquo;</span>
        <p class="q-text">${highlightEm(String(c.text ?? ''), String(c.emphasis ?? ''))}</p>
        <div class="q-line"></div>
        <p class="q-foot">${esc(c.author)}</p>
      </div>
    </div>`
}

function alertRed(id: string, c: Record<string, unknown>) {
  const cls = c.useCodeStyle ? 'al-body code' : 'al-body'
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:flex-start;padding:0 100px;">
      <div class="pi" style="max-width:720px;">
        ${c.badge ? `<span class="al-badge">${esc(c.badge)}</span>` : ''}
        <div class="al-card">
          <p class="al-title">${esc(c.title)}</p>
          <p class="${cls}">${escBr(c.body)}</p>
          ${c.highlight ? `<div class="al-highlight">${esc(c.highlight)}</div>` : ''}
        </div>
      </div>
    </div>`
}

function alertAmber(id: string, c: Record<string, unknown>) {
  const cls = c.useCodeStyle ? 'al7-body code' : 'al7-body'
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:flex-end;padding:0 100px;">
      <div class="pi" style="max-width:730px;">
        ${c.badge ? `<span class="al7-badge">${esc(c.badge)}</span>` : ''}
        <div class="al7-card">
          <p class="al7-title">${esc(c.title)}</p>
          <p class="${cls}">${escBr(c.body)}</p>
          ${c.highlight ? `<div class="al7-highlight">${esc(c.highlight)}</div>` : ''}
        </div>
      </div>
    </div>`
}

function listItems(id: string, c: Record<string, unknown>) {
  const items = (c.items as Array<{ emoji: string; text: string; variant: string }>) ?? []
  const rows  = items.map(it => `
          <div class="list-card ${esc(it.variant)}">
            <span class="lc-icon">${esc(it.emoji)}</span>
            <span class="lc-text">${esc(it.text)}</span>
          </div>`).join('')
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:center;">
      <div class="pi" style="max-width:780px;width:100%;">
        <p class="li-intro">${esc(c.intro)}</p>
        ${rows}
      </div>
    </div>`
}

function bigNumber(id: string, c: Record<string, unknown>) {
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:center;">
      <div class="pi" style="max-width:1100px;width:100%;padding:0 80px;display:flex;flex-direction:row;align-items:center;gap:60px;">
        <div style="flex:1;">
          ${c.badge ? `<span class="bn-badge">${esc(c.badge)}</span>` : ''}
          <p class="bn-label">${esc(c.label)}</p>
          <h2 class="bn-title">${escBr(c.title)}</h2>
          <p class="bn-sub">${esc(c.subtitle)}</p>
        </div>
        <div style="flex-shrink:0;text-align:center;">
          <div class="bn-num">${esc(c.number)}</div>
          <p class="bn-unit">${esc(c.unit)}</p>
        </div>
      </div>
    </div>`
}

function chain(id: string, c: Record<string, unknown>) {
  const items = (c.items as Array<{ step: string; text: string }>) ?? []
  const rows  = items.map(it => `
          <div class="chain-item">
            <span class="ci-step">${esc(it.step)}</span>
            <p class="ci-consequence">${esc(it.text)}</p>
          </div>`).join('')
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:center;">
      <div class="pi" style="max-width:920px;width:100%;">
        <p class="chain-label">${esc(c.intro)}</p>
        ${rows}
      </div>
    </div>`
}

function checklist(id: string, c: Record<string, unknown>) {
  const items = (c.items as Array<{ text: string; emphasis?: string }>) ?? []
  const rows  = items.map(it => `
          <div class="check-item">
            <div class="ci-check">✓</div>
            <p class="ci-text">${highlightEm(it.text, it.emphasis ?? '')}</p>
          </div>`).join('')
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:center;">
      <div class="pi" style="max-width:800px;width:100%;">
        <p class="cl-intro">${esc(c.intro)}</p>
        ${rows}
      </div>
    </div>`
}

function comparison(id: string, c: Record<string, unknown>) {
  const yes = (c.yes as Record<string, string>) ?? {}
  const no  = (c.no  as Record<string, string>) ?? {}
  return `    <div class="phrase" id="${id}" style="align-items:center;justify-content:center;">
      <div class="pi" style="max-width:1120px;width:100%;padding:0 60px;display:flex;flex-direction:column;align-items:center;gap:22px;">
        <p class="cmp-label">${esc(c.label)}</p>
        <div class="cmp-row">
          <div class="cmp-card yes">
            <div class="cmp-icon">${esc(yes.icon)}</div>
            <p class="cmp-tag">${esc(yes.tag)}</p>
            <p class="cmp-title">${esc(yes.title)}</p>
            <p class="cmp-desc">${esc(yes.desc)}</p>
          </div>
          <div class="cmp-card no">
            <div class="cmp-icon">${esc(no.icon)}</div>
            <p class="cmp-tag">${esc(no.tag)}</p>
            <p class="cmp-title">${esc(no.title)}</p>
            <p class="cmp-desc">${esc(no.desc)}</p>
          </div>
        </div>
        <p class="cmp-verdict">${esc(c.verdict)}</p>
      </div>
    </div>`
}
