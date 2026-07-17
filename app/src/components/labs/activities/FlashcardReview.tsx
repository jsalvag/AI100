import React, { useState } from 'react';
import type { ActivityComponentProps } from './types';

export function FlashcardReview({ activityId, prompt, rubric, answer, onAnswer, disabled }: ActivityComponentProps) {
  const [flipped, setFlipped] = useState(false);
  const [grade, setGrade] = useState<string>('');

  const handleGrade = (g: 'easy' | 'medium' | 'hard') => {
    if (disabled) return;
    setGrade(g);
    onAnswer(activityId, JSON.stringify({ flipped: true, grade: g, answeredAt: new Date().toISOString() }));
  };

  const handleFlip = () => {
    if (disabled) return;
    setFlipped(true);
  };

  const result = answer ? JSON.parse(answer) : null;

  return (
    <div className="activity-flashcard">
      <p className="flashcard-prompt">{prompt}</p>

      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={!flipped ? handleFlip : undefined}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>🧠 Toca para ver la respuesta</p>
          </div>
          <div className="flashcard-back">
            <p>{rubric}</p>
          </div>
        </div>
      </div>

      {flipped && !result && (
        <div className="flashcard-grade" role="group" aria-label="Califica tu recuerdo">
          <p>¿Qué tan fácil fue recordarlo?</p>
          <div className="grade-buttons">
            <button onClick={() => handleGrade('easy')} className="grade-easy" disabled={disabled}>
              ✅ Fácil
            </button>
            <button onClick={() => handleGrade('medium')} className="grade-medium" disabled={disabled}>
              🤔 Media
            </button>
            <button onClick={() => handleGrade('hard')} className="grade-hard" disabled={disabled}>
              🔄 Difícil
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="flashcard-result">
          <p>Calificaste como: <strong>{result.grade === 'easy' ? 'Fácil' : result.grade === 'medium' ? 'Media' : 'Difícil'}</strong></p>
        </div>
      )}
    </div>
  );
}
