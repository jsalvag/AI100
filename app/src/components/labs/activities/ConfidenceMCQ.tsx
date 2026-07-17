import React, { useState } from 'react';
import type { ActivityComponentProps, MCQOption } from './types';

export function ConfidenceMCQ({ activityId, prompt, rubric, fields, answer, onAnswer, disabled }: ActivityComponentProps) {
  const parsed = answer ? JSON.parse(answer || '{}') : {};
  const [selected, setSelected] = useState<string>(parsed.selected || '');
  const [confidence, setConfidence] = useState<number>(parsed.confidence || 50);

  const options: MCQOption[] = fields?.options || [];

  const handleSelect = (optionId: string) => {
    if (disabled) return;
    setSelected(optionId);
    onAnswer(activityId, JSON.stringify({ selected: optionId, confidence }));
  };

  const handleConfidence = (val: number) => {
    if (disabled) return;
    setConfidence(val);
    if (selected) {
      onAnswer(activityId, JSON.stringify({ selected, confidence: val }));
    }
  };

  return (
    <div className="activity-confidence-mcq">
      <p className="mcq-prompt">{prompt}</p>

      {rubric && (
        <details className="mcq-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      <div className="mcq-options" role="radiogroup" aria-label="Opciones de respuesta">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              className={`mcq-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.id)}
              disabled={disabled}
              role="radio"
              aria-checked={isSelected}
            >
              <span className="mcq-option-marker">{isSelected ? '●' : '○'}</span>
              <span className="mcq-option-text">{opt.text}</span>
            </button>
          );
        })}
      </div>

      <div className="mcq-confidence">
        <label htmlFor={`confidence-${activityId}`}>
          ¿Qué tan seguro estás? <strong>{confidence}%</strong>
        </label>
        <div className="confidence-bar">
          <input
            id={`confidence-${activityId}`}
            type="range"
            min={0}
            max={100}
            step={5}
            value={confidence}
            onChange={(e) => handleConfidence(Number(e.target.value))}
            disabled={disabled}
          />
          <div className="confidence-labels">
            <span>Nada seguro</span>
            <span>Totalmente seguro</span>
          </div>
        </div>
        <p className="confidence-hint">
          Si marcas &gt;60% de seguridad y fallas, pierdes todos los puntos.
          Si fallas con baja seguridad (&lt;60%), obtienes la mitad.
        </p>
      </div>
    </div>
  );
}
