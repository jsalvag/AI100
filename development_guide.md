# Development Guide

## Objetivo

Crear una aplicación local para el Lab de IA de apoyo al aprendizaje, con módulos progresivos AI100, AI200 y AI300. La app debe reemplazar los HTML sueltos actuales por una estructura mantenible con componentes, temas, navegación coherente y base de datos local.

## Estructura Académica

- AI100: módulo principiante con 14 secciones previstas. Es el módulo actual.
- AI200: módulo intermedio, disponible según contexto del usuario, pero pendiente de revisión. La cantidad de secciones aún no está definida.
- AI300: módulo master, proyectado para Q1 FY'26. Aún no está disponible.

Cada sección debe poder incluir:

- Documentación de apoyo.
- Ejemplos guiados.
- Ejercicios.
- Referencias.
- Links externos.
- Demos o laboratorios interactivos cuando aporten comprensión.

## Stack Recomendado

Usar Astro como base de la aplicación.

Razones:

- El proyecto es principalmente educativo y de contenido.
- Permite páginas estáticas rápidas.
- Soporta Markdown/MDX naturalmente.
- Permite componentes reutilizables para layouts, navegación, tarjetas, secciones y ejercicios.
- Permite incorporar React solo en componentes interactivos complejos, sin convertir todo el sitio en una SPA.
- Evita sobredimensionar con Next.js mientras no haya autenticación, usuarios, backend remoto ni despliegue tipo producto SaaS.

Complementos recomendados:

- Astro para estructura, routing y contenido.
- React para laboratorios interactivos puntuales.
- SQLite local para catálogo, progreso local, metadatos y referencias.
- Drizzle ORM o Prisma para manejar esquema y consultas.
- CSS propio con tokens de diseño, sin depender de Tailwind inicialmente.
- TypeScript desde el inicio.
- `pnpm` exclusivamente para instalación, scripts y ejecución de paquetes.

## Base De Datos Local

Usar SQLite en desarrollo local.

Entidades iniciales:

- `modules`: AI100, AI200, AI300; título, nivel, descripción y estado.
- `sections`: módulo, número, slug, título, resumen, estado y duración estimada.
- `content_blocks`: sección, tipo, título, contenido y orden.
- `references`: sección, título, URL, fuente y notas.
- `exercises`: sección, consigna, solución y dificultad.
- `labs`: sección, componente, título y descripción.

Opcional futuro:

- `progress`
- `bookmarks`
- `notes`
- `quiz_attempts`

## Estructura De Directorios Propuesta

```text
AI/
├── development_guide.md
├── app/
│   ├── package.json
│   ├── astro.config.mjs
│   ├── tsconfig.json
│   ├── src/
│   │   ├── content/
│   │   │   ├── ai100/
│   │   │   ├── ai200/
│   │   │   └── ai300/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── course/
│   │   │   ├── labs/
│   │   │   └── ui/
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   └── modules/
│   │   ├── styles/
│   │   │   ├── tokens.css
│   │   │   ├── themes.css
│   │   │   └── global.css
│   │   └── db/
│   │       ├── schema.ts
│   │       └── seed.ts
│   └── data/
│       └── local.db
└── AI100/
    └── legacy HTML/MD actual
```

## Migración Inicial

### Fase 1: Base De App

- Crear app Astro en `AI/app`.
- Configurar TypeScript.
- Configurar estilos globales.
- Crear layout principal.
- Crear navegación por módulos.
- Crear tema claro/oscuro con CSS variables.
- Crear estructura de contenido para AI100.

### Fase 2: Migrar AI100

- Migrar `AI100/index.html` a página inicial de la app.
- Convertir la sección 7 en una página Astro.
- Separar contenido estático de interacción.
- Convertir laboratorios KNN, regresión, K-means y Naive Bayes en componentes React o componentes Astro con JavaScript aislado.
- Conservar notas Markdown como contenido o convertirlas a MDX.

### Fase 3: Base De Datos Local

- Definir esquema SQLite.
- Poblar módulos iniciales: AI100, AI200 y AI300.
- Crear seed reproducible.
- Mostrar datos desde DB o desde archivos de contenido según convenga.

### Fase 4: Design System

Crear tokens compactos, no estilo SaaS genérico:

- Radios pequeños: 4px, 6px, 8px; máximo 12px.
- Padding contenido.
- Layout editorial/técnico.
- Evitar tarjetas infladas.
- Evitar glassmorphism decorativo.
- Evitar botones tipo píldora salvo uso justificado.
- Priorizar legibilidad, densidad útil y gráficos manipulables.
- Tema claro y oscuro desde tokens, no duplicando CSS.

## Componentes Necesarios

Layout:

- `AppShell`
- `ModuleLayout`
- `SectionLayout`
- `SectionNav`
- `ThemeToggle`

Curso:

- `ModuleCard`
- `SectionCard`
- `ContentBlock`
- `ReferenceList`
- `ExerciseBlock`
- `QuizBlock`

Laboratorios:

- `KnnLab`
- `RegressionLab`
- `KMeansLab`
- `NaiveBayesLab`

UI base:

- `Button`
- `Card`
- `Callout`
- `Tabs`
- `DataTable`
- `ControlPanel`
- `ChartFrame`

## Reglas De Diseño

La interfaz debe sentirse como un manual técnico interactivo, no como una landing de startup.

Evitar:

- Bordes redondeados gigantes.
- Padding excesivo.
- Glassmorphism decorativo.
- Gradientes sin propósito.
- Tarjetas repetidas sin jerarquía.
- UI tipo dashboard genérico.

Priorizar:

- Composición compacta.
- Grilla editorial.
- Buena jerarquía tipográfica.
- Separadores claros.
- Gráficos legibles.
- Controles cerca del gráfico que modifican.
- Diseño consistente entre índice, módulos y secciones.
- Tema claro/oscuro con paridad visual.

## Comandos Esperados

Pendientes de definir cuando se cree la app.

Probables:

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

No usar estos comandos hasta que exista `package.json`.

## Decisiones Pendientes

- Confirmar dónde está AI200 si ya existe fuera de `AI/`.
- Confirmar si la app debe vivir en `AI/app` o directamente en `AI`.
- Elegir ORM: Drizzle o Prisma.
- Decidir si el contenido principal vive en Markdown/MDX, SQLite o un modelo híbrido.
- Definir si habrá progreso local del estudiante desde la primera versión.
- Definir si se usará React solo para labs o para toda la UI.
