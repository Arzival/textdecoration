# Arquitectura del Proyecto — Text Decoration Animation Generator

Guía técnica de referencia. Leer antes de tocar cualquier archivo del proyecto.

---

## 1. Stack tecnológico

| Tecnología | Versión | Razón |
|---|---|---|
| React | 19 | Componentes modernos, hooks concurrentes |
| Vite | latest | Build ultrarrápido, HMR instantáneo |
| TypeScript | ~5.x | Tipado estricto en todo el pipeline del generador |
| Tailwind CSS | v3 | Utilidades CSS sin abandonar el HTML, sin CSS modules |
| Zustand | latest | Estado global mínimo, sin boilerplate, con persist |
| Sin backend | — | Todo corre en el browser; exportación como archivo HTML standalone |
| Sin router | — | SPA de una sola pantalla |

---

## 2. Estructura de carpetas

```
src/
├── main.tsx                        — punto de entrada, monta <App />
├── App.tsx                         — layout raíz: editor (izq) + preview (der)
│
├── store/
│   └── useProjectStore.ts          — Zustand con persist en localStorage
│                                     contiene: format, phrases[], acciones CRUD
│
├── data/
│   ├── styleSchemas.ts             — define qué campos renderiza PhraseForm
│   │                                 para cada uno de los 9 estilos
│   └── defaultPhrase.ts            — objeto Phrase vacío usado al crear nueva frase
│
├── components/
│   ├── editor/
│   │   ├── PhraseList.tsx          — lista scrollable de PhraseCard
│   │   ├── PhraseCard.tsx          — tarjeta colapsable: muestra styleType + preview de texto
│   │   ├── PhraseForm.tsx          — formulario dinámico; lee styleSchemas para saber
│   │   │                             qué campos mostrar según styleType
│   │   ├── StylePicker.tsx         — grid 3×3 de los 9 estilos visuales con thumbnail
│   │   └── FormatPicker.tsx        — selector YouTube (16:9) / TikTok (9:16)
│   │
│   ├── preview/
│   │   ├── PreviewPanel.tsx        — wrapper con controles (botón Ver de nuevo)
│   │   └── PreviewFrame.tsx        — <iframe srcDoc={html}> escalado con transform:scale()
│   │
│   └── ui/
│       ├── Button.tsx              — botón reutilizable con variantes
│       └── Input.tsx               — input/textarea reutilizable con label
│
├── generator/
│   ├── buildHtml.ts                — orquestador: llama a buildCss + buildPhraseHtml + buildJs
│   │                                 y devuelve el string HTML completo standalone
│   ├── buildCss.ts                 — genera el bloque <style> con las reglas base del motor
│   ├── buildPhraseHtml.ts          — itera phrases[] y llama al styleTemplate correcto
│   ├── buildJs.ts                  — genera el bloque <script> con el motor de animación JS
│   └── styleTemplates/
│       ├── statement.ts            — frase impactante, texto grande centrado
│       ├── quote.ts                — cita con comillas y atribución
│       ├── alertRed.ts             — alerta roja con ícono y mensaje
│       ├── alertAmber.ts           — alerta ámbar con ícono y mensaje
│       ├── listItems.ts            — lista de ítems que aparecen en secuencia
│       ├── bigNumber.ts            — número grande con etiqueta
│       ├── chain.ts                — pasos encadenados (A → B → C)
│       ├── checklist.ts            — lista de checks animados
│       └── comparison.ts          — dos columnas: bueno vs malo
│
└── utils/
    ├── downloadBlob.ts             — crea Blob HTML y dispara descarga con <a>
    └── estimateDuration.ts         — calcula duración total del video en ms
```

---

## 3. Modelo de datos TypeScript

### Tipos base

```ts
type Format = 'youtube' | 'tiktok'

type StyleType =
  | 'statement'
  | 'quote'
  | 'alert-red'
  | 'alert-amber'
  | 'list-items'
  | 'big-number'
  | 'chain'
  | 'checklist'
  | 'comparison'

interface Project {
  format: Format
  phrases: Phrase[]
}

interface Phrase {
  id: string          // uuid generado al crear
  styleType: StyleType
  duration: number    // milisegundos que permanece visible (PAUSE del motor JS)
  content: PhraseContent
}

type PhraseContent =
  | StatementContent
  | QuoteContent
  | AlertContent
  | ListItemsContent
  | BigNumberContent
  | ChainContent
  | ChecklistContent
  | ComparisonContent
```

### PhraseContent por estilo

