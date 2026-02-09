/**
 * Authentication type definitions.
 */

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  expiresAt: number | null; // Unix timestamp
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  expiresAt: number;
}

export interface RefreshResponse {
  accessToken: string;
  expiresAt: number;
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
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  dailyXp: number;
  dailyGoal: number;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  type: string;
  label: string;
  emoji: string;
  earnedAt: string;
}
