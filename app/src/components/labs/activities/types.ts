import React from 'react';

export type NewActivityType =
  | 'confidence-mcq'
  | 'card-sort'
  | 'flashcard-review'
  | 'concept-map'
  | 'branching-scenario'
  | 'teach-back'
  | 'compare-contrast'
  | 'code-challenge'
  | 'interleaved-review'
  | 'confidence-calibration';

export interface MCQOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface CardSortItem {
  id: string;
  text: string;
  correctPosition: number;
}

export interface ConceptNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

export interface ConceptEdge {
  from: string;
  to: string;
  label?: string;
}

export interface BranchingNode {
  id: string;
  prompt: string;
  choices: BranchingChoice[];
}

export interface BranchingChoice {
  id: string;
  text: string;
  nextNodeId: string | null;
  score: number;
  feedback: string;
}

export interface TeachBackMessage {
  role: 'student' | 'system';
  text: string;
}

export interface CompareContrastRow {
  label: string;
  column1: string;
  column2: string;
}

export interface CodeChallengeTestCase {
  input: string;
  expectedOutput: string;
  hint?: string;
}

export interface ConfidenceCalibrationItem {
  activityId: string;
  prompt: string;
  confidence: number;
  score: number;
  maxScore: number;
}

export interface NewActivityFields {
  options?: MCQOption[];
  correctOrder?: string[];
  conceptNodes?: ConceptNode[];
  conceptEdges?: ConceptEdge[];
  branchingTree?: BranchingNode[];
  branchingRootId?: string;
  teachBackMessages?: TeachBackMessage[];
  compareRows?: CompareContrastRow[];
  compareColumn1?: string;
  compareColumn2?: string;
  codeTemplate?: string;
  testCases?: CodeChallengeTestCase[];
  calibrationItems?: ConfidenceCalibrationItem[];
}

export interface ActivityComponentProps {
  activityId: string;
  prompt: string;
  type: NewActivityType;
  rubric: string;
  points: number;
  difficulty: string;
  fields?: NewActivityFields;
  answer: string;
  onAnswer: (activityId: string, answer: string) => void;
  disabled?: boolean;
}

export const ACTIVITY_ICONS: Record<string, string> = {
  'confidence-mcq': '🎯',
  'card-sort': '📊',
  'flashcard-review': '🃏',
  'concept-map': '🗺️',
  'branching-scenario': '🌳',
  'teach-back': '💬',
  'compare-contrast': '⚖️',
  'code-challenge': '💻',
  'interleaved-review': '🔄',
  'confidence-calibration': '📐',
};

export const ACTIVITY_LABELS: Record<string, string> = {
  'confidence-mcq': 'Opción Múltiple',
  'card-sort': 'Ordenación',
  'flashcard-review': 'Tarjetas de Repaso',
  'concept-map': 'Mapa Conceptual',
  'branching-scenario': 'Escenario Ramificado',
  'teach-back': 'Explicación',
  'compare-contrast': 'Comparación',
  'code-challenge': 'Desafío de Código',
  'interleaved-review': 'Repaso Acumulativo',
  'confidence-calibration': 'Calibración',
};
