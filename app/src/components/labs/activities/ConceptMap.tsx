import React, { useState } from 'react';
import type { ActivityComponentProps, ConceptNode, ConceptEdge } from './types';

export function ConceptMap({ activityId, prompt, rubric, fields, answer, onAnswer, disabled }: ActivityComponentProps) {
  const parsed = answer ? JSON.parse(answer || '{}') : null;
  const [connections, setConnections] = useState<ConceptEdge[]>(parsed?.connections || []);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: ConceptNode[] = fields?.conceptNodes || [];
  const edges: ConceptEdge[] = fields?.conceptEdges || [];

  const handleNodeClick = (nodeId: string) => {
    if (disabled) return;
    if (!selectedNode) {
      setSelectedNode(nodeId);
    } else if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      const exists = connections.find(
        (c) => c.from === selectedNode && c.to === nodeId
      );
      let newConnections: ConceptEdge[];
      if (exists) {
        newConnections = connections.filter(
          (c) => !(c.from === selectedNode && c.to === nodeId)
        );
      } else {
        newConnections = [...connections, { from: selectedNode, to: nodeId, label: '' }];
      }
      setConnections(newConnections);
      setSelectedNode(null);
      onAnswer(activityId, JSON.stringify({ connections: newConnections }));
    }
  };

  const handleClear = () => {
    if (disabled) return;
    setConnections([]);
    setSelectedNode(null);
    onAnswer(activityId, JSON.stringify({ connections: [] }));
  };

  const isConnected = (nodeId: string) =>
    connections.some((c) => c.from === nodeId || c.to === nodeId);

  return (
    <div className="activity-concept-map">
      <p className="cmap-prompt">{prompt}</p>

      {rubric && (
        <details className="cmap-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      {edges.length > 0 && (
        <div className="cmap-hint">
          <p>💡 Conexiones sugeridas (opcional):</p>
          <ul>
            {edges.map((e, i) => (
              <li key={i}>
                {e.from} → {e.to}{e.label ? ` (${e.label})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="cmap-canvas">
        <p className="cmap-instruction">
          {selectedNode
            ? `Seleccionado: "${nodes.find(n => n.id === selectedNode)?.label}". Toca otro nodo para conectarlo.`
            : 'Toca dos nodos para conectarlos. Toca el mismo nodo para deseleccionar.'}
        </p>

        <div className="cmap-nodes">
          {nodes.map((node) => {
            const sel = selectedNode === node.id;
            const conn = isConnected(node.id);
            return (
              <button
                key={node.id}
                className={`cmap-node ${sel ? 'selected' : ''} ${conn ? 'connected' : ''}`}
                onClick={() => handleNodeClick(node.id)}
                disabled={disabled}
                aria-label={`Concepto: ${node.label}${sel ? ' (seleccionado)' : ''}${conn ? ' (conectado)' : ''}`}
              >
                {node.label}
                {sel && <span className="cmap-node-indicator">← seleccionado</span>}
              </button>
            );
          })}
        </div>

        {connections.length > 0 && (
          <div className="cmap-connections">
            <p>Conexiones hechas ({connections.length}):</p>
            <ul>
              {connections.map((c, i) => (
                <li key={i}>
                  <strong>{nodes.find(n => n.id === c.from)?.label || c.from}</strong> →
                  <strong>{nodes.find(n => n.id === c.to)?.label || c.to}</strong>
                </li>
              ))}
            </ul>
            <button onClick={handleClear} className="cmap-clear" disabled={disabled}>
              Limpiar todas las conexiones
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
