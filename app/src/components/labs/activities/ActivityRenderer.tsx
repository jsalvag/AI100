import React from 'react';
import type { ActivityComponentProps, NewActivityType } from './types';
import { ConfidenceMCQ } from './ConfidenceMCQ';
import { CardSort } from './CardSort';
import { FlashcardReview } from './FlashcardReview';
import { ConceptMap } from './ConceptMap';
import { BranchingScenario } from './BranchingScenario';
import { TeachBack } from './TeachBack';
import { CompareContrast } from './CompareContrast';
import { CodeChallenge } from './CodeChallenge';
import { InterleavedReview } from './InterleavedReview';
import { ConfidenceCalibration } from './ConfidenceCalibration';

export function ActivityRenderer(props: ActivityComponentProps) {
  const { type } = props;

  switch (type as NewActivityType) {
    case 'confidence-mcq':
      return <ConfidenceMCQ {...props} />;
    case 'card-sort':
      return <CardSort {...props} />;
    case 'flashcard-review':
      return <FlashcardReview {...props} />;
    case 'concept-map':
      return <ConceptMap {...props} />;
    case 'branching-scenario':
      return <BranchingScenario {...props} />;
    case 'teach-back':
      return <TeachBack {...props} />;
    case 'compare-contrast':
      return <CompareContrast {...props} />;
    case 'code-challenge':
      return <CodeChallenge {...props} />;
    case 'interleaved-review':
      return <InterleavedReview {...props} />;
    case 'confidence-calibration':
      return <ConfidenceCalibration {...props} />;
    default:
      return (
        <div className="activity-fallback">
          <label htmlFor={`answer-${props.activityId}`} className="visually-hidden">
            Tu respuesta
          </label>
          <textarea
            id={`answer-${props.activityId}`}
            value={props.answer}
            onChange={(e) => props.onAnswer(props.activityId, e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            rows={8}
            disabled={props.disabled}
          />
        </div>
      );
  }
}
