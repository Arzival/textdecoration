import type { Format } from '../../types'

interface Props {
  html: string
  format: Format
}

const DIMS = {
  youtube: { w: 1280, h: 720 },
  tiktok:  { w: 390,  h: 844 },
}

export function PreviewFrame({ html, format }: Props) {
  const { w, h } = DIMS[format]
  const containerW = 560
  const scale      = containerW / w
  const scaledH    = Math.round(h * scale)

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-2xl"
      style={{ width: containerW, height: scaledH, background: '#050508' }}
    >
      <iframe
        key={html}
        srcDoc={html}
        width={w}
        height={h}
        sandbox="allow-scripts"
        title="Preview de animación"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 'none',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
