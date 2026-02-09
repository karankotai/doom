/**
 * Journeys (Courses) domain routes.
 *
 * Provides endpoints for browsing courses, fetching lessons, and tracking progress.
 */

import { Hono } from "hono";
import * as journeyService from "./service";

export const journeysRoutes = new Hono();

// GET /journeys - List all published courses
journeysRoutes.get("/", async (c) => {
  const courses = await journeyService.listCourses();
  return c.json({ courses });
});

// ── Lesson routes (must be before /:id to avoid "lessons" matching as an id) ──

// GET /journeys/lessons/:lessonId - Get lesson with applets
journeysRoutes.get("/lessons/:lessonId", async (c) => {
  const lessonId = c.req.param("lessonId");
  const lesson = await journeyService.getLessonWithApplets(lessonId);

  if (!lesson) {
    return c.json({ error: "Lesson not found" }, 404);
  }

  return c.json({ lesson });
});

// POST /journeys/lessons/:lessonId/complete - Mark lesson as completed
journeysRoutes.post("/lessons/:lessonId/complete", async (c) => {
  const lessonId = c.req.param("lessonId");
  const userId = c.get("user")!.userId;
  const body = await c.req.json();
  const score = body.score ?? 0;

  const progress = await journeyService.completeLesson(userId, lessonId, score);
  return c.json({ progress });
});

// ── Course routes ──

// GET /journeys/:id - Get course with full unit/lesson structure
journeysRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const course = await journeyService.getCourseById(id);

  if (!course) {
    return c.json({ error: "Course not found" }, 404);
  }

  return c.json({ course });
});

// GET /journeys/:id/progress - Get user's progress for a course
journeysRoutes.get("/:id/progress", async (c) => {
  const courseId = c.req.param("id");
  const userId = c.get("user")!.userId;

  const [courseProgress, completedLessonIds] = await Promise.all([
    journeyService.getUserCourseProgress(userId, courseId),
    journeyService.getCompletedLessonIds(userId, courseId),
  ]);

  return c.json({ courseProgress, completedLessonIds });
});

// POST /journeys/:id/start - Enroll in / start a course
journeysRoutes.post("/:id/start", async (c) => {
  const courseId = c.req.param("id");
  const userId = c.get("user")!.userId;

  const progress = await journeyService.startCourse(userId, courseId);
  return c.json({ progress });
});