```ts
// statement — frase impactante
interface StatementContent {
  text: string
  highlight?: string  // palabra(s) a resaltar con color de acento
}

// quote — cita textual
interface QuoteContent {
  text: string
  author?: string
}

// alert-red y alert-amber comparten el mismo shape
interface AlertContent {
  title: string
  body?: string
}

// list-items — lista con animación de entrada secuencial
interface ListItemsContent {
  headline?: string
  items: string[]     // máximo recomendado: 5 ítems
}

// big-number — cifra destacada
interface BigNumberContent {
  number: string      // string para permitir "3.5M" o "47%"
  label: string
  sublabel?: string
}

// chain — pasos encadenados
interface ChainContent {
  steps: string[]     // aparecen conectados por flechas, máx 4
}

// checklist — lista de verificación
interface ChecklistContent {
  headline?: string
  items: {
    text: string
    checked: boolean
  }[]
}

// comparison — dos columnas
interface ComparisonContent {
  leftLabel: string     // ej: "Antes" o "Sin X"
  rightLabel: string    // ej: "Después" o "Con X"
  leftItems: string[]
  rightItems: string[]
}
```

---

## 4. Árbol de componentes y responsabilidades

```
App
├── FormatPicker          — lee/escribe project.format en Zustand
├── EditorPanel
│   ├── PhraseList
│   │   └── PhraseCard[]  — renderiza una por cada phrase en project.phrases
│   │       ├── StylePicker       — cambia phrase.styleType (useState local mientras no confirma)
│   │       └── PhraseForm        — edita phrase.content con campos dinámicos
│   └── [Botón Agregar frase]     — llama addPhrase() del store
└── PreviewPanel
    ├── [Botón Descargar HTML]    — llama buildHtml() + downloadBlob()
    ├── [Botón Ver de nuevo]      — recarga el iframe mediante key prop
    └── PreviewFrame              — recibe html string, lo muestra en iframe
```

### Responsabilidades clave

- **App.tsx** — solo layout (grid de dos columnas). No contiene lógica.
- **PhraseCard.tsx** — estado local `isExpanded` para colapsar/expandir el formulario.
- **PhraseForm.tsx** — lee `styleSchemas[phrase.styleType]` para renderizar solo los campos relevantes. No sabe nada de los 9 estilos; solo itera el schema.
- **PreviewFrame.tsx** — recibe `html: string` como prop. Cada vez que `html` cambia, el iframe se actualiza automáticamente vía `srcDoc`.
- **buildHtml.ts** — función pura: recibe `Project`, devuelve `string`. No tiene efectos secundarios.

---

## 5. Flujo de estado

### Estado global — Zustand (`useProjectStore`)

Persiste en `localStorage`. Contiene todo lo que debe sobrevivir a un refresh.

```ts
interface ProjectStore {
  // estado
  format: Format
  phrases: Phrase[]

  // acciones
  setFormat: (format: Format) => void
  addPhrase: () => void
  updatePhrase: (id: string, patch: Partial<Phrase>) => void
  removePhrase: (id: string) => void
  reorderPhrases: (from: number, to: number) => void
}
```

### Estado local — `useState` en componentes

Solo para UI transitoria que no necesita persistencia:

| Componente | Estado local | Razón |
|---|---|---|
| `PhraseCard` | `isExpanded` | Solo afecta a esa tarjeta, no al proyecto |
| `PreviewPanel` | `iframeKey` | Número que incrementa para forzar reload del iframe |
| `StylePicker` | `hoveredStyle` | Highlight de hover, puramente visual |

### Derivados (no se guardan en store)

- El `html` del preview se calcula en `PreviewPanel` llamando `buildHtml(project)`. Se recalcula en cada render (o con `useMemo` si hay perf issues).
- `estimateDuration(phrases)` se calcula en el UI cuando se muestra la duración estimada.

---

## 6. Pipeline del generador HTML

El generador es un conjunto de funciones puras en `src/generator/`. El punto de entrada es `buildHtml`.

```
buildHtml(project: Project): string
  │
  ├── buildCss(format)
  │     └── devuelve string con:
  │           - reset básico
  │           - .stage (el contenedor 16:9 o 9:16)
  │           - .phrase (position:absolute; inset:0; opacity:0)
  │           - clases de animación: .anim-in, .anim-out, .visible
  │
  ├── buildPhraseHtml(phrases)
  │     └── por cada phrase:
  │           styleTemplates[phrase.styleType](phrase.content)
  │           devuelve <div class="phrase" data-duration="...">...</div>
  │
  └── buildJs()
        └── devuelve el motor de animación:
              INIT_WAIT=2000, ANIM_IN=600, ANIM_OUT=450, PAUSE=2000
              lógica secuencial, guarda/restaura innerHTML para "Ver de nuevo"
```

