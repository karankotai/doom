"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface DiagramElement {
  id: string;
  type: "path" | "rect" | "circle" | "ellipse" | "line" | "polygon" | "polyline" | "text";
  attrs: Record<string, string | number>;
  label?: string;
  selectable?: boolean;
  style?: Record<string, string | number>;
}

export interface InteractiveDiagramContent {
  elements: DiagramElement[];
  correctIds: string[];
  selectCount?: number;
  viewBox: { width: number; height: number };
  diagramTitle?: string;
}

interface InteractiveDiagramProps {
  question: string;
  hint?: string;
  elements: DiagramElement[];
  correctIds: string[];
  selectCount?: number;
  viewBox: { width: number; height: number };
  diagramTitle?: string;
  onComplete?: (success: boolean) => void;
}

// --- Colors ---

const SELECTABLE_FILL = "#D4D8DD";
const HOVER_FILL = "#B8D4F0";
const SELECTED_FILL = "#1CB0F6";
const SELECTED_STROKE = "#0D8ECF";
const CORRECT_COLOR = "#58CC02";
const INCORRECT_COLOR = "#FF4B4B";
const MISSED_COLOR = "#FFC800";

// --- Component ---

export function InteractiveDiagram({
  question,
  hint,
  elements,
  correctIds,
  selectCount,
  viewBox,
  diagramTitle,
  onComplete,
}: InteractiveDiagramProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [validationResults, setValidationResults] = useState<Record<string, "correct" | "incorrect" | "missed"> | null>(null);

  const targetCount = selectCount ?? correctIds.length;

  // Set of all selectable element IDs
  const selectableIds = useMemo(
    () => new Set(elements.filter((el) => el.selectable).map((el) => el.id)),
    [elements]
  );

  // Label map for selected items display
  const labelMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const el of elements) {
      if (el.label) map.set(el.id, el.label);
    }
    return map;
  }, [elements]);

  const toggleElement = useCallback(
    (id: string) => {
      if (isComplete) return;
      if (!selectableIds.has(id)) return;

      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
      setFeedback(null);
      setValidationResults(null);
    },
    [isComplete, selectableIds]
  );

  const checkAnswer = useCallback(() => {
    const correctSet = new Set(correctIds);
    const results: Record<string, "correct" | "incorrect" | "missed"> = {};

    for (const id of selected) {
      results[id] = correctSet.has(id) ? "correct" : "incorrect";
    }
    for (const id of correctIds) {
      if (!selected.has(id)) {
        results[id] = "missed";
      }
    }

    setValidationResults(results);

    const allCorrect =
      selected.size === correctSet.size &&
      [...selected].every((id) => correctSet.has(id));

    if (allCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [selected, correctIds, onComplete]);

  const resetPuzzle = useCallback(() => {
    setSelected(new Set());
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setHoveredId(null);
    setValidationResults(null);
  }, []);

  // --- Determine fill color for an element ---
  const getElementFill = (el: DiagramElement): string => {
    if (!el.selectable) {
      return (el.style?.fill as string) ?? "#E8E8E8";
    }

    const validation = validationResults?.[el.id];
    if (validation === "correct") return CORRECT_COLOR;
    if (validation === "incorrect") return INCORRECT_COLOR;
    if (validation === "missed") return MISSED_COLOR;

    if (selected.has(el.id)) return SELECTED_FILL;
    if (hoveredId === el.id && !isComplete) return HOVER_FILL;
    return (el.style?.fill as string) ?? SELECTABLE_FILL;
  };

  const getElementStroke = (el: DiagramElement): string => {
    if (!el.selectable) {
      return (el.style?.stroke as string) ?? "#555";
    }
    if (selected.has(el.id)) return SELECTED_STROKE;
    return (el.style?.stroke as string) ?? "#555";
  };

  const getStrokeWidth = (el: DiagramElement): number => {
    if (!el.selectable) {
      return (el.style?.strokeWidth as number) ?? 1.5;
    }
    if (selected.has(el.id) || validationResults?.[el.id]) return 2.5;
    return (el.style?.strokeWidth as number) ?? 1.5;
  };

  // --- Render a single SVG element ---
  const renderElement = (el: DiagramElement) => {
    const isSelectable = el.selectable === true;
    const fill = getElementFill(el);
    const stroke = getElementStroke(el);
    const strokeWidth = getStrokeWidth(el);
    const opacity = (el.style?.opacity as number) ?? 1;
    const cursor = isSelectable && !isComplete ? "pointer" : "default";

    const interactionProps = isSelectable
      ? {
          onClick: () => toggleElement(el.id),
          onMouseEnter: () => setHoveredId(el.id),
          onMouseLeave: () => setHoveredId(null),
        }
      : {};

    const transitionClass = isSelectable ? "transition-colors duration-150" : undefined;

    switch (el.type) {
      case "path":
        return (
          <path
            key={el.id}
            d={el.attrs.d as string}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            cursor={cursor}
            className={transitionClass}
            {...interactionProps}
          >
            {el.label && <title>{el.label}</title>}
          </path>
        );

      case "rect":
        return (
          <rect
            key={el.id}
            x={el.attrs.x as number}
            y={el.attrs.y as number}
            width={el.attrs.width as number}
            height={el.attrs.height as number}
            rx={el.attrs.rx as number | undefined}
            ry={el.attrs.ry as number | undefined}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            cursor={cursor}
            className={transitionClass}
            {...interactionProps}
          >
            {el.label && <title>{el.label}</title>}
          </rect>
        );

      case "circle":
        return (
          <circle
            key={el.id}
            cx={el.attrs.cx as number}
            cy={el.attrs.cy as number}
            r={el.attrs.r as number}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            cursor={cursor}
            className={transitionClass}
            {...interactionProps}
          >
            {el.label && <title>{el.label}</title>}
          </circle>
        );

      case "ellipse":
        return (
          <ellipse
            key={el.id}
            cx={el.attrs.cx as number}
            cy={el.attrs.cy as number}
            rx={el.attrs.rx as number}
            ry={el.attrs.ry as number}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            cursor={cursor}
            className={transitionClass}
            {...interactionProps}
          >
            {el.label && <title>{el.label}</title>}
          </ellipse>
        );

      case "line":
        return (
          <line
            key={el.id}
            x1={el.attrs.x1 as number}
            y1={el.attrs.y1 as number}
            x2={el.attrs.x2 as number}
            y2={el.attrs.y2 as number}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            strokeLinecap="round"
            pointerEvents="none"
          />
        );

      case "polygon":
        return (
          <polygon
            key={el.id}
            points={el.attrs.points as string}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            cursor={cursor}
            className={transitionClass}
            {...interactionProps}
          >
            {el.label && <title>{el.label}</title>}
          </polygon>
        );

      case "polyline":
        return (
          <polyline
            key={el.id}
            points={el.attrs.points as string}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            pointerEvents="none"
          />
        );

      case "text": {
        const fontSize = (el.attrs.fontSize as number) ?? 14;
        const fontWeight = (el.attrs.fontWeight as string) ?? "normal";
        const textAnchor = ((el.attrs.textAnchor as string) ?? "middle") as "start" | "middle" | "end";
        const textFill = (el.style?.fill as string) ?? "#333";
        return (
          <text
            key={el.id}
            x={el.attrs.x as number}
            y={el.attrs.y as number}
            fontSize={fontSize}
            fontWeight={fontWeight}
            textAnchor={textAnchor}
            fill={textFill}
            pointerEvents="none"
            fontFamily="system-ui, sans-serif"
          >
            {el.attrs.content as string}
          </text>
        );
      }

      default:
        return null;
    }
  };

  // Selection indicator dots
  const selectionDots = Array.from({ length: targetCount }, (_, i) => {
    const selectedArr = [...selected];
    const filled = i < selectedArr.length;
    return (
      <div
        key={i}
        className={cn(
          "w-3 h-3 rounded-full border-2 transition-all",
          filled
            ? "bg-accent border-accent"
            : "bg-transparent border-muted-foreground/30"
        )}
      />
    );
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        {diagramTitle && (
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">
            {diagramTitle}
          </p>
        )}
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">
            {hint}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Feedback banner */}
        {feedback && (
          <div
            className={cn(
              "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
              feedback === "correct" ? "bg-primary" : "bg-destructive"
            )}
          >
            {feedback === "correct"
              ? "Correct! Well done!"
              : "Not quite — check the highlighted areas!"}
          </div>
        )}

        {/* Selection count */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">
            Select {targetCount} {targetCount === 1 ? "element" : "elements"}
          </span>
          <div className="flex gap-1.5">{selectionDots}</div>
        </div>

        {/* SVG Diagram */}
        <div className="rounded-2xl border-2 border-border bg-[#F8F9FA] p-3 flex justify-center">
          <svg
            viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
            className="w-full"
            style={{ maxHeight: "380px" }}
          >
            {elements.map((el) => renderElement(el))}
          </svg>
        </div>

        {/* Selected elements display */}
        {selected.size > 0 && !validationResults && (
          <div className="flex flex-wrap gap-2 justify-center">
            {[...selected].map((id) => (
              <span
                key={id}
                className="px-3 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent border border-accent/30"
              >
                {labelMap.get(id) ?? id}
              </span>
            ))}
          </div>
        )}

        {/* Validation results legend */}
        {validationResults && (
          <div className="flex flex-wrap gap-4 justify-center text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CORRECT_COLOR }} />
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: INCORRECT_COLOR }} />
              <span>Wrong</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MISSED_COLOR }} />
              <span>Missed</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
          {!isComplete && hint && !showHint && (
            <Button variant="outline" size="sm" onClick={() => setShowHint(true)}>
              Show hint
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={resetPuzzle}>
            Start over
          </Button>
          {!isComplete && (
            <Button
              size="sm"
              onClick={checkAnswer}
              disabled={selected.size === 0}
            >
              Check
            </Button>
          )}
          {isComplete && (
            <Button size="sm" onClick={() => onComplete?.(true)}>
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
