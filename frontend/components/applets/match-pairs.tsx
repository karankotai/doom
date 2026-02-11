"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface MatchItem {
  id: string;
  text: string;
}

export interface MatchPairsContent {
  leftItems: MatchItem[];
  rightItems: MatchItem[];
  correctPairs: Record<string, string>; // leftId -> rightId
  leftColumnLabel?: string;
  rightColumnLabel?: string;
}

interface MatchPairsProps {
  question: string;
  hint?: string;
  leftItems: MatchItem[];
  rightItems: MatchItem[];
  correctPairs: Record<string, string>;
  leftColumnLabel?: string;
  rightColumnLabel?: string;
  onComplete?: (success: boolean) => void;
}

// --- Line colors ---

const LINE_COLORS = [
  "#6B3FA0", // purple
  "#1CB0F6", // blue
  "#E05D44", // coral
  "#58CC02", // green
  "#FFC800", // yellow
  "#FF86D0", // pink
  "#00C9A7", // teal
  "#FF6F00", // orange
];

const CORRECT_COLOR = "#58CC02";
const INCORRECT_COLOR = "#FF4B4B";

// --- Helpers ---

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = temp;
  }
  return copy;
}

// --- Component ---

export function MatchPairs({
  question,
  hint,
  leftItems,
  rightItems,
  correctPairs,
  leftColumnLabel,
  rightColumnLabel,
  onComplete,
}: MatchPairsProps) {
  // Shuffle right items so they aren't already aligned
  const shuffledRight = useMemo(() => {
    let shuffled = shuffleArray(rightItems);
    // Ensure at least one is out of place
    let attempts = 0;
    while (attempts < 10 && shuffled.every((item, i) => {
      const leftId = leftItems[i]?.id;
      return leftId ? correctPairs[leftId] === item.id : false;
    })) {
      shuffled = shuffleArray(rightItems);
      attempts++;
    }
    return shuffled;
  }, [rightItems, leftItems, correctPairs]);

  // pairs: leftId -> rightId
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const [activeRight, setActiveRight] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [validationResults, setValidationResults] = useState<Record<string, "correct" | "incorrect"> | null>(null);
  const [hoveredLeft, setHoveredLeft] = useState<string | null>(null);
  const [hoveredRight, setHoveredRight] = useState<string | null>(null);

  // Refs for measuring positions
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const rightRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [linePositions, setLinePositions] = useState<Map<string, { x1: number; y1: number; x2: number; y2: number }>>(new Map());

  // Track which right items are already paired
  const pairedRightIds = useMemo(() => new Set(Object.values(pairs)), [pairs]);
  // Reverse map: rightId -> leftId
  const reversePairs = useMemo(() => {
    const map: Record<string, string> = {};
    for (const [l, r] of Object.entries(pairs)) {
      map[r] = l;
    }
    return map;
  }, [pairs]);

  // Compute line positions whenever pairs change
  const computeLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions = new Map<string, { x1: number; y1: number; x2: number; y2: number }>();

    for (const [leftId, rightId] of Object.entries(pairs)) {
      const leftEl = leftRefs.current.get(leftId);
      const rightEl = rightRefs.current.get(rightId);
      if (leftEl && rightEl) {
        const lr = leftEl.getBoundingClientRect();
        const rr = rightEl.getBoundingClientRect();
        newPositions.set(leftId, {
          x1: lr.right - containerRect.left,
          y1: lr.top + lr.height / 2 - containerRect.top,
          x2: rr.left - containerRect.left,
          y2: rr.top + rr.height / 2 - containerRect.top,
        });
      }
    }
    setLinePositions(newPositions);
  }, [pairs]);

  useEffect(() => {
    computeLines();
    window.addEventListener("resize", computeLines);
    return () => window.removeEventListener("resize", computeLines);
  }, [computeLines]);

  // After DOM settles, recompute once
  useEffect(() => {
    const timer = setTimeout(computeLines, 50);
    return () => clearTimeout(timer);
  }, [pairs, computeLines]);

  // --- Interaction logic ---

  const makePair = useCallback(
    (leftId: string, rightId: string) => {
      if (isComplete) return;
      setPairs((prev) => {
        const next = { ...prev };
        // Remove any existing pair for this left
        delete next[leftId];
        // Remove any existing pair pointing to this right
        for (const [k, v] of Object.entries(next)) {
          if (v === rightId) delete next[k];
        }
        next[leftId] = rightId;
        return next;
      });
      setActiveLeft(null);
      setActiveRight(null);
      setFeedback(null);
      setValidationResults(null);
    },
    [isComplete]
  );

  const removePair = useCallback(
    (leftId: string) => {
      if (isComplete) return;
      setPairs((prev) => {
        const next = { ...prev };
        delete next[leftId];
        return next;
      });
      setActiveLeft(null);
      setActiveRight(null);
      setFeedback(null);
      setValidationResults(null);
    },
    [isComplete]
  );

  const handleLeftClick = useCallback(
    (leftId: string) => {
      if (isComplete) return;

      // If this left already has a pair, remove it
      if (pairs[leftId]) {
        removePair(leftId);
        return;
      }

      // If a right is already active, make the pair
      if (activeRight) {
        makePair(leftId, activeRight);
        return;
      }

      // Otherwise toggle selection
      setActiveLeft((prev) => (prev === leftId ? null : leftId));
      setActiveRight(null);
    },
    [isComplete, pairs, activeRight, makePair, removePair]
  );

  const handleRightClick = useCallback(
    (rightId: string) => {
      if (isComplete) return;

      // If this right is already paired, remove that pair
      if (reversePairs[rightId]) {
        removePair(reversePairs[rightId]!);
        return;
      }

      // If a left is already active, make the pair
      if (activeLeft) {
        makePair(activeLeft, rightId);
        return;
      }

      // Otherwise toggle selection
      setActiveRight((prev) => (prev === rightId ? null : rightId));
      setActiveLeft(null);
    },
    [isComplete, reversePairs, activeLeft, makePair, removePair]
  );

  const checkAnswer = useCallback(() => {
    const totalPairs = Object.keys(correctPairs).length;
    if (Object.keys(pairs).length < totalPairs) return;

    const results: Record<string, "correct" | "incorrect"> = {};
    let allCorrect = true;

    for (const [leftId, rightId] of Object.entries(pairs)) {
      if (correctPairs[leftId] === rightId) {
        results[leftId] = "correct";
      } else {
        results[leftId] = "incorrect";
        allCorrect = false;
      }
    }

    setValidationResults(results);

    if (allCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [pairs, correctPairs, onComplete]);

  const resetPuzzle = useCallback(() => {
    setPairs({});
    setActiveLeft(null);
    setActiveRight(null);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setValidationResults(null);
  }, []);

  // Assign colors to pairs
  const pairColors = useMemo(() => {
    const colors: Record<string, string> = {};
    let i = 0;
    for (const leftId of Object.keys(pairs)) {
      if (validationResults) {
        colors[leftId] = validationResults[leftId] === "correct" ? CORRECT_COLOR : INCORRECT_COLOR;
      } else {
        colors[leftId] = LINE_COLORS[i % LINE_COLORS.length]!;
      }
      i++;
    }
    return colors;
  }, [pairs, validationResults]);

  const totalPairs = Object.keys(correctPairs).length;
  const completedCount = Object.keys(pairs).length;

  // Get the dot color for a left item
  const getLeftDotColor = (leftId: string): string | null => {
    if (pairs[leftId]) return pairColors[leftId] ?? null;
    if (activeLeft === leftId) return "#1CB0F6";
    return null;
  };
  // Get the dot color for a right item
  const getRightDotColor = (rightId: string): string | null => {
    if (reversePairs[rightId]) return pairColors[reversePairs[rightId]!] ?? null;
    if (activeRight === rightId) return "#1CB0F6";
    return null;
  };

  // Get container dimensions for SVG overlay
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (containerRef.current) {
      const obs = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      obs.observe(containerRef.current);
      return () => obs.disconnect();
    }
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
          Match {totalPairs} pairs ({completedCount}/{totalPairs} connected)
        </p>
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
              ? "Correct! All pairs matched!"
              : "Not quite — check the highlighted connections!"}
          </div>
        )}

        {/* Instruction */}
        {!isComplete && !activeLeft && !activeRight && completedCount === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Click an item on one side, then click its match on the other to connect them.
          </p>
        )}
        {!isComplete && (activeLeft || activeRight) && (
          <p className="text-center text-sm text-accent font-semibold animate-pop">
            Now click its match on the {activeLeft ? "right" : "left"} side.
          </p>
        )}

        {/* Matching area */}
        <div ref={containerRef} className="relative">
          {/* SVG lines overlay */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={containerSize.width}
            height={containerSize.height}
            style={{ overflow: "visible" }}
          >
            {Array.from(linePositions.entries()).map(([leftId, pos]) => {
              const color = pairColors[leftId] ?? LINE_COLORS[0]!;
              // Curved bezier line
              const midX = (pos.x1 + pos.x2) / 2;
              return (
                <path
                  key={leftId}
                  d={`M ${pos.x1} ${pos.y1} C ${midX} ${pos.y1}, ${midX} ${pos.y2}, ${pos.x2} ${pos.y2}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.85}
                />
              );
            })}
          </svg>

          {/* Two columns */}
          <div className="flex gap-4 sm:gap-8 items-start">
            {/* Left column */}
            <div className="flex-1 space-y-2">
              {leftColumnLabel && (
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground text-center mb-2">
                  {leftColumnLabel}
                </p>
              )}
              {leftItems.map((item) => {
                const isPaired = !!pairs[item.id];
                const isActive = activeLeft === item.id;
                const dotColor = getLeftDotColor(item.id);
                const validation = validationResults?.[item.id];

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) leftRefs.current.set(item.id, el);
                    }}
                    onClick={() => handleLeftClick(item.id)}
                    onMouseEnter={() => setHoveredLeft(item.id)}
                    onMouseLeave={() => setHoveredLeft(null)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all select-none",
                      "bg-card shadow-3d",
                      !isComplete && "cursor-pointer",
                      isActive && "border-accent ring-2 ring-accent/30 bg-accent/5",
                      isPaired && !isActive && !validation && "border-accent/50",
                      validation === "correct" && "border-primary bg-primary/5",
                      validation === "incorrect" && "border-destructive bg-destructive/5",
                      !isPaired && !isActive && "border-border",
                      hoveredLeft === item.id && !isComplete && !isActive && "border-accent/40",
                      isComplete && "pointer-events-none"
                    )}
                  >
                    <span className="flex-1 font-semibold text-sm">{item.text}</span>
                    {/* Connection dot */}
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all",
                        dotColor ? "border-transparent" : "border-muted-foreground/30"
                      )}
                      style={dotColor ? { backgroundColor: dotColor } : undefined}
                    />
                  </div>
                );
              })}
            </div>

            {/* Right column */}
            <div className="flex-1 space-y-2">
              {rightColumnLabel && (
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground text-center mb-2">
                  {rightColumnLabel}
                </p>
              )}
              {shuffledRight.map((item) => {
                const isPaired = pairedRightIds.has(item.id);
                const isActive = activeRight === item.id;
                const dotColor = getRightDotColor(item.id);
                const pairedLeftId = reversePairs[item.id];
                const validation = pairedLeftId ? validationResults?.[pairedLeftId] : null;

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) rightRefs.current.set(item.id, el);
                    }}
                    onClick={() => handleRightClick(item.id)}
                    onMouseEnter={() => setHoveredRight(item.id)}
                    onMouseLeave={() => setHoveredRight(null)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all select-none",
                      "bg-card shadow-3d",
                      !isComplete && "cursor-pointer",
                      isActive && "border-accent ring-2 ring-accent/30 bg-accent/5",
                      isPaired && !isActive && !validation && "border-accent/50",
                      validation === "correct" && "border-primary bg-primary/5",
                      validation === "incorrect" && "border-destructive bg-destructive/5",
                      !isPaired && !isActive && "border-border",
                      hoveredRight === item.id && !isComplete && !isActive && "border-accent/40",
                      isComplete && "pointer-events-none"
                    )}
                  >
                    {/* Connection dot */}
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all",
                        dotColor ? "border-transparent" : "border-muted-foreground/30"
                      )}
                      style={dotColor ? { backgroundColor: dotColor } : undefined}
                    />
                    <span className="flex-1 font-semibold text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

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
            <Button size="sm" onClick={checkAnswer} disabled={completedCount < totalPairs}>
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
