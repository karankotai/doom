"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface OrderingItem {
  id: string;
  label: string;
  emoji?: string;
  subtitle?: string;
}

export interface OrderingContent {
  items: OrderingItem[];
  correctOrder: string[]; // item IDs in correct order
  direction: "top-down" | "bottom-up";
}

interface OrderingProps {
  question: string;
  hint?: string;
  items: OrderingItem[];
  correctOrder: string[];
  direction: "top-down" | "bottom-up";
  onComplete?: (success: boolean) => void;
}

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

export function Ordering({
  question,
  hint,
  items,
  correctOrder,
  direction,
  onComplete,
}: OrderingProps) {
  // Shuffle items on first render, ensuring they're not already in the correct order
  const initialOrder = useMemo(() => {
    let shuffled = shuffleArray(items);
    // Keep shuffling until order differs from correct
    let attempts = 0;
    while (
      attempts < 10 &&
      shuffled.every((item, i) => item.id === correctOrder[i])
    ) {
      shuffled = shuffleArray(items);
      attempts++;
    }
    return shuffled;
  }, [items, correctOrder]);

  const [orderedItems, setOrderedItems] = useState<OrderingItem[]>(initialOrder);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [validationResults, setValidationResults] = useState<
    ("correct" | "incorrect")[] | null
  >(null);

  // Touch drag state
  const [touchDragIndex, setTouchDragIndex] = useState<number | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // --- Core Logic ---

  const swapItems = useCallback((fromIndex: number, toIndex: number) => {
    setOrderedItems((prev) => {
      const next = [...prev];
      const removed = next.splice(fromIndex, 1);
      const moved = removed[0]!;
      next.splice(toIndex, 0, moved);
      return next;
    });
    setValidationResults(null);
    setFeedback(null);
  }, []);

  const checkAnswer = useCallback(() => {
    const results: ("correct" | "incorrect")[] = orderedItems.map(
      (item, i) => (item.id === correctOrder[i] ? "correct" : "incorrect")
    );
    setValidationResults(results);

    const allCorrect = results.every((r) => r === "correct");
    if (allCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [orderedItems, correctOrder, onComplete]);

  const resetPuzzle = useCallback(() => {
    setOrderedItems(shuffleArray(items));
    setDragIndex(null);
    setDragOverIndex(null);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setValidationResults(null);
  }, [items]);

  // --- HTML5 Drag & Drop ---

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      if (isComplete) return;
      e.dataTransfer.setData("text/plain", String(index));
      e.dataTransfer.effectAllowed = "move";
      setDragIndex(index);
    },
    [isComplete]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverIndex(index);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, toIndex: number) => {
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
      if (!isNaN(fromIndex) && fromIndex !== toIndex) {
        swapItems(fromIndex, toIndex);
      }
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [swapItems]
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  // --- Touch Drag ---

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, index: number) => {
      if (isComplete) return;
      const touch = e.touches[0];
      if (!touch) return;

      setTouchDragIndex(index);

      const item = orderedItems[index]!;
      const ghost = document.createElement("div");
      ghost.className =
        "fixed pointer-events-none z-50 flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-accent bg-card font-semibold shadow-lg opacity-90 scale-105";
      ghost.innerHTML = `${item.emoji ? `<span class="text-xl">${item.emoji}</span>` : ""}
        <span>${item.label}</span>`;
      ghost.style.left = `${touch.clientX - 100}px`;
      ghost.style.top = `${touch.clientY - 28}px`;
      ghost.style.width = "200px";
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
    },
    [isComplete, orderedItems]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchDragIndex === null) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch || !ghostRef.current) return;

      ghostRef.current.style.left = `${touch.clientX - 100}px`;
      ghostRef.current.style.top = `${touch.clientY - 28}px`;

      // Find element under touch
      ghostRef.current.style.display = "none";
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      ghostRef.current.style.display = "";

      const slotEl = el?.closest("[data-order-index]");
      if (slotEl) {
        const idx = parseInt(slotEl.getAttribute("data-order-index") ?? "", 10);
        setDragOverIndex(!isNaN(idx) ? idx : null);
      } else {
        setDragOverIndex(null);
      }
    },
    [touchDragIndex]
  );

  const handleTouchEnd = useCallback(() => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }

    if (touchDragIndex !== null && dragOverIndex !== null && touchDragIndex !== dragOverIndex) {
      swapItems(touchDragIndex, dragOverIndex);
    }

    setTouchDragIndex(null);
    setDragOverIndex(null);
  }, [touchDragIndex, dragOverIndex, swapItems]);

  // --- Move buttons (accessible alternative) ---

  const moveUp = useCallback(
    (index: number) => {
      if (index <= 0 || isComplete) return;
      swapItems(index, index - 1);
    },
    [swapItems, isComplete]
  );

  const moveDown = useCallback(
    (index: number) => {
      if (index >= orderedItems.length - 1 || isComplete) return;
      swapItems(index, index + 1);
    },
    [swapItems, orderedItems.length, isComplete]
  );

  // --- Render ---

  const directionLabel =
    direction === "top-down"
      ? "Arrange from top (highest) to bottom (lowest)"
      : "Arrange from bottom (lowest) to top (highest)";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-2">
          {direction === "top-down" ? "⬇️" : "⬆️"} {directionLabel}
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
              ? "Correct! Perfect order!"
              : "Not quite right — check the highlighted items and try again!"}
          </div>
        )}

        {/* Ordering list */}
        <div
          ref={listRef}
          className="space-y-2"
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {orderedItems.map((item, index) => {
            const validation = validationResults?.[index];
            const isDragging = dragIndex === index || touchDragIndex === index;
            const isDragOver = dragOverIndex === index;

            return (
              <div
                key={item.id}
                data-order-index={index}
                draggable={!isComplete}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, index)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-150 select-none",
                  "bg-card shadow-3d",
                  !isComplete && "cursor-grab active:cursor-grabbing",
                  isDragging && "opacity-40 scale-95",
                  isDragOver && !isDragging && "border-accent bg-accent/10 scale-[1.02]",
                  validation === "correct" && "border-primary bg-primary/10",
                  validation === "incorrect" && "border-destructive bg-destructive/10",
                  !validation && !isDragOver && "border-border",
                  isComplete && "pointer-events-none"
                )}
              >
                {/* Position number */}
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    validation === "correct"
                      ? "bg-primary text-white"
                      : validation === "incorrect"
                      ? "bg-destructive text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>

                {/* Emoji */}
                {item.emoji && (
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                )}

                {/* Label + subtitle */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {item.label}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Move buttons */}
                {!isComplete && (
                  <div className="flex flex-col gap-0.5 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveUp(index);
                      }}
                      disabled={index === 0}
                      className={cn(
                        "w-6 h-6 rounded flex items-center justify-center text-xs transition-colors",
                        index === 0
                          ? "text-muted-foreground/30"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      aria-label="Move up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveDown(index);
                      }}
                      disabled={index === orderedItems.length - 1}
                      className={cn(
                        "w-6 h-6 rounded flex items-center justify-center text-xs transition-colors",
                        index === orderedItems.length - 1
                          ? "text-muted-foreground/30"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      aria-label="Move down"
                    >
                      ▼
                    </button>
                  </div>
                )}

                {/* Validation icon */}
                {validation && (
                  <span className="flex-shrink-0 text-lg">
                    {validation === "correct" ? "✅" : "❌"}
                  </span>
                )}
              </div>
            );
          })}
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
            <Button size="sm" onClick={checkAnswer}>
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

// Note: Ordering content is stored in the database.
// Use the API to fetch puzzles: GET /applets?type=ordering
