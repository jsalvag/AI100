import React, { useState, useEffect } from 'react';
import type { ActivityComponentProps } from './types';

interface SortableItem {
  id: string;
  text: string;
}

export function CardSort({ activityId, prompt, rubric, answer, onAnswer, disabled }: ActivityComponentProps) {
  const [items, setItems] = useState<SortableItem[]>(() => {
    if (answer) {
      try {
        return JSON.parse(answer);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (items.length > 0 && !answer) {
      onAnswer(activityId, JSON.stringify(items));
    }
  }, []);

  const handleDragStart = (idx: number) => {
    if (disabled) return;
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const newItems = [...items];
    const [dragged] = newItems.splice(draggedIdx, 1);
    newItems.splice(idx, 0, dragged);
    setItems(newItems);
    setDraggedIdx(idx);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    onAnswer(activityId, JSON.stringify(items));
  };

  /* Touch support for mobile */
  const [touchIdx, setTouchIdx] = useState<number | null>(null);

  const handleTouchStart = (idx: number) => {
    if (disabled) return;
    setTouchIdx(idx);
  };

  const handleTouchMove = (e: React.TouchEvent, idx: number) => {
    e.preventDefault();
    if (touchIdx === null || touchIdx === idx) return;
    const newItems = [...items];
    const [moved] = newItems.splice(touchIdx, 1);
    newItems.splice(idx, 0, moved);
    setItems(newItems);
    setTouchIdx(idx);
  };

  const handleTouchEnd = () => {
    setTouchIdx(null);
    onAnswer(activityId, JSON.stringify(items));
  };

  return (
    <div className="activity-card-sort">
      <p className="sort-prompt">{prompt}</p>

      {rubric && (
        <details className="sort-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      <p className="sort-instruction">Arrastra las tarjetas para ordenarlas correctamente:</p>

      <div className="sort-list" role="list" aria-label="Elementos para ordenar">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`sort-item ${draggedIdx === idx ? 'dragging' : ''} ${touchIdx === idx ? 'touching' : ''}`}
            draggable={!disabled}
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            onTouchStart={() => handleTouchStart(idx)}
            onTouchMove={(e) => handleTouchMove(e, idx)}
            onTouchEnd={handleTouchEnd}
            role="listitem"
            aria-label={`Elemento ${idx + 1}: ${item.text}`}
            aria-grabbed={draggedIdx === idx}
          >
            <span className="sort-position">{idx + 1}.</span>
            <span className="sort-text">{item.text}</span>
            <span className="sort-handle" aria-hidden="true">⠿</span>
          </div>
        ))}
      </div>
    </div>
  );
}
