import React, { useState, useEffect, useRef } from 'react';
import type { ActivityComponentProps } from './types';

const STUDENT_REPLIES = [
  "No entendí bien. ¿Puedes explicarlo de otra forma?",
  "¿Y eso por qué es importante?",
  "Ah, ok. ¿Pero cómo se relaciona con lo que vimos antes?",
  "Mmmm... ponme un ejemplo concreto.",
  "¿Y qué pasa si los datos son malos?",
  "Interesante. ¿Hay casos donde esto no funcione?",
  "Creo que empiezo a entender. ¿Hay algún truco para recordarlo?",
  "¿Y cuál sería el primer paso para implementar esto?",
];

export function TeachBack({ activityId, prompt, rubric, answer, onAnswer, disabled }: ActivityComponentProps) {
  const parsed = answer ? JSON.parse(answer || '{}') : null;
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>(
    parsed?.messages || [{ role: 'system', text: prompt }]
  );
  const [input, setInput] = useState('');
  const [replyCount, setReplyCount] = useState(parsed?.replyCount || 0);
  const [completed, setCompleted] = useState(parsed?.completed || false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || disabled || completed) return;
    const newMessages = [...messages, { role: 'student', text: input.trim() }];
    setMessages(newMessages);
    setInput('');

    const nextReply = STUDENT_REPLIES[replyCount % STUDENT_REPLIES.length];
    const newReplyCount = replyCount + 1;

    if (newReplyCount >= 3) {
      const finalMessages = [...newMessages, { role: 'system', text: '¡Gracias por la explicación! Creo que lo entiendo ahora. 👍' }];
      setMessages(finalMessages);
      setCompleted(true);
      setReplyCount(newReplyCount);
      onAnswer(
        activityId,
        JSON.stringify({ messages: finalMessages, replyCount: newReplyCount, completed: true })
      );
    } else {
      const finalMessages = [...newMessages, { role: 'system', text: nextReply }];
      setMessages(finalMessages);
      setReplyCount(newReplyCount);
      onAnswer(
        activityId,
        JSON.stringify({ messages: finalMessages, replyCount: newReplyCount, completed: false })
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    if (disabled) return;
    setMessages([{ role: 'system', text: prompt }]);
    setInput('');
    setReplyCount(0);
    setCompleted(false);
    onAnswer(activityId, JSON.stringify({}));
  };

  return (
    <div className="activity-teach-back">
      {rubric && (
        <details className="tb-rubric">
          <summary>📋 Ver rúbrica</summary>
          <p>{rubric}</p>
        </details>
      )}

      <div className="tb-chat" role="log" aria-label="Conversación con el estudiante">
        {messages.map((msg, i) => (
          <div key={i} className={`tb-message ${msg.role}`}>
            <span className="tb-avatar">
              {msg.role === 'system' ? '🧑‍🎓' : '🧑‍🏫'}
            </span>
            <div className="tb-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {!completed ? (
        <div className="tb-input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Explica el concepto al estudiante..."
            rows={3}
            disabled={disabled}
            aria-label="Tu explicación"
          />
          <button onClick={handleSend} disabled={!input.trim() || disabled} className="tb-send">
            Enviar explicación
          </button>
        </div>
      ) : (
        <div className="tb-complete">
          <p>✅ Explicación completada. ¡Gracias por enseñar!</p>
          <button onClick={handleReset} className="tb-reset" disabled={disabled}>
            Volver a intentar
          </button>
        </div>
      )}
    </div>
  );
}
