/**
 * AI prompt templates.
 *
 * Responsibilities:
 * - Store and manage prompt templates for AI interactions
 * - Provide type-safe prompt builders
 * - Keep prompts versioned and testable
 *
 * All prompts used in the application should be defined here.
 */

export const PROMPTS = {
  /**
   * Evaluate a freeform text response from a learner.
   * Variables: {question}, {expectedConcepts}, {userAnswer}
   */
  EVALUATE_FREEFORM: `
You are an educational assistant evaluating a learner's response.

Question: {question}

Expected concepts to cover: {expectedConcepts}

Learner's answer: {userAnswer}

Evaluate the response and provide:
1. Whether the answer is correct (true/false)
2. A brief, encouraging feedback message
3. A score from 0-100

Respond in JSON format:
{"correct": boolean, "feedback": string, "score": number}
`.trim(),

  /**
   * Generate a hint for a stuck learner.
   * Variables: {question}, {previousAttempts}
   */
  GENERATE_HINT: `
You are a helpful tutor. A learner is stuck on this question:

{question}

Their previous attempts: {previousAttempts}

Provide a gentle hint that guides them toward the answer without giving it away.
`.trim(),

  /**
   * Explain a concept in simple terms.
   * Variables: {concept}, {learnerLevel}
   */
  EXPLAIN_CONCEPT: `
Explain the following concept to a {learnerLevel} learner:

{concept}

Use simple language, analogies, and examples where helpful.
`.trim(),
} as const;

/**
 * Replace template variables in a prompt string.
 */
export function buildPrompt(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  return result;
}
