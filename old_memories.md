# Old Engram Memories: AI100

Este archivo conserva un compendio de las memorias Engram del proyecto `ai100` antes de eliminar permanentemente esas observaciones. Se creó porque este directorio dejará de ser un proyecto activo.

## Proyecto

- Proyecto Engram: `ai100`
- Ruta asociada: `/mnt/c/Users/jose.guevara/courses/AI/AI100`
- Alcance de memorias exportadas: `project`
- IDs exportados: `99`, `100`, `102`, `103`, `105`, `106`, `107`

## #99 [learning] Compact AGENTS guidance

**What**: Updated repository-local `AGENTS.md` to be compact and high-signal for AI100.

**Why**: User requested future OpenCode sessions avoid mistakes and ramp quickly, honoring the need to read files in the directory and children.

**Where**: `AGENTS.md`

**Learned**: AI100 currently has no README, manifests, CI, package manager, tests, lint, or build config; the executable/source context is the static HTML/Markdown files.

Metadata:

- Session: `manual-save-ai100`
- Project: `ai100`
- Scope: `project`
- Created: `2026-07-02 13:05:12`

## #100 [session_summary] Session summary: ai100

### Goal

Actualizar `AGENTS.md` para que sea una guía compacta y específica para futuras sesiones de OpenCode en AI100.

### Instructions

El usuario pidió leer los archivos dentro del directorio y sus hijos, y mantener solo instrucciones que un agente probablemente extrañaría sin ayuda.

### Discoveries

- El repo no tiene README, manifests, lockfiles, configuración de CI, lint, tests, formatter ni `opencode.json` local.
- El contexto útil está en `AGENTS.md`, `HANDOFF-AI100.md`, `index.html`, `seccion-07-aprendizajes.md` y la demo HTML de sección 7.
- `HANDOFF-AI100.md` contiene historial transitorio del rename A2001 -> AI100; solo algunas reglas permanentes eran útiles para `AGENTS.md`.

### Accomplished

- Compacté `AGENTS.md` de 31 a 23 líneas, eliminando contexto de AI200/AI300 y detalles de archivos actuales que se vuelven obsoletos rápido.
- Conservé reglas verificadas: AI100 tiene 14 secciones, `index.html` es portada, naming `seccion-XX-*`, demos HTML autocontenidas, sin build/test/lint/CI.
- Añadí explícitamente la regla de revisar archivos del directorio e hijos relevantes antes de tocar una sección.

### Next Steps

- Si se crean nuevas secciones, actualizar `index.html` y mantener la convención de HTML demo + Markdown de aprendizajes.

### Relevant Files

- `AGENTS.md` — guía repo-local compacta actualizada.
- `HANDOFF-AI100.md` — historial de traspaso consultado, no copiado como instrucción permanente.
- `index.html` — portada verificada con 14 secciones.
- `seccion-07-algoritmos-aprendizaje-automatico.html` — demo existente usada como referencia de estilo.
- `seccion-07-aprendizajes.md` — notas existentes usadas como referencia de convención.

Metadata:

- Session: `manual-save-ai100`
- Project: `ai100`
- Scope: `project`
- Created: `2026-07-02 13:05:34`

## #102 [decision] AI100 UI design direction

**What**: Applied a candidate UI direction to section 7: dark AI lab aesthetic, CSS design tokens, grid/mesh background, gradient editorial hero, glass cards, refined nav/buttons/controls, hover states, and hero metrics.

**Why**: User asked for UI/UX improvement informed by market/design research and may adopt it as project DESIGN_SYSTEM if they like it.

**Where**: `seccion-07-algoritmos-aprendizaje-automatico.html`, plus accent corrections in `seccion-07-aprendizajes.md`

**Learned**: Keep implementation dependency-free and embedded; translate framework ideas like Tailwind theme tokens into plain `:root` CSS variables instead of adding a CSS framework.

Metadata:

- Session: `manual-save-ai100`
- Project: `ai100`
- Scope: `project`
- Created: `2026-07-02 14:22:31`

## #103 [session_summary] Session summary: ai100

### Goal

Mejorar la UI/UX de la demo HTML actual de AI100 sección 7 con investigación ligera de diseño y frameworks CSS, sin romper el enfoque autocontenido.

### Instructions

El usuario quiere una UI más agradable; si le gusta, podría asentarse como `DESIGN_SYSTEM` del proyecto. Mantener HTML/CSS/JS embebidos y español correcto.

### Discoveries

- La demo ya tenía base dark/glass, pero se veía genérica y había varios textos visibles sin tildes.
- Awwwards en educación/tecnología muestra señales útiles: storytelling visual, contraste tipográfico fuerte, navegación clara, tarjetas profundas, microinteracciones y visualización de datos.
- Tailwind CSS v4 documenta configuración CSS-first mediante tokens/variables; para este repo conviene traducir esa idea a `:root` variables, no instalar Tailwind.
- Playwright MCP quedó en timeout, pero el servidor estático local respondió `200 OK` y el script embebido parseó correctamente con Node.

