"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

interface Point {
  x: number;
  y: number;
}

export interface SlopeGraphPuzzle {
  id: string;
  question: string;
  hint?: string;
  startPoint: Point;
  targetPoint: Point;
  gridSize?: number; // default 7 (0-6)
}

interface SlopeGraphProps {
  question: string;
  hint?: string;
  startPoint: Point;
  targetPoint: Point;
  gridSize?: number;
  onComplete?: (success: boolean) => void;
}

// --- Component ---

export function SlopeGraph({
  question,
  hint,
  startPoint,
  targetPoint,
  gridSize = 7,
  onComplete,
}: SlopeGraphProps) {
  const [currentPoint, setCurrentPoint] = useState<Point>({ ...startPoint });
  const [isDragging, setIsDragging] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showTrail, setShowTrail] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const maxVal = gridSize - 1; // e.g. 6 for gridSize=7

  // SVG layout constants
  const padding = 40;
  const svgSize = 400;
  const graphSize = svgSize - padding * 2;
  const cellSize = graphSize / maxVal;

  // Convert grid coords to SVG coords
  const toSvgX = useCallback(
    (x: number) => padding + x * cellSize,
    [cellSize]
  );
  const toSvgY = useCallback(
    (y: number) => padding + (maxVal - y) * cellSize,
    [cellSize, maxVal]
  );

  // Convert SVG coords to nearest grid point
  const toGridCoords = useCallback(
    (svgX: number, svgY: number): Point => {
      const x = Math.round((svgX - padding) / cellSize);
      const y = Math.round((maxVal - (svgY - padding) / cellSize));
      return {
        x: Math.max(0, Math.min(maxVal, x)),
        y: Math.max(0, Math.min(maxVal, y)),
      };
    },
    [cellSize, maxVal]
  );

  // Get SVG position from mouse/touch event
  const getSvgPosition = useCallback(
    (clientX: number, clientY: number): { svgX: number; svgY: number } | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      const svgX = ((clientX - rect.left) / rect.width) * svgSize;
      const svgY = ((clientY - rect.top) / rect.height) * svgSize;
      return { svgX, svgY };
    },
    []
  );

  // Check if point matches target
  const checkAnswer = useCallback(
    (point: Point) => {
      if (point.x === targetPoint.x && point.y === targetPoint.y) {
        setFeedback("correct");
        setIsComplete(true);
        onComplete?.(true);
      }
    },
    [targetPoint, onComplete]
  );

  // --- Mouse handlers ---

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isComplete) return;
      const pos = getSvgPosition(e.clientX, e.clientY);
      if (!pos) return;
      const gridPos = toGridCoords(pos.svgX, pos.svgY);
      // Only start dragging if clicking near the current point
      const dist = Math.abs(gridPos.x - currentPoint.x) + Math.abs(gridPos.y - currentPoint.y);
      if (dist <= 1) {
        setIsDragging(true);
        setShowTrail(true);
      }
    },
    [isComplete, getSvgPosition, toGridCoords, currentPoint]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || isComplete) return;
      const pos = getSvgPosition(e.clientX, e.clientY);
      if (!pos) return;
      const gridPos = toGridCoords(pos.svgX, pos.svgY);
      if (gridPos.x !== currentPoint.x || gridPos.y !== currentPoint.y) {
        setCurrentPoint(gridPos);
      }
    },
    [isDragging, isComplete, getSvgPosition, toGridCoords, currentPoint]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      checkAnswer(currentPoint);
    }
  }, [isDragging, currentPoint, checkAnswer]);

  // --- Touch handlers ---

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isComplete) return;
      const touch = e.touches[0];
      if (!touch) return;
      const pos = getSvgPosition(touch.clientX, touch.clientY);
      if (!pos) return;
      const gridPos = toGridCoords(pos.svgX, pos.svgY);
      const dist = Math.abs(gridPos.x - currentPoint.x) + Math.abs(gridPos.y - currentPoint.y);
      if (dist <= 1) {
        setIsDragging(true);
        setShowTrail(true);
      }
    },
    [isComplete, getSvgPosition, toGridCoords, currentPoint]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isComplete) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      const pos = getSvgPosition(touch.clientX, touch.clientY);
      if (!pos) return;
      const gridPos = toGridCoords(pos.svgX, pos.svgY);
      if (gridPos.x !== currentPoint.x || gridPos.y !== currentPoint.y) {
        setCurrentPoint(gridPos);
      }
    },
    [isDragging, isComplete, getSvgPosition, toGridCoords, currentPoint]
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      checkAnswer(currentPoint);
    }
  }, [isDragging, currentPoint, checkAnswer]);

  // --- Click on grid intersection ---

  const handleGridClick = useCallback(
    (e: React.MouseEvent) => {
      if (isComplete || isDragging) return;
      const pos = getSvgPosition(e.clientX, e.clientY);
      if (!pos) return;
      const gridPos = toGridCoords(pos.svgX, pos.svgY);
      setCurrentPoint(gridPos);
      setShowTrail(true);
      // Auto-check after click
      if (gridPos.x === targetPoint.x && gridPos.y === targetPoint.y) {
        setFeedback("correct");
        setIsComplete(true);
        onComplete?.(true);
      }
    },
    [isComplete, isDragging, getSvgPosition, toGridCoords, targetPoint, onComplete]
  );

  // Global mouse up listener for dragging outside SVG
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        checkAnswer(currentPoint);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging, currentPoint, checkAnswer]);

  const resetPuzzle = () => {
    setCurrentPoint({ ...startPoint });
    setIsDragging(false);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setShowTrail(false);
  };

  // Calculate slope info for display
  const dx = currentPoint.x - startPoint.x;
  const dy = currentPoint.y - startPoint.y;
  const showSlopeInfo = showTrail && (dx !== 0 || dy !== 0);

  return (
    <Card className="w-full max-w-lg mx-auto">
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
              : "Not quite - try again!"}
          </div>
        )}

        {/* Graph */}
        <div className="relative w-full max-w-md mx-auto aspect-square">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className={cn(
              "w-full h-full select-none",
              !isComplete && "cursor-crosshair"
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleGridClick}
          >
            {/* Grid dots */}
            {Array.from({ length: gridSize }, (_, xi) =>
              Array.from({ length: gridSize }, (_, yi) => (
                <circle
                  key={`dot-${xi}-${yi}`}
                  cx={toSvgX(xi)}
                  cy={toSvgY(yi)}
                  r={1.5}
                  className="fill-gray-300 dark:fill-gray-600"
                />
              ))
            )}

            {/* X axis */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(maxVal) + 15}
              y2={toSvgY(0)}
              stroke="currentColor"
              strokeWidth={2}
              className="text-foreground"
            />
            {/* X axis arrow */}
            <polygon
              points={`${toSvgX(maxVal) + 15},${toSvgY(0)} ${toSvgX(maxVal) + 8},${toSvgY(0) - 5} ${toSvgX(maxVal) + 8},${toSvgY(0) + 5}`}
              className="fill-foreground"
            />

            {/* Y axis */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(0)}
              y2={toSvgY(maxVal) - 15}
              stroke="currentColor"
              strokeWidth={2}
              className="text-foreground"
            />
            {/* Y axis arrow */}
            <polygon
              points={`${toSvgX(0)},${toSvgY(maxVal) - 15} ${toSvgX(0) - 5},${toSvgY(maxVal) - 8} ${toSvgX(0) + 5},${toSvgY(maxVal) - 8}`}
              className="fill-foreground"
            />

            {/* X axis tick marks and labels */}
            {Array.from({ length: maxVal }, (_, i) => {
              const val = i + 1;
              return (
                <g key={`x-tick-${val}`}>
                  <line
                    x1={toSvgX(val)}
                    y1={toSvgY(0) - 4}
                    x2={toSvgX(val)}
                    y2={toSvgY(0) + 4}
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-foreground"
                  />
                  <text
                    x={toSvgX(val)}
                    y={toSvgY(0) + 20}
                    textAnchor="middle"
                    className="fill-foreground text-[13px] font-semibold"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Y axis tick marks and labels */}
            {Array.from({ length: maxVal }, (_, i) => {
              const val = i + 1;
              return (
                <g key={`y-tick-${val}`}>
                  <line
                    x1={toSvgX(0) - 4}
                    y1={toSvgY(val)}
                    x2={toSvgX(0) + 4}
                    y2={toSvgY(val)}
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-foreground"
                  />
                  <text
                    x={toSvgX(0) - 14}
                    y={toSvgY(val) + 5}
                    textAnchor="middle"
                    className="fill-foreground text-[13px] font-semibold"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Trail: dashed lines showing movement from start to current */}
            {showTrail && (dx !== 0 || dy !== 0) && (
              <>
                {/* Horizontal component (run) */}
                <line
                  x1={toSvgX(startPoint.x)}
                  y1={toSvgY(startPoint.y)}
                  x2={toSvgX(currentPoint.x)}
                  y2={toSvgY(startPoint.y)}
                  stroke="#1CB0F6"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  opacity={0.7}
                />
                {/* Vertical component (rise) */}
                <line
                  x1={toSvgX(currentPoint.x)}
                  y1={toSvgY(startPoint.y)}
                  x2={toSvgX(currentPoint.x)}
                  y2={toSvgY(currentPoint.y)}
                  stroke="#FF4B4B"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  opacity={0.7}
                />
                {/* Run label */}
                {dx !== 0 && (
                  <text
                    x={toSvgX(startPoint.x + dx / 2)}
                    y={toSvgY(startPoint.y) + 18}
                    textAnchor="middle"
                    className="text-[12px] font-bold"
                    fill="#1CB0F6"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {dx > 0 ? `+${dx}` : dx}
                  </text>
                )}
                {/* Rise label */}
                {dy !== 0 && (
                  <text
                    x={toSvgX(currentPoint.x) + 16}
                    y={toSvgY(startPoint.y + dy / 2) + 4}
                    textAnchor="start"
                    className="text-[12px] font-bold"
                    fill="#FF4B4B"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {dy > 0 ? `+${dy}` : dy}
                  </text>
                )}
              </>
            )}

            {/* Start point marker (ghost) */}
            {showTrail && (startPoint.x !== currentPoint.x || startPoint.y !== currentPoint.y) && (
              <circle
                cx={toSvgX(startPoint.x)}
                cy={toSvgY(startPoint.y)}
                r={6}
                className="fill-gray-300 dark:fill-gray-600"
                opacity={0.5}
              />
            )}

            {/* Current point - outer glow when dragging */}
            {isDragging && (
              <circle
                cx={toSvgX(currentPoint.x)}
                cy={toSvgY(currentPoint.y)}
                r={18}
                fill="#1CB0F6"
                opacity={0.15}
              />
            )}

            {/* Current point - halo */}
            <circle
              cx={toSvgX(currentPoint.x)}
              cy={toSvgY(currentPoint.y)}
              r={isDragging ? 14 : 10}
              fill="white"
              className="transition-all duration-150"
            />

            {/* Current point - main dot */}
            <circle
              cx={toSvgX(currentPoint.x)}
              cy={toSvgY(currentPoint.y)}
              r={isDragging ? 10 : 6}
              fill={isComplete ? "#58CC02" : "#1CB0F6"}
              className="transition-all duration-150"
              style={{
                filter: isDragging ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" : "none",
              }}
            />
          </svg>
        </div>

        {/* Slope info display */}
        {showSlopeInfo && !isComplete && (
          <div className="flex items-center justify-center gap-4 text-sm font-semibold">
            <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent">
              Run: {dx > 0 ? `+${dx}` : dx}
            </span>
            <span className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive">
              Rise: {dy > 0 ? `+${dy}` : dy}
            </span>
            {dx !== 0 && (
              <span className="px-3 py-1 rounded-lg bg-warning/10 text-warning">
                Slope: {dy}/{dx}
                {Number.isInteger(dy / dx) ? ` = ${dy / dx}` : ""}
              </span>
            )}
          </div>
        )}

        {/* Coordinate display */}
        <p className="text-center text-sm text-muted-foreground">
          Point: ({currentPoint.x}, {currentPoint.y})
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

// Note: Puzzle content is now stored in the database.
// Use the API to fetch puzzles: GET /applets?type=slope-graph
