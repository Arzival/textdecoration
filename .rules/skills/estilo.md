# Referencia de Estilos — Generador de Animaciones HTML

Este documento es la referencia técnica completa de los 9 estilos visuales del generador. Es suficiente para implementar cualquier estilo desde cero sin ver el HTML de ejemplo.

---

## Fundamentos comunes (aplican a TODOS los estilos)

### Fondo global

```css
body {
  background: #050508;
  overflow: hidden;
  margin: 0;
}
```

Los fondos decorativos son gradientes radiales grandes posicionados en esquinas opuestas:

```css
/* Violeta — esquina superior izquierda */
background: radial-gradient(ellipse at 0% 0%, rgba(124,58,237,.28) 0%, transparent 65%);

/* Cyan — esquina inferior derecha */
background: radial-gradient(ellipse at 100% 100%, rgba(6,182,212,.18) 0%, transparent 60%);
```

### Base de cada frase (`.phrase`)

Todas las frases usan la misma base de posicionamiento. **NUNCA** se centra con `transform:translate`.

```css
.phrase {
  position: absolute;
  inset: 0;
  display: flex;
  /* align-items y justify-content varían por estilo — ver cada sección */
}
```

La propiedad `inset:0` equivale a `top:0; right:0; bottom:0; left:0`. Combinado con `display:flex`, permite centrar cualquier contenido interno con `align-items` y `justify-content` sin necesidad de transforms.

### Regla de oro

> **NUNCA** usar `transform: translate(-50%, -50%)` para centrar. Usar siempre `inset: 0` + flex.

---

## Constantes del motor JS

| Constante   | Valor  | Descripción                                         |
|-------------|--------|-----------------------------------------------------|
| `ANIM_IN`   | 600 ms | Duración de la animación de entrada de cada frase   |
| `ANIM_OUT`  | 450 ms | Duración de la animación de salida de cada frase    |
| `PAUSE`     | 2000 ms| Tiempo de pausa entre frases (visible al usuario)   |
| `INIT_WAIT` | 2000 ms| Espera inicial antes de comenzar la secuencia       |

---

## Keyframes CSS comunes

Estos keyframes son compartidos por todos los estilos y deben declararse una sola vez en el `<style>` global.

```css
/* Entrada de frase completa */
@keyframes phraseIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
}

/* Salida de frase completa */
@keyframes phraseOut {
  from { opacity: 1; transform: translateY(0);     }
  to   { opacity: 0; transform: translateY(-18px); }
}

/* Entrada de ítems desde la izquierda (list-items, chain, comparison YES) */
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-28px); }
  to   { opacity: 1; transform: translateX(0);     }
}

/* Entrada de ítems desde la derecha (comparison NO) */
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(28px); }
  to   { opacity: 1; transform: translateX(0);    }
}

/* Entrada de ítems desde abajo (checklist, verdict) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0);    }
}

/* Pulso de brillo para números grandes */
@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(124,58,237,.5)); }
  50%       { filter: drop-shadow(0 0 40px rgba(124,58,237,.9)); }
}
```

---

## Estilo 1 — STATEMENT

### Cuándo usarlo
Afirmaciones de impacto, frases de apertura (opener), conclusiones o cualquier mensaje que deba leerse de un golpe como una declaración poderosa.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: center;
  text-align: center;
}
```

### Contenedor interno `.pi`

```css
.pi {
  max-width: 1050px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">
    <span class="stmt-label">LABEL SUPERIOR</span>
    <h2 class="stmt-main">
      Texto principal con
      <span class="stmt-kw">KEYWORD</span>
      destacado
    </h2>
    <p class="stmt-sub">Subtexto explicativo opcional</p>
  </div>
</div>
```

### CSS clave

```css
/* Label superior */
.stmt-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #a78bfa;        /* violeta claro */
  opacity: 0.8;
}

/* Texto principal */
.stmt-main {
  font-size: 62px;       /* puede ir hasta 76px si el texto es corto */
  font-weight: 900;
  line-height: 1.1;
  color: #ffffff;
  margin: 0;
}

