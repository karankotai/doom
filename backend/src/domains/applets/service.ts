import { sql } from "@/db/client";
import type { Applet, AppletType, GetAppletsParams, TypedApplet } from "./model";

// Convert database row to Applet
function rowToApplet(row: Record<string, unknown>): Applet {
  return {
    id: row.id as string,
    type: row.type as AppletType,
    title: row.title as string,
    question: row.question as string,
    hint: row.hint as string | undefined,
    content: row.content,
    difficulty: row.difficulty as number,
    tags: row.tags as string[],
    isActive: row.is_active as boolean,
    createdAt: row.created_at as Date,
    updatedAt: row.updated_at as Date,
  };
}

// Get all applets with optional filtering
export async function getApplets(params: GetAppletsParams = {}): Promise<TypedApplet[]> {
  const { type, difficulty, tags, limit = 50, offset = 0 } = params;

  let query = `
    SELECT * FROM applets
    WHERE is_active = true
  `;
  const conditions: string[] = [];
  const values: (string | number | string[])[] = [];
  let paramIndex = 1;

  if (type) {
    conditions.push(`type = $${paramIndex}`);
    values.push(type);
    paramIndex++;
  }

  if (difficulty) {
    conditions.push(`difficulty = $${paramIndex}`);
    values.push(difficulty);
    paramIndex++;
  }

  if (tags && tags.length > 0) {
    conditions.push(`tags && $${paramIndex}`);
    values.push(tags);
    paramIndex++;
  }

  if (conditions.length > 0) {
    query += ` AND ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY difficulty ASC, created_at ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  values.push(limit, offset);

  const result = await sql.unsafe(query, values);
  return result.map((row) => rowToApplet(row as Record<string, unknown>) as TypedApplet);
}

// Get single applet by ID
export async function getAppletById(id: string): Promise<TypedApplet | null> {
  const result = await sql`
    SELECT * FROM applets
    WHERE id = ${id} AND is_active = true
  `;

  if (result.length === 0) {
    return null;
  }

  return rowToApplet(result[0] as Record<string, unknown>) as TypedApplet;
}

// Get applets by type
export async function getAppletsByType(type: AppletType): Promise<TypedApplet[]> {
  const result = await sql`
    SELECT * FROM applets
    WHERE type = ${type} AND is_active = true
    ORDER BY difficulty ASC, created_at ASC
  `;

  return result.map((row) => rowToApplet(row as Record<string, unknown>) as TypedApplet);
}

// Get random applets for a lesson
export async function getRandomApplets(
  count: number,
  types?: AppletType[]
): Promise<TypedApplet[]> {
  let result;

  if (types && types.length > 0) {
    result = await sql`
      SELECT * FROM applets
      WHERE is_active = true AND type = ANY(${types})
      ORDER BY RANDOM()
      LIMIT ${count}
    `;
  } else {
    result = await sql`
      SELECT * FROM applets
      WHERE is_active = true
      ORDER BY RANDOM()
      LIMIT ${count}
    `;
  }

  return result.map((row) => rowToApplet(row as Record<string, unknown>) as TypedApplet);
}

// Create a new applet
export async function createApplet(applet: {
  type: AppletType;
  title: string;
  question: string;
  hint?: string;
  content: Record<string, unknown>;
  difficulty?: number;
  tags?: string[];
}): Promise<TypedApplet> {
  // Convert content to JSON string for JSONB column
  const contentJson = JSON.stringify(applet.content);

  const result = await sql.unsafe(
    `INSERT INTO applets (type, title, question, hint, content, difficulty, tags)
     VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7)
     RETURNING *`,
    [
      applet.type,
      applet.title,
      applet.question,
      applet.hint ?? null,
      contentJson,
      applet.difficulty ?? 1,
      applet.tags ?? [],
    ]
  );

  return rowToApplet(result[0] as Record<string, unknown>) as TypedApplet;
}

// Update an applet
export async function updateApplet(
  id: string,
  updates: Partial<{
    title: string;
    question: string;
    hint: string;
    content: unknown;
    difficulty: number;
    tags: string[];
    isActive: boolean;
  }>
): Promise<TypedApplet | null> {
  const sets: string[] = [];
  const values: (string | number | boolean | string[])[] = [];
  let paramIndex = 1;

  if (updates.title !== undefined) {
    sets.push(`title = $${paramIndex}`);
    values.push(updates.title);
    paramIndex++;
  }

  if (updates.question !== undefined) {
    sets.push(`question = $${paramIndex}`);
    values.push(updates.question);
    paramIndex++;
  }

  if (updates.hint !== undefined) {
    sets.push(`hint = $${paramIndex}`);
    values.push(updates.hint);
    paramIndex++;
  }

  if (updates.content !== undefined) {
    sets.push(`content = $${paramIndex}`);
    values.push(JSON.stringify(updates.content));
    paramIndex++;
  }

  if (updates.difficulty !== undefined) {
    sets.push(`difficulty = $${paramIndex}`);
    values.push(updates.difficulty);
    paramIndex++;
  }

  if (updates.tags !== undefined) {
    sets.push(`tags = $${paramIndex}`);
    values.push(updates.tags);
    paramIndex++;
  }

  if (updates.isActive !== undefined) {
    sets.push(`is_active = $${paramIndex}`);
    values.push(updates.isActive);
    paramIndex++;
  }

  if (sets.length === 0) {
    return getAppletById(id);
  }

  values.push(id);
  const query = `
    UPDATE applets
    SET ${sets.join(", ")}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const result = await sql.unsafe(query, values);

  if (result.length === 0) {
    return null;
  }

  return rowToApplet(result[0] as Record<string, unknown>) as TypedApplet;
}

// Soft delete an applet
export async function deleteApplet(id: string): Promise<boolean> {
  const result = await sql`
    UPDATE applets
    SET is_active = false
    WHERE id = ${id}
    RETURNING id
  `;

  return result.length > 0;
}
