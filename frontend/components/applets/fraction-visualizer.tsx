"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface ShapeSection {
  id: string;
  /** Fraction of the whole this section represents, e.g. 0.25 for 1/4 */
  fractionValue: number;
  /** SVG path or rect coords for rendering */
  svg: {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
  } | {
    type: "path";
    d: string;
  } | {
    type: "arc";
    cx: number;
    cy: number;
    r: number;
    startAngle: number;
    endAngle: number;
  };
}

export interface FractionVisualizerContent {
  shape: "rectangle" | "circle" | "triangle";
  sections: ShapeSection[];
  targetNumerator: number;
  targetDenominator: number;
  /** SVG viewBox dimensions */
  viewBox: { width: number; height: number };
}

interface FractionVisualizerProps {
  question: string;
  hint?: string;
  shape: "rectangle" | "circle" | "triangle";
  sections: ShapeSection[];
  targetNumerator: number;
  targetDenominator: number;
  viewBox: { width: number; height: number };
  onComplete?: (success: boolean) => void;
}

// --- Helpers ---

const FILL_COLOR = "#7C9EF5";
const FILL_HOVER = "#9DB8F8";
const EMPTY_COLOR = "#FFFFFF";
const EMPTY_HOVER = "#F0F4FF";
const STROKE_COLOR = "#1A1A2E";
const CORRECT_COLOR = "#58CC02";
const INCORRECT_COLOR = "#FF4B4B";

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const sweep = endAngle - startAngle;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function fractionDisplay(num: number, den: number): string {
  return `${num}/${den}`;
}

// --- Component ---

export function FractionVisualizer({
  question,
  hint,
  sections,
  targetNumerator,
  targetDenominator,
  viewBox,
  onComplete,
}: FractionVisualizerProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const targetFraction = targetNumerator / targetDenominator;

  const selectedFraction = useMemo(() => {
    let total = 0;
    for (const section of sections) {
      if (selected.has(section.id)) {
        total += section.fractionValue;
      }
    }
    return total;
  }, [selected, sections]);

  // Find best numerator/denominator display for the selected amount
  const selectedDisplay = useMemo(() => {
    if (selected.size === 0) return "0";
    const num = Math.round(selectedFraction * targetDenominator);
    return fractionDisplay(num, targetDenominator);
  }, [selectedFraction, targetDenominator, selected.size]);

  const toggleSection = useCallback(
    (sectionId: string) => {
      if (isComplete) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(sectionId)) {
          next.delete(sectionId);
        } else {
          next.add(sectionId);
        }
        return next;
      });
      setFeedback(null);
    },
    [isComplete]
  );

  const checkAnswer = useCallback(() => {
    const epsilon = 0.001;
    if (Math.abs(selectedFraction - targetFraction) < epsilon) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [selectedFraction, targetFraction, onComplete]);

  const resetPuzzle = useCallback(() => {
    setSelected(new Set());
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
  }, []);

  const getSectionPath = (section: ShapeSection): React.ReactNode => {
    const isSelected = selected.has(section.id);
    const isHovered = hoveredId === section.id && !isComplete;

    let fill: string;
    if (feedback === "correct" && isSelected) {
      fill = CORRECT_COLOR;
    } else if (feedback === "incorrect" && isSelected) {
      fill = INCORRECT_COLOR;
    } else if (isSelected) {
      fill = isHovered ? FILL_HOVER : FILL_COLOR;
    } else {
      fill = isHovered ? EMPTY_HOVER : EMPTY_COLOR;
    }

    const commonProps = {
      fill,
      stroke: STROKE_COLOR,
      strokeWidth: 2.5,
      cursor: isComplete ? "default" : "pointer",
      onClick: () => toggleSection(section.id),
      onMouseEnter: () => setHoveredId(section.id),
      onMouseLeave: () => setHoveredId(null),
      className: "transition-colors duration-150",
    };

    if (section.svg.type === "rect") {
      return (
        <rect
          key={section.id}
          x={section.svg.x}
          y={section.svg.y}
          width={section.svg.width}
          height={section.svg.height}
          {...commonProps}
        />
      );
    } else if (section.svg.type === "path") {
      return (
        <path
          key={section.id}
          d={section.svg.d}
          {...commonProps}
        />
      );
    } else if (section.svg.type === "arc") {
      const d = arcPath(
        section.svg.cx,
        section.svg.cy,
        section.svg.r,
        section.svg.startAngle,
        section.svg.endAngle
      );
      return (
        <path
          key={section.id}
          d={d}
          {...commonProps}
        />
      );
    }
    return null;
  };

  // Progress indicator: how much is selected vs target
  const progressPercent = Math.min((selectedFraction / targetFraction) * 100, 150);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
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
              ? `Correct! You colored exactly ${fractionDisplay(targetNumerator, targetDenominator)} of the shape!`
              : `Not quite! You colored ${selectedDisplay}, but the target is ${fractionDisplay(targetNumerator, targetDenominator)}.`}
          </div>
        )}

        {/* Fraction target display */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Target</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-3xl font-bold text-foreground">
                <sup className="text-2xl">{targetNumerator}</sup>
                <span className="mx-0.5">/</span>
                <sub className="text-2xl">{targetDenominator}</sub>
              </span>
            </div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Selected</span>
            <div className="flex items-center gap-1 mt-1">
              <span className={cn(
                "text-3xl font-bold transition-colors",
                feedback === "correct" ? "text-primary" :
                feedback === "incorrect" ? "text-destructive" : "text-accent"
              )}>
                {selected.size === 0 ? (
                  <span className="text-muted-foreground/50">0</span>
                ) : (
                  selectedDisplay
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full max-w-xs mx-auto rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              progressPercent > 100 ? "bg-destructive" :
              Math.abs(progressPercent - 100) < 1 ? "bg-primary" : "bg-accent"
            )}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>

        {/* Shape SVG */}
        <div className="flex justify-center">
          <svg
            viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
            className="w-full max-w-sm"
            style={{ maxHeight: "320px" }}
          >
            {sections.map((section) => getSectionPath(section))}
          </svg>
        </div>

        {/* Instruction */}
        {!isComplete && (
          <p className="text-center text-sm text-muted-foreground">
            Click sections to color them. Click again to uncolor.
          </p>
        )}

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
          {!isComplete && hint && !showHint && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(true)}
            >
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
