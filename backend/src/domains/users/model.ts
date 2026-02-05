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

// Add more user-related types as needed
