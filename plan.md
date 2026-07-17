# Plan de Implementación: Sistema de Validación y Afirmación de Conocimientos

## Objetivo
Rediseñar el sistema de evaluación de la app AI100 para incorporar mecanismos educativos modernos basados en investigación actual, reemplazando la evaluación actual (textarea genérico + keyword matching naive) por un sistema novedoso con tipos de actividad interactivos, retroalimentación rica y afirmación activa de conocimientos.

---

## Fase 0 — Investigación Base (Día 1-2)

Revisar papers clave para fundamentar cada tipo de actividad.  
Cada referencia incluirá enlace directo a la técnica usada.

Ver `docs/evaluation-references.md` para el listado completo con enlaces.

---

## Fase 1 — Nuevos Tipos de Actividad Interactiva (Día 3-8)

Reemplazar el `<textarea>` único por UIs especializadas por tipo, cada una con su propio componente React con `client:only="react"`:

### 1. `concept-map` — Mapa Conceptual Interactivo
- **Fundamento**: Novak & Cañas (2006), Ausubel (1968)
- **UI**: Área drag-and-drop con nodos predefinidos + conexiones dibujables
- **Validación**: Matching de estructura contra mapa canónico (isomorfismo de grafos simple)
- **Feedback**: Resalta conexiones correctas/incorrectas, muestra mapa modelo

### 2. `confidence-mcq` — Opción Múltiple con Calibración Metacognitiva
- **Fundamento**: Schraw & Dennison (1994), Kang (2016)
- **UI**: Pregunta con 4 opciones + slider "¿Qué tan seguro estás?" (0-100%)
- **Validación**: Correcta→puntos × confianza; incorrecta→0 si confianza >60% (penaliza falsa seguridad)
- **Feedback**: Muestra calibración: "Pensaste que estabas X% seguro, acertaste/fallaste"

### 3. `card-sort` — Ordenación por Arrastre (Ranking)
- **Fundamento**: Mayer (2001) — segmentación y secuenciación
- **UI**: Lista de tarjetas arrastrables para ordenar (procesos, prioridades, pasos)
- **Validación**: Distancia de Kendall-Tau contra orden correcto
- **Feedback**: Muestra orden correcto vs. el del estudiante, destaca diferencias

### 4. `branching-scenario` — Escenario Ramificado
- **Fundamento**: Wiggins (1998) — Authentic Assessment
- **UI**: Narrativa paso a paso con decisiones en cada nodo; árbol de consecuencias
- **Validación**: Ponderación por camino óptimo vs alternativos
- **Feedback**: "Si hubieras elegido X, habría pasado Y" — muestra consecuencias de cada decisión

### 5. `flashcard-review` — Repaso Espaciado (SRS)
- **Fundamento**: Cepeda et al. (2006), Ebbinghaus (1885)
- **UI**: Tarjeta cara/click para ver solución; botones "Fácil / Media / Difícil"
- **Validación**: Algoritmo SM-2 (SuperMemo) — ajusta intervalo de repaso
- **Feedback**: Muestra próxima fecha de repaso; estadísticas de retención

### 6. `teach-back` — Explicación a un Par Simulado
- **Fundamento**: Chi et al. (1994), Fink (2003)
- **UI**: Chat simulado donde "explicas" a un avatar estudiante; él hace preguntas de seguimiento
- **Validación**: El avatar reacciona basado en palabras clave: "No entendí" → pide profundizar
- **Feedback**: "Tu explicación cubrió A, B pero omitió C. Aquí hay una versión modelo"

### 7. `compare-contrast` — Comparación Visual
- **Fundamento**: Gentner & Markman (1997) — Structure Mapping Theory
- **UI**: Tabla de 2-3 columnas para llenar atributos (similitudes/diferencias)
- **Validación**: Matching de celdas contra tabla canónica
- **Feedback**: Muestra tabla completa con celdas acertadas en verde, omitidas en gris

