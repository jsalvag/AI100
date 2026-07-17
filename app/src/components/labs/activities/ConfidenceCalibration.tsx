import React from 'react';
import type { ActivityComponentProps } from './types';

export function ConfidenceCalibration({ activityId, prompt, rubric, answer, onAnswer, disabled }: ActivityComponentProps) {
  const [reflection, setReflection] = React.useState(answer || '');

  const handleChange = (value: string) => {
    if (disabled) return;
    setReflection(value);
    onAnswer(activityId, value);
  };

  return (
    <div className="activity-calibration">
      <p className="cal-prompt">{prompt}</p>

      {rubric && (
        <details className="cal-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      <div className="cal-chart-placeholder">
        <div className="cal-chart">
          <div className="cal-bubble" style={{ '--x': '30%', '--y': '60%', '--size': '40px' } as React.CSSProperties}>
            <span>?%</span>
          </div>
          <div className="cal-bubble" style={{ '--x': '70%', '--y': '40%', '--size': '60px' } as React.CSSProperties}>
            <span>?%</span>
          </div>
          <div className="cal-bubble" style={{ '--x': '50%', '--y': '80%', '--size': '30px' } as React.CSSProperties}>
            <span>?%</span>
          </div>
          <p className="cal-chart-label">Confianza reportada vs. acierto real</p>
          <div className="cal-perfect-line">
            <span>Línea de calibración perfecta</span>
          </div>
        </div>
        <p className="cal-chart-hint">
          Esta gráfica se llenará al final de la evaluación con tus datos reales.
          Compara tu confianza reportada con tu desempeño real.
        </p>
      </div>

      <div className="cal-reflection">
        <label htmlFor={`cal-reflect-${activityId}`}>
          Reflexiona: ¿En qué temas sobreestimaste o subestimaste tu conocimiento?
        </label>
        <textarea
          id={`cal-reflect-${activityId}`}
          value={reflection}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Escribe tu reflexión aquí..."
          rows={5}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
