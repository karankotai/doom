/**
 * Auth domain service.
 *
 * Responsibilities:
 * - Authentication logic (login, logout, token verification)
 * - Session management
 * - Password hashing and verification
 * - Should not import from other domains except via their services
 */

import { SignJWT, jwtVerify } from "jose";
import { sql } from "../../db/client";
import { env } from "../../lib/env";
import {
  UnauthorizedError,
  ValidationError,
  NotFoundError,
} from "../../lib/errors";
import type {
  Session,
  TokenPayload,
  LoginInput,
  RegisterInput,
  AuthResponse,
  RefreshResponse,
  AuthenticatedUser,
} from "./model";

// Secret key for JWT signing
const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

// ============== Password Hashing ==============

export async function hashPassword(password: string): Promise<string> {
  return await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 65536,
    timeCost: 2,
  });
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await Bun.password.verify(password, hash);
}

// ============== JWT Token Management ==============

export async function generateAccessToken(user: {
  id: string;
  email: string;
}): Promise<{ token: string; expiresAt: number }> {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + env.ACCESS_TOKEN_EXPIRY_MINUTES * 60;

  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(expiresAt)
    .sign(jwtSecret);

  return { token, expiresAt };
}

export async function verifyAccessToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      iat: payload.iat as number,
      exp: payload.exp as number,
    };
  } catch {
    return null;
  }
}

// ============== Refresh Token Management ==============

function generateRefreshToken(): string {
  return crypto.randomUUID();
}

async function hashRefreshToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ============== Session Management ==============

export async function createSession(
  userId: string
): Promise<{ session: Session; refreshToken: string }> {
  const refreshToken = generateRefreshToken();
  const refreshTokenHash = await hashRefreshToken(refreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + env.REFRESH_TOKEN_EXPIRY_DAYS);

  const [session] = await sql<Session[]>`
    INSERT INTO sessions (user_id, refresh_token_hash, expires_at)
    VALUES (${userId}, ${refreshTokenHash}, ${expiresAt})
    RETURNING
      id,
      user_id as "userId",
      refresh_token_hash as "refreshTokenHash",
      expires_at as "expiresAt",
      created_at as "createdAt",
      last_used_at as "lastUsedAt"
  `;

  return { session: session!, refreshToken };
}

export async function validateSession(
  refreshToken: string
): Promise<Session | null> {
  const refreshTokenHash = await hashRefreshToken(refreshToken);

  const [session] = await sql<Session[]>`
    SELECT
      id,
      user_id as "userId",
      refresh_token_hash as "refreshTokenHash",
      expires_at as "expiresAt",
      created_at as "createdAt",
      last_used_at as "lastUsedAt"
    FROM sessions
    WHERE refresh_token_hash = ${refreshTokenHash}
      AND expires_at > NOW()
  `;

  if (!session) {
    return null;
  }

  // Update last_used_at
  await sql`
    UPDATE sessions
    SET last_used_at = NOW()
    WHERE id = ${session.id}
  `;

  return session;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
}

export async function invalidateAllUserSessions(userId: string): Promise<void> {
  await sql`DELETE FROM sessions WHERE user_id = ${userId}`;
}

// ============== User Queries (internal to auth) ==============

