"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export type VennRegionId = "a-only" | "b-only" | "a-and-b" | "neither";

export interface VennDiagramContent {
  labels: [string, string];
  correctRegions: VennRegionId[];
}

interface VennDiagramProps {
  question: string;
  hint?: string;
  labels: [string, string];
  correctRegions: VennRegionId[];
  onComplete?: (success: boolean) => void;
}

// Color for selected regions
const SELECTED_COLOR = "#58CC02"; // Primary green
const HOVER_COLOR = "#89E219"; // Lighter green for hover

// --- Component ---

export function VennDiagram({
  question,
  hint,
  labels,
  correctRegions,
  onComplete,
}: VennDiagramProps) {
  const [selectedRegions, setSelectedRegions] = useState<Set<VennRegionId>>(new Set());
  const [hoveredRegion, setHoveredRegion] = useState<VennRegionId | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const toggleRegion = useCallback(
    (regionId: VennRegionId) => {
      if (isComplete) return;

      setSelectedRegions((prev) => {
        const next = new Set(prev);
        if (next.has(regionId)) {
          next.delete(regionId);
        } else {
          next.add(regionId);
        }
        return next;
      });
      setFeedback(null);
    },
    [isComplete]
  );

  const checkAnswer = useCallback(() => {
    const selectedArray = Array.from(selectedRegions).sort();
    const correctArray = [...correctRegions].sort();

    const isCorrect =
      selectedArray.length === correctArray.length &&
      selectedArray.every((r, i) => r === correctArray[i]);

    if (isCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [selectedRegions, correctRegions, onComplete]);

  const resetPuzzle = useCallback(() => {
    setSelectedRegions(new Set());
    setHoveredRegion(null);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
  }, []);

  const getRegionFill = (regionId: VennRegionId): string => {
    if (selectedRegions.has(regionId)) {
      return SELECTED_COLOR;
    }
    if (hoveredRegion === regionId && !isComplete) {
      return HOVER_COLOR;
    }
    return "transparent";
  };

  const getRegionOpacity = (regionId: VennRegionId): number => {
    if (selectedRegions.has(regionId)) {
      return 0.6;
    }
    if (hoveredRegion === regionId && !isComplete) {
      return 0.3;
    }
    return 0;
  };

  // SVG dimensions and circle positions
  const width = 400;
  const height = 300;
  const circleRadius = 100;
  const circleAX = 150;
  const circleBX = 250;
  const circleY = 150;
  const overlap = 50; // How much circles overlap

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

      <CardContent className="space-y-4">
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
              : "Not quite — check your selection!"}
          </div>
        )}

        {/* Venn Diagram SVG */}
        <div className="flex justify-center">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="max-w-full h-auto"
          >
            {/* Definitions for clip paths */}
            <defs>
              {/* Circle A path */}
              <clipPath id="clipA">
                <circle cx={circleAX} cy={circleY} r={circleRadius} />
              </clipPath>
              {/* Circle B path */}
              <clipPath id="clipB">
                <circle cx={circleBX} cy={circleY} r={circleRadius} />
              </clipPath>
              {/* Intersection clip - A AND B */}
              <clipPath id="clipIntersection">
                <circle cx={circleAX} cy={circleY} r={circleRadius} />
              </clipPath>
            </defs>

            {/* Background/Neither region */}
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill={getRegionFill("neither")}
              fillOpacity={getRegionOpacity("neither")}
              className={cn(
                "cursor-pointer transition-all duration-150",
                !isComplete && "hover:fill-opacity-30"
              )}
              onClick={() => toggleRegion("neither")}
              onMouseEnter={() => !isComplete && setHoveredRegion("neither")}
              onMouseLeave={() => setHoveredRegion(null)}
            />

            {/* Circle A - full circle (will be covered by intersection) */}
            <circle
              cx={circleAX}
              cy={circleY}
              r={circleRadius}
              fill={getRegionFill("a-only")}
              fillOpacity={getRegionOpacity("a-only")}
              stroke="#374151"
              strokeWidth="3"
              className={cn(
                "cursor-pointer transition-all duration-150"
              )}
              onClick={() => toggleRegion("a-only")}
              onMouseEnter={() => !isComplete && setHoveredRegion("a-only")}
              onMouseLeave={() => setHoveredRegion(null)}
            />

            {/* Circle B - full circle (will be covered by intersection) */}
            <circle
              cx={circleBX}
              cy={circleY}
              r={circleRadius}
              fill={getRegionFill("b-only")}
              fillOpacity={getRegionOpacity("b-only")}
              stroke="#374151"
              strokeWidth="3"
              className={cn(
                "cursor-pointer transition-all duration-150"
              )}
              onClick={() => toggleRegion("b-only")}
              onMouseEnter={() => !isComplete && setHoveredRegion("b-only")}
              onMouseLeave={() => setHoveredRegion(null)}
            />

            {/* Intersection region - using lens shape */}
            <path
              d={`
                M ${circleAX + overlap} ${circleY - Math.sqrt(circleRadius * circleRadius - overlap * overlap)}
                A ${circleRadius} ${circleRadius} 0 0 1 ${circleAX + overlap} ${circleY + Math.sqrt(circleRadius * circleRadius - overlap * overlap)}
                A ${circleRadius} ${circleRadius} 0 0 1 ${circleAX + overlap} ${circleY - Math.sqrt(circleRadius * circleRadius - overlap * overlap)}
              `}
              fill={getRegionFill("a-and-b")}
              fillOpacity={getRegionOpacity("a-and-b")}
              className={cn(
                "cursor-pointer transition-all duration-150"
              )}
              onClick={() => toggleRegion("a-and-b")}
              onMouseEnter={() => !isComplete && setHoveredRegion("a-and-b")}
              onMouseLeave={() => setHoveredRegion(null)}
            />

            {/* Re-draw intersection lens for proper clicking */}
            {(() => {
              // Calculate intersection points
              const d = circleBX - circleAX; // distance between centers
              const a = (d * d) / (2 * d); // distance from A center to chord
              const h = Math.sqrt(circleRadius * circleRadius - a * a); // half chord length

              const intersectX = circleAX + a;
              const topY = circleY - h;
              const bottomY = circleY + h;

              return (
                <path
                  d={`
                    M ${intersectX} ${topY}
                    A ${circleRadius} ${circleRadius} 0 0 1 ${intersectX} ${bottomY}
                    A ${circleRadius} ${circleRadius} 0 0 1 ${intersectX} ${topY}
                  `}
                  fill={getRegionFill("a-and-b")}
                  fillOpacity={getRegionOpacity("a-and-b")}
                  stroke="none"
                  className={cn(
                    "cursor-pointer transition-all duration-150"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRegion("a-and-b");
                  }}
                  onMouseEnter={() => !isComplete && setHoveredRegion("a-and-b")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
              );
            })()}

            {/* Proper lens/intersection shape */}
            {(() => {
              const d = circleBX - circleAX;
              const r = circleRadius;
              // Intersection points
              const a = d / 2;
              const h = Math.sqrt(r * r - a * a);

              const p1x = circleAX + a;
              const p1y = circleY - h;
              const p2x = circleAX + a;
              const p2y = circleY + h;

              return (
                <path
                  d={`
                    M ${p1x} ${p1y}
                    A ${r} ${r} 0 0 0 ${p2x} ${p2y}
                    A ${r} ${r} 0 0 0 ${p1x} ${p1y}
                  `}
                  fill={getRegionFill("a-and-b")}
                  fillOpacity={selectedRegions.has("a-and-b") ? 0.6 : (hoveredRegion === "a-and-b" ? 0.3 : 0)}
                  stroke="none"
                  className="cursor-pointer transition-all duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRegion("a-and-b");
                  }}
                  onMouseEnter={() => !isComplete && setHoveredRegion("a-and-b")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
              );
            })()}

            {/* Circle outlines on top */}
            <circle
              cx={circleAX}
              cy={circleY}
              r={circleRadius}
              fill="none"
              stroke="#374151"
              strokeWidth="3"
              pointerEvents="none"
            />
            <circle
              cx={circleBX}
              cy={circleY}
              r={circleRadius}
              fill="none"
              stroke="#374151"
              strokeWidth="3"
              pointerEvents="none"
            />

            {/* Labels */}
            <text
              x={circleAX - 50}
              y={circleY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl font-bold fill-foreground"
              pointerEvents="none"
            >
              {labels[0]}
            </text>
            <text
              x={circleBX + 50}
              y={circleY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl font-bold fill-foreground"
              pointerEvents="none"
            >
              {labels[1]}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-6 h-6 rounded border-2 border-gray-400 transition-colors",
                selectedRegions.has("a-only") && "bg-primary/60"
              )}
            />
            <span>{labels[0]} only</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-6 h-6 rounded border-2 border-gray-400 transition-colors",
                selectedRegions.has("a-and-b") && "bg-primary/60"
              )}
            />
            <span>{labels[0]} ∩ {labels[1]}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-6 h-6 rounded border-2 border-gray-400 transition-colors",
                selectedRegions.has("b-only") && "bg-primary/60"
              )}
            />
            <span>{labels[1]} only</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-6 h-6 rounded border-2 border-gray-400 transition-colors",
                selectedRegions.has("neither") && "bg-primary/60"
              )}
            />
            <span>Neither</span>
          </div>
        </div>

        {/* Selection count */}
        <p className="text-center text-sm text-muted-foreground">
          {selectedRegions.size} region{selectedRegions.size !== 1 ? "s" : ""} selected
        </p>

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
              disabled={selectedRegions.size === 0}
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

// Note: Venn diagram content is stored in the database.
// Use the API to fetch puzzles: GET /applets?type=venn-diagram
