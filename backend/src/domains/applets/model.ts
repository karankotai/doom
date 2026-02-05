/**
 * Applets domain models.
 *
 * Responsibilities:
 * - Define interactive applet types
 * - Applet configuration and state structures
 * - Submission and evaluation result types
 *
 * Applets are interactive learning components (quizzes, code editors, etc.)
 */

export type AppletType = "quiz" | "code" | "flashcard" | "freeform";

export interface Applet {
  id: string;
  lessonId: string;
  type: AppletType;
  config: AppletConfig;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppletConfig {
  // Type-specific configuration
  // Quiz: questions, options, correct answers
  // Code: starter code, test cases, language
  // Flashcard: front, back
  [key: string]: unknown;
}

export interface AppletSubmission {
  id: string;
  appletId: string;
  userId: string;
  answer: unknown;
  submittedAt: Date;
}

export interface EvaluationResult {
  submissionId: string;
  correct: boolean;
  feedback: string;
  score?: number;
}

// Add more applet-related types as needed
