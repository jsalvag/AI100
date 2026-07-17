# Evaluation References — Base Teórica para el Sistema de Validación

Cada técnica de evaluación implementada en AI100 se fundamenta en investigación publicada.
Este archivo lista las referencias con enlaces directos a los papers, DOIs, y la técnica concreta que se aplica.

---

## 1. Retrieval Practice (Práctica de Recuperación)

| Campo | Detalle |
|---|---|
| **Técnica** | Preguntas de recuperación activa post-sección + repaso espaciado entre secciones |
| **Referencia** | Roediger, H. L. III, & Karpicke, J. D. (2006). The power of testing memory: Basic research and implications for educational practice. *Perspectives on Psychological Science*, 1(3), 181–210. |
| **DOI** | [10.1111/j.1745-6916.2006.00012.x](https://doi.org/10.1111/j.1745-6916.2006.00012.x) |
| **Enlace** | https://doi.org/10.1111/j.1745-6916.2006.00012.x |
| **Aplicación** | `interleaved-review`, `flashcard-review`, todas las actividades auto-evaluadas |
| **Hallazgo clave** | Los tests mejoran la retención a largo plazo más que el estudio adicional, incluso sin feedback |

---

## 2. Test-Enhanced Learning (Aprendizaje Mejorado por Tests)

| Campo | Detalle |
|---|---|
| **Técnica** | Mini-test acumulativo al inicio de cada nueva sección |
| **Referencia** | Roediger, H. L. III, & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. *Psychological Science*, 17(3), 249–255. |
| **DOI** | [10.1111/j.1467-9280.2006.01693.x](https://doi.org/10.1111/j.1467-9280.2006.01693.x) |
| **Enlace** | https://doi.org/10.1111/j.1467-9280.2006.01693.x |
| **Aplicación** | `interleaved-review` al inicio de cada sección |
| **Hallazgo clave** | El testing repetido produce retención muy superior al estudio repetido en tests demorados (2 días, 1 semana) |

---

## 3. Self-Explanation (Auto-Explicación)

| Campo | Detalle |
|---|---|
| **Técnica** | Prompts "Explica con tus propias palabras" con seguimiento estructurado |
| **Referencia** | Chi, M. T. H., de Leeuw, N., Chiu, M.-H., & LaVancher, C. (1994). Eliciting self-explanations improves understanding. *Cognitive Science*, 18(3), 439–477. |
| **DOI** | [10.1207/s15516709cog1803_3](https://doi.org/10.1207/s15516709cog1803_3) |
| **Enlace** | https://doi.org/10.1207/s15516709cog1803_3 |
| **Aplicación** | `teach-back`, `explain` |
| **Hallazgo clave** | Los estudiantes que se auto-explican mientras estudian resuelven problemas más profundamente y transfieren mejor el conocimiento |

---

## 4. Interleaving (Intercalado)

| Campo | Detalle |
|---|---|
| **Técnica** | Actividades que mezclan conceptos de secciones anteriores |
| **Referencia** | Rohrer, D., Dedrick, R. F., & Burgess, K. (2014). The benefit of interleaved mathematics practice is not limited to superficially similar kinds of problems. *Psychonomic Bulletin & Review*, 21(5), 1323–1330. |
| **DOI** | [10.3758/s13423-014-0588-3](https://doi.org/10.3758/s13423-014-0588-3) |
| **Enlace** | https://doi.org/10.3758/s13423-014-0588-3 |
| **Aplicación** | `interleaved-review` |
| **Hallazgo clave** | El intercalado mejora significativamente la retención y la discriminación entre conceptos comparado con el bloqueo por tema |

---

## 5. Metacognitive Calibration (Calibración Metacognitiva)

| Campo | Detalle |
|---|---|
| **Técnica** | Autoevaluación de confianza post-respuesta + slider de seguridad |
| **Referencia** | Schraw, G., & Dennison, R. S. (1994). Assessing metacognitive awareness. *Contemporary Educational Psychology*, 19(4), 460–475. |
| **DOI** | [10.1006/ceps.1994.1033](https://doi.org/10.1006/ceps.1994.1033) |
| **Enlace** | https://doi.org/10.1006/ceps.1994.1033 |
| **Aplicación** | `confidence-mcq`, `confidence-calibration` |
| **Hallazgo clave** | La conciencia metacognitiva tiene dos componentes (conocimiento de cognición y regulación de cognición) y es medible con el MAI. El instrumento tiene α = .95 |

---

## 6. Formative Assessment with Feedback (Evaluación Formativa con Feedback)

| Campo | Detalle |
|---|---|
| **Técnica** | Feedback inmediato con explicaciones, no solo correcto/incorrecto |
| **Referencia** | Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education: Principles, Policy & Practice*, 5(1), 7–74. |
| **DOI** | [10.1080/0969595980050102](https://doi.org/10.1080/0969595980050102) |
| **Enlace** | https://doi.org/10.1080/0969595980050102 |
| **Aplicación** | Feedback cualitativo en todas las actividades (Fase 3) |
| **Hallazgo clave** | El feedback formativo produce las ganancias de aprendizaje más grandes entre todas las intervenciones educativas (tamaño del efecto 0.4–0.7) |

---

## 7. Authentic Assessment (Evaluación Auténtica)

| Campo | Detalle |
|---|---|
| **Técnica** | Escenarios realistas del mundo laboral |
| **Referencia** | Wiggins, G. (1998). *Educative Assessment: Designing Assessments to Inform and Improve Student Performance*. Jossey-Bass. |
| **ISBN** | 978-0787908485 |
| **Enlace** | https://eric.ed.gov/?id=ED418113 |
| **Aplicación** | `branching-scenario` |
| **Hallazgo clave** | Las evaluaciones auténticas requieren que los estudiantes apliquen conocimientos en contextos realistas, no solo que recuerden hechos |

---

## 8. Concept Mapping (Mapas Conceptuales)

| Campo | Detalle |
|---|---|
| **Técnica** | Mapa conceptual interactivo por sección (drag-and-drop de nodos y conexiones) |
| **Referencia** | Novak, J. D., & Cañas, A. J. (2006). The theory underlying concept maps and how to construct and use them. *Institute for Human and Machine Cognition Technical Report*. |
| **DOI** | [10.1007/s11423-006-9011-7](https://doi.org/10.1007/s11423-006-9011-7) |
| **Enlace** | https://doi.org/10.1007/s11423-006-9011-7 |
| **Aplicación** | `concept-map` |
| **Hallazgo clave** | Los mapas conceptuales reflejan la estructura del conocimiento del estudiante y facilitan el aprendizaje significativo (Ausubel) |

---

## 9. Peer Assessment (Evaluación entre Pares)

| Campo | Detalle |
|---|---|
| **Técnica** | Evaluación de respuestas anónimas simuladas |
| **Referencia** | Topping, K. (1998). Peer assessment between students in colleges and universities. *Review of Educational Research*, 68(3), 249–276. |
| **DOI** | [10.3102/00346543068003249](https://doi.org/10.3102/00346543068003249) |
| **Enlace** | https://doi.org/10.3102/00346543068003249 |
| **Aplicación** | Versión simulada en `teach-back` (el avatar "par" hace preguntas) |
| **Hallazgo clave** | La evaluación entre pares mejora la metacognición y la calidad del trabajo cuando se implementa con rúbricas claras y anonimato |

---

## 10. Spaced Repetition (Repaso Espaciado / SRS)

| Campo | Detalle |
|---|---|
| **Técnica** | Algoritmo SM-2 para repaso de conceptos clave entre secciones |
| **Referencia** | Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. *Psychological Bulletin*, 132(3), 354–380. |
| **DOI** | [10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354) |
| **Enlace** | https://doi.org/10.1037/0033-2909.132.3.354 |
| **Aplicación** | `flashcard-review`, algoritmo SM-2 en `spaced_repetition_items` |
| **Hallazgo clave** | El espaciado óptimo para retención a largo plazo sigue una función de potencia: el intervalo debe ser ≈ 10-20% del tiempo que se desea retener |

---

## 11. Spaced Repetition — Practical Guidelines (Guías Prácticas de Repaso Espaciado)

| Campo | Detalle |
|---|---|
| **Técnica** | Implementación práctica de SRS en contextos educativos |
| **Referencia** | Kang, S. H. K. (2016). Spaced repetition promotes efficient and effective learning: Policy implications for instruction. *Policy Insights from the Behavioral and Brain Sciences*, 3(1), 12–19. |
| **DOI** | [10.1177/2372732215624708](https://doi.org/10.1177/2372732215624708) |
| **Enlace** | https://doi.org/10.1177/2372732215624708 |
| **Aplicación** | Diseño de intervalos de repaso en `flashcard-review` |
| **Hallazgo clave** | La repetición espaciada puede duplicar la retención a largo plazo en entornos educativos reales |

---

## 12. Metacognitive Judgments (Juicios Metacognitivos)

| Campo | Detalle |
|---|---|
| **Técnica** | Ponderación de respuestas por nivel de confianza |
| **Referencia** | Kornell, N., & Bjork, R. A. (2008). Optimising self-regulated learning: A review of the evidence. *Psychonomic Bulletin & Review*, 15(3), 547–553. |
| **DOI** | [10.3758/PBR.15.3.547](https://doi.org/10.3758/PBR.15.3.547) |
| **Enlace** | https://doi.org/10.3758/PBR.15.3.547 |
| **Aplicación** | `confidence-mcq`: penalización por falsa seguridad (confianza >60% + respuesta incorrecta = 0 puntos) |
| **Hallazgo clave** | Los estudiantes tienden a sobreestimar su comprensión; los juicios de confianza son predictores débiles del desempeño real |

---

## 13. Mastery Learning (Aprendizaje por Dominio)

| Campo | Detalle |
|---|---|
| **Técnica** | 80% mínimo para avanzar; materiales de remediación |
| **Referencia** | Ambrose, S. A., Bridges, M. W., DiPietro, M., Lovett, M. C., & Norman, M. K. (2010). *How Learning Works: Seven Research-Based Principles for Smart Teaching*. Jossey-Bass. |
| **ISBN** | 978-0470484104 |
| **Enlace** | https://www.wiley.com/en-us/How+Learning+Works%3A+Seven+Research+Based+Principles+for+Smart+Teaching-p-9780470484104 |
| **Aplicación** | Umbral de aprobación en `complete.ts` + recomendaciones de repaso |
| **Hallazgo clave** | El aprendizaje por dominio requiere que los estudiantes alcancen un nivel predefinido de competencia antes de avanzar |

---

## 14. Calibration Feedback (Feedback de Calibración)

| Campo | Detalle |
|---|---|
| **Técnica** | Contraste entre autopercepción y desempeño real |
| **Referencia** | Deslauriers, L., McCarty, L. S., Miller, K., Callaghan, K., & Kestin, G. (2019). Measuring actual learning versus feeling of learning in response to being actively engaged in the classroom. *Proceedings of the National Academy of Sciences*, 116(39), 19251–19257. |
| **DOI** | [10.1073/pnas.1821936116](https://doi.org/10.1073/pnas.1821936116) |
| **Enlace** | https://doi.org/10.1073/pnas.1821936116 |
| **Aplicación** | `confidence-calibration`: gráfico de burbujas confianza vs. acierto real al final de cada evaluación |
| **Hallazgo clave** | Los estudiantes en clases activas aprenden más pero *sienten* que aprenden menos; intervenir en esta percepción errónea mejora la adopción del aprendizaje activo |

---

## 15. Multimedia Learning (Aprendizaje Multimedia)

| Campo | Detalle |
|---|---|
| **Técnica** | Segmentación y secuenciación de contenido visual + textual |
| **Referencia** | Mayer, R. E. (2001). *Multimedia Learning*. Cambridge University Press. |
| **DOI** | [10.1017/CBO9781139164603](https://doi.org/10.1017/CBO9781139164603) |
| **Enlace** | https://doi.org/10.1017/CBO9781139164603 |
| **Aplicación** | `card-sort`: ordenación visual por arrastre |
| **Hallazgo clave** | Los principios de segmentación y secuencia mejoran la transferencia de aprendizaje cuando el contenido se presenta en segmentos manejables |

---

## 16. Structure Mapping Theory (Teoría del Mapeo de Estructuras)

| Campo | Detalle |
|---|---|
| **Técnica** | Comparación visual en tabla para identificar similitudes y diferencias |
| **Referencia** | Gentner, D., & Markman, A. B. (1997). Structure mapping in analogy and similarity. *American Psychologist*, 52(1), 45–56. |
| **DOI** | [10.1037/0003-066X.52.1.45](https://doi.org/10.1037/0003-066X.52.1.45) |
| **Enlace** | https://doi.org/10.1037/0003-066X.52.1.45 |
| **Aplicación** | `compare-contrast`: tabla de atributos |
| **Hallazgo clave** | La comparación estructurada entre dominios facilita la abstracción y transferencia de conocimiento |

---

## 17. Learner-Centered Design for Computing Education

| Campo | Detalle |
|---|---|
| **Técnica** | Editor de código + test cases automatizados |
| **Referencia** | Guzdial, M. (2015). *Learner-Centered Design of Computing Education: Research on Computing for Everyone*. Morgan & Claypool. |
| **DOI** | [10.2200/S00654ED1V01Y201508HCI027](https://doi.org/10.2200/S00654ED1V01Y201508HCI027) |
| **Enlace** | https://doi.org/10.2200/S00654ED1V01Y201508HCI027 |
| **Aplicación** | `code-challenge`: editor de código con test runner integrado |
| **Hallazgo clave** | El diseño centrado en el aprendiz para educación en computación requiere andamiaje, autenticidad y oportunidades para la práctica repetida con feedback |

---

## 18. Creating Significant Learning Experiences

| Campo | Detalle |
|---|---|
| **Técnica** | Chat simulado donde el estudiante "explica" a un avatar |
| **Referencia** | Fink, L. D. (2003). *Creating Significant Learning Experiences: An Integrated Approach to Designing College Courses*. Jossey-Bass. |
| **ISBN** | 978-1118124253 |
| **Enlace** | https://www.wiley.com/en-us/Creating+Significant+Learning+Experiences%3A+An+Integrated+Approach+to+Designing+College+Courses-p-9781118124253 |
| **Aplicación** | `teach-back`: explicación a un par simulado |
| **Hallazgo clave** | El aprendizaje significativo ocurre cuando los estudiantes pueden aplicar, integrar y enseñar el contenido a otros |

---

## 19. Ebbinghaus Forgetting Curve (Curva del Olvido)

| Campo | Detalle |
|---|---|
| **Técnica** | Curva de retención base para algoritmo SRS |
| **Referencia** | Ebbinghaus, H. (1885/1913). *Memory: A Contribution to Experimental Psychology* (H. A. Ruger & C. E. Bussenius, Trans.). Teachers College, Columbia University. |
| **DOI** | 10.1017/S0025727300016091 (revisión moderna de la obra original) |
| **Enlace** | https://doi.org/10.1017/S0025727300016091 |
| **Aplicación** | `flashcard-review`: intervalos de repaso basados en la curva de olvido exponencial |
| **Hallazgo clave** | La memoria decae logarítmicamente; los repasos en intervalos crecientes aplanan la curva de olvido |

---

## 20. Meaningful Learning (Aprendizaje Significativo)

| Campo | Detalle |
|---|---|
| **Técnica** | Base teórica para mapas conceptuales y conexión de ideas |
| **Referencia** | Ausubel, D. P. (1968). *Educational Psychology: A Cognitive View*. Holt, Rinehart & Winston. |
| **ISBN** | 978-0030696406 |
| **Enlace** | https://psycnet.apa.org/record/1968-35024-000 |
| **Aplicación** | `concept-map`, `compare-contrast` |
| **Hallazgo clave** | El aprendizaje significativo ocurre cuando nueva información se conecta con conceptos existentes en la estructura cognitiva del estudiante |

---

## Resumen de Técnicas por Tipo de Actividad

| Tipo de Actividad | Referencia Principal | Mecanismo |
|---|---|---|
| `confidence-mcq` | Schraw & Dennison (1994), #5 | Calibración metacognitiva + confianza ponderada |
| `card-sort` | Mayer (2001), #15 | Segmentación y secuencia |
| `concept-map` | Novak & Cañas (2006), #8 | Mapeo de conocimiento significativo |
| `branching-scenario` | Wiggins (1998), #7 | Evaluación auténtica |
| `flashcard-review` | Cepeda et al. (2006), #10 | Repaso espaciado (SM-2) |
| `teach-back` | Chi et al. (1994), #3 + Fink (2003), #18 | Auto-explicación + enseñanza a pares |
| `compare-contrast` | Gentner & Markman (1997), #16 | Mapeo de estructuras por analogía |
| `code-challenge` | Guzdial (2015), #17 | Práctica auténtica con feedback inmediato |
| `interleaved-review` | Rohrer et al. (2014), #4 | Intercalado + test-enhanced learning |
| `confidence-calibration` | Deslauriers et al. (2019), #14 | Feedback de calibración metacognitiva |
