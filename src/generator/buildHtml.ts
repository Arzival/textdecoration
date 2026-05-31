import type { Project } from '../types'
import { buildCss } from './buildCss'
import { buildPhraseHtml } from './buildPhraseHtml'
import { buildJs } from './buildJs'

export function buildHtml(project: Project): string {
  const { format, bgTheme = 'nebula', phrases } = project
  const css         = buildCss(format, bgTheme)
  const phrasesHtml = phrases.map((p, i) => buildPhraseHtml(p, i)).join('\n')
  const js          = buildJs(phrases)

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Animación</title>
<style>
${css}
</style>
</head>
<body>
<div class="stage">
  <div class="progress-bar"><div class="progress-fill" id="prog"></div></div>
  <div class="scene" id="s1">
    <div class="bg"></div>
    <div class="grid-overlay"></div>
${phrasesHtml}
  </div>
  <div class="scene" id="sEnd">
    <div class="bg"></div>
    <div class="end-wrap">
      <p class="end-title">Fin</p>
      <p class="end-sub">Animación completada.</p>
      <button class="btn-replay" onclick="start()">↺ Ver de nuevo</button>
    </div>
  </div>
</div>
<script>
${js}
</script>
</body>
</html>`
}
