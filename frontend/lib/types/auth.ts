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
