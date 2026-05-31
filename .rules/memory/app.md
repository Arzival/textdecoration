# textdecoration — Generador de animaciones HTML para video

## Propósito

Herramienta front-end que permite configurar frases animadas y exportarlas como un archivo HTML standalone listo para grabar con screen capture. El output es un archivo `animacion.html` que corre directamente en Chrome sin dependencias externas.

Dirigida a creadores de contenido técnico (devs) que producen videos para YouTube y TikTok sobre desarrollo de software con IA.

---

## Usuario objetivo

Desarrollador de software que crea contenido en video. No es un editor de video profesional: prefiere trabajar con código y herramientas que pueda controlar. Necesita animaciones de texto limpias y rápidas de producir sin abrir After Effects ni Premiere.

---

## Flujo de uso

1. **Seleccionar formato de video**
   - YouTube: 16:9 — 1280×720 px
   - TikTok: 9:16 — 390×844 px

2. **Agregar frases (escenas)**
   Cada frase es una escena animada independiente. Se agregan en orden de reproducción.

3. **Configurar cada escena**
   Para cada frase se elige un estilo visual (ver tabla abajo) y se llenan los campos de contenido correspondientes a ese estilo. Los campos varían según el estilo seleccionado.

4. **Preview en vivo**
   Un `<iframe>` muestra el HTML real corriendo en tiempo real. Lo que se ve en el preview es exactamente lo que se exporta.

5. **Exportar**
   Se descarga `animacion.html`, un archivo self-contained sin dependencias externas.

6. **Grabar**
   El usuario abre el archivo en Chrome y graba la pantalla con cualquier herramienta de screen capture (OBS, QuickTime, etc.).

---

## Los 9 estilos

| Estilo | Descripción |
|---|---|
| `statement` | Frase corta de impacto. Texto grande centrado, sin adornos. Ideal para afirmaciones directas. |
| `quote` | Cita con atribución. Incluye texto de la cita y nombre del autor o fuente. |
| `alert-red` | Alerta de error o advertencia crítica. Fondo o acento en rojo. Comunica urgencia o peligro. |
| `alert-amber` | Alerta de advertencia no crítica. Fondo o acento en ámbar. Para precauciones o notas importantes. |
| `list-items` | Lista de puntos. Varios ítems que aparecen en secuencia o en grupo. Sin jerarquía de completado. |
| `big-number` | Número grande con etiqueta descriptiva. Para destacar métricas, estadísticas o cifras clave. |
| `chain` | Secuencia de pasos encadenados. Muestra flujo o proceso paso a paso con conectores visuales. |
| `checklist` | Lista de ítems con estado de completado (check). Para mostrar pasos cumplidos o requisitos. |
| `comparison` | Comparación lado a lado. Dos columnas para contrastar opciones, tecnologías o resultados. |

---

## Lo que NO hace

- No genera el archivo de video (MP4, MOV, etc.). Solo produce el HTML para grabar manualmente.
- No guarda proyectos en la nube ni en ningún servidor.
- No requiere cuenta de usuario ni autenticación.
- No es un canvas libre de diseño. Trabaja exclusivamente con las 9 plantillas de estilo predefinidas.
- No procesa imágenes, audio ni assets externos.

---

## Por qué puro front-end

No hay backend porque no lo necesita. Todo el procesamiento — configuración, preview y generación del HTML — ocurre en el navegador. Esto elimina infraestructura, costos de servidor, latencia de red y fricciones de autenticación. El usuario descarga un archivo HTML que funciona sin conexión a internet.
