import React, { useState } from 'react';
import './SectionSevenLab.css';

type ProblemKey = 'promo' | 'dog' | 'sales' | 'segments' | 'fraud';
type TabKey = 'chooser' | 'knn' | 'regression' | 'kmeans' | 'bayes' | 'quiz';

const problems: Record<ProblemKey, { label: string; question: string; answer: string; why: string }> = {
  promo: {
    label: 'Promociones',
    question: 'Quiero decidir qué clientes responden a una campaña.',
    answer: 'Clasificación supervisada',
    why: 'Si ya tienes campañas históricas con respuesta sí/no, entrenas un modelo para clasificar nuevos clientes.',
  },
  dog: {
    label: 'Raza de perro',
    question: 'Tengo peso y pelo de un perro nuevo y ejemplos etiquetados.',
    answer: 'KNN',
    why: 'La decisión puede apoyarse en los vecinos etiquetados más cercanos en el espacio de características.',
  },
  sales: {
    label: 'Ventas',
    question: 'Necesito estimar ventas según temperatura y temporada.',
    answer: 'Regresión',
    why: 'La salida esperada es un número continuo, por eso conviene estimar una tendencia.',
  },
  segments: {
    label: 'Segmentos',
    question: 'No tengo etiquetas; quiero descubrir grupos de clientes.',
    answer: 'K-means',
    why: 'Cuando buscas grupos sin una clase previa, el clustering separa patrones similares.',
  },
  fraud: {
    label: 'Fraude',
    question: 'Necesito combinar señales como monto alto, país nuevo y hora inusual.',
    answer: 'Naive Bayes',
    why: 'El enfoque probabilístico permite sumar evidencias y actualizar la probabilidad de fraude.',
  },
};

const dogSamples = [
  { x: 150, y: 280, label: 'Beagle', color: '#2458ff' },
  { x: 205, y: 235, label: 'Beagle', color: '#2458ff' },
  { x: 260, y: 295, label: 'Beagle', color: '#2458ff' },
  { x: 380, y: 140, label: 'Husky', color: '#0c8f6a' },
  { x: 455, y: 170, label: 'Husky', color: '#0c8f6a' },
  { x: 520, y: 118, label: 'Husky', color: '#0c8f6a' },
  { x: 430, y: 330, label: 'Poodle', color: '#b45b18' },
  { x: 520, y: 360, label: 'Poodle', color: '#b45b18' },
  { x: 585, y: 305, label: 'Poodle', color: '#b45b18' },
];

const kmeansPoints = [
  { x: 110, y: 260 }, { x: 140, y: 300 }, { x: 170, y: 250 }, { x: 220, y: 290 },
  { x: 400, y: 130 }, { x: 450, y: 165 }, { x: 500, y: 118 }, { x: 540, y: 175 },
  { x: 390, y: 330 }, { x: 450, y: 370 }, { x: 535, y: 325 }, { x: 575, y: 365 },
];

function postProgress(eventType: string, payload?: unknown) {
  void fetch('/api/progress', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sectionId: 'ai100-07', eventType, payload }),
  });
}

