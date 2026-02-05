/**
 * Auth domain service.
 *
 * Responsibilities:
 * - Authentication logic (login, logout, token verification)
 * - Session management
 * - Password hashing and verification
 * - Should not import from other domains except via their services
 */

import type { Session, TokenPayload } from "./model";

export async function createSession(_userId: string): Promise<Session> {
  // TODO: Implement session creation
  throw new Error("Not implemented");
}

export async function validateSession(_sessionId: string): Promise<Session | null> {
  // TODO: Implement session validation
  throw new Error("Not implemented");
}

export async function invalidateSession(_sessionId: string): Promise<void> {
  // TODO: Implement session invalidation
  throw new Error("Not implemented");
}

export async function verifyToken(_token: string): Promise<TokenPayload | null> {
  // TODO: Implement token verification
  throw new Error("Not implemented");
}
