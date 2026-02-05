/**
 * Users domain service.
 *
 * Responsibilities:
 * - User CRUD operations
 * - User profile management
 * - Should not import from other domains except via their services
 */

import type { User, CreateUserInput, UpdateUserInput } from "./model";

export async function createUser(_input: CreateUserInput): Promise<User> {
  // TODO: Implement user creation
  throw new Error("Not implemented");
}

export async function getUserById(_id: string): Promise<User | null> {
  // TODO: Implement user retrieval
  throw new Error("Not implemented");
}

export async function getUserByEmail(_email: string): Promise<User | null> {
  // TODO: Implement user retrieval by email
  throw new Error("Not implemented");
}

export async function updateUser(_id: string, _input: UpdateUserInput): Promise<User> {
  // TODO: Implement user update
  throw new Error("Not implemented");
}

export async function deleteUser(_id: string): Promise<void> {
  // TODO: Implement user deletion
  throw new Error("Not implemented");
}
