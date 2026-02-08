/**
 * Applets domain models.
 *
 * Applets are interactive learning components stored in the database.
 * Each applet type has specific content structure stored as JSONB.
 */

export type AppletType = "code-blocks" | "slope-graph" | "chess" | "mcq" | "fill-blanks" | "venn-diagram" | "highlight-text" | "comparative-advantage" | "ordering" | "color-mixing" | "map-select" | "categorization-grid" | "fraction-visualizer" | "chart-reading";

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

// Region IDs: "A", "B", "AB", "ABC", "none" etc. for n-circle diagrams
// Legacy support: "a-only", "b-only", "a-and-b", "neither" (auto-converted by frontend)
export type VennRegionId = string;

export interface VennDiagramContent {
  labels: string[]; // 2-5 labels for circles
  correctRegions: VennRegionId[];
}

// --- Highlight Text specific types ---

export interface HighlightSpan {
  text: string;
  startIndex: number;
  endIndex: number;
  category: string;
}

export interface HighlightTextContent {
  text: string;
  categories: string[];
  correctHighlights: HighlightSpan[];
}

// --- Comparative Advantage specific types ---

export interface AdvantageParty {
  name: string;
  emoji: string;
  production: Record<string, number>;
}

export interface AdvantageStep {
  instruction: string;
  good: string;
  questionType: "absolute" | "opportunity-cost" | "comparative";
  partyIndex: number;
  correctAnswer: number;
  tolerance?: number;
  explanation?: string;
}

export interface ComparativeAdvantageContent {
  parties: [AdvantageParty, AdvantageParty];
  goods: string[];
  steps: AdvantageStep[];
}

// --- Ordering specific types ---

export interface OrderingItem {
  id: string;
  label: string;
  emoji?: string;
  subtitle?: string;
}

export interface OrderingContent {
  items: OrderingItem[];
  correctOrder: string[];
  direction: "top-down" | "bottom-up";
}

// --- Color Mixing specific types ---

export interface ColorBlock {
  id: string;
  label: string;
  hex: string;
}

export interface ColorMixingContent {
  targetHex: string;
  targetLabel?: string;
  colorBlocks: ColorBlock[];
  correctBlockIds: string[];
  mode: "additive" | "subtractive";
}

// --- Map Select specific types ---

export interface MapRegion {
  id: string;
  label?: string;
}

export interface MapSelectContent {
  regions: MapRegion[];
  correctRegionIds: string[];
  mapView?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// --- Categorization Grid specific types ---

export interface CategoryItem {
  id: string;
  text: string;
  emoji?: string;
}

export interface GridCategory {
  id: string;
  label: string;
  emoji?: string;
}

export interface CategorizationGridContent {
  categories: GridCategory[];
  items: CategoryItem[];
  correctMapping: Record<string, string>;
  layout: "columns" | "matrix";
  matrixAxes?: {
    rowLabel: string;
    colLabel: string;
  };
}

// --- Fraction Visualizer specific types ---

export type ShapeSectionSvg =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "path"; d: string }
  | { type: "arc"; cx: number; cy: number; r: number; startAngle: number; endAngle: number };

export interface ShapeSection {
  id: string;
  fractionValue: number;
  svg: ShapeSectionSvg;
}

export interface FractionVisualizerContent {
  shape: "rectangle" | "circle" | "triangle";
  sections: ShapeSection[];
  targetNumerator: number;
  targetDenominator: number;
  viewBox: { width: number; height: number };
}

// --- Chart Reading specific types ---

export interface ChartDataPoint {
  id: string;
  label: string;
  value: number;
  value2?: number;
  color?: string;
}

export interface ChartReadingContent {
  chartType: "bar" | "pie" | "line" | "scatter" | "histogram";
  chartTitle: string;
  data: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  selectCount: number;
  correctIds: string[];
  unit?: string;
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

export interface HighlightTextApplet extends Omit<Applet, "content"> {
  type: "highlight-text";
  content: HighlightTextContent;
}

export interface ComparativeAdvantageApplet extends Omit<Applet, "content"> {
  type: "comparative-advantage";
  content: ComparativeAdvantageContent;
}

export interface OrderingApplet extends Omit<Applet, "content"> {
  type: "ordering";
  content: OrderingContent;
}

export interface ColorMixingApplet extends Omit<Applet, "content"> {
  type: "color-mixing";
  content: ColorMixingContent;
}

export interface MapSelectApplet extends Omit<Applet, "content"> {
  type: "map-select";
  content: MapSelectContent;
}

export interface CategorizationGridApplet extends Omit<Applet, "content"> {
  type: "categorization-grid";
  content: CategorizationGridContent;
}

export interface FractionVisualizerApplet extends Omit<Applet, "content"> {
  type: "fraction-visualizer";
  content: FractionVisualizerContent;
}

export interface ChartReadingApplet extends Omit<Applet, "content"> {
  type: "chart-reading";
  content: ChartReadingContent;
}

export type TypedApplet = CodeBlocksApplet | SlopeGraphApplet | ChessApplet | McqApplet | FillBlanksApplet | VennDiagramApplet | HighlightTextApplet | ComparativeAdvantageApplet | OrderingApplet | ColorMixingApplet | MapSelectApplet | CategorizationGridApplet | FractionVisualizerApplet | ChartReadingApplet;

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
