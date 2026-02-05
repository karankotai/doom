/**
 * API client for backend communication.
 *
 * Responsibilities:
 * - Provide typed functions for all backend API calls
 * - Handle authentication headers
 * - Transform responses and handle errors
 *
 * Usage: import { api } from "@/lib/api"
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        // TODO: Add auth token header
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }

  // Health check - verifies backend connectivity
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/health");
  }

  // TODO: Add typed methods for each API endpoint
  // Example:
  // async getJourneys(): Promise<Journey[]> {
  //   return this.request<Journey[]>("/journeys");
  // }
}

export const api = new ApiClient(API_BASE_URL);