### 8. `code-challenge` — Desafío de Código (Python/JavaScript)
- **Fundamento**: Guzdial (2015) — Learner-Centered Design of Computing Education
- **UI**: Editor Monaco/CodeMirror + botón "Ejecutar" + salida en panel
- **Validación**: Test cases contra función del usuario
- **Feedback**: Muestra qué tests pasaron/fallaron, hint opcional

### 9. `interleaved-review` — Mini-Test Acumulativo
- **Fundamento**: Rohrer et al. (2014), Butler & Roediger (2007)
- **UI**: 3-5 preguntas que mezclan sección actual + 2 anteriores
- **Validación**: Igual que los tipos individuales que las componen
- **Feedback**: "Esta pregunta era de la sección [X] — ¿recuerdas el concepto de [Y]?"

### 10. `confidence-calibration` — Calibración Post-Evaluación
- **Fundamento**: Deslauriers et al. (2019)
- **UI**: Al final de la evaluación, gráfico de burbujas: confianza vs. acierto real
- **Validación**: No es evaluable per se; es reflexivo
- **Feedback**: "En esta sección sobreestimaste tu conocimiento en [tema]. Repasa [enlace]"

---

## Fase 2 — Motor de Evaluación Mejorado (Día 9-11)

### 2.1 Scoring por Tipo
| Tipo | Algoritmo de Puntuación |
|---|---|
| `confidence-mcq` | puntos × (confianza/100) si acierta; 0 si falla con confianza >60%; puntos/2 si falla con confianza <60% |
| `card-sort` | τ (Kendall Tau) × puntos |
| `concept-map` | Precision/Recall de aristas correctas |
| `branching-scenario` | Ponderación por ruta: óptima = 100%, 2da mejor = 70%, resto = 30% |
| `teach-back` | Embedding similarity (coseno) contra texto modelo |
| `compare-contrast` | Proporción de celdas correctas |
| `code-challenge` | Proporción de test cases pasados |
| resto | Keyword matching mejorado + longitud mínima + rubric matching |

### 2.2 Rubric-based Grading con Embeddings
- En lugar de keyword matching, usar embeddings de oraciones para comparar semanticamente la respuesta del estudiante con el `expected_answer` y los criterios del `rubric`
- Fallback: TF-IDF + cosine similarity

### 2.3 Algoritmo de Repaso Espaciado (SM-2)
- Implementar en TypeScript puro
- Tabla `spaced_repetition_items` en SQLite
- Cada vez que el usuario inicia una sección, mostrar 3-5 items de secciones anteriores vencidos

---

## Fase 3 — Afirmación y Retroalimentación (Día 12-14)

### 3.1 Afirmación Inmediata Post-Respuesta
Cada actividad muestra al responder:
- ✅ Acierto + explicación de por qué es correcto + puntos ganados
- ❌ Error + explicación de por qué es incorrecto + pista + enlace al contenido relevante
- 📊 Comparación con respuesta modelo (para `teach-back`, `compare-contrast`)

### 3.2 Dashboard de Afirmación por Sección
- Barra de progreso por tipo de actividad (dominado / en desarrollo / necesita repaso)
- Gráfico de calibración metacognitiva (confianza vs. acierto real)
- "Tus puntos débiles" / "Tus fortalezas"
- Recomendaciones: "Repasa la sección 3 antes de continuar"

### 3.3 Certificado de Afirmación por Módulo
- Al completar AI100 con promedio >80%, mostrar certificado visual (SVG generado en servidor)
- Desglose por sección: "Dominado: 10/14 secciones | En desarrollo: 3/14 | Repasar: 1/14"

---

## Fase 4 — Datos, Persistencia y API (Día 15-16)

### 4.1 Nuevas Tablas SQLite
```sql
-- Repaso espaciado
CREATE TABLE spaced_repetition_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL DEFAULT 'anonymous',
  section_id TEXT NOT NULL REFERENCES sections(id),
  concept_key TEXT NOT NULL,
  easiness REAL DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_date TEXT,
  last_reviewed_at TEXT
);

-- Calibración metacognitiva
CREATE TABLE calibration_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_id INTEGER REFERENCES evaluation_attempts(id),
  activity_id TEXT NOT NULL,
  confidence INTEGER,
  score INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Feedback del sistema sobre cada respuesta
ALTER TABLE evaluation_answers ADD COLUMN feedback_detail TEXT;
ALTER TABLE evaluation_answers ADD COLUMN grading_method TEXT;
```

