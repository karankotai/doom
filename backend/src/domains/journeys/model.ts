/**
 * Journeys domain models.
 *
 * Responsibilities:
 * - Define learning journey types
 * - Journey structure (modules, lessons, steps)
 * - No database queries here; use service layer
 *
 * A Journey represents a learning path containing multiple modules.
 * Each module contains lessons. Lessons contain steps.
 */

export interface Journey {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  journeyId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
}

export interface CreateJourneyInput {
  title: string;
  description: string;
}

// Add more journey-related types as needed
