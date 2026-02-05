/**
 * Auth domain models.
 *
 * Responsibilities:
 * - Define authentication-related types
 * - Session and token structures
 * - No database queries here; use service layer
 */

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

// Add more auth-related types as needed
