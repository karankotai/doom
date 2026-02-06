/**
 * Applets evaluator.
 *
 * Responsibilities:
 * - Evaluate user submissions for each applet type
 * - Return structured feedback and scores
 *
 * Note: Current applet types (code-blocks, slope-graph, chess) are
 * evaluated client-side. This file is a placeholder for future
 * server-side evaluation if needed.
 */

import type { TypedApplet, AppletSubmission } from "./model";

export interface EvaluationResult {
  submissionId: string;
  correct: boolean;
  feedback: string;
  score?: number;
}

export async function evaluateSubmission(
  applet: TypedApplet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // Route to type-specific evaluator
  switch (applet.type) {
    case "code-blocks":
      return evaluateCodeBlocks(applet, submission);
    case "slope-graph":
      return evaluateSlopeGraph(applet, submission);
    case "chess":
      return evaluateChess(applet, submission);
    case "mcq":
      return evaluateMcq(applet, submission);
    case "fill-blanks":
      return evaluateFillBlanks(applet, submission);
    case "venn-diagram":
      return evaluateVennDiagram(applet, submission);
    default:
      throw new Error(`Unknown applet type: ${(applet as TypedApplet).type}`);
  }
}

async function evaluateCodeBlocks(
  _applet: TypedApplet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // Code blocks are evaluated client-side
  // This is a placeholder for potential server-side validation
  return {
    submissionId: submission.id,
    correct: submission.correct,
    feedback: submission.correct ? "Correct!" : "Try again",
  };
}

async function evaluateSlopeGraph(
  _applet: TypedApplet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // Slope graph is evaluated client-side
  return {
    submissionId: submission.id,
    correct: submission.correct,
    feedback: submission.correct ? "Correct!" : "Try again",
  };
}

async function evaluateChess(
  _applet: TypedApplet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // Chess puzzles are evaluated client-side
  return {
    submissionId: submission.id,
    correct: submission.correct,
    feedback: submission.correct ? "Correct!" : "Try again",
  };
}

async function evaluateMcq(
  _applet: TypedApplet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // MCQ is evaluated client-side
  return {
    submissionId: submission.id,
    correct: submission.correct,
    feedback: submission.correct ? "Correct!" : "Try again",
  };
}

async function evaluateFillBlanks(
  _applet: TypedApplet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // Fill-blanks is evaluated client-side
  return {
    submissionId: submission.id,
    correct: submission.correct,
    feedback: submission.correct ? "Correct!" : "Try again",
  };
}

async function evaluateVennDiagram(
  _applet: TypedApplet,
  submission: AppletSubmission
): Promise<EvaluationResult> {
  // Venn diagram is evaluated client-side
  return {
    submissionId: submission.id,
    correct: submission.correct,
    feedback: submission.correct ? "Correct!" : "Try again",
  };
}
