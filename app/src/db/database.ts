import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { contentBlocks, modules, sections } from '../data/sections.ts';
import { evaluations } from '../data/evaluations.ts';

export type SectionRecord = {
  id: string;
  module_id: string;
  number: number;
  slug: string;
  title: string;
  summary: string;
  status: string;
  estimated_minutes: number;
  source_kind: string;
};

export type ContentBlockRecord = {
  id: number;
  section_id: string;
  kind: string;
  title: string;
  body: string;
  sort_order: number;
};

export type EvaluationRecord = {
  id: string;
  section_id: string;
  title: string;
  description: string;
  passing_score: number;
  created_at: string;
};

export type EvaluationActivityRecord = {
  id: number;
  evaluation_id: string;
  activity_id: string;
  type: string;
  prompt: string;
  expected_answer: string | null;
  rubric: string;
  points: number;
  difficulty: string;
  sort_order: number;
};

export type EvaluationAttemptRecord = {
  id: number;
  evaluation_id: string;
  user_id: string;
  score: number;
  max_score: number;
  passed: number;
  started_at: string;
  completed_at: string | null;
  status: 'in_progress' | 'completed' | 'abandoned';
};

export type EvaluationAnswerRecord = {
  id: number;
  attempt_id: number;
  activity_id: string;
  answer: string;
  score: number | null;
  feedback: string | null;
  graded_at: string | null;
  grader: 'auto' | 'manual' | null;
};

export type ProgressEvent = {
  sectionId: string;
  eventType: string;
  payload?: unknown;
};

let db: DatabaseSync | undefined;

export function getDataDir() {
  return path.resolve(process.env.AI_DATA_DIR ?? path.join(process.cwd(), 'data'));
}

export function getDatabasePath() {
  return path.join(getDataDir(), 'local.db');
}

export function getDb() {
  if (!db) {
    mkdirSync(getDataDir(), { recursive: true });
    db = new DatabaseSync(getDatabasePath());
    db.exec('PRAGMA foreign_keys = ON;');
    migrate(db);
    seed(db);
  }

  return db;
}

