import React, { useState, useEffect, useCallback } from 'react';
import { ActivityRenderer } from './activities/ActivityRenderer';
import type { NewActivityFields } from './activities/types';
import { ACTIVITY_ICONS, ACTIVITY_LABELS as NEW_ACTIVITY_LABELS } from './activities/types';

export interface EvaluationActivity {
  activityId: string;
  type: string;
  prompt: string;
  rubric: string;
  points: number;
  difficulty: string;
  fields?: NewActivityFields;
}

export interface Evaluation {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  activities: EvaluationActivity[];
}

export interface Attempt {
  attemptId: number;
  maxScore: number;
}

interface EvaluationLabProps {
  sectionId: string;
  userId?: string;
}

const LEGACY_ICONS: Record<string, string> = {
  apply: '🎯',
  debug: '🐛',
  scenario: '📋',
  compare: '⚖️',
  explain: '💡',
  design: '🏗️',
  predict: '🔮',
  rank: '📊',
  reflect: '🪞',
  identify: '🔍'
};

const LEGACY_LABELS: Record<string, string> = {
  apply: 'Aplicación',
  debug: 'Depuración',
  scenario: 'Caso Práctico',
  compare: 'Comparación',
  explain: 'Explicación',
  design: 'Diseño',
  predict: 'Predicción',
  rank: 'Ordenación',
  reflect: 'Reflexión',
  identify: 'Identificación'
};

const ALL_ICONS: Record<string, string> = { ...LEGACY_ICONS, ...ACTIVITY_ICONS };
const ALL_LABELS: Record<string, string> = { ...LEGACY_LABELS, ...NEW_ACTIVITY_LABELS };

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'var(--success, #10b981)',
  medium: 'var(--warning, #f59e0b)',
  hard: 'var(--danger, #ef4444)'
};

