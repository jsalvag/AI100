import type { APIRoute } from 'astro';
import { getProgressSummary, saveProgress } from '../../db/database';

export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const sectionId = url.searchParams.get('sectionId') ?? 'ai100-07';
  return Response.json({ sectionId, events: getProgressSummary(sectionId) });
};

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as {
    sectionId?: string;
    eventType?: string;
    payload?: unknown;
  } | null;

  if (!body?.sectionId || !body.eventType) {
    return Response.json({ error: 'sectionId and eventType are required' }, { status: 400 });
  }

  saveProgress({ sectionId: body.sectionId, eventType: body.eventType, payload: body.payload });
  return Response.json({ ok: true });
};
