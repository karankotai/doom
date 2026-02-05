/**
 * Application entry point.
 *
 * Responsibilities:
 * - Initialize Hono application
 * - Mount domain routers
 * - Start HTTP server
 *
 * This file should remain thin. All logic belongs in domains.
 */

import { Hono } from "hono";
import { authRoutes } from "./domains/auth/routes";
import { usersRoutes } from "./domains/users/routes";
import { journeysRoutes } from "./domains/journeys/routes";
import { appletsRoutes } from "./domains/applets/routes";
import { env } from "./lib/env";

const app = new Hono();

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Mount domain routes
app.route("/auth", authRoutes);
app.route("/users", usersRoutes);
app.route("/journeys", journeysRoutes);
app.route("/applets", appletsRoutes);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
