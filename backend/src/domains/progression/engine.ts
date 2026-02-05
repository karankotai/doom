/**
 * Progression engine.
 *
 * Responsibilities:
 * - Track user progress through journeys, modules, and lessons
 * - Calculate completion percentages
 * - Determine next recommended content
 * - Handle unlock logic for sequential content
 *
 * This engine is the single source of truth for user progress state.
 */

export interface UserProgress {
  userId: string;
  journeyId: string;
  completedLessons: string[];
  currentLessonId: string | null;
  startedAt: Date;
  lastActivityAt: Date;
}

export interface ProgressUpdate {
  userId: string;
  lessonId: string;
  completed: boolean;
}

export async function getUserProgress(_userId: string, _journeyId: string): Promise<UserProgress | null> {
  // TODO: Retrieve user's progress for a journey
  throw new Error("Not implemented");
}

export async function updateProgress(_update: ProgressUpdate): Promise<UserProgress> {
  // TODO: Update user's progress after completing a lesson/applet
  throw new Error("Not implemented");
}

export async function getNextLesson(_userId: string, _journeyId: string): Promise<string | null> {
  // TODO: Determine the next lesson for the user
  throw new Error("Not implemented");
}

export async function calculateCompletionPercentage(_userId: string, _journeyId: string): Promise<number> {
  // TODO: Calculate how much of the journey is complete
  throw new Error("Not implemented");
}

export async function isLessonUnlocked(_userId: string, _lessonId: string): Promise<boolean> {
  // TODO: Check if user has unlocked this lesson based on prerequisites
  throw new Error("Not implemented");
}
