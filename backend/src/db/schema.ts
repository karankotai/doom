/**
 * Database schema definitions.
 *
 * Responsibilities:
 * - Define table structures for PostgreSQL
 * - Serve as documentation for database schema
 * - Used by migration scripts to create/modify tables
 *
 * This file defines the schema; actual queries live in domain services.
 */

/**
 * SQL schema placeholder.
 *
 * Tables to implement:
 *
 * users
 *   - id: UUID PRIMARY KEY
 *   - email: VARCHAR(255) UNIQUE NOT NULL
 *   - name: VARCHAR(255) NOT NULL
 *   - password_hash: VARCHAR(255) NOT NULL
 *   - created_at: TIMESTAMP DEFAULT NOW()
 *   - updated_at: TIMESTAMP DEFAULT NOW()
 *
 * sessions
 *   - id: UUID PRIMARY KEY
 *   - user_id: UUID REFERENCES users(id) ON DELETE CASCADE
 *   - expires_at: TIMESTAMP NOT NULL
 *   - created_at: TIMESTAMP DEFAULT NOW()
 *
 * journeys
 *   - id: UUID PRIMARY KEY
 *   - title: VARCHAR(255) NOT NULL
 *   - description: TEXT
 *   - created_at: TIMESTAMP DEFAULT NOW()
 *   - updated_at: TIMESTAMP DEFAULT NOW()
 *
 * modules
 *   - id: UUID PRIMARY KEY
 *   - journey_id: UUID REFERENCES journeys(id) ON DELETE CASCADE
 *   - title: VARCHAR(255) NOT NULL
 *   - description: TEXT
 *   - order: INTEGER NOT NULL
 *   - created_at: TIMESTAMP DEFAULT NOW()
 *
 * lessons
 *   - id: UUID PRIMARY KEY
 *   - module_id: UUID REFERENCES modules(id) ON DELETE CASCADE
 *   - title: VARCHAR(255) NOT NULL
 *   - description: TEXT
 *   - order: INTEGER NOT NULL
 *   - created_at: TIMESTAMP DEFAULT NOW()
 *
 * applets
 *   - id: UUID PRIMARY KEY
 *   - lesson_id: UUID REFERENCES lessons(id) ON DELETE CASCADE
 *   - type: VARCHAR(50) NOT NULL
 *   - config: JSONB NOT NULL
 *   - order: INTEGER NOT NULL
 *   - created_at: TIMESTAMP DEFAULT NOW()
 *   - updated_at: TIMESTAMP DEFAULT NOW()
 *
 * submissions
 *   - id: UUID PRIMARY KEY
 *   - applet_id: UUID REFERENCES applets(id) ON DELETE CASCADE
 *   - user_id: UUID REFERENCES users(id) ON DELETE CASCADE
 *   - answer: JSONB NOT NULL
 *   - submitted_at: TIMESTAMP DEFAULT NOW()
 *
 * evaluation_results
 *   - id: UUID PRIMARY KEY
 *   - submission_id: UUID REFERENCES submissions(id) ON DELETE CASCADE
 *   - correct: BOOLEAN NOT NULL
 *   - feedback: TEXT
 *   - score: INTEGER
 *   - evaluated_at: TIMESTAMP DEFAULT NOW()
 *
 * user_progress
 *   - id: UUID PRIMARY KEY
 *   - user_id: UUID REFERENCES users(id) ON DELETE CASCADE
 *   - journey_id: UUID REFERENCES journeys(id) ON DELETE CASCADE
 *   - current_lesson_id: UUID REFERENCES lessons(id)
 *   - started_at: TIMESTAMP DEFAULT NOW()
 *   - last_activity_at: TIMESTAMP DEFAULT NOW()
 *   - UNIQUE(user_id, journey_id)
 *
 * completed_lessons
 *   - user_id: UUID REFERENCES users(id) ON DELETE CASCADE
 *   - lesson_id: UUID REFERENCES lessons(id) ON DELETE CASCADE
 *   - completed_at: TIMESTAMP DEFAULT NOW()
 *   - PRIMARY KEY(user_id, lesson_id)
 */

export const SCHEMA_VERSION = 1;
