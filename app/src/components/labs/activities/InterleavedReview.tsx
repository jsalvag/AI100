import React, { useState } from 'react';
import type { ActivityComponentProps } from './types';

export interface ReviewQuestion {
  id: string;
  prompt: string;
  answer: string;
  sectionRef: string;
}

export function InterleavedReview({ activityId, prompt, rubric, answer, onAnswer, disabled }: ActivityComponentProps) {
  const [responses, setResponses] = useState<Record<string, string>>(() => {
    if (answer) {
      try {
        return JSON.parse(answer).responses || {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const handleResponseChange = (qId: string, value: string) => {
    if (disabled) return;
    const newResponses = { ...responses, [qId]: value };
    setResponses(newResponses);
    onAnswer(activityId, JSON.stringify({ responses: newResponses }));
  };

  const reviewPrompt = prompt;
  const questions: ReviewQuestion[] = [];

  const qMatch = prompt.matchAll(/\[Pregunta\s+(\d+)\]:\s*([\s\S]*?)(?=\[Pregunta|\n---|$)/g);
  for (const match of qMatch) {
    questions.push({
      id: `q-${match[1]}`,
      prompt: match[2].trim(),
      answer: '',
      sectionRef: ''
    });
  }

  const questionBlocks = prompt.split(/\n---\n/).filter(Boolean);

  return (
    <div className="activity-interleaved">
      {rubric && (
        <details className="ir-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      <div className="ir-section-ref">
        <p>💡 Esta actividad mezcla conceptos de esta sección y secciones anteriores.</p>
      </div>

      {questionBlocks.map((block, idx) => {
        const lines = block.split('\n').filter(Boolean);
        const qText = lines[0]?.startsWith('[Pregunta') ? lines.slice(1).join('\n').trim() : block;
        const qId = `interleaved-q-${idx}`;

        return (
          <div key={qId} className="ir-question">
            <div className="ir-question-prompt">
              <span className="ir-question-number">Pregunta {idx + 1}</span>
              <p>{lines.filter(l => !l.startsWith('[Pregunta') && !l.startsWith('Sección:') && !l.startsWith('---')).join('\n')}</p>
              {lines.find(l => l.startsWith('Sección:')) && (
                <span className="ir-section-tag">
                  📚 {lines.find(l => l.startsWith('Sección:'))?.replace('Sección:', '').trim()}
                </span>
              )}
            </div>
            <textarea
              value={responses[qId] || ''}
              onChange={(e) => handleResponseChange(qId, e.target.value)}
              placeholder="Tu respuesta..."
              rows={4}
              disabled={disabled}
              aria-label={`Respuesta a pregunta ${idx + 1}`}
            />
          </div>
        );
      })}
    </div>
  );
}
