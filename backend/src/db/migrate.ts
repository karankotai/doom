/**
 * Database migration runner.
 *
 * Responsibilities:
 * - Run migrations to create/update database schema
 * - Track migration history
 * - Provide rollback capability
 *
 * Usage: bun run src/db/migrate.ts
 * Rollback: bun run src/db/migrate.ts rollback [steps]
 */

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { sql, closeConnection } from "./client";

interface MigrationRecord {
  id: number;
  name: string;
  executed_at: Date;
}

async function ensureMigrationsTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

async function getExecutedMigrations(): Promise<string[]> {
  const records = await sql<MigrationRecord[]>`
    SELECT name FROM migrations ORDER BY id ASC
  `;
  return records.map((r) => r.name);
}

async function getMigrationFiles(): Promise<string[]> {
  const migrationsDir = join(import.meta.dir, "migrations");
  const files = await readdir(migrationsDir);
  return files
    .filter((f) => f.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
}

async function runMigrations(): Promise<void> {
  console.log("Running migrations...");

  await ensureMigrationsTable();

  const executedMigrations = await getExecutedMigrations();
  const migrationFiles = await getMigrationFiles();

  const pendingMigrations = migrationFiles.filter(
    (f) => !executedMigrations.includes(f)
  );

  if (pendingMigrations.length === 0) {
    console.log("No pending migrations.");
    return;
  }

  console.log(`Found ${pendingMigrations.length} pending migration(s)`);

  for (const migrationFile of pendingMigrations) {
    console.log(`Running migration: ${migrationFile}`);

    const migrationsDir = join(import.meta.dir, "migrations");
    const migrationPath = join(migrationsDir, migrationFile);
    const migrationSql = await readFile(migrationPath, "utf-8");

    try {
      // Execute the migration SQL outside transaction for DDL statements
      await sql.unsafe(migrationSql);

      // Record the migration
      await sql`
        INSERT INTO migrations (name) VALUES (${migrationFile})
      `;

      console.log(`  Completed: ${migrationFile}`);
    } catch (error) {
      console.error(`  Failed: ${migrationFile}`);
      throw error;
    }
  }

  console.log("All migrations completed successfully.");
}

async function rollback(steps: number = 1): Promise<void> {
  console.log(`Rolling back ${steps} migration(s)...`);

  await ensureMigrationsTable();

  const executedMigrations = await getExecutedMigrations();

  if (executedMigrations.length === 0) {
    console.log("No migrations to rollback.");
    return;
  }

  const toRollback = executedMigrations.slice(-steps).reverse();

  console.log(`Will rollback: ${toRollback.join(", ")}`);
  console.log(
    "Note: Automatic rollback requires manual SQL. Please review the migration files for rollback commands."
  );

  // Remove from migrations table
  for (const migration of toRollback) {
    await sql`DELETE FROM migrations WHERE name = ${migration}`;
    console.log(`  Removed record: ${migration}`);
  }

  console.log("Rollback records removed. Please manually run rollback SQL if needed.");
}

// CLI entry point
const command = process.argv[2];

(async () => {
  try {
    if (command === "rollback") {
      const steps = parseInt(process.argv[3] ?? "1", 10);
      await rollback(steps);
    } else {
      await runMigrations();
    }
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  } finally {
    await closeConnection();
  }
})();