function nearestDogs(target: { x: number; y: number }, k: number) {
  return dogSamples
    .map((sample) => ({ ...sample, distance: Math.hypot(sample.x - target.x, sample.y - target.y) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
}

function voteLabel(neighbors: ReturnType<typeof nearestDogs>) {
  const votes = new Map<string, number>();
  for (const neighbor of neighbors) votes.set(neighbor.label, (votes.get(neighbor.label) ?? 0) + 1);
  return [...votes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Sin decisión';
}

function assignCluster(point: { x: number; y: number }, centers: Array<{ x: number; y: number }>) {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  centers.forEach((center, index) => {
    const distance = Math.hypot(point.x - center.x, point.y - center.y);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

export default function SectionSevenLab() {
  const [tab, setTab] = useState<TabKey>('chooser');
  const [problem, setProblem] = useState<ProblemKey>('promo');
  const [k, setK] = useState(5);
  const [target, setTarget] = useState({ x: 345, y: 240 });
  const [temperature, setTemperature] = useState(28);
  const [season, setSeason] = useState(1.1);
  const [iteration, setIteration] = useState(1);
  const [bayes, setBayes] = useState({ highAmount: true, newCountry: true, oddHour: false });
  const [quiz, setQuiz] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState('Sin guardar');

  const neighbors = nearestDogs(target, k);
  const label = voteLabel(neighbors);
  const sales = Math.round(35 + temperature * 3.8 + season * 42);
  const centers = iteration === 1
    ? [{ x: 170, y: 210 }, { x: 420, y: 230 }, { x: 560, y: 290 }]
    : [{ x: 160, y: 275 }, { x: 472, y: 147 }, { x: 488, y: 348 }];
  const bayesScore = 8 + (bayes.highAmount ? 34 : 0) + (bayes.newCountry ? 28 : 0) + (bayes.oddHour ? 19 : 0);
  const quizAnswers = { q1: 'KNN', q2: 'Regresión', q3: 'K-means', q4: 'Naive Bayes' };
  const quizScore = Object.entries(quizAnswers).filter(([key, value]) => quiz[key] === value).length;

  function openTab(nextTab: TabKey) {
    setTab(nextTab);
    postProgress('lab_opened', { tab: nextTab });
  }

  function saveCompletion() {
    postProgress('section_completed', { quizScore, total: 4 });
    setSaved(`Guardado con ${quizScore}/4 respuestas correctas`);
  }

  return (
    <div className="lab-stack" data-testid="section-seven-lab">
      <div className="lab-tabs" role="tablist" aria-label="Laboratorios de la sección 7">
        {[
          ['chooser', 'Comparador'],
          ['knn', 'KNN'],
          ['regression', 'Regresión'],
          ['kmeans', 'K-means'],
          ['bayes', 'Naive Bayes'],
          ['quiz', 'Mini quiz'],
        ].map(([key, labelText]) => (
          <button key={key} className={`tab-button ${tab === key ? 'active' : ''}`} type="button" onClick={() => openTab(key as TabKey)}>
            {labelText}
          </button>
        ))}
      </div>

      {tab === 'chooser' && (
        <section className="grid-2" aria-label="Comparador de algoritmos">
          <div className="panel pad">
            <h2>Primero define la salida esperada.</h2>
            <p className="lead">El error común es elegir un algoritmo por nombre. Aquí la decisión empieza con la pregunta: ¿quieres una clase, un número, un grupo o una probabilidad?</p>
            <div className="option-row" style={{ marginTop: 18 }}>
              {(Object.keys(problems) as ProblemKey[]).map((key) => (
                <button key={key} className={`lab-button ${problem === key ? 'active' : ''}`} type="button" onClick={() => setProblem(key)}>
                  {problems[key].label}
                </button>
              ))}
            </div>
          </div>
          <aside className="answer-panel" aria-live="polite">
            <strong>{problems[problem].question}</strong>
            <p><b>Herramienta:</b> {problems[problem].answer}</p>
            <p>{problems[problem].why}</p>
          </aside>
        </section>
      )}

      {tab === 'knn' && (
        <section className="grid-2" aria-label="Laboratorio KNN">
          <svg className="lab-canvas" viewBox="0 0 680 420" role="img" aria-label="Clasificación KNN de un perro desconocido">
            {dogSamples.map((sample, index) => (
              <circle key={index} cx={sample.x} cy={sample.y} r="10" fill={sample.color} opacity="0.9" />
            ))}
            {neighbors.map((sample, index) => (
              <line key={`line-${index}`} x1={target.x} y1={target.y} x2={sample.x} y2={sample.y} stroke="var(--accent)" strokeDasharray="5 6" />
            ))}
            <circle cx={target.x} cy={target.y} r="15" fill="var(--ink)" />
            <text x="34" y="388" fill="var(--muted)">Peso →</text>
            <text x="24" y="38" fill="var(--muted)">Pelo ↑</text>
          </svg>
          <aside className="control-stack">
            <div className="control-box">
              <label>Vecinos K: {k}<input type="range" min="1" max="9" step="2" value={k} onChange={(event) => setK(Number(event.target.value))} /></label>
            </div>
            <div className="control-box">
              <label>Peso del perro desconocido<input type="range" min="95" max="610" value={target.x} onChange={(event) => setTarget({ ...target, x: Number(event.target.value) })} /></label>
              <label>Longitud del pelo<input type="range" min="90" max="370" value={target.y} onChange={(event) => setTarget({ ...target, y: Number(event.target.value) })} /></label>
            </div>
            <div className="answer-panel"><strong>Clasificación: {label}</strong><p>Los {k} vecinos más cercanos votan. Cambia K o mueve el punto negro para observar fronteras de decisión inestables.</p></div>
          </aside>
        </section>
      )}

      {tab === 'regression' && (
        <section className="grid-2" aria-label="Laboratorio de regresión">
          <svg className="lab-canvas" viewBox="0 0 680 420" role="img" aria-label="Tendencia de ventas estimada">
            <polyline points="60,330 160,295 260,255 360,210 460,170 600,118" fill="none" stroke="var(--accent)" strokeWidth="4" />
            <circle cx={Math.min(600, 60 + temperature * 17)} cy={360 - sales * 0.9} r="15" fill="var(--accent-2)" />
            <text x="46" y="382" fill="var(--muted)">Temperatura →</text>
            <text x="30" y="42" fill="var(--muted)">Ventas ↑</text>
          </svg>
          <aside className="control-stack">
            <div className="control-box"><label>Temperatura: {temperature}°C<input type="range" min="5" max="35" value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} /></label></div>
            <div className="control-box"><label>Factor de temporada: {season.toFixed(1)}<input type="range" min="0.6" max="1.5" step="0.1" value={season} onChange={(event) => setSeason(Number(event.target.value))} /></label></div>
            <div className="answer-panel"><strong>Ventas estimadas: {sales}</strong><p>La regresión no dice que la temperatura cause las ventas; resume una relación útil para predecir.</p></div>
          </aside>
        </section>
      )}

      {tab === 'kmeans' && (
        <section className="grid-2" aria-label="Laboratorio K-means">
          <svg className="lab-canvas" viewBox="0 0 680 420" role="img" aria-label="Agrupamiento K-means de clientes">
            {kmeansPoints.map((point, index) => {
              const cluster = assignCluster(point, centers);
              const color = ['#2458ff', '#0c8f6a', '#b45b18'][cluster];
              return <circle key={index} cx={point.x} cy={point.y} r="10" fill={color} />;
            })}
            {centers.map((center, index) => <text key={index} x={center.x - 12} y={center.y + 8} fill="var(--ink)" fontSize="28">×</text>)}
          </svg>
          <aside className="control-stack">
            <div className="control-box"><label>Iteración: {iteration}<input type="range" min="1" max="2" value={iteration} onChange={(event) => setIteration(Number(event.target.value))} /></label></div>
            <div className="answer-panel"><strong>{iteration === 1 ? 'Centroides iniciales' : 'Centroides actualizados'}</strong><p>K-means alterna dos pasos: asignar cada punto al centro más cercano y mover el centro al promedio del grupo.</p></div>
          </aside>
        </section>
      )}

      {tab === 'bayes' && (
        <section className="grid-2" aria-label="Laboratorio Naive Bayes">
          <div className="panel pad">
            <h2>Probabilidad por evidencias.</h2>
            <p className="lead">Activa señales de una transacción. El supuesto “naive” simplifica el cálculo tratando cada señal como independiente.</p>
            <table className="mini-table">
              <tbody>
                <tr><td>Monto alto</td><td><button className={`lab-button ${bayes.highAmount ? 'active' : ''}`} onClick={() => setBayes({ ...bayes, highAmount: !bayes.highAmount })}>Alternar</button></td></tr>
                <tr><td>País nuevo</td><td><button className={`lab-button ${bayes.newCountry ? 'active' : ''}`} onClick={() => setBayes({ ...bayes, newCountry: !bayes.newCountry })}>Alternar</button></td></tr>
                <tr><td>Hora inusual</td><td><button className={`lab-button ${bayes.oddHour ? 'active' : ''}`} onClick={() => setBayes({ ...bayes, oddHour: !bayes.oddHour })}>Alternar</button></td></tr>
              </tbody>
            </table>
          </div>
          <aside className="answer-panel"><strong>Riesgo estimado: {Math.min(96, bayesScore)}%</strong><p>El modelo sube o baja la probabilidad según las señales presentes, no por una única regla fija.</p></aside>
        </section>
      )}

      {tab === 'quiz' && (
        <section className="lab-stack" aria-label="Mini quiz">
          <div className="quiz-grid">
            {[
              ['q1', 'Clasificar un perro con vecinos etiquetados'],
              ['q2', 'Predecir ventas como número continuo'],
              ['q3', 'Descubrir grupos sin etiquetas'],
              ['q4', 'Combinar señales para estimar fraude'],
            ].map(([key, text]) => (
              <label className="quiz-card" key={key}>{text}
                <select aria-label={text} value={quiz[key] ?? ''} onChange={(event) => setQuiz({ ...quiz, [key]: event.target.value })}>
                  <option value="">Elegir algoritmo</option>
                  <option>KNN</option>
                  <option>Regresión</option>
                  <option>K-means</option>
                  <option>Naive Bayes</option>
                </select>
              </label>
            ))}
          </div>
          <div className="answer-panel" aria-live="polite"><strong>Puntaje actual: {quizScore}/4</strong><p>{saved}</p></div>
          <button className="lab-button primary" type="button" onClick={saveCompletion}>Guardar progreso local</button>
        </section>
      )}
    </div>
  );
}
