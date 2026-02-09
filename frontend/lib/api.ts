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
  UserProfile,
  Achievement,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RefreshResponse,
} from "./types/auth";
import type { Applet, AppletType, GeneratedExercise } from "./types/applet";
import type { Course, CourseWithUnits, LessonWithApplets, UserCourseProgress, UserLessonProgress } from "./types/course";

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

  async googleLogin(code: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/google/callback", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }

  async getCurrentUser(): Promise<{ user: User; profile: UserProfile | null; achievements: Achievement[] }> {
    return this.request<{ user: User; profile: UserProfile | null; achievements: Achievement[] }>("/auth/me");
  }

  // ============== XP ==============

  async awardXp(amount: number): Promise<{ profile: UserProfile; achievements: Achievement[] }> {
    return this.request<{ profile: UserProfile; achievements: Achievement[] }>("/users/me/xp", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });
  }

  // ============== Applets ==============

  async getApplets(params?: {
    type?: AppletType;
    difficulty?: number;
    tags?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ applets: Applet[] }> {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set("type", params.type);
    if (params?.difficulty) searchParams.set("difficulty", String(params.difficulty));
    if (params?.tags?.length) searchParams.set("tags", params.tags.join(","));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.offset) searchParams.set("offset", String(params.offset));

    const query = searchParams.toString();
    return this.request<{ applets: Applet[] }>(`/applets${query ? `?${query}` : ""}`);
  }

  async getRandomApplets(count?: number, types?: AppletType[]): Promise<{ applets: Applet[] }> {
    const searchParams = new URLSearchParams();
    if (count) searchParams.set("count", String(count));
    if (types?.length) searchParams.set("types", types.join(","));

    const query = searchParams.toString();
    return this.request<{ applets: Applet[] }>(`/applets/random${query ? `?${query}` : ""}`);
  }

  async getAppletsByType(type: AppletType): Promise<{ applets: Applet[] }> {
    return this.request<{ applets: Applet[] }>(`/applets/type/${type}`);
  }

  async getApplet(id: string): Promise<{ applet: Applet }> {
    return this.request<{ applet: Applet }>(`/applets/${id}`);
  }

  // ============== AI Generation ==============

  async generateExercises(topic: string, difficulty?: number): Promise<{ exercises: GeneratedExercise[] }> {
    return this.request<{ exercises: GeneratedExercise[] }>("/ai/generate", {
      method: "POST",
      body: JSON.stringify({ topic, difficulty }),
    });
  }

  // ============== Courses ==============

  async getCourses(): Promise<{ courses: Course[] }> {
    return this.request<{ courses: Course[] }>("/journeys");
  }

  async getCourse(id: string): Promise<{ course: CourseWithUnits }> {
    return this.request<{ course: CourseWithUnits }>(`/journeys/${id}`);
  }

  async getCourseProgress(courseId: string): Promise<{ courseProgress: UserCourseProgress | null; completedLessonIds: string[] }> {
    return this.request<{ courseProgress: UserCourseProgress | null; completedLessonIds: string[] }>(`/journeys/${courseId}/progress`);
  }

  async startCourse(courseId: string): Promise<{ progress: UserCourseProgress }> {
    return this.request<{ progress: UserCourseProgress }>(`/journeys/${courseId}/start`, {
      method: "POST",
    });
  }

  async getLesson(lessonId: string): Promise<{ lesson: LessonWithApplets }> {
    return this.request<{ lesson: LessonWithApplets }>(`/journeys/lessons/${lessonId}`);
  }

  async completeLesson(lessonId: string, score: number): Promise<{ progress: UserLessonProgress }> {
    return this.request<{ progress: UserLessonProgress }>(`/journeys/lessons/${lessonId}/complete`, {
      method: "POST",
      body: JSON.stringify({ score }),
    });
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
