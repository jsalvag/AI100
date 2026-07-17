import type { APIRoute } from 'astro';
import { getDb } from '../../../../db/database.ts';

export const GET: APIRoute = async ({ params, request }) => {
  const sectionId = params.sectionId;
  if (!sectionId) {
    return new Response(JSON.stringify({ error: 'sectionId required' }), { status: 400 });
  }

  const db = getDb();
  const userId = new URL(request.url).searchParams.get('userId') || 'anonymous';

  const evalRecord = db.prepare(`SELECT id FROM evaluations WHERE section_id = ?`).get(sectionId) as { id: string } | undefined;
  if (!evalRecord) {
    return new Response(JSON.stringify({ error: 'Evaluation not found' }), { status: 404 });
  }

  const attempts = db.prepare(`
    SELECT id, score, max_score, passed, started_at, completed_at, status
    FROM evaluation_attempts
    WHERE evaluation_id = ? AND user_id = ?
    ORDER BY started_at DESC
  `).all(evalRecord.id, userId);

  return new Response(JSON.stringify({ attempts }), { status: 200 });
};