### Accomplished

- Actualicé `seccion-07-algoritmos-aprendizaje-automatico.html` con tokens visuales, fondo tipo laboratorio, hero editorial con gradiente, métricas, tarjetas glass refinadas, navegación sticky mejorada, controles/inputs con foco y microinteracciones.
- Corregí tildes y textos visibles en la demo HTML.
- Corregí tildes en `seccion-07-aprendizajes.md` para mantener consistencia de la sección.
- Verifiqué HTTP local con `python3 -m http.server 8000` y sintaxis del script inline con Node `vm.Script`.

### Next Steps

- Revisar visualmente en navegador real del usuario; si gusta, crear/actualizar un `DESIGN_SYSTEM.md` o una sección en `AGENTS.md` con tokens, componentes y reglas de aplicación.

### Relevant Files

- `seccion-07-algoritmos-aprendizaje-automatico.html` — demo rediseñada con dirección visual candidata.
- `seccion-07-aprendizajes.md` — notas corregidas ortográficamente.
- `AGENTS.md` — restricciones existentes: autocontenido, sin dependencias salvo razón clara, español correcto.

Metadata:

- Session: `manual-save-ai100`
- Project: `ai100`
- Scope: `project`
- Created: `2026-07-02 14:22:31`

## #105 [pattern] UI preference: compact sharp layouts

**What**: User strongly dislikes oversized border radii, huge padding, and generic rounded/glass UI.

**Why**: Feedback on AI100 section 7 redesign: current minimal version still feels visually weak due to large rounded corners and spacing.

**Where**: Future AI100 UI/design system work, especially `seccion-07-algoritmos-aprendizaje-automatico.html` and any planned `DESIGN_SYSTEM`.

**Learned**: Prefer compact, sharper, more deliberate editorial/educational layouts; avoid AI-slop cards with giant radii and excessive padding.

Metadata:

- Session: `manual-save-ai100`
- Project: `ai100`
- Scope: `project`
- Created: `2026-07-02 15:04:16`

## #106 [config] Global pnpm-only JavaScript tooling

**What**: Updated global OpenCode instructions to prohibit `npm`/`npx` for JavaScript development unless explicitly requested, and require `pnpm`/`pnpm dlx` instead.

**Why**: User explicitly stated they will never use npm for JavaScript development and want pnpm only by default.

**Where**: `/home/joseguevara/.config/opencode/AGENTS.md`

**Learned**: Context7 CLI examples in global instructions were also changed from `npx ctx7@latest` to `pnpm dlx ctx7@latest` to avoid internal contradiction.

Metadata:

- Session: `manual-save-ai100`
- Project: `ai100`
- Scope: `project`
- Created: `2026-07-02 15:26:45`

## #107 [decision] AI lab app development guide

**What**: Created parent-level `development_guide.md` for migrating AI100/AI200/AI300 into a full local app.

**Why**: User wants a complete app with frameworks and local DB to improve composition and consistency across modules/sections.

**Where**: `/mnt/c/Users/jose.guevara/courses/AI/development_guide.md`

**Learned**: Recommended Astro + React islands + SQLite, pnpm-only tooling, compact editorial design system, and preserving `AI100/` as legacy source during migration.

Metadata:

- Session: `manual-save-ai100`
- Project: `ai100`
- Scope: `project`
- Created: `2026-07-02 15:35:53`

## Compendio Operativo

### Estado Del Proyecto AI100

- AI100 era un curso introductorio de IA con 14 secciones previstas.
- La salida original por sección era HTML autocontenido, con notas Markdown cuando aplicaba.
- `index.html` funcionaba como portada del curso.
- La convención de archivos era `seccion-XX-nombre-corto.html` y `seccion-XX-aprendizajes.md`.
- No existían README, manifests, lockfiles, CI, lint, tests, formatter ni `opencode.json` local.
- El contexto real estaba en `AGENTS.md`, `HANDOFF-AI100.md`, `index.html`, `seccion-07-aprendizajes.md` y `seccion-07-algoritmos-aprendizaje-automatico.html`.

### Preferencias Y Lecciones De Diseño

- Evitar bordes redondeados gigantes, padding excesivo, glassmorphism genérico y UI tipo SaaS/landing de startup.
- Preferir composición compacta, más nítida, técnica/editorial y deliberada.
- Priorizar legibilidad, densidad útil y gráficos manipulables.
- Si se crea un design system, debe usar radios pequeños, espaciado contenido y componentes consistentes entre índice y secciones.

### Tooling Y Futuro De La App

- El usuario quiere usar únicamente `pnpm` para desarrollo JavaScript, salvo instrucción explícita distinta.
- Se recomienda migrar a una app completa en el directorio padre `AI/`, preservando `AI100/` como legado o fuente durante la migración.
- Recomendación técnica documentada: Astro + React islands + SQLite local, con contenido en Markdown/MDX y/o DB híbrida.
- `development_guide.md` ya existe en el directorio padre con la propuesta de arquitectura, migración, componentes, DB y reglas de diseño.