/* Palabra clave con gradiente violeta → cyan */
.stmt-kw {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Subtexto */
.stmt-sub {
  font-size: 20px;       /* puede ir hasta 22px */
  color: rgba(255, 255, 255, .48);
  line-height: 1.6;
  margin: 0;
}
```

### Campos del formulario

| Campo      | Tipo   | Descripción                                              |
|------------|--------|----------------------------------------------------------|
| `label`    | string | Texto pequeño superior en violeta (puede quedar vacío)   |
| `mainText` | string | Texto principal — frase completa                         |
| `keyword`  | string | La palabra o palabras dentro de mainText que llevan gradiente (subconjunto de mainText) |
| `subtitle` | string | Subtexto inferior en color bajo (puede quedar vacío)     |

### Notas de implementación
- Si `keyword` está vacío, `.stmt-main` va todo en blanco sin gradiente.
- El generador debe reemplazar la ocurrencia de `keyword` dentro de `mainText` envolviéndola en `<span class="stmt-kw">`.
- Ajustar `font-size` inversamente proporcional a la longitud de `mainText`: < 5 palabras → 76px, > 10 palabras → 62px.

---

## Estilo 2 — QUOTE

### Cuándo usarlo
Citas textuales, reflexiones filosóficas, frases de impacto con atribución de autoría.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: center;
}
```

### Contenedor interno `.pi`

```css
.pi {
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 60px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">
    <span class="q-mark">"</span>
    <p class="q-text">
      Texto de la cita con <em>palabra clave</em> destacada.
    </p>
    <div class="q-line"></div>
    <span class="q-author">— NOMBRE DEL AUTOR</span>
  </div>
</div>
```

### CSS clave

```css
/* Comillas decorativas grandes */
.q-mark {
  font-size: 100px;
  color: rgba(139, 92, 246, .3);
  font-family: Georgia, serif;
  line-height: 0.6;
  align-self: flex-start;
}

/* Texto de la cita */
.q-text {
  font-size: 28px;       /* puede ir hasta 34px si el texto es corto */
  font-style: italic;
  line-height: 1.65;
  color: rgba(255, 255, 255, .9);
  margin: 0;
}

/* Palabras clave dentro de la cita */
.q-text em {
  color: #a78bfa;        /* violeta claro */
  font-style: normal;
  font-weight: 700;
}

/* Línea decorativa */
.q-line {
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #7c3aed, transparent);
  border-radius: 2px;
}

/* Pie de autoría */
.q-author {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: rgba(255, 255, 255, .35);
}
```

### Campos del formulario

| Campo      | Tipo   | Descripción                                             |
|------------|--------|---------------------------------------------------------|
| `text`     | string | Texto completo de la cita                               |
| `emphasis` | string | Palabra o frase dentro de `text` que se colorea en violeta (subconjunto de `text`) |
| `author`   | string | Nombre del autor, persona o fuente (puede quedar vacío) |

### Notas de implementación
- El generador envuelve la ocurrencia de `emphasis` dentro de `text` en `<em>`.
- Si `author` está vacío, omitir `.q-line` y `.q-author`.
- La comilla de cierre no se renderiza, solo la de apertura.

---

## Estilo 3 — ALERT ROJO

### Cuándo usarlo
Advertencias, errores comunes, pasos críticos, antipatrones, tips de alto impacto que requieren atención urgente.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: flex-start;
  padding: 0 100px;
}
```

El contenido se alinea hacia la **izquierda** (no centrado horizontalmente), dando sensación de alerta en el margen.

### Contenedor interno `.pi`

```css
.pi {
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">
    <!-- Badge superior -->
    <span class="alert-badge alert-badge--red">⚠ TEXTO DEL BADGE</span>

    <!-- Card principal -->
    <div class="alert-card alert-card--red">
      <p class="alert-title">Título del error o advertencia</p>
      <!-- Opción A: cuerpo texto normal -->
      <p class="alert-body">Descripción del problema o consecuencia.</p>
      <!-- Opción B: cuerpo en código monospace (si useCodeStyle=true) -->
      <code class="alert-code">error: something went wrong</code>
    </div>
  </div>
</div>
```

### CSS clave

```css
/* Badge */
.alert-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: fit-content;
}

.alert-badge--red {
  background: rgba(239, 68, 68, .12);
  border: 1px solid rgba(239, 68, 68, .35);
  color: #fca5a5;
}

