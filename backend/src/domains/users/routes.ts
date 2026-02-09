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
import { AppError } from "../../lib/errors";
import * as userService from "./service";

export const usersRoutes = new Hono();

// GET /users/me/profile - Get current user's profile + achievements
usersRoutes.get("/me/profile", async (c) => {
  try {
    const user = c.get("user");
    const profile = await userService.getProfile(user!.userId);
    const achievements = await userService.getAchievements(user!.userId);
    return c.json({ profile, achievements });
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({ error: error.message }, error.statusCode as 400 | 401 | 403 | 404 | 500);
    }
    console.error("Get profile error:", error);
    return c.json({ error: "Failed to get profile" }, 500);
  }
});

// POST /users/me/xp - Award XP to current user
usersRoutes.post("/me/xp", async (c) => {
  try {
    const user = c.get("user");
    const { amount } = await c.req.json<{ amount: number }>();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return c.json({ error: "amount must be a positive number" }, 400);
    }

    const result = await userService.addXp(user!.userId, amount);
    return c.json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({ error: error.message }, error.statusCode as 400 | 401 | 403 | 404 | 500);
    }
    console.error("Award XP error:", error);
    return c.json({ error: "Failed to award XP" }, 500);
  }
});

// POST /users - Create new user
usersRoutes.post("/", async (c) => {
  return c.json({ message: "Not implemented" }, 501);
});

// GET /users/:id - Get user by ID
usersRoutes.get("/:id", async (c) => {
  return c.json({ message: "Not implemented" }, 501);
});

// PATCH /users/:id - Update user
usersRoutes.patch("/:id", async (c) => {
  return c.json({ message: "Not implemented" }, 501);
});

// DELETE /users/:id - Delete user
usersRoutes.delete("/:id", async (c) => {
  return c.json({ message: "Not implemented" }, 501);
});
