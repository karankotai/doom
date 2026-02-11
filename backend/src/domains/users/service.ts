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
  Achievement,
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
      current_streak as "currentStreak",
      longest_streak as "longestStreak",
      last_activity_date as "lastActivityDate",
      daily_xp as "dailyXp",
      daily_goal as "dailyGoal",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM user_profiles
    WHERE user_id = ${userId}
  `;
  if (!profile) return null;

  // Adjust streak and daily XP based on last activity date
  const today = new Date().toISOString().split("T")[0];
  const lastDate = profile.lastActivityDate
    ? new Date(profile.lastActivityDate).toISOString().split("T")[0]
    : null;

  if (lastDate && lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // Daily XP resets if not today
    profile.dailyXp = 0;

    // Streak breaks if last activity was before yesterday
    if (lastDate !== yesterdayStr) {
      profile.currentStreak = 0;
    }
  }

  return profile;
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
      current_streak as "currentStreak",
      longest_streak as "longestStreak",
      last_activity_date as "lastActivityDate",
      daily_xp as "dailyXp",
      daily_goal as "dailyGoal",
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
): Promise<{ profile: UserProfile; achievements: Achievement[] }> {
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
    newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5);
    newTitle = getLevelTitle(newLevel);
  }

  // Streak logic
  const today = new Date().toISOString().split("T")[0];
  const lastDate = profile.lastActivityDate
    ? new Date(profile.lastActivityDate).toISOString().split("T")[0]
    : null;

  let newStreak = profile.currentStreak;
  let newDailyXp = profile.dailyXp;

  if (lastDate === today) {
    // Same day — just add to daily XP
    newDailyXp += amount;
  } else {
    // Check if yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastDate === yesterdayStr) {
      // Consecutive day
      newStreak += 1;
      newDailyXp = amount;
    } else {
      // Streak broken or first activity
      newStreak = 1;
      newDailyXp = amount;
    }
  }

  const newLongestStreak = Math.max(profile.longestStreak, newStreak);

  // Compute total XP earned (for achievement checks): current level XP + all XP needed for previous levels
  // Approximate: sum of geometric series for xp_to_next_level
  // Simpler: just use newXp + amount accumulated. We'll track by checking the raw value.
  // For xp_100/xp_500, we check total XP across all levels. Easiest: store a running total.
  // Since we don't have a total_xp column, approximate: the user earned XP if they have any.
  // For simplicity, compute totalXpEarned from level progression.
  // Actually let's just compute it from the level-up formula: base=100, *1.5 each level
  let totalXpEarned = newXp;
  let xpNeeded = 100; // base
  for (let l = 1; l < newLevel; l++) {
    totalXpEarned += xpNeeded;
    xpNeeded = Math.floor(xpNeeded * 1.5);
  }

  const [updatedProfile] = await sql<UserProfile[]>`
    UPDATE user_profiles
    SET
      xp = ${newXp},
      level = ${newLevel},
      xp_to_next_level = ${newXpToNextLevel},
      title = ${newTitle},
      current_streak = ${newStreak},
      longest_streak = ${newLongestStreak},
      last_activity_date = CURRENT_DATE,
      daily_xp = ${newDailyXp},
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
      current_streak as "currentStreak",
      longest_streak as "longestStreak",
      last_activity_date as "lastActivityDate",
      daily_xp as "dailyXp",
      daily_goal as "dailyGoal",
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;

  // Award achievements
  const achievementDefs: { type: string; label: string; emoji: string; condition: boolean }[] = [
    { type: "first_lesson", label: "First Steps", emoji: "\u{1F3C6}", condition: true },
    { type: "streak_3", label: "On Fire", emoji: "\u{1F525}", condition: newStreak >= 3 },
    { type: "streak_7", label: "Week Warrior", emoji: "\u2B50", condition: newStreak >= 7 },
    { type: "level_5", label: "Apprentice", emoji: "\u{1F396}\uFE0F", condition: newLevel >= 5 },
    { type: "xp_100", label: "Century", emoji: "\u{1F4AF}", condition: totalXpEarned >= 100 },
    { type: "xp_500", label: "Scholar", emoji: "\u{1F4DA}", condition: totalXpEarned >= 500 },
  ];

  for (const def of achievementDefs) {
    if (def.condition) {
      await sql`
        INSERT INTO achievements (user_id, type, label, emoji)
        VALUES (${userId}, ${def.type}, ${def.label}, ${def.emoji})
        ON CONFLICT (user_id, type) DO NOTHING
      `;
    }
  }

  const achievements = await getAchievements(userId);

  return { profile: updatedProfile!, achievements };
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

// ============== Achievements ==============

export async function getAchievements(userId: string): Promise<Achievement[]> {
  return sql<Achievement[]>`
    SELECT
      id,
      user_id as "userId",
      type,
      label,
      emoji,
      earned_at as "earnedAt"
    FROM achievements
    WHERE user_id = ${userId}
    ORDER BY earned_at ASC
  `;
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
