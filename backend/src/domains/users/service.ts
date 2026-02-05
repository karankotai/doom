/**
 * Users domain service.
 *
 * Responsibilities:
 * - User CRUD operations
 * - User profile management
 * - Should not import from other domains except via their services
 */

import { sql } from "../../db/client";
import { NotFoundError } from "../../lib/errors";
import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserProfile,
  UpdateProfileInput,
  UserWithProfile,
} from "./model";

// ============== User Operations ==============

export async function createUser(input: CreateUserInput): Promise<User> {
  const [user] = await sql<User[]>`
    INSERT INTO users (email, name, password_hash)
    VALUES (${input.email.toLowerCase()}, ${input.name}, ${input.password})
    RETURNING
      id,
      email,
      name,
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;
  return user!;
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await sql<User[]>`
    SELECT
      id,
      email,
      name,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM users
    WHERE id = ${id}
  `;
  return user || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await sql<User[]>`
    SELECT
      id,
      email,
      name,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM users
    WHERE email = ${email.toLowerCase()}
  `;
  return user || null;
}

export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<User> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.name !== undefined) {
    updates.push("name = $" + (values.length + 1));
    values.push(input.name);
  }
  if (input.email !== undefined) {
    updates.push("email = $" + (values.length + 1));
    values.push(input.email.toLowerCase());
  }

  if (updates.length === 0) {
    const user = await getUserById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  const [user] = await sql<User[]>`
    UPDATE users
    SET ${sql.unsafe(updates.join(", "))}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING
      id,
      email,
      name,
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

export async function deleteUser(id: string): Promise<void> {
  const result = await sql`DELETE FROM users WHERE id = ${id}`;
  if (result.count === 0) {
    throw new NotFoundError("User not found");
  }
}

// ============== Profile Operations ==============

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const [profile] = await sql<UserProfile[]>`
    SELECT
      id,
      user_id as "userId",
      display_name as "displayName",
      avatar_url as "avatarUrl",
      level,
      xp,
      xp_to_next_level as "xpToNextLevel",
      title,
      bio,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM user_profiles
    WHERE user_id = ${userId}
  `;
  return profile || null;
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput
): Promise<UserProfile> {
  const [profile] = await sql<UserProfile[]>`
    UPDATE user_profiles
    SET
      display_name = COALESCE(${input.displayName ?? null}, display_name),
      avatar_url = COALESCE(${input.avatarUrl ?? null}, avatar_url),
      bio = COALESCE(${input.bio ?? null}, bio),
      updated_at = NOW()
    WHERE user_id = ${userId}
    RETURNING
      id,
      user_id as "userId",
      display_name as "displayName",
      avatar_url as "avatarUrl",
      level,
      xp,
      xp_to_next_level as "xpToNextLevel",
      title,
      bio,
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;

  if (!profile) {
    throw new NotFoundError("Profile not found");
  }

  return profile;
}

export async function addXp(
  userId: string,
  amount: number
): Promise<UserProfile> {
  // Get current profile
  const profile = await getProfile(userId);
  if (!profile) {
    throw new NotFoundError("Profile not found");
  }

  let newXp = profile.xp + amount;
  let newLevel = profile.level;
  let newXpToNextLevel = profile.xpToNextLevel;
  let newTitle = profile.title;

  // Level up logic
  while (newXp >= newXpToNextLevel) {
    newXp -= newXpToNextLevel;
    newLevel++;
    newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5); // Increase XP needed by 50%
    newTitle = getLevelTitle(newLevel);
  }

  const [updatedProfile] = await sql<UserProfile[]>`
    UPDATE user_profiles
    SET
      xp = ${newXp},
      level = ${newLevel},
      xp_to_next_level = ${newXpToNextLevel},
      title = ${newTitle},
      updated_at = NOW()
    WHERE user_id = ${userId}
    RETURNING
      id,
      user_id as "userId",
      display_name as "displayName",
      avatar_url as "avatarUrl",
      level,
      xp,
      xp_to_next_level as "xpToNextLevel",
      title,
      bio,
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;

  return updatedProfile!;
}

export async function getUserWithProfile(
  userId: string
): Promise<UserWithProfile | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  const profile = await getProfile(userId);

  return {
    ...user,
    profile,
  };
}

// ============== Helpers ==============

function getLevelTitle(level: number): string {
  if (level < 5) return "Novice Learner";
  if (level < 10) return "Apprentice";
  if (level < 20) return "Student";
  if (level < 35) return "Scholar";
  if (level < 50) return "Expert";
  if (level < 75) return "Master";
  return "Grandmaster";
}