/* Card */
.alert-card {
  border-radius: 16px;
  padding: 30px 36px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.alert-card--red {
  border-left: 4px solid #ef4444;
  background: rgba(18, 3, 3, .92);
}

/* Título */
.alert-title {
  font-size: 22px;
  font-weight: 700;
  color: #fca5a5;
  margin: 0;
}

/* Cuerpo texto */
.alert-body {
  font-size: 18px;
  color: rgba(255, 255, 255, .75);
  line-height: 1.6;
  margin: 0;
}

/* Cuerpo código */
.alert-code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 15px;
  color: #fca5a5;
  background: rgba(239, 68, 68, .08);
  padding: 14px 18px;
  border-radius: 8px;
  display: block;
}
```

### Campos del formulario

| Campo          | Tipo    | Descripción                                                    |
|----------------|---------|----------------------------------------------------------------|
| `badge`        | string  | Texto del badge superior (ej: "⚠ ERROR CRÍTICO")              |
| `title`        | string  | Título del card en rojo claro                                  |
| `body`         | string  | Cuerpo descriptivo del card                                    |
| `useCodeStyle` | boolean | Si `true`, renderiza `body` en bloque `<code>` monospace       |

---

## Estilo 4 — ALERT ÁMBAR

### Cuándo usarlo
Tips, detalles importantes, insights valiosos, puntos clave que merecen atención pero no son urgentes ni críticos.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: flex-end;  /* lado DERECHO — contrario al alert rojo */
  padding: 0 100px;
}
```

### Contenedor interno `.pi`

```css
.pi {
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">
    <!-- Badge superior -->
    <span class="alert-badge alert-badge--amber">💡 TEXTO DEL BADGE</span>

    <!-- Card principal -->
    <div class="alert-card alert-card--amber">
      <p class="alert-title alert-title--amber">Título del tip o insight</p>
      <p class="alert-body">Descripción del consejo o detalle importante.</p>

      <!-- Bloque highlight opcional al final -->
      <div class="alert-highlight">
        Texto adicional con énfasis o dato concreto.
      </div>
    </div>
  </div>
</div>
```

### CSS clave

```css
/* Badge ámbar */
.alert-badge--amber {
  background: rgba(245, 158, 11, .1);
  border: 1px solid rgba(245, 158, 11, .35);
  color: #fde68a;
}

/* Card ámbar */
.alert-card--amber {
  border-left: 4px solid #f59e0b;
  background: rgba(20, 13, 2, .92);
}

/* Título ámbar */
.alert-title--amber {
  color: #fde68a;
}

/* Bloque highlight al final del card */
.alert-highlight {
  font-size: 16px;
  color: rgba(253, 230, 138, .8);
  background: rgba(245, 158, 11, .12);
  border-radius: 12px;
  padding: 14px 18px;
  line-height: 1.55;
}
```

El resto de clases (`.alert-card`, `.alert-title`, `.alert-body`) se comparte con el estilo 3. Solo cambia el modificador de color (`--amber` vs `--red`).

### Campos del formulario

| Campo       | Tipo   | Descripción                                                      |
|-------------|--------|------------------------------------------------------------------|
| `badge`     | string | Texto del badge superior (ej: "💡 PRO TIP")                     |
| `title`     | string | Título del card en amarillo claro                                |
| `body`      | string | Cuerpo descriptivo del card                                      |
| `highlight` | string | Texto adicional con fondo ámbar al final del card (opcional)     |

### Notas de implementación
- Si `highlight` está vacío, omitir el `.alert-highlight`.
- La diferencia clave con el estilo 3 es `justify-content: flex-end` (lado derecho) y la paleta de color amarillo dorado.

---

## Estilo 5 — LIST-ITEMS

