# 🎬 TextDecoration

Generador de animaciones de texto para YouTube y TikTok. Crea secuencias de escenas con estilos visuales, previsualízalas en tiempo real y descarga un archivo HTML listo para grabar en pantalla.

---

## ¿Cómo funciona?

1. Elige el formato de salida — **YouTube 16:9** o **TikTok 9:16**
2. Selecciona un tema de fondo
3. Agrega frases y elige el estilo visual de cada una
4. Edita el contenido en el panel izquierdo, previsualiza en el derecho
5. Descarga el archivo `animacion.html`
6. Ábrelo en el navegador en pantalla completa y grábalo con OBS, QuickTime o cualquier grabador de pantalla

El archivo descargado es completamente autónomo — no requiere internet ni dependencias externas.

---

## Estilos disponibles (18)

| Estilo | Descripción |
|---|---|
| `statement` | Frase de impacto con palabra clave destacada |
| `quote` | Cita con autor |
| `alert-red` | Alerta de error o advertencia crítica |
| `alert-amber` | Aviso o nota de precaución |
| `list-items` | Lista de puntos con iconos y colores |
| `big-number` | Estadística o número grande |
| `chain` | Secuencia de causa-efecto escalonada |
| `checklist` | Lista de verificación con checks animados |
| `comparison` | Comparación de dos opciones con veredicto |
| `title-card` | Tarjeta de título para intro o sección |
| `steps` | Pasos numerados de un proceso |
| `stat-row` | Fila de métricas o estadísticas |
| `question` | Pregunta con respuesta revelada |
| `myth-fact` | Mito vs. realidad, lado a lado |
| `pill-tags` | Nube de etiquetas animadas |
| `timeline` | Línea de tiempo con eventos |
| `callout` | Recuadro de cita o highlight |
| `versus` | Enfrentamiento de dos opciones |

---

## Temas de fondo (5)

| Tema | Colores |
|---|---|
| **Nebula** | Violeta · Cyan |
| **Midnight** | Azul índigo · Azul eléctrico |
| **Ember** | Rojo carmesí · Naranja |
| **Forest** | Verde esmeralda · Verde teal |
| **Ice** | Azul marino · Azul cielo |

---

## Motor de animación

El archivo HTML generado incluye un motor JavaScript que:

- Espera **2 segundos** antes de iniciar
- Anima la entrada de cada frase (**600 ms**)
- Mantiene la frase el tiempo estimado según su contenido
- La saca con animación de salida (**450 ms**) + pausa (**2 s**) antes de la siguiente
- Los estilos con ítems (listas, timeline, steps, etc.) los revelan de forma escalonada
- Muestra una barra de progreso en la parte inferior via `requestAnimationFrame`
- Al terminar muestra una pantalla de "Fin" con botón **Ver de nuevo**

---

## Tech stack

| | |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS v4 |
| Estado | Zustand v5 + `persist` (localStorage) |
| Output | HTML · CSS · JS generado — sin dependencias |

---

## Desarrollo local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── editor/
│   │   ├── BgPicker.tsx       # Selector de tema de fondo
│   │   ├── FormatPicker.tsx   # Selector YouTube / TikTok
│   │   ├── PhraseCard.tsx     # Tarjeta de frase en la lista
│   │   ├── PhraseForm.tsx     # Formulario de edición de frase
│   │   ├── PhraseList.tsx     # Lista de frases + botón agregar
│   │   └── StylePicker.tsx    # Grid de selección de estilo
│   └── preview/
│       ├── PreviewFrame.tsx   # iframe escalado con ResizeObserver
│       └── PreviewPanel.tsx   # Panel con controles de preview
├── data/
│   ├── defaultPhrase.ts       # Contenido por defecto por estilo
│   └── styleSchemas.ts        # Esquema de campos por estilo
├── generator/
│   ├── buildCss.ts            # Genera el CSS del HTML de salida
│   ├── buildHtml.ts           # Ensambla el HTML final
│   ├── buildJs.ts             # Genera el motor de animación JS
│   └── buildPhraseHtml.ts     # Genera el HTML por tipo de frase
├── hooks/
│   └── useDebounce.ts
├── store/
│   └── useProjectStore.ts     # Estado global con Zustand
├── types/
│   └── index.ts
└── utils/
    ├── downloadBlob.ts        # Descarga del HTML generado
    └── estimateDuration.ts    # Estimación de duración por frase
```
