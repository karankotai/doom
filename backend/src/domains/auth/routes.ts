/**
 * Auth domain routes.
 *
 * Responsibilities:
 * - Define HTTP endpoints for authentication
 * - Request validation and response formatting
 * - Delegate all logic to service layer
 *
 * Routes should be thin; no business logic here.
 */

import { Hono } from "hono";

export const authRoutes = new Hono();

// POST /auth/login - Authenticate user
authRoutes.post("/login", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// POST /auth/logout - End session
authRoutes.post("/logout", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// POST /auth/refresh - Refresh access token
authRoutes.post("/refresh", async (c) => {
  // TODO: Parse request, call service, return response
  return c.json({ message: "Not implemented" }, 501);
});

// GET /auth/me - Get current user from session
authRoutes.get("/me", async (c) => {
  // TODO: Verify session, return user info
  return c.json({ message: "Not implemented" }, 501);
});
