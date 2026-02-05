/**
 * Users domain models.
 *
 * Responsibilities:
 * - Define user-related types
 * - User profile structures
 * - No database queries here; use service layer
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  level: number;
  xp: number;
  xpToNextLevel: number;
  title: string;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileInput {
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface UserWithProfile extends User {
  profile: UserProfile | null;
}
