import type { APIRoute } from 'astro';
import { getDb } from '../../../../db/database.ts';

export const POST: APIRoute = async ({ params, request }) => {
  const sectionId = params.sectionId;
  if (!sectionId) {
    return new Response(JSON.stringify({ error: 'sectionId required' }), { status: 400 });
  }

  const db = getDb();
  const evalRecord = db.prepare(`SELECT * FROM evaluations WHERE section_id = ?`).get(sectionId);
  
  if (!evalRecord) {
    return new Response(JSON.stringify({ error: 'Evaluation not found' }), { status: 404 });
  }

  const userId = request.headers.get('x-user-id') || 'anonymous';
  
  // Create new attempt
  const result = db.prepare(`
    INSERT INTO evaluation_attempts (evaluation_id, user_id, max_score, status)
    VALUES (?, ?, ?, 'in_progress')
  `).run(evalRecord.id, userId, evalRecord.passing_score);

  const attemptId = result.lastInsertRowid;

  return new Response(JSON.stringify({ 
    attemptId,
    evaluationId: evalRecord.id,
    startedAt: new Date().toISOString()
  }), { status: 201 });
};