### Cuándo usarlo
Enumeraciones, listas de características, pasos de un proceso, beneficios de algo.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: center;
}
```

### Contenedor interno `.pi`

```css
.pi {
  max-width: 860px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">
    <p class="list-intro">TEXTO INTRODUCTORIO</p>

    <div class="list-card list-card--purple" data-delay="0">
      <span class="list-emoji">🚀</span>
      <span class="list-text">Texto del primer ítem</span>
    </div>

    <div class="list-card list-card--cyan" data-delay="1">
      <span class="list-emoji">⚡</span>
      <span class="list-text">Texto del segundo ítem</span>
    </div>

    <div class="list-card list-card--amber" data-delay="2">
      <span class="list-emoji">🎯</span>
      <span class="list-text">Texto del tercer ítem</span>
    </div>

    <div class="list-card list-card--green" data-delay="3">
      <span class="list-emoji">✅</span>
      <span class="list-text">Texto del cuarto ítem</span>
    </div>
  </div>
</div>
```

### CSS clave

```css
/* Intro */
.list-intro {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: rgba(255, 255, 255, .35);
  margin: 0 0 8px;
}

/* Card base */
.list-card {
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 14px;
  padding: 20px 26px;
  opacity: 0;  /* empieza invisible — el motor JS añade .visible */
}

/* Variantes de color */
.list-card--purple {
  border: 1px solid rgba(139, 92, 246, .3);
  background: rgba(139, 92, 246, .08);
}
.list-card--cyan {
  border: 1px solid rgba(6, 182, 212, .3);
  background: rgba(6, 182, 212, .08);
}
.list-card--amber {
  border: 1px solid rgba(245, 158, 11, .3);
  background: rgba(245, 158, 11, .08);
}
.list-card--green {
  border: 1px solid rgba(52, 211, 153, .3);
  background: rgba(52, 211, 153, .08);
}

/* Emoji */
.list-emoji {
  font-size: 28px;
  flex-shrink: 0;
}

/* Texto del ítem */
.list-text {
  font-size: 20px;
  color: rgba(255, 255, 255, .88);
  line-height: 1.4;
}

/* Clase que el motor JS añade para disparar la animación */
.list-card.visible {
  animation: slideRight 0.45s ease-out forwards;
}
```

### Selector JS para el motor

```
ITEM_SEL = '.list-card'
```

El motor itera los `.list-card` en orden y añade la clase `.visible` a cada uno con el delay configurado en `data-delay` (en unidades de 350ms entre ítems aproximadamente).

### Campos del formulario

| Campo          | Tipo   | Descripción                                                            |
|----------------|--------|------------------------------------------------------------------------|
| `intro`        | string | Texto introductorio pequeño arriba (ej: "LO QUE NECESITAS SABER")     |
| `items`        | array  | Lista de ítems — máximo 5 recomendado                                  |
| `items[].emoji`   | string | Emoji del ítem                                                      |
| `items[].text`    | string | Texto del ítem                                                      |
| `items[].variant` | enum   | `'purple'` \| `'cyan'` \| `'amber'` \| `'green'`                  |

---

## Estilo 6 — BIG-NUMBER

### Cuándo usarlo
Métricas impactantes, cifras de negocio, estadísticas, datos cuantitativos que deben golpear visualmente.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: center;
}
```

### Contenedor interno `.pi`

```css
.pi {
  display: flex;
  flex-direction: row;      /* horizontal — texto a la izquierda, número a la derecha */
  align-items: center;
  gap: 60px;                /* puede ir hasta 70px */
  padding: 0 80px;
  max-width: 1100px;
  width: 100%;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">

    <!-- Lado izquierdo: contexto textual -->
    <div class="bn-left">
      <span class="bn-label">CATEGORÍA O CONTEXTO</span>
      <h2 class="bn-title">Título descriptivo de la métrica</h2>
      <p class="bn-sub">Subtítulo con contexto adicional o período</p>
    </div>

    <!-- Lado derecho: número grande -->
    <div class="bn-right">
      <span class="bn-number">94</span>
      <span class="bn-unit">%</span>
    </div>

  </div>
</div>
```

### CSS clave

```css
/* Lado izquierdo */
.bn-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bn-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #22d3ee;           /* cyan */
  opacity: 0.85;
}

.bn-title {
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  margin: 0;
}

.bn-sub {
  font-size: 18px;
  color: rgba(255, 255, 255, .48);
  line-height: 1.5;
  margin: 0;
}

/* Lado derecho */
.bn-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.bn-number {
  font-size: 180px;
  font-weight: 900;
  line-height: 0.9;
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 2.5s ease-in-out infinite;
}

.bn-unit {
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, .45);
  margin-top: 8px;
}
```

### Campos del formulario

| Campo      | Tipo   | Descripción                                                    |
|------------|--------|----------------------------------------------------------------|
| `label`    | string | Etiqueta superior en cyan (ej: "RETENCIÓN DE USUARIOS")        |
| `title`    | string | Título descriptivo de la métrica                               |
| `subtitle` | string | Subtítulo con contexto o período (ej: "Q3 2024 · mercado MX")  |
| `number`   | string | La cifra principal (puede incluir comas: "1,200")              |
| `unit`     | string | Unidad debajo del número (ej: "%", "K", "M", "días")           |

### Notas de implementación
- `font-size` de `.bn-number` puede reducirse si el número tiene más de 3 dígitos: 4 dígitos → 130px, 5+ dígitos → 100px.
- La animación `glow` aplica al número con `filter: drop-shadow` en violeta.

---

## Estilo 7 — CHAIN

### Cuándo usarlo
Secuencias de consecuencias escalantes, lógica de "si X → entonces Y → resultado Z", buildup dramático donde cada ítem es más relevante que el anterior.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: center;
}
```

### Contenedor interno `.pi`

```css
.pi {
  max-width: 820px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">
    <p class="chain-intro">CONCEPTO O CONTEXTO INICIAL</p>

    <div class="chain-item" data-index="1">
      <span class="chain-step">01</span>
      <span class="chain-text chain-text--1">Consecuencia inicial (tono neutro)</span>
    </div>

    <div class="chain-item" data-index="2">
      <span class="chain-step">02</span>
      <span class="chain-text chain-text--2">Consecuencia media (escalando)</span>
    </div>

    <div class="chain-item" data-index="3">
      <span class="chain-step">03</span>
      <span class="chain-text chain-text--3">CONSECUENCIA CRÍTICA</span>
    </div>
  </div>
</div>
```

### CSS clave

```css
/* Intro */
.chain-intro {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, .2);
  margin: 0 0 8px;
}