export function EvaluationLab({ sectionId, userId = 'anonymous' }: EvaluationLabProps) {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState<{ score: number; maxScore: number; passed: boolean; percentage: number } | null>(null);
  const [history, setHistory] = useState<Array<{ id: number; score: number; maxScore: number; passed: boolean; startedAt: string; percentage: number }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  const currentActivity = evaluation?.activities[currentIndex];

  const fetchEvaluation = useCallback(async () => {
    try {
      const res = await fetch(`/api/evaluations/${sectionId}`);
      if (!res.ok) throw new Error('Evaluation not found');
      const data = await res.json();
      setEvaluation(data);
    } catch (e) {
      console.error('Failed to fetch evaluation:', e);
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`/api/evaluations/${sectionId}/history?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.attempts || []);
      }
    } catch (e) {
      console.error('Failed to fetch history:', e);
    }
  }, [sectionId, userId]);

  const startAttempt = async () => {
    try {
      const res = await fetch(`/api/evaluations/${sectionId}/start`, {
        method: 'POST',
        headers: { 'x-user-id': userId }
      });
      if (!res.ok) throw new Error('Failed to start attempt');
      const data = await res.json();
      setAttempt({ attemptId: data.attemptId, maxScore: data.maxScore });
    } catch (e) {
      console.error('Failed to start attempt:', e);
    }
  };

  const saveAnswer = async (activityId: string, answer: string) => {
    if (!attempt) return;
    try {
      const res = await fetch(`/api/evaluations/${sectionId}/attempts/${attempt.attemptId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId, answer })
      });
      if (!res.ok) throw new Error('Failed to save answer');
    } catch (e) {
      console.error('Failed to save answer:', e);
    }
  };

  const handleAnswerChange = (activityId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [activityId]: answer }));
    saveAnswer(activityId, answer);
  };

  const completeAttempt = async () => {
    if (!attempt) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/evaluations/${sectionId}/attempts/${attempt.attemptId}/complete`, {
        method: 'POST',
        headers: { 'x-user-id': userId }
      });
      if (!res.ok) throw new Error('Failed to complete attempt');
      const data = await res.json();
      setResult(data);
      setCompleted(true);
      fetchHistory();
    } catch (e) {
      console.error('Failed to complete attempt:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < (evaluation?.activities.length || 0) - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const retry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setAttempt(null);
    setCompleted(false);
    setResult(null);
    startAttempt();
  };

  useEffect(() => {
    fetchEvaluation();
    fetchHistory();
  }, [fetchEvaluation, fetchHistory]);

  useEffect(() => {
    if (evaluation && !attempt) {
      startAttempt();
    }
  }, [evaluation, attempt, startAttempt]);

  if (loading) {
    return (
      <div className="evaluation-lab loading">
        <div className="spinner" aria-label="Cargando evaluación..." />
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="evaluation-lab error">
        <p>No hay evaluación disponible para esta sección.</p>
      </div>
    );
  }

  const progress = evaluation.activities.length > 0 
    ? Math.round(((currentIndex + 1) / evaluation.activities.length) * 100) 
    : 0;

  return (
    <section className="evaluation-lab" aria-labelledby="eval-title">
      <header className="eval-header">
        <h2 id="eval-title">{evaluation.title}</h2>
        <p className="eval-description">{evaluation.description}</p>
        
        <div className="eval-progress">
          <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">{currentIndex + 1} / {evaluation.activities.length} actividades</span>
        </div>

        {attempt && (
          <div className="eval-meta">
            <span>Puntuación mínima para aprobar: {evaluation.passingScore}%</span>
            <span>Total: {attempt.maxScore} puntos</span>
          </div>
        )}
      </header>

      {showHistory && history.length > 0 && (
        <div className="eval-history">
          <h3>📜 Historial de intentos</h3>
          <ul>
            {history.map(h => (
              <li key={h.id} className={h.passed ? 'passed' : 'failed'}>
                <span>Intento #{h.id} — {new Date(h.startedAt).toLocaleDateString('es-ES')}</span>
                <span className="score-badge">{h.score}/{h.maxScore} ({h.percentage}%)</span>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowHistory(false)}>Ocultar historial</button>
        </div>
      )}

      {!showHistory && history.length > 0 && (
        <button className="history-toggle" onClick={() => setShowHistory(true)}>
          Ver historial ({history.length} intentos)
        </button>
      )}

      {completed && result && (
        <div className="eval-result" role="alert">
          <h3>{result.passed ? '✅ ¡Aprobado!' : '❌ No aprobado'}</h3>
          <p className="result-score">
            {result.score} / {result.maxScore} puntos — {result.percentage}%
          </p>
          <p>Necesitas al menos {evaluation.passingScore}% para aprobar.</p>
          <button onClick={retry} className="btn-retry">
            Reintentar evaluación
          </button>
        </div>
      )}

      {!completed && currentActivity && (
        <article className="eval-activity" aria-label={`Actividad ${currentIndex + 1}: ${ALL_LABELS[currentActivity.type] || currentActivity.type}`}>
          <div className="activity-header">
            <span className="activity-icon" aria-hidden="true">{ALL_ICONS[currentActivity.type] || '📝'}</span>
            <div className="activity-meta">
              <span className="activity-type">{ALL_LABELS[currentActivity.type] || currentActivity.type}</span>
              <span className="activity-difficulty" style={{ color: DIFFICULTY_COLORS[currentActivity.difficulty] }}>
                {currentActivity.difficulty}
              </span>
              <span className="activity-points">{currentActivity.points} pts</span>
            </div>
          </div>

          <div className="activity-prompt">
            {currentActivity.prompt}
          </div>

          <div className="activity-response">
            <ActivityRenderer
              activityId={currentActivity.activityId}
              prompt={currentActivity.prompt}
              type={currentActivity.type as any}
              rubric={currentActivity.rubric}
              points={currentActivity.points}
              difficulty={currentActivity.difficulty}
              fields={currentActivity.fields}
              answer={answers[currentActivity.activityId] || ''}
              onAnswer={handleAnswerChange}
            />
          </div>

          <nav className="activity-nav" aria-label="Navegación de actividades">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              aria-label="Actividad anterior"
            >
              ← Anterior
            </button>
            <span className="nav-indicator">
              {evaluation.activities.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={i === currentIndex ? 'current' : answers[evaluation.activities[i].activityId] ? 'answered' : ''}
                  aria-label={`Actividad ${i + 1}${i === currentIndex ? ' (actual)' : answers[evaluation.activities[i].activityId] ? ' (respondida)' : ''}`}
                  aria-current={i === currentIndex ? 'step' : undefined}
                >
                  {i + 1}
                </button>
              ))}
            </span>
            {currentIndex === evaluation.activities.length - 1 ? (
              <button 
                onClick={completeAttempt} 
                disabled={submitting}
                className="btn-submit"
              >
                {submitting ? 'Enviando...' : 'Entregar evaluación'}
              </button>
            ) : (
              <button onClick={handleNext} aria-label="Siguiente actividad">
                Siguiente →
              </button>
            )}
          </nav>
        </article>
      )}
    </section>
  );
}

export default EvaluationLab;