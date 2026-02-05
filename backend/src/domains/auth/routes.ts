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
import { setCookie, getCookie, deleteCookie } from "hono/cookie";
import { env } from "../../lib/env";
import { AppError } from "../../lib/errors";
import * as authService from "./service";
import type { LoginInput, RegisterInput } from "./model";

export const authRoutes = new Hono();

const REFRESH_TOKEN_COOKIE = "refresh_token";

// Cookie options
function getRefreshTokenCookieOptions() {
  const isProduction = env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "Lax" as const,
    path: "/",
    maxAge: env.REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60, // Days to seconds
  };
}

// POST /auth/register - Create new user account
authRoutes.post("/register", async (c) => {
  try {
    const body = await c.req.json<RegisterInput>();

    const result = await authService.register(body);
    const { _refreshToken, ...response } = result as typeof result & {
      _refreshToken: string;
    };

    // Set refresh token as httpOnly cookie
    setCookie(c, REFRESH_TOKEN_COOKIE, _refreshToken, getRefreshTokenCookieOptions());

    return c.json(response, 201);
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({ error: error.message }, error.statusCode as 400 | 401 | 403 | 404 | 500);
    }
    console.error("Register error:", error);
    return c.json({ error: "Registration failed" }, 500);
  }
});

// POST /auth/login - Authenticate user
authRoutes.post("/login", async (c) => {
  try {
    const body = await c.req.json<LoginInput>();

    const result = await authService.login(body);
    const { _refreshToken, ...response } = result;

    // Set refresh token as httpOnly cookie
    setCookie(c, REFRESH_TOKEN_COOKIE, _refreshToken, getRefreshTokenCookieOptions());

    return c.json(response);
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({ error: error.message }, error.statusCode as 400 | 401 | 403 | 404 | 500);
    }
    console.error("Login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// POST /auth/refresh - Refresh access token
authRoutes.post("/refresh", async (c) => {
  try {
    const refreshToken = getCookie(c, REFRESH_TOKEN_COOKIE);

    if (!refreshToken) {
      return c.json({ error: "No refresh token provided" }, 401);
    }

    const result = await authService.refresh(refreshToken);
    const { _refreshToken: newRefreshToken, ...response } = result;

    // Set new refresh token (token rotation)
    setCookie(c, REFRESH_TOKEN_COOKIE, newRefreshToken, getRefreshTokenCookieOptions());

    return c.json(response);
  } catch (error) {
    if (error instanceof AppError) {
      // Clear cookie on auth errors
      deleteCookie(c, REFRESH_TOKEN_COOKIE);
      return c.json({ error: error.message }, error.statusCode as 400 | 401 | 403 | 404 | 500);
    }
    console.error("Refresh error:", error);
    return c.json({ error: "Token refresh failed" }, 500);
  }
});

// POST /auth/logout - End session
authRoutes.post("/logout", async (c) => {
  try {
    const refreshToken = getCookie(c, REFRESH_TOKEN_COOKIE);

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    // Always clear the cookie
    deleteCookie(c, REFRESH_TOKEN_COOKIE);

    return c.json({ message: "Logged out successfully" });
  } catch (error) {
    // Still clear cookie even if logout fails
    deleteCookie(c, REFRESH_TOKEN_COOKIE);

    console.error("Logout error:", error);
    return c.json({ message: "Logged out" });
  }
});

// GET /auth/me - Get current user from session
authRoutes.get("/me", async (c) => {
  try {
    // Get user from context (set by auth middleware)
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Not authenticated" }, 401);
    }

    const currentUser = await authService.getCurrentUser(user.userId);

    if (!currentUser) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user: currentUser });
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({ error: error.message }, error.statusCode as 400 | 401 | 403 | 404 | 500);
    }
    console.error("Get me error:", error);
    return c.json({ error: "Failed to get user" }, 500);
  }
});