/* Ítem base */
.chain-item {
  display: flex;
  align-items: center;
  gap: 26px;
  opacity: 0;  /* el motor JS añade .visible */
}

/* Número de paso */
.chain-step {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, .2);
  font-family: monospace;
  flex-shrink: 0;
  min-width: 24px;
}

/* Texto del ítem — escala en tamaño y color */
.chain-text--1 {
  font-size: 24px;
  font-weight: 500;
  color: rgba(255, 255, 255, .55);   /* gris apagado */
}

.chain-text--2 {
  font-size: 34px;                    /* puede ir hasta 40px */
  font-weight: 700;
  color: #fde68a;                     /* amarillo */
}

.chain-text--3 {
  font-size: 46px;                    /* puede ir hasta 54px */
  font-weight: 900;
  color: #fb923c;                     /* naranja — o #4ade80 verde según contexto */
}

/* Si hay un 4to ítem (max recomendado) */
.chain-text--4 {
  font-size: 52px;
  font-weight: 900;
  color: #f87171;                     /* rojo para consecuencia final extrema */
}

/* Clase que el motor JS añade */
.chain-item.visible {
  animation: slideRight 0.5s ease-out forwards;
}
```

### Selector JS para el motor

```
ITEM_SEL = '.chain-item'
```

El motor añade `.visible` a cada `.chain-item` secuencialmente con delays entre ellos (aprox 400ms entre ítems).

### Campos del formulario

| Campo           | Tipo   | Descripción                                                                 |
|-----------------|--------|-----------------------------------------------------------------------------|
| `intro`         | string | Texto intro muy pequeño y apagado (ej: "SI NO CONTROLAS TU TIEMPO...")      |
| `items`         | array  | Lista de consecuencias — máximo 4 ítems                                     |
| `items[].step`  | string | Número de paso (ej: "01", "02", "03")                                       |
| `items[].text`  | string | Texto de la consecuencia                                                    |

### Notas de implementación
- El índice visual (`chain-text--N`) determina el tamaño y color: siempre el último ítem es el más grande y urgente.
- El selector del motor usa `nth-child()` internamente porque el `.chain-intro` es `nth-child(1)` y los ítems son `nth-child(2, 3, 4...)`.

---

## Estilo 8 — CHECKLIST

### Cuándo usarlo
Pasos completados o a completar, listas de beneficios, requisitos previos, ventajas de un enfoque o tecnología.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: center;
}
```

