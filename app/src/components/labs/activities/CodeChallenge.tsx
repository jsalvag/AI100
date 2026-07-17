import React, { useState } from 'react';
import type { ActivityComponentProps } from './types';

export function CodeChallenge({ activityId, prompt, rubric, fields, answer, onAnswer, disabled }: ActivityComponentProps) {
  const [code, setCode] = useState(answer || fields?.codeTemplate || '');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const handleCodeChange = (value: string) => {
    if (disabled) return;
    setCode(value);
    onAnswer(activityId, value);
  };

  const handleRun = () => {
    setRunning(true);
    setOutput('');
    try {
      const logs: string[] = [];
      const mockConsole = { log: (...args: unknown[]) => logs.push(args.map(String).join(' ')) };

      const fn = new Function('console', code);
      fn(mockConsole);

      setOutput(logs.join('\n') || '✅ Código ejecutado sin errores (sin salida)');
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      setOutput(`❌ Error: ${err}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="activity-code-challenge">
      <p className="code-prompt">{prompt}</p>

      {rubric && (
        <details className="code-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      <div className="code-editor">
        <label htmlFor={`code-${activityId}`} className="code-label">Tu código:</label>
        <textarea
          id={`code-${activityId}`}
          className="code-textarea"
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="Escribe tu código aquí..."
          rows={12}
          spellCheck={false}
          disabled={disabled}
          aria-label="Editor de código"
        />
      </div>

      <div className="code-actions">
        <button onClick={handleRun} disabled={running || !code.trim() || disabled} className="code-run">
          {running ? 'Ejecutando...' : '▶ Ejecutar'}
        </button>
        {fields?.codeTemplate && (
          <button
            onClick={() => handleCodeChange(fields.codeTemplate || '')}
            disabled={disabled}
            className="code-reset"
          >
            Restaurar plantilla
          </button>
        )}
      </div>

      {output && (
        <div className="code-output" role="log" aria-label="Salida del código">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
