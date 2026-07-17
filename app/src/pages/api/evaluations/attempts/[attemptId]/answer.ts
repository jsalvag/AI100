import type { APIRoute } from 'astro';
import { getDb, submitEvaluationAnswer } from '../../../../../db/database.ts';

export const POST: APIRoute = async ({ request, params }) => {
  const attemptId = params.attemptId;
  if (!attemptId) {
    return new Response(JSON.stringify({ error: 'attemptId required' }), { status: 400 });
  }

  try {
    const body = await request.json();
    const { activityId, answer } = body;
    
    if (!activityId || answer === undefined) {
      return new Response(JSON.stringify({ error: 'activityId and answer required' }), { status: 400 });
    }

    const userId = request.headers.get('x-user-id') || 'anonymous';
    submitEvaluationAnswer(parseInt(attemptId), activityId, answer);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to submit answer' }), { status: 500 });
  }
};