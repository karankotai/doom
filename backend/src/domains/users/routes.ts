/**
 * Users domain routes.
 *
 * Responsibilities:
 * - Define HTTP endpoints for user management
 * - Request validation and response formatting
 * - Delegate all logic to service layer
 *
 * Routes should be thin; no business logic here.
 */

import { Hono } from "hono";

export const usersRoutes = new Hono();

// POST /users - Create new user
usersRoutes.post("/", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// GET /users/:id - Get user by ID
usersRoutes.get("/:id", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// PATCH /users/:id - Update user
usersRoutes.patch("/:id", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// DELETE /users/:id - Delete user
usersRoutes.delete("/:id", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});
