/**
 * Course types — mirrors backend models
 */

import type { Applet } from "./applet";

export interface Course {
  id: string;
  title: string;
  description: string | null;
  emoji: string;
  color: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseUnit {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  sortOrder: number;
  isCheckpoint: boolean;
  createdAt: string;
}

export interface CourseLesson {
  id: string;
  unitId: string;
  title: string;
  description: string | null;
  emoji: string;
  sortOrder: number;
  xpReward: number;
  isCheckpointReview: boolean;
  createdAt: string;
}

export interface CourseWithUnits extends Course {
  units: UnitWithLessons[];
}

export interface UnitWithLessons extends CourseUnit {
  lessons: CourseLesson[];
}

export interface LessonWithApplets extends CourseLesson {
  applets: Applet[];
}

export interface UserCourseProgress {
  id: string;
  userId: string;
  courseId: string;
  currentLessonId: string | null;
  startedAt: string;
  completedAt: string | null;
}

export interface UserLessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: string;
  score: number;
}
