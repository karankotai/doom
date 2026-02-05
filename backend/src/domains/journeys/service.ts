/**
 * Journeys domain service.
 *
 * Responsibilities:
 * - Journey CRUD operations
 * - Module and lesson management
 * - Journey content structure validation
 * - Should not import from other domains except via their services
 */

import type { Journey, CreateJourneyInput } from "./model";

export async function createJourney(_input: CreateJourneyInput): Promise<Journey> {
  // TODO: Implement journey creation
  throw new Error("Not implemented");
}

export async function getJourneyById(_id: string): Promise<Journey | null> {
  // TODO: Implement journey retrieval
  throw new Error("Not implemented");
}

export async function listJourneys(): Promise<Journey[]> {
  // TODO: Implement journey listing
  throw new Error("Not implemented");
}

export async function updateJourney(_id: string, _input: Partial<CreateJourneyInput>): Promise<Journey> {
  // TODO: Implement journey update
  throw new Error("Not implemented");
}

export async function deleteJourney(_id: string): Promise<void> {
  // TODO: Implement journey deletion
  throw new Error("Not implemented");
}
