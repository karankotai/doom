/**
 * AI routes for generating educational content
 */

import { Hono } from "hono";
import { generateExercises } from "./service";

export const aiRoutes = new Hono();

// POST /ai/generate - Generate exercises for a topic
aiRoutes.post("/generate", async (c) => {
  try {
    const body = await c.req.json();
    const { topic, difficulty } = body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return c.json({ error: "Topic is required" }, 400);
    }

    if (topic.length > 200) {
      return c.json({ error: "Topic is too long (max 200 characters)" }, 400);
    }

    const exercises = await generateExercises(
      topic.trim(),
      typeof difficulty === "number" ? difficulty : 1
    );

    return c.json({ exercises });
  } catch (error) {
    console.error("Generation error:", error);
    return c.json(
      { error: error instanceof Error ? error.message : "Failed to generate exercises" },
      500
    );
  }
});
