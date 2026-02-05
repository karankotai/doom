/**
 * Applets evaluator.
 *
 * Responsibilities:
 * - Evaluate user submissions for each applet type
 * - Return structured feedback and scores
 * - Handle AI-assisted evaluation for freeform responses
 *
 * Each applet type may have different evaluation logic.
 */

import type { Applet, AppletSubmission, EvaluationResult } from "./model";

export async function evaluateSubmission(
  applet: Applet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // TODO: Route to type-specific evaluator
  switch (applet.type) {
    case "quiz":
      return evaluateQuiz(applet, submission);
    case "code":
      return evaluateCode(applet, submission);
    case "flashcard":
      return evaluateFlashcard(applet, submission);
    case "freeform":
      return evaluateFreeform(applet, submission);
    default:
      throw new Error(`Unknown applet type: ${applet.type}`);
  }
}

async function evaluateQuiz(_applet: Applet, _submission: AppletSubmission): Promise<EvaluationResult> {
  // TODO: Implement quiz evaluation
  throw new Error("Not implemented");
}

async function evaluateCode(_applet: Applet, _submission: AppletSubmission): Promise<EvaluationResult> {
  // TODO: Implement code evaluation (run tests, check output)
  throw new Error("Not implemented");
}

async function evaluateFlashcard(_applet: Applet, _submission: AppletSubmission): Promise<EvaluationResult> {
  // TODO: Implement flashcard evaluation
  throw new Error("Not implemented");
}

async function evaluateFreeform(_applet: Applet, _submission: AppletSubmission): Promise<EvaluationResult> {
  // TODO: Implement freeform evaluation (may use AI)
  throw new Error("Not implemented");
}
