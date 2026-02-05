/**
 * Database client using postgres package.
 *
 * Responsibilities:
 * - Create and export database connection
 * - Handle connection pooling
 * - Provide typed query interface
 */

import postgres from "postgres";
import { env } from "../lib/env";

export const sql = postgres(env.DATABASE_URL, {
  max: 10, // Maximum pool connections
  idle_timeout: 20, // Idle connection timeout in seconds
  connect_timeout: 10, // Connection timeout in seconds
});

// Helper to check database connectivity
export async function checkConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

// Graceful shutdown
export async function closeConnection(): Promise<void> {
  await sql.end();
}