### Contenedor interno `.pi`

```css
.pi {
  max-width: 820px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">
    <p class="check-intro">TÍTULO DE LA LISTA</p>

    <div class="check-item">
      <div class="check-icon">✓</div>
      <p class="check-text">
        Texto del ítem con <em>palabra clave</em> destacada.
      </p>
    </div>

    <div class="check-item">
      <div class="check-icon">✓</div>
      <p class="check-text">
        Otro ítem de la checklist.
      </p>
    </div>
  </div>
</div>
```

### CSS clave

```css
/* Intro */
.check-intro {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: rgba(255, 255, 255, .35);
  margin: 0 0 6px;
}

/* Ítem */
.check-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  opacity: 0;  /* el motor JS añade .visible */
}

/* Ícono de check */
.check-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #059669, #34d399);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 900;
  flex-shrink: 0;
}

/* Texto del ítem */
.check-text {
  font-size: 24px;
  color: rgba(255, 255, 255, .88);
  line-height: 1.45;
  margin: 0;
  padding-top: 4px;
}

/* Énfasis dentro del texto */
.check-text em {
  color: #6ee7b7;            /* verde menta */
  font-style: normal;
  font-weight: 700;
}

/* Clase que el motor JS añade */
.check-item.visible {
  animation: fadeUp 0.45s ease-out forwards;
}
```

### Selector JS para el motor

```
ITEM_SEL = '.check-item'
```

### Campos del formulario

| Campo              | Tipo   | Descripción                                                          |
|--------------------|--------|----------------------------------------------------------------------|
| `intro`            | string | Título/encabezado de la lista (ej: "ANTES DE CONTINUAR")            |
| `items`            | array  | Lista de ítems — máximo 4 ítems                                     |
| `items[].text`     | string | Texto del ítem                                                       |
| `items[].emphasis` | string | Palabra dentro de `text` a colorear en verde menta (puede quedar vacío) |

---

## Estilo 9 — COMPARISON

### Cuándo usarlo
Comparaciones binarias: sí vs no, antes vs después, bueno vs malo, proceso planificado vs improvisado. Requiere exactamente dos alternativas.

### Layout de `.phrase`

```css
#pX {
  align-items: center;
  justify-content: center;
}
```

### Contenedor interno `.pi`

```css
.pi {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  max-width: 1000px;
  width: 100%;
  padding: 0 60px;
}
```

### Estructura HTML interna

```html
<div class="phrase" id="pX">
  <div class="pi">

    <p class="cmp-label">ETIQUETA DE CONTEXTO</p>

    <div class="cmp-row">

      <!-- Card SÍ / positivo -->
      <div class="cmp-card cmp-card--yes">
        <div class="cmp-top">
          <span class="cmp-icon">✅</span>
          <span class="cmp-tag cmp-tag--yes">SÍ / BIEN</span>
        </div>
        <h3 class="cmp-title">Título de la opción positiva</h3>
        <p class="cmp-desc">Descripción de la opción correcta.</p>
      </div>

      <!-- Card NO / negativo -->
      <div class="cmp-card cmp-card--no">
        <div class="cmp-top">
          <span class="cmp-icon">❌</span>
          <span class="cmp-tag cmp-tag--no">NO / MAL</span>
        </div>
        <h3 class="cmp-title cmp-title--no">Título de la opción negativa</h3>
        <p class="cmp-desc">Descripción de lo que no debe hacerse.</p>
      </div>

    </div>

    <!-- Veredicto final -->
    <div class="cmp-verdict">
      Conclusión o lección clave de la comparación.
    </div>

  </div>
</div>
```

### CSS clave

