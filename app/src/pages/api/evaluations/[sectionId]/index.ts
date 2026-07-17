import type { APIRoute } from 'astro';
import { getDb, getEvaluation, getEvaluationActivities } from '../../../../db/database.ts';

export const GET: APIRoute = async ({ params }) => {
  const sectionId = params.sectionId;
  if (!sectionId) {
    return new Response(JSON.stringify({ error: 'sectionId required' }), { status: 400 });
  }

  const db = getDb();
  const evalRecord = db.prepare(`SELECT * FROM evaluations WHERE section_id = ?`).get(sectionId);
  
  if (!evalRecord) {
    return new Response(JSON.stringify({ error: 'Evaluation not found' }), { status: 404 });
  }

  const activities = getEvaluationActivities(evalRecord.id);
  
  // Return without expected_answer for security
  const safeActivities = activities.map(a => ({
    activityId: a.activity_id,
    type: a.type,
    prompt: a.prompt,
    rubric: a.rubric,
    points: a.points,
    difficulty: a.difficulty
  }));

  return new Response(JSON.stringify({
    id: evalRecord.id,
    title: evalRecord.title,
    description: evalRecord.description,
    passingScore: evalRecord.passing_score,
    activities: safeActivities
  }), { status: 200 });
};