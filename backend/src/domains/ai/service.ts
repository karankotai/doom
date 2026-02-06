/**
 * AI Service for generating applet content using Gemini API
 */

import { env } from "@/lib/env";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface GeneratedApplet {
  type: "mcq" | "fill-blanks" | "venn-diagram" | "highlight-text";
  title: string;
  question: string;
  hint: string;
  content: Record<string, unknown>;
  difficulty: number;
  tags: string[];
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

const SYSTEM_PROMPT = `You are an educational content generator. Generate interactive learning exercises based on the given topic.

You must respond with a valid JSON array of 5 exercise objects. Each exercise should use one of these applet types:

1. "mcq" - Multiple choice question with 4 options
   Content format: { "options": [{"id": "a", "text": "..."}, {"id": "b", "text": "..."}, {"id": "c", "text": "..."}, {"id": "d", "text": "..."}], "correctOptionId": "a" }

2. "fill-blanks" - Fill in the blanks with drag-and-drop
   Content format: { "segments": [{"type": "text", "content": "Some text "}, {"type": "slot", "slotId": "s1", "correctAnswerId": "ans1"}, {"type": "text", "content": " more text."}], "answerBlocks": [{"id": "ans1", "content": "correct"}, {"id": "dist1", "content": "wrong"}] }

3. "venn-diagram" - Color regions of a 2-circle Venn diagram for set operations
   Content format: { "labels": ["Set A", "Set B"], "correctRegions": ["a-only" | "b-only" | "a-and-b" | "neither"] }
   Use this for comparing/contrasting concepts, showing relationships, or set theory.

4. "highlight-text" - Identify and categorize words/phrases in a sentence
   Content format: { "text": "The full sentence to analyze.", "categories": ["noun", "verb", "adjective"], "correctHighlights": [{"text": "word", "startIndex": 0, "endIndex": 4, "category": "noun"}] }
   Use this for grammar (parts of speech), identifying key terms, or text analysis. The startIndex and endIndex must match the exact character positions in the text.

Return ONLY a JSON array, no markdown, no explanation. Example format:
[
  {
    "type": "mcq",
    "title": "Short Title",
    "question": "What is...?",
    "hint": "Think about...",
    "content": { "options": [...], "correctOptionId": "b" },
    "difficulty": 1,
    "tags": ["topic", "subtopic"]
  }
]

Mix the applet types for variety. Make questions educational, clear, and appropriate for the difficulty level (1=easy, 2=medium, 3=hard).`;

export async function generateExercises(topic: string, difficulty: number = 1): Promise<GeneratedApplet[]> {
  if (!env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const userPrompt = `Generate 5 educational exercises about: "${topic}"
Difficulty level: ${difficulty} (1=easy, 2=medium, 3=hard)
Mix different applet types (mcq, fill-blanks, venn-diagram) for variety.
Make the content accurate and educational.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: SYSTEM_PROMPT },
            { text: userPrompt },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Gemini API error:", error);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data: GeminiResponse = await response.json();

  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textContent) {
    throw new Error("No content in Gemini response");
  }

  // Clean up the response - remove markdown code blocks if present
  let jsonString = textContent.trim();
  if (jsonString.startsWith("```json")) {
    jsonString = jsonString.slice(7);
  } else if (jsonString.startsWith("```")) {
    jsonString = jsonString.slice(3);
  }
  if (jsonString.endsWith("```")) {
    jsonString = jsonString.slice(0, -3);
  }
  jsonString = jsonString.trim();

  try {
    const exercises: GeneratedApplet[] = JSON.parse(jsonString);

    // Validate and clean up exercises
    return exercises.map((exercise, index) => ({
      type: validateAppletType(exercise.type),
      title: exercise.title || `Exercise ${index + 1}`,
      question: exercise.question || "Complete this exercise",
      hint: exercise.hint || "",
      content: exercise.content || {},
      difficulty: Math.min(Math.max(exercise.difficulty || difficulty, 1), 5),
      tags: Array.isArray(exercise.tags) ? exercise.tags : [topic.toLowerCase()],
    }));
  } catch (parseError) {
    console.error("Failed to parse Gemini response:", jsonString);
    throw new Error("Failed to parse AI response");
  }
}

function validateAppletType(type: string): "mcq" | "fill-blanks" | "venn-diagram" | "highlight-text" {
  const validTypes = ["mcq", "fill-blanks", "venn-diagram", "highlight-text"];
  if (validTypes.includes(type)) {
    return type as "mcq" | "fill-blanks" | "venn-diagram" | "highlight-text";
  }
  return "mcq"; // Default to MCQ if invalid type
}
