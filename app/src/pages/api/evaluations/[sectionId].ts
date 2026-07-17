import type { APIRoute } from 'astro';
import { getDb, getEvaluation, getEvaluationActivities, startEvaluationAttempt, completeEvaluationAttempt, getEvaluationAttempts } from '../../../db/database.ts';

export const GET: APIRoute = async ({ params }) => {
  const sectionId = params.sectionId;
  if (!sectionId) {
    return new Response(JSON.stringify({ error: 'sectionId required' }), { status: 400 });
  }

  const db = getDb();
  const evalRecord = db.prepare(`SELECT * FROM evaluations WHERE section_id = ?`).get(sectionId) as { id: string; title: string; description: string; passing_score: number } | undefined;
  
  if (!evalRecord) {
    return new Response(JSON.stringify({ error: 'Evaluation not found for this section' }), { status: 404 });
  }

  const activities = getEvaluationActivities(evalRecord.id);

  return new Response(JSON.stringify({
    id: evalRecord.id,
    title: evalRecord.title,
    description: evalRecord.description,
    passingScore: evalRecord.passing_score,
    activities: activities.map(a => ({
      activityId: a.activity_id,
      type: a.type,
      prompt: a.prompt,
      rubric: a.rubric,
      points: a.points,
      difficulty: a.difficulty
    }))
  }), { status: 200 });
};