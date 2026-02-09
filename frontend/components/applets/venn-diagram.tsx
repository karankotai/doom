"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

// Region ID is a string of circle letters that are included (e.g., "A", "AB", "ABC", "none")
export type VennRegionId = string;

// Legacy support for 2-circle diagrams
export type LegacyVennRegionId = "a-only" | "b-only" | "a-and-b" | "neither";

interface VennDiagramProps {
  question: string;
  hint?: string;
  labels: string[];
  correctRegions: string[];
  onComplete?: (success: boolean) => void;
}

// Circle colors for visual distinction
const CIRCLE_COLORS = [
  { stroke: "#3B82F6", label: "A" }, // Blue
  { stroke: "#EF4444", label: "B" }, // Red
  { stroke: "#22C55E", label: "C" }, // Green
  { stroke: "#F59E0B", label: "D" }, // Amber
  { stroke: "#8B5CF6", label: "E" }, // Purple
];

const SELECTED_COLOR = "#6C63FF";
const HOVER_COLOR = "#8B85FF";

// --- Geometry helpers ---

interface Point {
  x: number;
  y: number;
}

interface Circle {
  cx: number;
  cy: number;
  r: number;
  label: string;
}

// Check if a point is inside a circle
function isInsideCircle(p: Point, c: Circle): boolean {
  const dx = p.x - c.cx;
  const dy = p.y - c.cy;
  return dx * dx + dy * dy < c.r * c.r - 0.1; // Small epsilon for edge cases
}

// Get region ID for a point given circles
function getRegionForPoint(p: Point, circles: Circle[]): string {
  const inside = circles.filter((c) => isInsideCircle(p, c));
  if (inside.length === 0) return "none";
  return inside.map((c) => c.label).sort().join("");
}

// Generate all possible region IDs for n circles
function generateAllRegions(n: number): string[] {
  const labels = CIRCLE_COLORS.slice(0, n).map((c) => c.label);
  const regions: string[] = ["none"];

  // Generate all non-empty subsets
  for (let i = 1; i < Math.pow(2, n); i++) {
    let region = "";
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        region += labels[j];
      }
    }
    regions.push(region);
  }

  return regions;
}

// Convert legacy region IDs to new format
function convertLegacyRegion(region: string): string {
  switch (region) {
    case "a-only": return "A";
    case "b-only": return "B";
    case "a-and-b": return "AB";
    case "neither": return "none";
    default: return region;
  }
}

// Get circle positions for n circles
function getCirclePositions(n: number, width: number, height: number, radius: number): Circle[] {
  const circles: Circle[] = [];
  const cx = width / 2;
  const cy = height / 2;

  if (n === 2) {
    const offset = radius * 0.6;
    circles.push({ cx: cx - offset, cy, r: radius, label: "A" });
    circles.push({ cx: cx + offset, cy, r: radius, label: "B" });
  } else if (n === 3) {
    // Classic 3-circle Venn diagram
    const offset = radius * 0.6;
    const yOffset = radius * 0.35;
    circles.push({ cx: cx - offset, cy: cy + yOffset, r: radius, label: "A" });
    circles.push({ cx: cx + offset, cy: cy + yOffset, r: radius, label: "B" });
    circles.push({ cx: cx, cy: cy - yOffset * 1.2, r: radius, label: "C" });
  } else if (n === 4) {
    // 4 circles in a square-ish arrangement
    const offset = radius * 0.5;
    circles.push({ cx: cx - offset, cy: cy - offset * 0.6, r: radius, label: "A" });
    circles.push({ cx: cx + offset, cy: cy - offset * 0.6, r: radius, label: "B" });
    circles.push({ cx: cx - offset, cy: cy + offset * 0.6, r: radius, label: "C" });
    circles.push({ cx: cx + offset, cy: cy + offset * 0.6, r: radius, label: "D" });
  } else if (n === 5) {
    // 5 circles - pentagon arrangement with center overlap
    const offset = radius * 0.55;
    circles.push({ cx: cx, cy: cy - offset, r: radius, label: "A" });
    circles.push({ cx: cx + offset * 0.95, cy: cy - offset * 0.3, r: radius, label: "B" });
    circles.push({ cx: cx + offset * 0.6, cy: cy + offset * 0.8, r: radius, label: "C" });
    circles.push({ cx: cx - offset * 0.6, cy: cy + offset * 0.8, r: radius, label: "D" });
    circles.push({ cx: cx - offset * 0.95, cy: cy - offset * 0.3, r: radius, label: "E" });
  }

  return circles;
}

// --- Component ---

