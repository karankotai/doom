/**
 * Journeys domain routes.
 *
 * Responsibilities:
 * - Define HTTP endpoints for learning journeys
 * - Request validation and response formatting
 * - Delegate all logic to service layer
 *
 * Routes should be thin; no business logic here.
 */

import { Hono } from "hono";

export const journeysRoutes = new Hono();

// POST /journeys - Create new journey
journeysRoutes.post("/", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// GET /journeys - List all journeys
journeysRoutes.get("/", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// GET /journeys/:id - Get journey by ID
journeysRoutes.get("/:id", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// PATCH /journeys/:id - Update journey
journeysRoutes.patch("/:id", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// DELETE /journeys/:id - Delete journey
journeysRoutes.delete("/:id", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});
