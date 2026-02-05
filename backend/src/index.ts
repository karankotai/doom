/**
 * Application entry point.
 *
 * Responsibilities:
 * - Initialize Hono application
 * - Configure CORS middleware
 * - Mount domain routers
 * - Start HTTP server
 *
 * This file should remain thin. All logic belongs in domains.
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoutes } from "./domains/auth/routes";
import { usersRoutes } from "./domains/users/routes";
import { journeysRoutes } from "./domains/journeys/routes";
import { appletsRoutes } from "./domains/applets/routes";
import { env } from "./lib/env";
import { requireAuth } from "./middleware/auth";

const app = new Hono();

// CORS middleware - must be before routes
app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 86400, // 24 hours
  })
);

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Mount auth routes (no auth required for login/register/refresh/logout)
app.route("/auth", authRoutes);

// Protected routes - apply requireAuth middleware
const protectedApp = new Hono();
protectedApp.use("*", requireAuth);

// Mount protected domain routes
protectedApp.route("/users", usersRoutes);
protectedApp.route("/journeys", journeysRoutes);
protectedApp.route("/applets", appletsRoutes);

// Mount protected app
app.route("/", protectedApp);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
