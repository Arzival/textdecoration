import { useEffect, useRef, useState } from 'react'
import type { Format } from '../../types'

interface Props {
  html: string
  format: Format
  replayKey?: number
}

const DIMS = {
  youtube: { w: 1280, h: 720 },
  tiktok:  { w: 390,  h: 844 },
}

export function PreviewFrame({ html, format, replayKey = 0 }: Props) {
  const { w, h } = DIMS[format]
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [availableW, setAvailableW] = useState(560)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setAvailableW(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scale   = availableW / w
  const scaledH = Math.round(h * scale)

  return (
    <div ref={wrapperRef} className="w-full">
      <div
        className="relative overflow-hidden rounded-lg shadow-2xl"
        style={{ width: availableW, height: scaledH, background: '#050508' }}
      >
        <iframe
          key={html + replayKey}
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
    </div>
  )
}
