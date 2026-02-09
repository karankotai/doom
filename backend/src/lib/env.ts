/**
 * Environment configuration.
 *
 * Responsibilities:
 * - Load and validate environment variables
 * - Provide typed access to configuration
 * - Fail fast on missing required variables
 *
 * Usage: import { env } from "@/lib/env"
 */

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getEnvOrDefault(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

export const env = {
  NODE_ENV: getEnvOrDefault("NODE_ENV", "development"),
  PORT: parseInt(getEnvOrDefault("PORT", "3001"), 10),
  DATABASE_URL: getEnvOrThrow("DATABASE_URL"),

  // Auth configuration
  JWT_SECRET: getEnvOrThrow("JWT_SECRET"),
  REFRESH_TOKEN_EXPIRY_DAYS: parseInt(
    getEnvOrDefault("REFRESH_TOKEN_EXPIRY_DAYS", "7"),
    10
  ),
  ACCESS_TOKEN_EXPIRY_MINUTES: parseInt(
    getEnvOrDefault("ACCESS_TOKEN_EXPIRY_MINUTES", "15"),
    10
  ),

  // CORS
  FRONTEND_URL: getEnvOrDefault("FRONTEND_URL", "http://localhost:3000"),

  // Google OAuth (optional — Google sign-in disabled if not set)
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",

  // AI provider keys
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",
} as const;
