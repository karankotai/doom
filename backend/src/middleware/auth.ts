/**
 * Authentication middleware.
 *
 * Responsibilities:
 * - Validate Bearer tokens from Authorization header
 * - Set user context for downstream handlers
 * - Provide both required and optional auth modes
 */

import type { Context, Next } from "hono";
import { verifyAccessToken } from "../domains/auth/service";
import type { TokenPayload } from "../domains/auth/model";

// Extend Hono context to include user
declare module "hono" {
  interface ContextVariableMap {
    user: TokenPayload | null;
  }
}

/**
 * Extract Bearer token from Authorization header
 */
function extractBearerToken(c: Context): string | null {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice(7);
}

/**
 * Middleware that requires authentication.
 * Returns 401 if no valid token is provided.
 */
export async function requireAuth(c: Context, next: Next) {
  const token = extractBearerToken(c);

  if (!token) {
    return c.json({ error: "Authentication required" }, 401);
  }

  const payload = await verifyAccessToken(token);

  if (!payload) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("user", payload);
  await next();
}

/**
 * Middleware that optionally sets user if valid token present.
 * Does not block requests without authentication.
 */
export async function optionalAuth(c: Context, next: Next) {
  const token = extractBearerToken(c);

  if (token) {
    const payload = await verifyAccessToken(token);
    c.set("user", payload);
  } else {
    c.set("user", null);
  }

  await next();
}
