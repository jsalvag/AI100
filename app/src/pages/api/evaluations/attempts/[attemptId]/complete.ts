import type { APIRoute } from 'astro';
import { getDb, completeEvaluationAttempt } from '../../../../../db/database.ts';

export const POST: APIRoute = async ({ request, params }) => {
  const attemptId = params.attemptId;
  if (!attemptId) {
    return new Response(JSON.stringify({ error: 'attemptId required' }), { status: 400 });
  }

  try {
    const userId = request.headers.get('x-user-id') || 'anonymous';
    const result = completeEvaluationAttempt(parseInt(attemptId), userId);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to complete attempt';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};