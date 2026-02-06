/**
 * Applets domain routes.
 *
 * Provides endpoints for fetching interactive applets and their content.
 * Applet content is stored in database, making it easy to add new puzzles.
 */

import { Hono } from "hono";
import * as appletService from "./service";
import type { AppletType } from "./model";

export const appletsRoutes = new Hono();

// GET /applets - List applets with optional filters
appletsRoutes.get("/", async (c) => {
  const type = c.req.query("type") as AppletType | undefined;
  const difficulty = c.req.query("difficulty");
  const tags = c.req.query("tags");
  const limit = c.req.query("limit");
  const offset = c.req.query("offset");

  const result = await appletService.getApplets({
    type,
    difficulty: difficulty ? parseInt(difficulty, 10) : undefined,
    tags: tags ? tags.split(",") : undefined,
    limit: limit ? parseInt(limit, 10) : undefined,
    offset: offset ? parseInt(offset, 10) : undefined,
  });

  return c.json({ applets: result });
});

// GET /applets/random - Get random applets for a lesson
appletsRoutes.get("/random", async (c) => {
  const count = c.req.query("count");
  const types = c.req.query("types");

  const result = await appletService.getRandomApplets(
    count ? parseInt(count, 10) : 5,
    types ? (types.split(",") as AppletType[]) : undefined
  );

  return c.json({ applets: result });
});

// GET /applets/type/:type - Get all applets of a specific type
appletsRoutes.get("/type/:type", async (c) => {
  const type = c.req.param("type") as AppletType;

  if (!["code-blocks", "slope-graph", "chess", "mcq", "fill-blanks"].includes(type)) {
    return c.json({ error: "Invalid applet type" }, 400);
  }

  const result = await appletService.getAppletsByType(type);
  return c.json({ applets: result });
});

// GET /applets/:id - Get single applet
appletsRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const applet = await appletService.getAppletById(id);

  if (!applet) {
    return c.json({ error: "Applet not found" }, 404);
  }

  return c.json({ applet });
});

// POST /applets - Create new applet (admin only - add auth later)
appletsRoutes.post("/", async (c) => {
  const body = await c.req.json();

  const { type, title, question, hint, content, difficulty, tags } = body;

  if (!type || !title || !question || !content) {
    return c.json({ error: "Missing required fields: type, title, question, content" }, 400);
  }

  if (!["code-blocks", "slope-graph", "chess", "mcq", "fill-blanks"].includes(type)) {
    return c.json({ error: "Invalid applet type" }, 400);
  }

  const applet = await appletService.createApplet({
    type,
    title,
    question,
    hint,
    content,
    difficulty,
    tags,
  });

  return c.json({ applet }, 201);
});

// PATCH /applets/:id - Update applet (admin only)
appletsRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const applet = await appletService.updateApplet(id, body);

  if (!applet) {
    return c.json({ error: "Applet not found" }, 404);
  }

  return c.json({ applet });
});

// DELETE /applets/:id - Soft delete applet (admin only)
appletsRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = await appletService.deleteApplet(id);

  if (!deleted) {
    return c.json({ error: "Applet not found" }, 404);
  }

  return c.json({ success: true });
});
