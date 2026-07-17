import type { APIRoute } from 'astro';
import { getDb } from '../../../../../../db/database.ts';

export const POST: APIRoute = async ({ params, request }) => {
  const { sectionId, attemptId } = params;
  if (!sectionId || !attemptId) {
    return new Response(JSON.stringify({ error: 'sectionId and attemptId required' }), { status: 400 });
  }

  const db = getDb();
  const body = await request.json();
  const { activityId, answer } = body;
  
  if (!activityId || !answer) {
    return new Response(JSON.stringify({ error: 'activityId and answer required' }), { status: 400 });
  }

  // Verify attempt exists and is in progress
  const attempt = db.prepare(`
    SELECT * FROM evaluation_attempts 
    WHERE id = ? AND evaluation_id = (SELECT id FROM evaluations WHERE section_id = ?) AND status = 'in_progress'
  `).get(attemptId, sectionId);

  if (!attempt) {
    return new Response(JSON.stringify({ error: 'Attempt not found or already completed' }), { status: 404 });
  }

  // Get activity for auto-grading
  const activity = db.prepare(`
    SELECT * FROM evaluation_activities WHERE evaluation_id = ? AND activity_id = ?
  `).get(attempt.evaluation_id, activityId);

  if (!activity) {
    return new Response(JSON.stringify({ error: 'Activity not found' }), { status: 404 });
  }

  // Save answer (auto-grade for simple types, manual for complex)
  const isAutoGradable = ['apply', 'debug', 'predict', 'rank', 'identify'].includes(activity.type);
  let score = null;
  let gradedAt = null;
  let grader = null;

  if (isAutoGradable && activity.expected_answer) {
    // Simple keyword matching for auto-grade
    const expected = activity.expected_answer.toLowerCase();
    const given = answer.toLowerCase();
    const keywords = expected.split(' ').filter(w => w.length > 3);
    const matches = keywords.filter(k => given.includes(k)).length;
    const ratio = matches / Math.max(keywords.length, 1);
    score = Math.round(ratio * activity.points);
    gradedAt = new Date().toISOString();
    grader = 'auto';
  }

  db.prepare(`
    INSERT INTO evaluation_answers (attempt_id, activity_id, answer, score, graded_at, grader)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(attemptId, activityId, answer, score, gradedAt, grader);

  return new Response(JSON.stringify({ 
    saved: true,
    autoGraded: score !== null,
    score
  }), { status: 200 });
};