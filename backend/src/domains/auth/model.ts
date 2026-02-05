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
  refreshTokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  lastUsedAt: Date;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
  expiresAt: number; // Unix timestamp when access token expires
}

export interface RefreshResponse {
  accessToken: string;
  expiresAt: number; // Unix timestamp when access token expires
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
}
