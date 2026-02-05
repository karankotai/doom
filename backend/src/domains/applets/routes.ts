/**
 * Applets domain routes.
 *
 * Responsibilities:
 * - Define HTTP endpoints for interactive applets
 * - Handle submission and evaluation requests
 * - Delegate all logic to service/evaluator
 *
 * Routes should be thin; no business logic here.
 */

import { Hono } from "hono";

export const appletsRoutes = new Hono();

// GET /applets/:id - Get applet by ID
appletsRoutes.get("/:id", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// POST /applets/:id/submit - Submit answer for evaluation
appletsRoutes.post("/:id/submit", async (c) => {
  // TODO: Parse submission, run evaluator, return result
  return c.json({ message: "Not implemented" }, 501);
});

// GET /applets/:id/submissions - Get user's submissions for applet
appletsRoutes.get("/:id/submissions", async (c) => {
  // TODO: Return user's submission history for this applet
  return c.json({ message: "Not implemented" }, 501);
});
