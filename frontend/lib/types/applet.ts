/**
 * Applet types - mirrors backend models
 */

export type AppletType = "code-blocks" | "slope-graph" | "chess";

// --- Code Blocks types ---

export type CodeSegment =
  | { type: "text"; content: string }
  | { type: "slot"; slotId: string; correctAnswerId: string };

export interface CodeLine {
  lineNumber: number;
  segments: CodeSegment[];
}

export interface AnswerBlock {
  id: string;
  content: string;
}

export interface CodeBlocksContent {
  language: string;
  lines: CodeLine[];
  answerBlocks: AnswerBlock[];
}

// --- Slope Graph types ---

export interface Point {
  x: number;
  y: number;
}

export interface SlopeGraphContent {
  startPoint: Point;
  targetPoint: Point;
  gridSize?: number;
}

// --- Chess types ---

export interface ChessMove {
  from: { row: number; col: number };
  to: { row: number; col: number };
}

export interface ChessContent {
  initialPosition: string;
  correctMove: ChessMove;
}

// --- Base Applet ---

export interface BaseApplet {
  id: string;
  type: AppletType;
  title: string;
  question: string;
  hint?: string;
  difficulty: number;
  tags: string[];
}

// --- Typed Applets ---

export interface CodeBlocksApplet extends BaseApplet {
  type: "code-blocks";
  content: CodeBlocksContent;
}

export interface SlopeGraphApplet extends BaseApplet {
  type: "slope-graph";
  content: SlopeGraphContent;
}

export interface ChessApplet extends BaseApplet {
  type: "chess";
  content: ChessContent;
}

export type Applet = CodeBlocksApplet | SlopeGraphApplet | ChessApplet;
