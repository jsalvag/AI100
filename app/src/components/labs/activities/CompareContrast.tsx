import React, { useState } from 'react';
import type { ActivityComponentProps } from './types';

export function CompareContrast({ activityId, prompt, rubric, fields, answer, onAnswer, disabled }: ActivityComponentProps) {
  const parsed = answer ? JSON.parse(answer || '{}') : null;
  const rows = fields?.compareRows || [];
  const col1 = fields?.compareColumn1 || 'Columna 1';
  const col2 = fields?.compareColumn2 || 'Columna 2';

  const initialCells: Record<string, { col1: string; col2: string }> = {};
  rows.forEach((row) => {
    initialCells[row.label] = {
      col1: parsed?.cells?.[row.label]?.col1 || '',
      col2: parsed?.cells?.[row.label]?.col2 || '',
    };
  });
  const [cells, setCells] = useState(initialCells);

  const handleCellChange = (label: string, col: 'col1' | 'col2', value: string) => {
    if (disabled) return;
    const newCells = { ...cells, [label]: { ...cells[label], [col]: value } };
    setCells(newCells);
    onAnswer(activityId, JSON.stringify({ cells: newCells }));
  };

  return (
    <div className="activity-compare">
      <p className="compare-prompt">{prompt}</p>

      {rubric && (
        <details className="compare-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      <div className="compare-table-wrapper">
        <table className="compare-table" role="grid" aria-label="Tabla de comparación">
          <thead>
            <tr>
              <th scope="col">Atributo</th>
              <th scope="col">{col1}</th>
              <th scope="col">{col2}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>
                  <textarea
                    value={cells[row.label]?.col1 || ''}
                    onChange={(e) => handleCellChange(row.label, 'col1', e.target.value)}
                    placeholder={`${col1}...`}
                    rows={2}
                    disabled={disabled}
                    aria-label={`${row.label} - ${col1}`}
                  />
                </td>
                <td>
                  <textarea
                    value={cells[row.label]?.col2 || ''}
                    onChange={(e) => handleCellChange(row.label, 'col2', e.target.value)}
                    placeholder={`${col2}...`}
                    rows={2}
                    disabled={disabled}
                    aria-label={`${row.label} - ${col2}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