```css
/* Label superior */
.cmp-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, .25);
  margin: 0;
}

/* Fila de cards */
.cmp-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

/* Card base */
.cmp-card {
  flex: 1;
  border-radius: 16px;
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: 0;   /* el motor anima con animateComparison() */
}

/* Card YES — verde */
.cmp-card--yes {
  background: rgba(5, 150, 105, .1);
  border: 1px solid rgba(52, 211, 153, .3);
}

/* Card NO — rojo */
.cmp-card--no {
  background: rgba(127, 29, 29, .12);
  border: 1px solid rgba(239, 68, 68, .25);
}

/* Fila icono + tag */
.cmp-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cmp-icon {
  font-size: 22px;
}

/* Tags */
.cmp-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 4px 12px;
  border-radius: 100px;
}

.cmp-tag--yes {
  background: rgba(52, 211, 153, .15);
  color: #34d399;
}

.cmp-tag--no {
  background: rgba(239, 68, 68, .15);
  color: #f87171;
}

/* Título */
.cmp-title {
  font-size: 20px;
  font-weight: 700;
  color: rgba(255, 255, 255, .92);
  margin: 0;
}

/* Título de la card NO con tachado */
.cmp-title--no {
  text-decoration: line-through;
  text-decoration-color: rgba(239, 68, 68, .5);
  color: rgba(255, 255, 255, .55);
}

/* Descripción */
.cmp-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, .6);
  line-height: 1.5;
  margin: 0;
}

/* Veredicto */
.cmp-verdict {
  font-size: 17px;
  font-weight: 600;
  color: rgba(255, 255, 255, .7);
  text-align: center;
  padding: 14px 24px;
  background: rgba(255, 255, 255, .04);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, .08);
  width: 100%;
  opacity: 0;   /* el motor anima con fadeUp + delay */
}
```

### Animación especial `animateComparison()`

Este estilo **no usa el selector `ITEM_SEL` estándar**. El motor llama a una función dedicada `animateComparison()` que:

1. Anima `.cmp-card--yes` con `slideRight` (entrada desde la izquierda).
2. Anima `.cmp-card--no` con `slideLeft` (entrada desde la derecha) con un pequeño delay (≈ 150ms).
3. Anima `.cmp-verdict` con `fadeUp` con un delay mayor (≈ 500ms después de las cards).

### Campos del formulario

| Campo           | Tipo   | Descripción                                                        |
|-----------------|--------|--------------------------------------------------------------------|
| `label`         | string | Etiqueta de contexto arriba (ej: "PROCESO VS IMPROVISACIÓN")       |
| `yes.icon`      | string | Emoji de la card positiva                                          |
| `yes.tag`       | string | Etiqueta de la card positiva (ej: "CON SISTEMA")                   |
| `yes.title`     | string | Título de la card positiva                                         |
| `yes.desc`      | string | Descripción de la opción positiva                                  |
| `no.icon`       | string | Emoji de la card negativa                                          |
| `no.tag`        | string | Etiqueta de la card negativa (ej: "SIN PLAN")                      |
| `no.title`      | string | Título de la card negativa (se renderiza con line-through)         |
| `no.desc`       | string | Descripción de la opción negativa                                  |
| `verdict`       | string | Conclusión final mostrada debajo de ambas cards                    |

---

## Tabla resumen de todos los estilos

| # | Nombre      | Selectores JS         | Animación ítems     | justify-content  | Paleta      |
|---|-------------|-----------------------|---------------------|------------------|-------------|
| 1 | STATEMENT   | —                     | —                   | `center`         | Violeta/Cyan|
| 2 | QUOTE       | —                     | —                   | `center`         | Violeta     |
| 3 | ALERT ROJO  | —                     | —                   | `flex-start`     | Rojo        |
| 4 | ALERT ÁMBAR | —                     | —                   | `flex-end`       | Ámbar       |
| 5 | LIST-ITEMS  | `.list-card`          | `slideRight`        | `center`         | Multi       |
| 6 | BIG-NUMBER  | —                     | `glow` (continua)   | `center`         | Violeta/Cyan|
| 7 | CHAIN       | `.chain-item`         | `slideRight`        | `center`         | Naranja/Amarillo |
| 8 | CHECKLIST   | `.check-item`         | `fadeUp`            | `center`         | Verde       |
| 9 | COMPARISON  | `animateComparison()` | `slideRight/Left/Up`| `center`         | Verde/Rojo  |

**Estilos con ítems secuenciales (motor JS activo):** 5, 7, 8, 9

**Estilos sin ítems secuenciales (frase completa entra y sale de golpe):** 1, 2, 3, 4, 6
