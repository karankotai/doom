/**
 * API client for backend communication.
 *
 * Responsibilities:
 * - Provide typed functions for all backend API calls
 * - Handle authentication headers
 * - Transform responses and handle errors
 * - Support automatic token refresh on 401
 *
 * Usage: import { api } from "@/lib/api"
 */

import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RefreshResponse,
} from "./types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface ApiError {
  error: string;
  statusCode: number;
}

// Token storage (in-memory for security)
let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

export function setAccessToken(token: string | null, expiresAt: number | null) {
  accessToken = token;
  tokenExpiresAt = expiresAt;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function getTokenExpiresAt(): number | null {
  return tokenExpiresAt;
}

export function clearAccessToken() {
  accessToken = null;
  tokenExpiresAt = null;
}

// Refresh callback - set by AuthContext
let onTokenRefresh: (() => Promise<boolean>) | null = null;

export function setRefreshCallback(callback: () => Promise<boolean>) {
  onTokenRefresh = callback;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retry = true
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add auth token if available
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Include cookies for refresh token
    });

    // Handle 401 with automatic refresh
    if (response.status === 401 && retry && onTokenRefresh) {
      const refreshed = await onTokenRefresh();
      if (refreshed) {
        // Retry the request with new token
        return this.request<T>(endpoint, options, false);
      }
    }

    if (!response.ok) {
      let error: ApiError;
      try {
        error = await response.json();
      } catch {
        error = { error: "Request failed", statusCode: response.status };
      }
      throw new ApiClientError(error.error, response.status);
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text);
  }

  // ============== Health ==============

  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/health");
  }

  // ============== Auth ==============

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async refreshToken(): Promise<RefreshResponse> {
    return this.request<RefreshResponse>(
      "/auth/refresh",
      {
        method: "POST",
      },
      false // Don't retry refresh requests
    );
  }

  async logout(): Promise<void> {
    await this.request<{ message: string }>("/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request<{ user: User }>("/auth/me");
  }
}

export class ApiClientError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
  }
}

export const api = new ApiClient(API_BASE_URL);