### Plantilla HTML de salida

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>/* buildCss() */</style>
</head>
<body>
  <div class="stage">
    <!-- buildPhraseHtml() -->
    <div class="phrase" data-duration="3000">...</div>
    <div class="phrase" data-duration="2500">...</div>
  </div>
  <script>/* buildJs() */</script>
</body>
</html>
```

### Cada styleTemplate

Es una función pura que recibe el `content` del estilo y devuelve un fragmento HTML string. No conoce el motor JS, no agrega `<script>`, no agrega `.stage`. Solo el contenido interno del `.phrase`.

```ts
// Ejemplo de firma
function statement(content: StatementContent): string
function quote(content: QuoteContent): string
// etc.
```

---

## 7. Preview con iframe

El preview en el editor usa un `<iframe>` real con el HTML final. No hay re-implementación de las animaciones en React — lo que se ve en el preview ES lo que se exporta.

```tsx
// PreviewFrame.tsx
<iframe
  key={iframeKey}           // cambiar key fuerza recrear el iframe (= reiniciar animación)
  srcDoc={html}
  sandbox="allow-scripts"   // scripts propios del HTML, sin acceso al DOM padre
  style={{
    width: DESIGN_WIDTH,    // 1280px (youtube) o 720px (tiktok)
    height: DESIGN_HEIGHT,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    border: 'none',
  }}
/>
```

El `scale` se calcula dividiendo el ancho disponible del panel entre el ancho de diseño:
```ts
const scale = panelWidth / DESIGN_WIDTH
```

El contenedor del iframe debe tener `overflow:hidden` y dimensiones exactas de `DESIGN_WIDTH * scale` × `DESIGN_HEIGHT * scale` para que no aparezcan scrollbars.

---

## 8. Reglas del generador que NUNCA se pueden violar

Estas reglas resuelven bugs concretos que aparecen cuando se graba el video. No son preferencias de estilo — son restricciones funcionales.

### R1 — Posicionamiento de `.phrase`

```css
.phrase {
  position: absolute;
  inset: 0;
  display: flex;
  opacity: 0;
}
```

Siempre `position:absolute` e `inset:0`. Las frases se apilan unas sobre otras y el motor JS las hace visibles en secuencia cambiando `opacity`.

### R2 — Prohibido `transform:translate(-50%,-50%)` para centrar

Este patrón rompe las animaciones CSS que también usan `transform`. Centrar contenido dentro de `.phrase` se hace con Flexbox:

```css
/* CORRECTO */
.phrase {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* PROHIBIDO */
.phrase {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* rompe anim-in / anim-out */
}
```

### R3 — Media queries solo con `max-width`

```css
/* CORRECTO */
@media (max-width: 768px) { ... }

/* PROHIBIDO */
@media (max-height: 500px) { ... }
```

`max-height` dentro del iframe genera comportamiento inconsistente entre navegadores cuando el viewport del iframe tiene dimensiones fijas.

### R4 — `.stage` siempre tiene `flex-shrink:0`

```css
.stage {
  flex-shrink: 0;
  /* resto de propiedades */
}
```

Sin esto, el stage puede comprimirse en ciertos layouts del body, rompiendo las proporciones del video.

### R5 — Tiempos del motor JS (no hardcodear en otro lugar)

Los tiempos del motor están definidos una sola vez en `buildJs.ts`:

```js
const INIT_WAIT  = 2000;  // ms antes de empezar (permite que el grabador esté listo)
const ANIM_IN    = 600;   // ms de la animación de entrada
const ANIM_OUT   = 450;   // ms de la animación de salida
const PAUSE      = 2000;  // ms de pausa entre frases (default; cada frase puede sobreescribir con data-duration)
```

Si se necesita ajustar estos valores, hacerlo solo en `buildJs.ts`, nunca en los styleTemplates ni en el CSS.

### R6 — Guardar y restaurar innerHTML para "Ver de nuevo"

El botón "Ver de nuevo" del HTML exportado debe funcionar sin recargar la página. El motor JS debe guardar el `innerHTML` inicial del stage y restaurarlo antes de volver a ejecutar la secuencia:

```js
const originalHtml = stage.innerHTML;

function replay() {
  stage.innerHTML = originalHtml;
  runSequence();
}
```

Sin esto, tras la primera reproducción el DOM queda en estado final y el replay no funciona.

---

## Referencias rápidas

- Estado global: `src/store/useProjectStore.ts`
- Tipos completos: `src/store/useProjectStore.ts` o `src/data/styleSchemas.ts`
- Reglas CSS críticas: sección 8 de este documento
- Agregar un nuevo estilo: crear `src/generator/styleTemplates/nuevoEstilo.ts`, agregar a `StyleType`, agregar schema en `styleSchemas.ts`, agregar thumbnail en `StylePicker.tsx`
