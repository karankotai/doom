/**
 * Applets domain models.
 *
 * Applets are interactive learning components stored in the database.
 * Each applet type has specific content structure stored as JSONB.
 */

export type AppletType = "code-blocks" | "slope-graph" | "chess" | "mcq" | "fill-blanks" | "venn-diagram";

// Base applet structure from database
export interface Applet {
  id: string;
  type: AppletType;
  title: string;
  question: string;
  hint: string | undefined;
  content: unknown; // Type-specific JSONB content
  difficulty: number;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- Code Blocks specific types ---

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

// --- Slope Graph specific types ---

export interface Point {
  x: number;
  y: number;
}

export interface SlopeGraphContent {
  startPoint: Point;
  targetPoint: Point;
  gridSize?: number;
}

// --- Chess specific types ---

export interface ChessMove {
  from: { row: number; col: number };
  to: { row: number; col: number };
}

export interface ChessContent {
  initialPosition: string; // e.g., "wKe1,bKe8,wRa1"
  correctMove: ChessMove;
}

// --- MCQ specific types ---

export interface McqOption {
  id: string;
  text: string;
}

export interface McqContent {
  options: McqOption[];
  correctOptionId: string;
}

// --- Fill Blanks specific types ---

export type FillBlanksSegment =
  | { type: "text"; content: string }
  | { type: "slot"; slotId: string; correctAnswerId: string };

export interface FillBlanksContent {
  segments: FillBlanksSegment[];
  answerBlocks: AnswerBlock[];
}

// --- Venn Diagram specific types ---

// Region IDs for 2-circle Venn diagram: "a-only", "b-only", "a-and-b", "neither"
export type VennRegionId = "a-only" | "b-only" | "a-and-b" | "neither";

export interface VennDiagramContent {
  labels: [string, string]; // Labels for circles A and B
  correctRegions: VennRegionId[];
}

// --- API Response types ---

export interface CodeBlocksApplet extends Omit<Applet, "content"> {
  type: "code-blocks";
  content: CodeBlocksContent;
}

export interface SlopeGraphApplet extends Omit<Applet, "content"> {
  type: "slope-graph";
  content: SlopeGraphContent;
}

export interface ChessApplet extends Omit<Applet, "content"> {
  type: "chess";
  content: ChessContent;
}

export interface McqApplet extends Omit<Applet, "content"> {
  type: "mcq";
  content: McqContent;
}

export interface FillBlanksApplet extends Omit<Applet, "content"> {
  type: "fill-blanks";
  content: FillBlanksContent;
}

export interface VennDiagramApplet extends Omit<Applet, "content"> {
  type: "venn-diagram";
  content: VennDiagramContent;
}

export type TypedApplet = CodeBlocksApplet | SlopeGraphApplet | ChessApplet | McqApplet | FillBlanksApplet | VennDiagramApplet;

// --- Query params ---

export interface GetAppletsParams {
  type?: AppletType | undefined;
  difficulty?: number | undefined;
  tags?: string[] | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
}

// --- Submission types ---

export interface AppletSubmission {
  id: string;
  appletId: string;
  userId: string;
  answer: unknown;
  correct: boolean;
  submittedAt: Date;
}
