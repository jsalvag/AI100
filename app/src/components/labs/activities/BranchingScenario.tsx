import React, { useState } from 'react';
import type { ActivityComponentProps, BranchingNode } from './types';

export function BranchingScenario({ activityId, prompt, rubric, fields, answer, onAnswer, disabled }: ActivityComponentProps) {
  const tree: BranchingNode[] = fields?.branchingTree || [];
  const rootId: string = fields?.branchingRootId || (tree[0]?.id ?? '');

  const parsed = answer ? JSON.parse(answer || '{}') : null;
  const [currentNodeId, setCurrentNodeId] = useState<string>(parsed?.finalNode || rootId);
  const [path, setPath] = useState<string[]>(parsed?.path || []);
  const [totalScore, setTotalScore] = useState<number>(parsed?.totalScore || 0);
  const [completed, setCompleted] = useState(parsed?.completed || false);

  const currentNode = tree.find((n) => n.id === currentNodeId);

  const handleChoice = (choiceId: string, nextNodeId: string | null, choiceScore: number) => {
    if (disabled || completed) return;
    const newPath = [...path, choiceId];
    const newScore = totalScore + choiceScore;

    if (!nextNodeId) {
      setCompleted(true);
      setPath(newPath);
      setTotalScore(newScore);
      onAnswer(
        activityId,
        JSON.stringify({ finalNode: currentNodeId, path: newPath, totalScore: newScore, completed: true })
      );
    } else {
      setCurrentNodeId(nextNodeId);
      setPath(newPath);
      setTotalScore(newScore);
      onAnswer(
        activityId,
        JSON.stringify({ finalNode: nextNodeId, path: newPath, totalScore: newScore, completed: false })
      );
    }
  };

  const handleReset = () => {
    if (disabled) return;
    setCurrentNodeId(rootId);
    setPath([]);
    setTotalScore(0);
    setCompleted(false);
    onAnswer(activityId, JSON.stringify({}));
  };

  return (
    <div className="activity-branching">
      <p className="branching-prompt">{prompt}</p>

      {rubric && (
        <details className="branching-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      {path.length > 0 && (
        <div className="branching-path">
          <p>Ruta: {path.length} decisión(es) tomada(s) · Puntaje acumulado: {totalScore} pts</p>
        </div>
      )}

      {!completed && currentNode && (
        <div className="branching-node">
          <div className="branching-scene">
            <p>{currentNode.prompt}</p>
          </div>

          <div className="branching-choices" role="group" aria-label="Decisiones disponibles">
            {currentNode.choices.map((choice) => (
              <button
                key={choice.id}
                className="branching-choice"
                onClick={() => handleChoice(choice.id, choice.nextNodeId, choice.score)}
                disabled={disabled}
              >
                <span className="choice-text">{choice.text}</span>
                <span className="choice-preview">{choice.feedback}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {completed && (
        <div className="branching-complete">
          <h4>✅ Escenario completado</h4>
          <p>Puntaje total: {totalScore} pts</p>
          <p>Decisiones tomadas: {path.length}</p>
          <button onClick={handleReset} className="branching-reset" disabled={disabled}>
            Volver a intentar
          </button>
        </div>
      )}
    </div>
  );
}