### 4.2 Nuevos Endpoints
| Endpoint | Método | Propósito |
|---|---|---|
| `/api/evaluations/[sectionId]/feedback` | GET | Feedback completo post-evaluación |
| `/api/evaluations/[sectionId]/review` | GET | Items de repaso espaciado vencidos |
| `/api/review/[itemId]/answer` | POST | Registrar respuesta de repaso (SM-2) |
| `/api/calibration` | GET | Estadísticas de calibración del usuario |
| `/api/certificate/[moduleId]` | GET | Certificado SVG de finalización |

---

## Fase 5 — Migración de Actividades Existentes (Día 17-20)

Reemplazar las ~150 actividades actuales con los nuevos tipos. Estrategia:

| Tipo Actual (a reemplazar) | Nuevo Tipo Sugerido |
|---|---|
| `apply` (~140) | ~40% `confidence-mcq`, ~30% `code-challenge`, ~30% `branching-scenario` |
| `explain` (~28) | ~50% `teach-back`, ~50% `compare-contrast` |
| `scenario` (~28) | `branching-scenario` |
| `compare` (~14) | `compare-contrast` |
| `design` (~14) | `concept-map` |
| `rank` (~14) | `card-sort` |
| `reflect` (~14) | `confidence-calibration` integrado al final |
| `debug`, `predict`, `identify` (~42) | `confidence-mcq` + `interleaved-review` |

---

## Fase 6 — UI/UX de Evaluación Rediseñada (Día 21-23)

- **EvaluationLab 2.0**: Mapa visual de actividades con íconos por tipo, progreso visible, transiciones animadas
- **Gamificación sutil**: Barra de racha (streak), insignias por tipo dominado
- **Modo oscuro completo** para todos los nuevos componentes
- **Responsive**: Actividades táctiles para móvil (drag-and-drop, sliders)

---

## Resumen de Carga de Trabajo

| Fase | Días | Archivos Nuevos | Archivos Modificados |
|---|---|---|---|
| 0. Investigación | 2 | 2 (docs) | 0 |
| 1. Tipos de actividad | 6 | ~15 componentes | 1 (evaluations.ts) |
| 2. Motor mejorado | 3 | 3 (scoring, sm2, embeddings) | 3 (answer.ts, complete.ts, database.ts) |
| 3. Afirmación/feedback | 3 | 5 (dashboard, certificate, feedback) | 2 (EvaluationLab.tsx, history) |
| 4. Datos y API | 2 | 4 (nuevos endpoints) | 2 (database.ts, schema) |
| 5. Migración actividades | 4 | 0 | 14 × evaluations seed |
| 6. UI/UX rediseñada | 3 | 3 (nuevos layouts) | 1 (EvaluationLab.tsx) |
| **Total (7 fases)** | **23 días** | **~31 archivos** | **~23 archivos** |

## Hitos

1. **Día 8**: 3 tipos nuevos funcionales (`confidence-mcq`, `card-sort`, `flashcard-review`) + un pipeline completo
2. **Día 14**: Motor de evaluación completo + feedback rico + dashboard de afirmación
3. **Día 20**: Migración completa de las 14 secciones a nuevos tipos
4. **Día 23**: UI rediseñada + revisión + deploy

## Criterios de Éxito

- [ ] Cada sección tiene ≥3 tipos de actividad diferentes
- [ ] Cada respuesta genera feedback cualitativo, no solo puntaje
- [ ] El dashboard de afirmación muestra calibración metacognitiva
- [ ] El algoritmo SRS está activo entre secciones
- [ ] No hay regresión en el build (`pnpm build` exitoso)
- [ ] No hay regresión visual (Playwright snapshot test)
- [ ] El usuario puede ver su progreso histórico por tipo de actividad
