"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface ColorBlock {
  id: string;
  label: string;
  hex: string; // e.g. "#FF0000"
}

export interface ColorMixingContent {
  targetHex: string;
  targetLabel?: string;
  colorBlocks: ColorBlock[];
  correctBlockIds: string[]; // IDs of blocks that produce the target when mixed
  mode: "additive" | "subtractive"; // light mixing vs paint mixing
}

interface ColorMixingProps {
  question: string;
  hint?: string;
  targetHex: string;
  targetLabel?: string;
  colorBlocks: ColorBlock[];
  correctBlockIds: string[];
  mode: "additive" | "subtractive";
  onComplete?: (success: boolean) => void;
}

// --- Color mixing helpers ---

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(r).toString(16).padStart(2, "0")}${clamp(g).toString(16).padStart(2, "0")}${clamp(b).toString(16).padStart(2, "0")}`.toUpperCase();
}

/** Additive mixing (light): R,G,B channels are added and clamped to 255 */
function mixAdditive(colors: string[]): string {
  if (colors.length === 0) return "#000000";
  if (colors.length === 1) return colors[0]!;

  let r = 0, g = 0, b = 0;
  for (const hex of colors) {
    const [cr, cg, cb] = hexToRgb(hex);
    r += cr;
    g += cg;
    b += cb;
  }
  return rgbToHex(
    Math.min(255, r),
    Math.min(255, g),
    Math.min(255, b)
  );
}

/** Subtractive mixing (paint/pigment): multiply normalized values */
function mixSubtractive(colors: string[]): string {
  if (colors.length === 0) return "#FFFFFF";
  if (colors.length === 1) return colors[0]!;

  let r = 1, g = 1, b = 1;
  for (const hex of colors) {
    const [cr, cg, cb] = hexToRgb(hex);
    r *= cr / 255;
    g *= cg / 255;
    b *= cb / 255;
  }
  return rgbToHex(r * 255, g * 255, b * 255);
}

function mixColors(colors: string[], mode: "additive" | "subtractive"): string {
  return mode === "additive" ? mixAdditive(colors) : mixSubtractive(colors);
}

/** Compute perceived brightness (0-255) for text contrast */
function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// --- Bucket SVG ---

function BucketSvg({
  fillColor,
  size = 140,
  className,
}: {
  fillColor: string;
  size?: number;
  className?: string;
}) {
  const darkFill = luminance(fillColor) > 128;
  // Slightly darken the fill for the rim/handle to give depth
  const [r, g, b] = hexToRgb(fillColor);
  const rimColor = rgbToHex(
    Math.max(0, r - 40),
    Math.max(0, g - 40),
    Math.max(0, b - 40)
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bucket body - trapezoid shape */}
      <path
        d="M15 30 L25 95 C25 100 75 100 75 95 L85 30 Z"
        fill={fillColor}
        stroke={rimColor}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Liquid surface - ellipse at top */}
      <ellipse
        cx="50"
        cy="30"
        rx="35"
        ry="10"
        fill={fillColor}
        stroke={rimColor}
        strokeWidth="2.5"
      />
      {/* Rim highlight */}
      <ellipse
        cx="50"
        cy="30"
        rx="33"
        ry="8"
        fill={fillColor}
        opacity="0.7"
      />
      {/* Bucket rim - top ellipse (metallic) */}
      <ellipse
        cx="50"
        cy="26"
        rx="37"
        ry="10"
        fill="none"
        stroke={darkFill ? "#555" : "#ccc"}
        strokeWidth="3"
      />
      {/* Handle */}
      <path
        d="M20 22 C20 2 80 2 80 22"
        fill="none"
        stroke={darkFill ? "#555" : "#ccc"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Bottom ellipse for 3D effect */}
      <ellipse
        cx="50"
        cy="95"
        rx="25"
        ry="5"
        fill={rimColor}
        opacity="0.5"
      />
    </svg>
  );
}

// --- Component ---

export function ColorMixing({
  question,
  hint,
  targetHex,
  targetLabel,
  colorBlocks,
  correctBlockIds,
  mode,
  onComplete,
}: ColorMixingProps) {
  const [mixingZone, setMixingZone] = useState<string[]>([]); // block IDs in the zone
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dragOverZone, setDragOverZone] = useState(false);

  // Touch drag state
  const [touchDragBlockId, setTouchDragBlockId] = useState<string | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);

  // Compute mixed color from blocks in the zone
  const mixedHex = useMemo(() => {
    if (mixingZone.length === 0) return mode === "additive" ? "#000000" : "#FFFFFF";
    const hexes = mixingZone.map(
      (id) => colorBlocks.find((b) => b.id === id)?.hex ?? "#000000"
    );
    return mixColors(hexes, mode);
  }, [mixingZone, colorBlocks, mode]);

  // Available blocks (not in mixing zone)
  const availableBlocks = useMemo(
    () => colorBlocks.filter((b) => !mixingZone.includes(b.id)),
    [colorBlocks, mixingZone]
  );

  // Blocks currently in the mixing zone
  const zoneBlocks = useMemo(
    () => mixingZone.map((id) => colorBlocks.find((b) => b.id === id)!).filter(Boolean),
    [mixingZone, colorBlocks]
  );

  // --- Actions ---

  const addToZone = useCallback(
    (blockId: string) => {
      if (isComplete) return;
      setMixingZone((prev) => {
        if (prev.includes(blockId)) return prev;
        return [...prev, blockId];
      });
      setFeedback(null);
    },
    [isComplete]
  );

  const removeFromZone = useCallback(
    (blockId: string) => {
      if (isComplete) return;
      setMixingZone((prev) => prev.filter((id) => id !== blockId));
      setFeedback(null);
    },
    [isComplete]
  );

  const checkAnswer = useCallback(() => {
    const sortedMixing = [...mixingZone].sort();
    const sortedCorrect = [...correctBlockIds].sort();
    const isCorrect =
      sortedMixing.length === sortedCorrect.length &&
      sortedMixing.every((id, i) => id === sortedCorrect[i]);

    if (isCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [mixingZone, correctBlockIds, onComplete]);

  const resetPuzzle = useCallback(() => {
    setMixingZone([]);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
  }, []);

  // --- HTML5 Drag & Drop ---

  const handleDragStart = useCallback(
    (e: React.DragEvent, blockId: string) => {
      if (isComplete) return;
      e.dataTransfer.setData("text/plain", blockId);
      e.dataTransfer.effectAllowed = "move";
    },
    [isComplete]
  );

  const handleZoneDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverZone(true);
  }, []);

  const handleZoneDragLeave = useCallback(() => {
    setDragOverZone(false);
  }, []);

  const handleZoneDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const blockId = e.dataTransfer.getData("text/plain");
      if (blockId) addToZone(blockId);
      setDragOverZone(false);
    },
    [addToZone]
  );

  // --- Touch Drag ---

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, blockId: string) => {
      if (isComplete) return;
      const touch = e.touches[0];
      if (!touch) return;

      setTouchDragBlockId(blockId);

      const block = colorBlocks.find((b) => b.id === blockId);
      if (!block) return;

      const ghost = document.createElement("div");
      ghost.className = "fixed pointer-events-none z-50 rounded-xl shadow-lg opacity-90";
      ghost.style.width = "64px";
      ghost.style.height = "64px";
      ghost.style.backgroundColor = block.hex;
      ghost.style.border = "3px solid white";
      ghost.style.left = `${touch.clientX - 32}px`;
      ghost.style.top = `${touch.clientY - 32}px`;
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
    },
    [isComplete, colorBlocks]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchDragBlockId) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch || !ghostRef.current) return;

      ghostRef.current.style.left = `${touch.clientX - 32}px`;
      ghostRef.current.style.top = `${touch.clientY - 32}px`;

      // Check if over mixing zone
      ghostRef.current.style.display = "none";
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      ghostRef.current.style.display = "";

      const zoneEl = el?.closest("[data-mix-zone]");
      setDragOverZone(!!zoneEl);
    },
    [touchDragBlockId]
  );

  const handleTouchEnd = useCallback(() => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }

    if (touchDragBlockId && dragOverZone) {
      addToZone(touchDragBlockId);
    }

    setTouchDragBlockId(null);
    setDragOverZone(false);
  }, [touchDragBlockId, dragOverZone, addToZone]);

  // --- Render ---

  const emptyBg = mode === "additive" ? "#000000" : "#FFFFFF";
  const mixZoneEmpty = mixingZone.length === 0;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
          {mode === "additive" ? "Light Mixing (Additive)" : "Paint Mixing (Subtractive)"}
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
              ? "Perfect match! You nailed the color!"
              : "Not quite right — try a different combination!"}
          </div>
        )}

        {/* Buckets side by side */}
        <div className="flex items-end justify-center gap-6 sm:gap-10">
          {/* Target bucket */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Target
            </p>
            <BucketSvg fillColor={targetHex} size={130} />
            <span
              className={cn(
                "text-sm font-bold px-3 py-1 rounded-lg",
                luminance(targetHex) > 128
                  ? "bg-gray-100 text-gray-800"
                  : "bg-gray-800 text-white"
              )}
            >
              {targetLabel ?? targetHex}
            </span>
          </div>

          {/* Your mix bucket — drop zone */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Your Mix
            </p>
            <div
              data-mix-zone="true"
              onDragOver={handleZoneDragOver}
              onDragLeave={handleZoneDragLeave}
              onDrop={handleZoneDrop}
              className={cn(
                "transition-all duration-300 rounded-2xl",
                dragOverZone && "scale-[1.06] drop-shadow-lg",
                mixZoneEmpty && "opacity-60"
              )}
            >
              <BucketSvg
                fillColor={mixZoneEmpty ? emptyBg : mixedHex}
                size={130}
              />
            </div>
            <span
              className={cn(
                "text-sm font-bold px-3 py-1 rounded-lg",
                mixZoneEmpty
                  ? "bg-muted text-muted-foreground"
                  : luminance(mixedHex) > 128
                  ? "bg-gray-100 text-gray-800"
                  : "bg-gray-800 text-white"
              )}
            >
              {mixZoneEmpty ? "Empty" : mixedHex}
            </span>
          </div>
        </div>

        {/* Blocks currently in mixing zone */}
        {zoneBlocks.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground text-center">
              In the mix ({zoneBlocks.length}):
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {zoneBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => removeFromZone(block.id)}
                  disabled={isComplete}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-border",
                    "text-sm font-semibold transition-all duration-150",
                    "hover:border-destructive/50 hover:bg-destructive/10",
                    isComplete && "pointer-events-none opacity-70"
                  )}
                >
                  <span
                    className="w-5 h-5 rounded-md border border-black/10 flex-shrink-0"
                    style={{ backgroundColor: block.hex }}
                  />
                  <span>{block.label}</span>
                  {!isComplete && (
                    <span className="text-muted-foreground text-xs ml-1">x</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Available color blocks to drag — centered row */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground text-center">
            {availableBlocks.length > 0
              ? "Drag or click to add:"
              : "All colors used"}
          </p>
          <div
            className="flex flex-wrap gap-3 min-h-[80px] items-start justify-center"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {availableBlocks.map((block) => (
              <button
                key={block.id}
                draggable={!isComplete}
                onDragStart={(e) => handleDragStart(e, block.id)}
                onTouchStart={(e) => handleTouchStart(e, block.id)}
                onClick={() => addToZone(block.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 border-border bg-card",
                  "shadow-duo cursor-grab active:cursor-grabbing active:translate-y-1 active:shadow-none",
                  "transition-all duration-150 select-none",
                  "hover:brightness-105 hover:border-accent/50",
                  isComplete && "pointer-events-none opacity-50"
                )}
              >
                <div
                  className="w-14 h-14 rounded-lg border border-black/10 shadow-inner"
                  style={{ backgroundColor: block.hex }}
                />
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                  {block.label}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {block.hex}
                </span>
              </button>
            ))}
          </div>
        </div>

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
              disabled={mixingZone.length === 0}
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

// Note: Color mixing content is stored in the database.
// Use the API to fetch puzzles: GET /applets?type=color-mixing
