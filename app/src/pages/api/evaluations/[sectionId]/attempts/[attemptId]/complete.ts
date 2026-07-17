import type { APIRoute } from 'astro';
import { getDb, completeEvaluationAttempt } from '../../../../../../db/database.ts';

export const POST: APIRoute = async ({ params, request }) => {
  const { sectionId, attemptId } = params;
  if (!sectionId || !attemptId) {
    return new Response(JSON.stringify({ error: 'sectionId and attemptId required' }), { status: 400 });
  }

  const db = getDb();
  const userId = request.headers.get('x-user-id') || 'anonymous';

  const evalRecord = db.prepare(`SELECT id FROM evaluations WHERE section_id = ?`).get(sectionId) as { id: string } | undefined;
  if (!evalRecord) {
    return new Response(JSON.stringify({ error: 'Evaluation not found' }), { status: 404 });
  }

  const attempt = db.prepare(`
    SELECT * FROM evaluation_attempts 
    WHERE id = ? AND evaluation_id = ? AND user_id = ? AND status = 'in_progress'
  `).get(attemptId, evalRecord.id, userId) as { id: number; max_score: number; evaluation_id: string } | undefined;

  if (!attempt) {
    return new Response(JSON.stringify({ error: 'Attempt not found or already completed' }), { status: 404 });
  }

  const answers = db.prepare(`
    SELECT ea.*, a.points, a.activity_id
    FROM evaluation_answers ea
    JOIN evaluation_activities a ON ea.activity_id = a.activity_id AND a.evaluation_id = ?
    WHERE ea.attempt_id = ?
  `).all(evalRecord.id, attemptId) as Array<{ answer: string; score: number | null; points: number }>;

  let totalScore = 0;
  let maxScore = 0;
  let answeredCount = 0;

  for (const ans of answers) {
    maxScore += ans.points;
    if (ans.answer && ans.answer.trim().length >= 10) {
      answeredCount++;
      if (ans.score !== null) {
        totalScore += ans.score;
      } else {
        totalScore += ans.points * 0.5;
      }
    }
  }

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const passed = percentage >= 60;

  db.prepare(`
    UPDATE evaluation_attempts 
    SET score = ?, max_score = ?, passed = ?, completed_at = datetime('now'), status = 'completed'
    WHERE id = ?
  `).run(totalScore, maxScore, passed ? 1 : 0, attemptId);

  return new Response(JSON.stringify({ 
    score: totalScore,
    maxScore,
    passed,
    percentage,
    completedAt: new Date().toISOString()
  }), { status: 200 });
};