interface UserRow {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

async function getUserByEmail(email: string): Promise<UserRow | null> {
  const [user] = await sql<UserRow[]>`
    SELECT id, email, name, password_hash, created_at, updated_at
    FROM users
    WHERE email = ${email.toLowerCase()}
  `;
  return user || null;
}

async function getUserById(id: string): Promise<UserRow | null> {
  const [user] = await sql<UserRow[]>`
    SELECT id, email, name, password_hash, created_at, updated_at
    FROM users
    WHERE id = ${id}
  `;
  return user || null;
}

async function createUserInDb(
  email: string,
  name: string,
  passwordHash: string
): Promise<UserRow> {
  const [user] = await sql<UserRow[]>`
    INSERT INTO users (email, name, password_hash)
    VALUES (${email.toLowerCase()}, ${name}, ${passwordHash})
    RETURNING id, email, name, password_hash, created_at, updated_at
  `;
  return user!;
}

async function createUserProfile(userId: string, displayName: string): Promise<void> {
  await sql`
    INSERT INTO user_profiles (user_id, display_name)
    VALUES (${userId}, ${displayName})
  `;
}

// ============== Auth Operations ==============

export async function register(input: RegisterInput): Promise<AuthResponse> {
  // Validate input
  if (!input.email || !input.email.includes("@")) {
    throw new ValidationError("Invalid email address");
  }
  if (!input.name || input.name.trim().length < 2) {
    throw new ValidationError("Name must be at least 2 characters");
  }
  if (!input.password || input.password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters");
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(input.email);
  if (existingUser) {
    throw new ValidationError("Email already registered");
  }

  // Hash password and create user
  const passwordHash = await hashPassword(input.password);
  const user = await createUserInDb(input.email, input.name.trim(), passwordHash);

  // Create user profile
  await createUserProfile(user.id, user.name);

  // Create session
  const { refreshToken } = await createSession(user.id);

  // Generate access token
  const { token: accessToken, expiresAt } = await generateAccessToken({
    id: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    accessToken,
    expiresAt,
    // Note: refreshToken is returned separately for cookie handling
    _refreshToken: refreshToken,
  } as AuthResponse & { _refreshToken: string };
}

export async function login(input: LoginInput): Promise<AuthResponse & { _refreshToken: string }> {
  // Validate input
  if (!input.email || !input.password) {
    throw new ValidationError("Email and password are required");
  }

  // Find user
  const user = await getUserByEmail(input.email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // Verify password
  const isValid = await verifyPassword(input.password, user.password_hash);
  if (!isValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // Create session
  const { refreshToken } = await createSession(user.id);

  // Generate access token
  const { token: accessToken, expiresAt } = await generateAccessToken({
    id: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    accessToken,
    expiresAt,
    _refreshToken: refreshToken,
  };
}

export async function refresh(
  refreshToken: string
): Promise<RefreshResponse & { _refreshToken: string }> {
  // Validate session
  const session = await validateSession(refreshToken);
  if (!session) {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }

  // Get user
  const user = await getUserById(session.userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Invalidate old session and create new one (token rotation)
  await invalidateSession(session.id);
  const { refreshToken: newRefreshToken } = await createSession(user.id);

  // Generate new access token
  const { token: accessToken, expiresAt } = await generateAccessToken({
    id: user.id,
    email: user.email,
  });

  return {
    accessToken,
    expiresAt,
    _refreshToken: newRefreshToken,
  };
}

export async function logout(refreshToken: string): Promise<void> {
  const session = await validateSession(refreshToken);
  if (session) {
    await invalidateSession(session.id);
  }
}

export async function getCurrentUser(
  userId: string
): Promise<AuthenticatedUser | null> {
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

// ============== Google OAuth ==============

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  token_type: string;
}

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export function getGoogleAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: `${env.FRONTEND_URL}/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeGoogleCode(code: string): Promise<GoogleTokenResponse> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${env.FRONTEND_URL}/auth/callback`,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Google token exchange failed:", text);
    throw new UnauthorizedError("Google authentication failed");
  }

  return res.json();
}

export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new UnauthorizedError("Failed to fetch Google user info");
  }

  return res.json();
}

async function findUserByGoogleId(googleId: string): Promise<UserRow | null> {
  const [user] = await sql<UserRow[]>`
    SELECT id, email, name, password_hash, created_at, updated_at
    FROM users
    WHERE google_id = ${googleId}
  `;
  return user || null;
}

async function createGoogleUser(
  email: string,
  name: string,
  googleId: string
): Promise<UserRow> {
  const [user] = await sql<UserRow[]>`
    INSERT INTO users (email, name, google_id)
    VALUES (${email.toLowerCase()}, ${name}, ${googleId})
    RETURNING id, email, name, password_hash, created_at, updated_at
  `;
  return user!;
}

async function linkGoogleId(userId: string, googleId: string): Promise<void> {
  await sql`UPDATE users SET google_id = ${googleId} WHERE id = ${userId}`;
}

export async function loginWithGoogle(
  code: string
): Promise<AuthResponse & { _refreshToken: string }> {
  // Exchange code for tokens
  const tokens = await exchangeGoogleCode(code);
  const googleUser = await getGoogleUserInfo(tokens.access_token);

  // Try to find existing user by google_id
  let user = await findUserByGoogleId(googleUser.sub);

  if (!user) {
    // Try to find by email (existing user linking Google account)
    user = await getUserByEmail(googleUser.email);

    if (user) {
      // Link Google ID to existing account
      await linkGoogleId(user.id, googleUser.sub);
    } else {
      // Create new user
      user = await createGoogleUser(googleUser.email, googleUser.name, googleUser.sub);
      await createUserProfile(user.id, user.name);
    }
  }

  // Create session
  const { refreshToken } = await createSession(user.id);

  // Generate access token
  const { token: accessToken, expiresAt } = await generateAccessToken({
    id: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    accessToken,
    expiresAt,
    _refreshToken: refreshToken,
  };
}
