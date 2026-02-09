/**
 * Journeys (Courses) service.
 *
 * Handles courses, units, lessons, progress tracking.
 */

import { sql } from "@/db/client";
import type {
  Course,
  CourseUnit,
  CourseLesson,
  CourseWithUnits,
  UnitWithLessons,
  LessonWithApplets,
  UserLessonProgress,
  UserCourseProgress,
} from "./model";
import type { Applet } from "../applets/model";

// ─── Row converters ────────────────────────────────────────────

function rowToCourse(row: Record<string, unknown>): Course {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    emoji: row.emoji as string,
    color: row.color as string,
    isPublished: row.is_published as boolean,
    sortOrder: row.sort_order as number,
    createdAt: row.created_at as Date,
    updatedAt: row.updated_at as Date,
  };
}

function rowToUnit(row: Record<string, unknown>): CourseUnit {
  return {
    id: row.id as string,
    courseId: row.course_id as string,
    title: row.title as string,
    description: row.description as string | null,
    sortOrder: row.sort_order as number,
    isCheckpoint: row.is_checkpoint as boolean,
    createdAt: row.created_at as Date,
  };
}

function rowToLesson(row: Record<string, unknown>): CourseLesson {
  return {
    id: row.id as string,
    unitId: row.unit_id as string,
    title: row.title as string,
    description: row.description as string | null,
    emoji: row.emoji as string,
    sortOrder: row.sort_order as number,
    xpReward: row.xp_reward as number,
    isCheckpointReview: row.is_checkpoint_review as boolean,
    createdAt: row.created_at as Date,
  };
}

function rowToApplet(row: Record<string, unknown>): Applet {
  return {
    id: row.id as string,
    type: row.type as Applet["type"],
    title: row.title as string,
    question: row.question as string,
    hint: row.hint as string | undefined,
    explanation: row.explanation as string | undefined,
    content: row.content,
    difficulty: row.difficulty as number,
    tags: row.tags as string[],
    isActive: row.is_active as boolean,
    createdAt: row.created_at as Date,
    updatedAt: row.updated_at as Date,
  };
}

// ─── Courses ───────────────────────────────────────────────────

export async function listCourses(): Promise<Course[]> {
  const rows = await sql`
    SELECT * FROM courses
    WHERE is_published = true
    ORDER BY sort_order ASC
  `;
  return rows.map((r) => rowToCourse(r as Record<string, unknown>));
}

export async function getCourseById(id: string): Promise<CourseWithUnits | null> {
  // Fetch course
  const courseRows = await sql`
    SELECT * FROM courses WHERE id = ${id}
  `;
  if (courseRows.length === 0) return null;

  const course = rowToCourse(courseRows[0] as Record<string, unknown>);

  // Fetch units
  const unitRows = await sql`
    SELECT * FROM course_units
    WHERE course_id = ${id}
    ORDER BY sort_order ASC
  `;
  const units = unitRows.map((r) => rowToUnit(r as Record<string, unknown>));

  // Fetch all lessons for all units
  const unitIds = units.map((u) => u.id);
  let lessonRows: Record<string, unknown>[] = [];
  if (unitIds.length > 0) {
    lessonRows = (await sql`
      SELECT * FROM course_lessons
      WHERE unit_id = ANY(${unitIds})
      ORDER BY sort_order ASC
    `) as Record<string, unknown>[];
  }

  // Group lessons by unit
  const lessonsByUnit = new Map<string, CourseLesson[]>();
  for (const row of lessonRows) {
    const lesson = rowToLesson(row);
    const existing = lessonsByUnit.get(lesson.unitId) ?? [];
    existing.push(lesson);
    lessonsByUnit.set(lesson.unitId, existing);
  }

  const unitsWithLessons: UnitWithLessons[] = units.map((u) => ({
    ...u,
    lessons: lessonsByUnit.get(u.id) ?? [],
  }));

  return { ...course, units: unitsWithLessons };
}

// ─── Lessons ───────────────────────────────────────────────────

export async function getLessonWithApplets(lessonId: string): Promise<LessonWithApplets | null> {
  const lessonRows = await sql`
    SELECT * FROM course_lessons WHERE id = ${lessonId}
  `;
  if (lessonRows.length === 0) return null;

  const lesson = rowToLesson(lessonRows[0] as Record<string, unknown>);

  // Fetch applets for this lesson in sort order
  const appletRows = await sql`
    SELECT a.* FROM applets a
    JOIN lesson_applets la ON la.applet_id = a.id
    WHERE la.lesson_id = ${lessonId} AND a.is_active = true
    ORDER BY la.sort_order ASC
  `;

  const applets = appletRows.map((r) => rowToApplet(r as Record<string, unknown>));

  return { ...lesson, applets };
}

// ─── Progress ──────────────────────────────────────────────────

export async function getUserCourseProgress(
  userId: string,
  courseId: string
): Promise<UserCourseProgress | null> {
  const rows = await sql`
    SELECT * FROM user_course_progress
    WHERE user_id = ${userId} AND course_id = ${courseId}
  `;
  if (rows.length === 0) return null;
  const r = rows[0] as Record<string, unknown>;
  return {
    id: r.id as string,
    userId: r.user_id as string,
    courseId: r.course_id as string,
    currentLessonId: r.current_lesson_id as string | null,
    startedAt: r.started_at as Date,
    completedAt: r.completed_at as Date | null,
  };
}

export async function startCourse(userId: string, courseId: string): Promise<UserCourseProgress> {
  const rows = await sql`
    INSERT INTO user_course_progress (user_id, course_id)
    VALUES (${userId}, ${courseId})
    ON CONFLICT (user_id, course_id) DO NOTHING
    RETURNING *
  `;

  // If already enrolled, fetch existing
  if (rows.length === 0) {
    const existing = await getUserCourseProgress(userId, courseId);
    return existing!;
  }

  const r = rows[0] as Record<string, unknown>;
  return {
    id: r.id as string,
    userId: r.user_id as string,
    courseId: r.course_id as string,
    currentLessonId: r.current_lesson_id as string | null,
    startedAt: r.started_at as Date,
    completedAt: r.completed_at as Date | null,
  };
}

export async function completeLesson(
  userId: string,
  lessonId: string,
  score: number
): Promise<UserLessonProgress> {
  const rows = await sql`
    INSERT INTO user_lesson_progress (user_id, lesson_id, score)
    VALUES (${userId}, ${lessonId}, ${score})
    ON CONFLICT (user_id, lesson_id) DO UPDATE SET
      score = GREATEST(user_lesson_progress.score, ${score}),
      completed_at = NOW()
    RETURNING *
  `;

  const r = rows[0] as Record<string, unknown>;
  return {
    id: r.id as string,
    userId: r.user_id as string,
    lessonId: r.lesson_id as string,
    completedAt: r.completed_at as Date,
    score: r.score as number,
  };
}

export async function getCompletedLessonIds(
  userId: string,
  courseId: string
): Promise<string[]> {
  const rows = await sql`
    SELECT ulp.lesson_id FROM user_lesson_progress ulp
    JOIN course_lessons cl ON cl.id = ulp.lesson_id
    JOIN course_units cu ON cu.id = cl.unit_id
    WHERE ulp.user_id = ${userId} AND cu.course_id = ${courseId}
  `;
  return rows.map((r) => (r as Record<string, unknown>).lesson_id as string);
}