export function migrate(database = getDb()) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS modules (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      status TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sections (
      id TEXT PRIMARY KEY,
      module_id TEXT NOT NULL REFERENCES modules(id),
      number INTEGER NOT NULL,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      status TEXT NOT NULL,
      estimated_minutes INTEGER NOT NULL,
      source_kind TEXT NOT NULL,
      UNIQUE(module_id, number),
      UNIQUE(module_id, slug)
    );

    CREATE TABLE IF NOT EXISTS content_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id TEXT NOT NULL REFERENCES sections(id),
      kind TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      sort_order INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS progress_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id TEXT NOT NULL REFERENCES sections(id),
      event_type TEXT NOT NULL,
      payload TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS evaluations (
      id TEXT PRIMARY KEY,
      section_id TEXT NOT NULL UNIQUE REFERENCES sections(id),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      passing_score INTEGER NOT NULL DEFAULT 60,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS evaluation_activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evaluation_id TEXT NOT NULL REFERENCES evaluations(id),
      activity_id TEXT NOT NULL,
      type TEXT NOT NULL,
      prompt TEXT NOT NULL,
      expected_answer TEXT,
      rubric TEXT NOT NULL,
      points INTEGER NOT NULL,
      difficulty TEXT NOT NULL,
      sort_order INTEGER NOT NULL,
      UNIQUE(evaluation_id, activity_id)
    );

    CREATE TABLE IF NOT EXISTS evaluation_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evaluation_id TEXT NOT NULL REFERENCES evaluations(id),
      user_id TEXT NOT NULL,
      score REAL NOT NULL DEFAULT 0,
      max_score REAL NOT NULL DEFAULT 0,
      passed INTEGER NOT NULL DEFAULT 0,
      started_at TEXT NOT NULL DEFAULT (datetime('now')),
      completed_at TEXT,
      status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned'))
    );

    CREATE TABLE IF NOT EXISTS evaluation_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempt_id INTEGER NOT NULL REFERENCES evaluation_attempts(id),
      activity_id TEXT NOT NULL,
      answer TEXT NOT NULL,
      score REAL,
      feedback TEXT,
      graded_at TEXT,
      grader TEXT CHECK (grader IN ('auto', 'manual')),
      UNIQUE(attempt_id, activity_id)
    );
  `);
}

export function seed(database = getDb()) {
  const insertModule = database.prepare(`
    INSERT INTO modules (id, title, level, status, description)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      level = excluded.level,
      status = excluded.status,
      description = excluded.description
  `);

  for (const module of modules) {
    insertModule.run(module.id, module.title, module.level, module.status, module.description);
  }

  const insertSection = database.prepare(`
    INSERT INTO sections (id, module_id, number, slug, title, summary, status, estimated_minutes, source_kind)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      module_id = excluded.module_id,
      number = excluded.number,
      slug = excluded.slug,
      title = excluded.title,
      summary = excluded.summary,
      status = excluded.status,
      estimated_minutes = excluded.estimated_minutes,
      source_kind = excluded.source_kind
  `);

  for (const section of sections) {
    insertSection.run(
      section.id,
      section.moduleId,
      section.number,
      section.slug,
      section.title,
      section.summary,
      section.status,
      section.estimatedMinutes,
      section.sourceKind,
    );
  }

  database.prepare('DELETE FROM content_blocks').run();
  const insertBlock = database.prepare(`
    INSERT INTO content_blocks (section_id, kind, title, body, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const block of contentBlocks) {
    insertBlock.run(block.sectionId, block.kind, block.title, block.body, block.sortOrder);
  }

  // Seed evaluations
  for (const evaluation of evaluations) {
    const evalId = `eval-${evaluation.sectionId}`;
    
    const insertEval = database.prepare(`
      INSERT INTO evaluations (id, section_id, title, description, passing_score)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        section_id = excluded.section_id,
        title = excluded.title,
        description = excluded.description,
        passing_score = excluded.passing_score
    `);
    insertEval.run(evalId, evaluation.sectionId, evaluation.title, evaluation.description, evaluation.passingScore);

    database.prepare('DELETE FROM evaluation_activities WHERE evaluation_id = ?').run(evalId);
    const insertActivity = database.prepare(`
      INSERT INTO evaluation_activities (evaluation_id, activity_id, type, prompt, expected_answer, rubric, points, difficulty, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (let i = 0; i < evaluation.activities.length; i++) {
      const act = evaluation.activities[i];
      insertActivity.run(
        evalId,
        act.id,
        act.type,
        act.prompt,
        act.expectedAnswer ?? null,
        act.rubric,
        act.points,
        act.difficulty,
        i + 1
      );
    }
  }
}

export function listModules() {
  return getDb().prepare('SELECT * FROM modules ORDER BY id').all();
}

export function listSections(moduleId: string) {
  return getDb()
    .prepare('SELECT * FROM sections WHERE module_id = ? ORDER BY number')
    .all(moduleId) as SectionRecord[];
}

export function getSection(moduleId: string, slug: string) {
  return getDb()
    .prepare('SELECT * FROM sections WHERE module_id = ? AND slug = ?')
    .get(moduleId, slug) as SectionRecord | undefined;
}

export function getContentBlocks(sectionId: string) {
  return getDb()
    .prepare('SELECT * FROM content_blocks WHERE section_id = ? ORDER BY sort_order')
    .all(sectionId) as ContentBlockRecord[];
}

export function saveProgress(event: ProgressEvent) {
  getDb()
    .prepare('INSERT INTO progress_events (section_id, event_type, payload) VALUES (?, ?, ?)')
    .run(event.sectionId, event.eventType, JSON.stringify(event.payload ?? {}));
}

export function getProgressSummary(sectionId: string) {
  return getDb()
    .prepare(
      `SELECT event_type, COUNT(*) as count, MAX(created_at) as latest
       FROM progress_events
       WHERE section_id = ?
       GROUP BY event_type
       ORDER BY event_type`,
    )
    .all(sectionId);
}

export function getEvaluation(sectionId: string) {
  return getDb()
    .prepare(`SELECT * FROM evaluations WHERE section_id = ?`)
    .get(sectionId) as EvaluationRecord | undefined;
}

export function getEvaluationActivities(evaluationId: string) {
  return getDb()
    .prepare(`SELECT * FROM evaluation_activities WHERE evaluation_id = ? ORDER BY sort_order`)
    .all(evaluationId) as EvaluationActivityRecord[];
}

export function startEvaluationAttempt(evaluationId: string, userId: string) {
  const maxScore = getDb()
    .prepare(`SELECT SUM(points) as total FROM evaluation_activities WHERE evaluation_id = ?`)
    .get(evaluationId) as { total: number } | undefined;

  const result = getDb()
    .prepare(`
      INSERT INTO evaluation_attempts (evaluation_id, user_id, max_score, status)
      VALUES (?, ?, ?, 'in_progress')
    `)
    .run(evaluationId, userId, maxScore?.total ?? 0);

  return {
    attemptId: result.lastInsertRowid as number,
    maxScore: maxScore?.total ?? 0
  };
}

export function submitEvaluationAnswer(attemptId: number, activityId: string, answer: string) {
  getDb()
    .prepare(`
      INSERT INTO evaluation_answers (attempt_id, activity_id, answer)
      VALUES (?, ?, ?)
      ON CONFLICT(attempt_id, activity_id) DO UPDATE SET
        answer = excluded.answer
    `)
    .run(attemptId, activityId, answer);
}

export function completeEvaluationAttempt(attemptId: number, userId: string) {
  const attempt = getDb()
    .prepare(`SELECT * FROM evaluation_attempts WHERE id = ? AND user_id = ?`)
    .get(attemptId, userId) as EvaluationAttemptRecord | undefined;

  if (!attempt || attempt.status !== 'in_progress') {
    throw new Error('Attempt not found or already completed');
  }

  // Get all answers with their rubrics for manual/auto grading
  const answers = getDb()
    .prepare(`
      SELECT ea.*, act.rubric, act.points, act.type
      FROM evaluation_answers ea
      JOIN evaluation_activities act ON ea.activity_id = act.activity_id AND act.evaluation_id = ?
      WHERE ea.attempt_id = ?
    `)
    .all(attempt.evaluation_id, attemptId) as Array<EvaluationAnswerRecord & { rubric: string; points: number; type: string }>;

  // For now, mark as completed with 0 score (manual grading needed for open-ended)
  // In production, you'd have auto-grading for certain types
  let totalScore = 0;
  for (const ans of answers) {
    // Simple auto-grade for now: if answer is non-empty, give partial credit
    // Real implementation would use LLM or keyword matching against rubric
    if (ans.answer && ans.answer.trim().length > 10) {
      totalScore += ans.points * 0.5; // 50% for attempting
    }
  }

  const passed = totalScore >= (attempt.max_score * 0.6); // 60% passing

  getDb()
    .prepare(`
      UPDATE evaluation_attempts
      SET score = ?, passed = ?, completed_at = datetime('now'), status = 'completed'
      WHERE id = ?
    `)
    .run(totalScore, passed ? 1 : 0, attemptId);

  return { score: totalScore, maxScore: attempt.max_score, passed };
}

export function getEvaluationAttempts(userId: string, evaluationId?: string) {
  let query = `SELECT * FROM evaluation_attempts WHERE user_id = ?`;
  const params: unknown[] = [userId];
  
  if (evaluationId) {
    query += ` AND evaluation_id = ?`;
    params.push(evaluationId);
  }
  
  query += ` ORDER BY started_at DESC`;
  
  return getDb().prepare(query).all(...params) as EvaluationAttemptRecord[];
}

export function getEvaluationAttemptDetails(attemptId: number, userId: string) {
  const attempt = getDb()
    .prepare(`SELECT * FROM evaluation_attempts WHERE id = ? AND user_id = ?`)
    .get(attemptId, userId) as EvaluationAttemptRecord | undefined;

  if (!attempt) return null;

  const answers = getDb()
    .prepare(`
      SELECT ea.*, act.prompt, act.rubric, act.points, act.type, act.difficulty
      FROM evaluation_answers ea
      JOIN evaluation_activities act ON ea.activity_id = act.activity_id AND act.evaluation_id = ?
      WHERE ea.attempt_id = ?
      ORDER BY act.sort_order
    `)
    .all(attempt.evaluation_id, attemptId);

  return { attempt, answers };
}
