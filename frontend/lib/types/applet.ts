/**
 * Applet types - mirrors backend models
 */

export type AppletType = "code-blocks" | "slope-graph" | "chess" | "mcq" | "fill-blanks" | "venn-diagram" | "highlight-text" | "comparative-advantage" | "ordering" | "color-mixing" | "map-select" | "categorization-grid" | "fraction-visualizer" | "chart-reading";

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

// --- MCQ types ---

export interface McqOption {
  id: string;
  text: string;
}

export interface McqContent {
  options: McqOption[];
  correctOptionId: string;
}

// --- Fill Blanks types ---

export type FillBlanksSegment =
  | { type: "text"; content: string }
  | { type: "slot"; slotId: string; correctAnswerId: string };

export interface FillBlanksContent {
  segments: FillBlanksSegment[];
  answerBlocks: AnswerBlock[];
}

// --- Venn Diagram types ---

// Region IDs: "A", "B", "AB", "ABC", "none" etc. for n-circle diagrams
// Legacy: "a-only", "b-only", "a-and-b", "neither" (auto-converted)
export type VennRegionId = string;

export interface VennDiagramContent {
  labels: string[]; // 2-5 labels for circles
  correctRegions: VennRegionId[];
}

// --- Highlight Text types ---

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

// --- Comparative Advantage types ---

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

// --- Ordering types ---

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

// --- Color Mixing types ---

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

// --- Map Select types ---

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

// --- Categorization Grid types ---

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
  correctMapping: Record<string, string>; // itemId -> categoryId
  layout: "columns" | "matrix";
  matrixAxes?: {
    rowLabel: string;
    colLabel: string;
  };
}

// --- Fraction Visualizer types ---

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

// --- Chart Reading types ---

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

export interface McqApplet extends BaseApplet {
  type: "mcq";
  content: McqContent;
}

export interface FillBlanksApplet extends BaseApplet {
  type: "fill-blanks";
  content: FillBlanksContent;
}

export interface VennDiagramApplet extends BaseApplet {
  type: "venn-diagram";
  content: VennDiagramContent;
}

export interface HighlightTextApplet extends BaseApplet {
  type: "highlight-text";
  content: HighlightTextContent;
}

export interface ComparativeAdvantageApplet extends BaseApplet {
  type: "comparative-advantage";
  content: ComparativeAdvantageContent;
}

export interface OrderingApplet extends BaseApplet {
  type: "ordering";
  content: OrderingContent;
}

export interface ColorMixingApplet extends BaseApplet {
  type: "color-mixing";
  content: ColorMixingContent;
}

export interface MapSelectApplet extends BaseApplet {
  type: "map-select";
  content: MapSelectContent;
}

export interface CategorizationGridApplet extends BaseApplet {
  type: "categorization-grid";
  content: CategorizationGridContent;
}

export interface FractionVisualizerApplet extends BaseApplet {
  type: "fraction-visualizer";
  content: FractionVisualizerContent;
}

export interface ChartReadingApplet extends BaseApplet {
  type: "chart-reading";
  content: ChartReadingContent;
}

export type Applet = CodeBlocksApplet | SlopeGraphApplet | ChessApplet | McqApplet | FillBlanksApplet | VennDiagramApplet | HighlightTextApplet | ComparativeAdvantageApplet | OrderingApplet | ColorMixingApplet | MapSelectApplet | CategorizationGridApplet | FractionVisualizerApplet | ChartReadingApplet;

// --- AI Generated Exercise (before it has an ID) ---

export interface GeneratedExercise {
  type: "mcq" | "fill-blanks" | "venn-diagram" | "highlight-text";
  title: string;
  question: string;
  hint: string;
  content: Record<string, unknown>;
  difficulty: number;
  tags: string[];
}