export function VennDiagram({
  question,
  hint,
  labels,
  correctRegions: rawCorrectRegions,
  onComplete,
}: VennDiagramProps) {
  const numCircles = Math.min(Math.max(labels.length, 2), 5);

  // Convert legacy region IDs if needed
  const correctRegions = useMemo(() =>
    rawCorrectRegions.map(convertLegacyRegion),
    [rawCorrectRegions]
  );

  // SVG dimensions
  const width = 450;
  const height = numCircles <= 3 ? 350 : 400;
  const radius = numCircles <= 3 ? 100 : (numCircles === 4 ? 90 : 80);

  // Calculate circle positions
  const circles = useMemo(() =>
    getCirclePositions(numCircles, width, height, radius),
    [numCircles, width, height, radius]
  );

  // Generate all possible regions
  const allRegions = useMemo(() =>
    generateAllRegions(numCircles),
    [numCircles]
  );

  // State
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(new Set());
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const toggleRegion = useCallback(
    (regionId: string) => {
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

  // Handle click on SVG - determine which region was clicked
  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (isComplete) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const region = getRegionForPoint({ x, y }, circles);
    toggleRegion(region);
  }, [circles, isComplete, toggleRegion, width, height]);

  // Handle mouse move for hover effects
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (isComplete) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const region = getRegionForPoint({ x, y }, circles);
    setHoveredRegion(region);
  }, [circles, isComplete, width, height]);

  // Get display name for a region
  const getRegionDisplayName = (region: string): string => {
    if (region === "none") return "Neither";

    const parts = region.split("").map((letter) => {
      const idx = letter.charCodeAt(0) - 65;
      return labels[idx] || letter;
    });

    if (parts.length === 1) return `${parts[0]} only`;
    return parts.join(" ∩ ");
  };

  // Generate colored regions as paths for visualization
  const regionPaths = useMemo(() => {
    // Create a grid of points and assign each to a region
    const resolution = 3;
    const points: { x: number; y: number; region: string }[] = [];

    for (let x = 0; x < width; x += resolution) {
      for (let y = 0; y < height; y += resolution) {
        points.push({ x, y, region: getRegionForPoint({ x, y }, circles) });
      }
    }

    return points;
  }, [circles, width, height]);

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
            className="max-w-full h-auto cursor-pointer"
            onClick={handleSvgClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            {/* Background */}
            <rect x="0" y="0" width={width} height={height} fill="#131829" />

            {/* Render colored points for regions */}
            {regionPaths.map((p, i) => {
              const isSelected = selectedRegions.has(p.region);
              const isHovered = hoveredRegion === p.region;

              if (!isSelected && !isHovered) return null;

              return (
                <rect
                  key={i}
                  x={p.x}
                  y={p.y}
                  width={3}
                  height={3}
                  fill={isSelected ? SELECTED_COLOR : HOVER_COLOR}
                  fillOpacity={isSelected ? 0.6 : 0.3}
                  pointerEvents="none"
                />
              );
            })}

            {/* Circle outlines */}
            {circles.map((circle, i) => (
              <circle
                key={i}
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
                fill="none"
                stroke={CIRCLE_COLORS[i]?.stroke || "#374151"}
                strokeWidth="3"
                pointerEvents="none"
              />
            ))}

            {/* Labels */}
            {circles.map((circle, i) => {
              // Position label outside the circle
              const angle = numCircles === 2
                ? (i === 0 ? Math.PI : 0)
                : (i * 2 * Math.PI / numCircles) - Math.PI / 2;
              const labelOffset = radius + 25;
              const lx = circle.cx + Math.cos(angle) * labelOffset * 0.5;
              const ly = circle.cy + Math.sin(angle) * labelOffset * 0.5;

              return (
                <text
                  key={`label-${i}`}
                  x={numCircles === 2 ? (i === 0 ? circle.cx - 50 : circle.cx + 50) : lx}
                  y={numCircles === 2 ? circle.cy : ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-bold"
                  fill={CIRCLE_COLORS[i]?.stroke || "#374151"}
                  pointerEvents="none"
                >
                  {labels[i]}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend - show selected regions */}
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {allRegions.filter(r => selectedRegions.has(r) || r === hoveredRegion).slice(0, 8).map((region) => (
            <div
              key={region}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-lg border transition-colors",
                selectedRegions.has(region)
                  ? "bg-primary/20 border-primary"
                  : "bg-muted border-border"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded",
                  selectedRegions.has(region) ? "bg-primary/60" : "bg-muted"
                )}
              />
              <span className="text-xs">{getRegionDisplayName(region)}</span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <p className="text-center text-sm text-muted-foreground">
          Click on regions to select/deselect them
        </p>

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
